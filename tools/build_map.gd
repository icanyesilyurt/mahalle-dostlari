extends SceneTree
## İstanbul haritasını kurar ve res://map/istanbul.scn + istanbul.json olarak kaydeder.
## Çalıştırma: godot --headless --script res://tools/build_map.gd
##
## Koordinatlar (metre, sıkıştırılmış): x doğu, z güney.
##   Güney (Tarihi Yarımada): x -150..100, z -22..160
##   Haliç: z -58..-22   ·   Galata Köprüsü: x -7..7
##   Kuzey (Karaköy-Galata): x -150..110, z -140..-58

const Geo := preload("res://tools/geo.gd")

var g
var mroot: Node3D
var rng := RandomNumberGenerator.new()
var font: Font
var COL: Array = []
var places: Array = []
var lamps: Array = []

const PAL_S := ["#e9b9a3", "#f1d59c", "#c8d8bf", "#e8c4cb", "#bcd0e3", "#efe1c6", "#d9a37f", "#d9c2a7", "#a9c1b4", "#e6a98c", "#f3e3b5", "#c9a9a6"]
const PAL_N := ["#d8cdb8", "#c9bba4", "#e5dccb", "#b9b0a5", "#d6c3a8", "#c7c9c3", "#e1cfb0", "#b8a48a", "#cfd6d2", "#dcc0a8"]
const ROOF := ["#b4573d", "#a24a34", "#9a5a44", "#b9623f"]
const AWN := ["#c8423a", "#2f7d6d", "#e2a33b", "#3b6aa8", "#8e3b5a"]
const LEAD := "#8e989c"

func C(h: String) -> Color:
	return Color(h)

func pick(a: Array) -> Color:
	return Color(a[rng.randi() % a.size()])

func shade(c: Color, k: float = 0.86) -> Color:
	return Color(c.r * k, c.g * k, c.b * k, c.a)

# ------------------------------------------------------------ malzemeler
func shader_mat(path: String, tex_path: String = "") -> ShaderMaterial:
	var m := ShaderMaterial.new()
	m.shader = load(path)
	if tex_path != "":
		m.set_shader_parameter("tex", load(tex_path))
	return m

func tex_mat(tex_path: String, rough: float = 0.95) -> StandardMaterial3D:
	var m := StandardMaterial3D.new()
	m.albedo_texture = load(tex_path)
	m.vertex_color_use_as_albedo = true
	m.vertex_color_is_srgb = true
	m.roughness = rough
	m.texture_filter = BaseMaterial3D.TEXTURE_FILTER_LINEAR_WITH_MIPMAPS_ANISOTROPIC
	return m

func setup_materials() -> void:
	g.mats["plain"] = shader_mat("res://map/plain.gdshader")
	g.mats["roof"] = shader_mat("res://map/roof.gdshader")
	for k in ["win_a", "win_b", "win_c", "shop", "door"]:
		g.mats[k] = shader_mat("res://map/wall.gdshader", "res://map/tex/%s.png" % k)
	g.mats["cobble"] = tex_mat("res://map/tex/cobble.png")
	g.mats["slab"] = tex_mat("res://map/tex/slab.png")
	g.mats["grass"] = tex_mat("res://map/tex/grass.png")
	g.mats["wood"] = tex_mat("res://map/tex/wood.png", 0.8)
	g.mats["stone"] = tex_mat("res://map/tex/stone.png")
	var gold := StandardMaterial3D.new()
	gold.albedo_color = C("#d4a93c"); gold.metallic = 0.8; gold.roughness = 0.3
	g.mats["gold"] = gold
	var glow := StandardMaterial3D.new()
	glow.albedo_color = C("#fff1c8"); glow.emission_enabled = true; glow.emission = C("#ffd98a"); glow.emission_energy_multiplier = 0.6
	g.mats["glow"] = glow

# ------------------------------------------------------------ yardımcılar
func add_col(x0: float, x1: float, z0: float, z1: float, h: float = 14.0, track: bool = true, layer: int = 1) -> void:
	if track:
		COL.append([snappedf(x0, 0.01), snappedf(x1, 0.01), snappedf(z0, 0.01), snappedf(z1, 0.01)])
	var sb := StaticBody3D.new()
	sb.collision_layer = layer
	var cs := CollisionShape3D.new()
	var bs := BoxShape3D.new()
	bs.size = Vector3(x1 - x0, h, z1 - z0)
	cs.shape = bs
	sb.add_child(cs)
	sb.position = Vector3((x0 + x1) / 2.0, h / 2.0 - 0.5, (z0 + z1) / 2.0)
	mroot.get_node("Carpisma").add_child(sb)
	sb.owner = mroot
	cs.owner = mroot

func place(n: String, x0: float, x1: float, z0: float, z1: float) -> void:
	places.append([n, x0, x1, z0, z1])

func label(text: String, pos: Vector3, size: int, fg: Color, outline: Color, osize: int, billboard := true) -> void:
	var l := Label3D.new()
	l.text = text
	l.font = font
	l.font_size = size
	l.pixel_size = 0.006
	l.modulate = fg
	l.outline_modulate = outline
	l.outline_size = osize
	l.billboard = BaseMaterial3D.BILLBOARD_ENABLED if billboard else BaseMaterial3D.BILLBOARD_DISABLED
	l.position = pos
	mroot.get_node("Tabelalar").add_child(l)
	l.owner = mroot

func street_sign(text: String, x: float, z: float) -> void:
	# tabelayı en yakın bloğun kaldırımına taşı
	var best_d := 1e9
	var bp := Vector2(x, z)
	for c in COL:
		var q := Vector2(clampf(x, c[0], c[1]), clampf(z, c[2], c[3]))
		var dd := q.distance_to(Vector2(x, z))
		if dd < best_d and dd > 0.01:
			best_d = dd
			bp = q + (Vector2(x, z) - q).normalized() * 0.7
	x = bp.x; z = bp.y
	label(text, Vector3(x, 3.0, z), 44, Color.WHITE, C("#1d5aa6"), 26)
	g.put("cyl8", Vector3(x, 1.4, z), C("#3a4248"), 0, Vector3(0.05, 2.8, 0.05))

func lamp(x: float, z: float) -> void:
	g.put("cyl8", Vector3(x, 0.25, z), C("#262b2e"), 0, Vector3(0.22, 0.5, 0.22))
	g.put("cyl8", Vector3(x, 2.4, z), C("#262b2e"), 0, Vector3(0.07, 4.4, 0.07))
	g.box(0.36, 0.5, 0.36, x, 4.45, z, C("#fff1c8"), 0.0, "glow")
	g.put("cone8", Vector3(x, 5.1, z), C("#262b2e"), 0, Vector3(0.32, 0.35, 0.32))
	g.box(0.44, 0.06, 0.44, x, 4.4, z, C("#262b2e"))
	lamps.append([x, z])

func tree(x: float, z: float, kind: String = "plane", s: float = 1.0) -> void:
	if kind == "cypress":
		g.put("cyl8", Vector3(x, 0.6 * s, z), C("#5a4630"), 0, Vector3(0.18 * s, 1.2 * s, 0.18 * s))
		g.put("cone", Vector3(x, 4.2 * s, z), C("#2f4a2c"), rng.randf(), Vector3(1.0 * s, 7.5 * s, 1.0 * s))
		g.put("cone", Vector3(x, 3.4 * s, z), C("#355531"), rng.randf(), Vector3(1.15 * s, 5.0 * s, 1.15 * s))
	elif kind == "small":
		g.put("cyl8", Vector3(x, 1.0 * s, z), C("#6b5236"), 0, Vector3(0.12 * s, 2.0 * s, 0.12 * s))
		g.put("ico", Vector3(x, 2.6 * s, z), C("#6c9a44").lerp(C("#86ad52"), rng.randf()), rng.randf() * 3, Vector3(1.1 * s, 1.0 * s, 1.1 * s))
	else:
		g.put("cyl8", Vector3(x, 1.8 * s, z), C("#7a6a52"), 0, Vector3(0.32 * s, 3.6 * s, 0.32 * s))
		for k in 4:
			var a := k * 1.7 + rng.randf()
			var r := 1.3 * s
			g.put("ico", Vector3(x + cos(a) * r, (4.2 + rng.randf() * 1.4) * s, z + sin(a) * r), C("#5c8a3c").lerp(C("#7aa34b"), rng.randf()), rng.randf() * 3, Vector3(2.1, 1.7, 2.1) * s)
		g.put("ico", Vector3(x, 6.0 * s, z), C("#6a9842"), rng.randf(), Vector3(2.2, 1.8, 2.2) * s)
	add_col(x - 0.4 * s, x + 0.4 * s, z - 0.4 * s, z + 0.4 * s, 6, false, 2)

func bench(x: float, z: float, ry: float = 0.0) -> void:
	var fw := Vector3(cos(ry), 0, -sin(ry))
	var bk := Vector3(sin(ry), 0, cos(ry))
	g.box(2.0, 0.1, 0.55, x, 0.45, z, C("#7b5a3c"), ry)
	var p := Vector3(x, 0, z) - bk * 0.26
	g.box(2.0, 0.45, 0.08, p.x, 0.6, p.z, C("#7b5a3c"), ry)
	for sx in [-0.85, 0.85]:
		var q: Vector3 = Vector3(x, 0, z) + fw * sx
		g.box(0.08, 0.45, 0.5, q.x, 0, q.z, C("#2e3236"), ry)

func flower_pot(x: float, z: float) -> void:
	g.put("cyl8", Vector3(x, 0.3, z), C("#b5643c"), 0, Vector3(0.3, 0.6, 0.3))
	g.put("ico", Vector3(x, 0.8, z), C("#5f8f45"), rng.randf(), Vector3(0.4, 0.35, 0.4))
	for k in 3:
		g.put("ico", Vector3(x + cos(k * 2.1) * 0.22, 1.0, z + sin(k * 2.1) * 0.22), [C("#e05a6a"), C("#f2c94c"), C("#c86dd7")][k], 0, Vector3(0.1, 0.1, 0.1))

# ------------------------------------------------------------ evler
## Bir sokak cephesi boyunca ev dizisi. (ax,az) başlangıç, (ux,uz) sokak yönü, (nx,nz) sokağa bakan normal.
func house_row(ax: float, az: float, ux: float, uz: float, L: float, nx: float, nz: float, st: Dictionary) -> void:
	var s := 0.0
	var ry := atan2(-uz, ux)
	while s < L - 2.0:
		var w := minf(4.5 + rng.randf() * 3.0, L - s)
		if L - s - w < 3.5:
			w = L - s
		var floors: int = rng.randi_range(st.fmin, st.fmax)
		var fh := 3.0
		var gf := 3.4
		var h := gf + (floors - 1) * fh
		var d := 5.0
		var mid := s + w / 2.0
		var cx := ax + ux * mid - nx * d / 2.0
		var cz := az + uz * mid - nz * d / 2.0
		var col := pick(st.pal)
		var shop: bool = rng.randf() < st.shop
		var wk: String = st.wins[rng.randi() % st.wins.size()]
		# zemin kat (dükkan ya da kapı) + üst katlar
		g.wall_box(w - 0.04, gf, d, cx, 0, cz, shade(col, 0.93), ry, "shop" if shop else "door", 4.2 if shop else w, gf)
		g.wall_box(w - 0.04, h - gf, d, cx, gf, cz, col, ry, wk, 2.6, fh)
		# kat silmeleri ve saçak
		g.box(w + 0.02, 0.22, d + 0.02, cx, gf - 0.1, cz, shade(col, 0.8), ry)
		g.box(w + 0.25, 0.3, d + 0.25, cx, h - 0.15, cz, shade(col, 0.74), ry)
		# kırma çatı
		g.put("hip" if w > d else "pyr", Vector3(cx, h + 0.1, cz), pick(ROOF), ry, Vector3(w + 0.5, 1.4 + rng.randf() * 0.5, d + 0.5), "roof")
		if rng.randf() < 0.35:
			var ox := ux * (rng.randf() - 0.5) * w * 0.5
			g.box(0.5, 1.4, 0.5, cx + ox, h + 0.6, cz - nx * 0.6 + ox * 0, shade(col, 0.7), ry)
		# dükkan tentesi
		if shop and rng.randf() < 0.7:
			var tx := ax + ux * mid + nx * 0.85
			var tz := az + uz * mid + nz * 0.85
			g.put("box", Vector3(tx, gf - 0.55, tz), pick(AWN), ry, Vector3(w * 0.9, 0.08, 1.7), "plain", -0.25 if nz != 0 else 0.0, 0.0 if nz != 0 else (0.25 * nx))
		# cumba (çıkma)
		if floors >= 3 and rng.randf() < st.cumba:
			var cw := minf(w * 0.62, 4.2)
			var cd := 1.1
			var kx := ax + ux * mid + nx * cd / 2.0
			var kz := az + uz * mid + nz * cd / 2.0
			g.wall_box(cw, fh * 1.8, cd, kx, gf + 0.2, kz, shade(col, 0.95), ry, "win_a", cw / 2.0, fh * 0.9)
			g.box(cw + 0.2, 0.2, cd + 0.2, kx, gf + 0.2 + fh * 1.8, kz, shade(col, 0.72), ry)
			for k in 4:
				var bo := (k - 1.5) * cw / 3.5
				g.put("box", Vector3(kx + ux * bo - nx * 0.1, gf + 0.0, kz + uz * bo - nz * 0.1), shade(col, 0.6), ry, Vector3(0.12, 0.5, 0.9))
		# saksı
		if rng.randf() < 0.2:
			var px := ax + ux * (mid + w * 0.3) + nx * 0.45
			var pz := az + uz * (mid + w * 0.3) + nz * 0.45
			flower_pot(px, pz)
		s += w

func block(x0: float, x1: float, z0: float, z1: float, st: Dictionary) -> void:
	var sw := 1.4
	var X0 := x0 + sw; var X1 := x1 - sw; var Z0 := z0 + sw; var Z1 := z1 - sw
	var cc := C("#cfc6b6")
	g.box(x1 - x0, 0.15, sw, (x0 + x1) / 2.0, 0, z0 + sw / 2.0, cc)
	g.box(x1 - x0, 0.15, sw, (x0 + x1) / 2.0, 0, z1 - sw / 2.0, cc)
	g.box(sw, 0.15, z1 - z0 - 2 * sw, x0 + sw / 2.0, 0, (z0 + z1) / 2.0, cc)
	g.box(sw, 0.15, z1 - z0 - 2 * sw, x1 - sw / 2.0, 0, (z0 + z1) / 2.0, cc)
	add_col(X0, X1, Z0, Z1)
	var W := X1 - X0; var D := Z1 - Z0
	if W < 9.0 or D < 9.0:
		var col := pick(st.pal)
		g.wall_box(W, 7.0, D, (X0 + X1) / 2.0, 0, (Z0 + Z1) / 2.0, col, 0, st.wins[0], 2.6, 3.0)
		g.put("hip", Vector3((X0 + X1) / 2.0, 7.0, (Z0 + Z1) / 2.0), pick(ROOF), 0 if W > D else PI / 2, Vector3(W + 0.4, 1.5, D + 0.4) if W > D else Vector3(D + 0.4, 1.5, W + 0.4), "roof")
		return
	if W > 10.2 and D > 10.2:
		g.box(W - 9.8, 7.5, D - 9.8, (X0 + X1) / 2.0, 0, (Z0 + Z1) / 2.0, C("#b0846a"))
	house_row(X0, Z0, 1, 0, W, 0, -1, st)
	house_row(X1, Z1, -1, 0, W, 0, 1, st)
	house_row(X1, Z0 + 5.0, 0, 1, D - 10.0, 1, 0, st)
	house_row(X0, Z1 - 5.0, 0, -1, D - 10.0, -1, 0, st)

func grid_blocks(xs: Array, zs: Array, st: Dictionary, skip: Array = []) -> void:
	for i in xs.size():
		for j in zs.size():
			if Vector2i(i, j) in skip:
				continue
			block(xs[i][0], xs[i][1], zs[j][0], zs[j][1], st)

# ------------------------------------------------------------ simge yapılar
func minaret(x: float, z: float, h: float, col: Color, balconies: int = 2, r: float = 0.85) -> void:
	g.put("cyl8", Vector3(x, 1.5, z), shade(col, 0.95), PI / 8, Vector3(r * 1.5, 3.0, r * 1.5))
	g.put("cyl", Vector3(x, h / 2.0, z), col, 0, Vector3(r, h, r))
	for k in balconies:
		var y := h * (0.62 + k * 0.17)
		g.put("cyl", Vector3(x, y, z), shade(col, 0.9), 0, Vector3(r * 1.55, 0.5, r * 1.55))
		g.put("cyl", Vector3(x, y + 0.55, z), shade(col, 0.75), 0, Vector3(r * 1.5, 0.6, r * 1.5))
	g.put("cone", Vector3(x, h + 2.6, z), C(LEAD), 0, Vector3(r * 1.1, 5.2, r * 1.1))
	g.put("cyl8", Vector3(x, h + 5.6, z), C("#d4a93c"), 0, Vector3(0.08, 1.2, 0.08), "gold")
	add_col(x - r * 1.5, x + r * 1.5, z - r * 1.5, z + r * 1.5)

func dome(x: float, y: float, z: float, r: float, ry: float = 0.7, drum: float = 1.0, col: Color = Color(LEAD)) -> void:
	if drum > 0.0:
		g.put("cyl", Vector3(x, y + drum / 2.0, z), C("#d9d4ca"), 0, Vector3(r * 0.98, drum, r * 0.98))
		var n := int(clampf(r * 2.4, 6, 32))
		for k in n:
			var a := k * TAU / n
			g.box(r * 0.22, drum * 0.6, 0.1, x + cos(a) * r * 0.99, y + drum * 0.2, z + sin(a) * r * 0.99, C("#3b4652"), -a + PI / 2)
	g.put("dome", Vector3(x, y + drum, z), col, 0, Vector3(r, r * ry, r))
	g.put("cyl8", Vector3(x, y + drum + r * ry + 0.6, z), C("#d4a93c"), 0, Vector3(0.12, 1.4, 0.12), "gold")
	g.put("ball", Vector3(x, y + drum + r * ry + 1.1, z), C("#d4a93c"), 0, Vector3(0.22, 0.22, 0.22), "gold")

func arch_windows(cx: float, cz: float, half: float, y: float, n: int, w: float, h: float, col: Color) -> void:
	for side in 4:
		for k in n:
			var t: float = (k - (n - 1) / 2.0) * (2.0 * half - 4.0) / max(1, n - 1)
			var p := Vector3.ZERO
			var ry := 0.0
			match side:
				0: p = Vector3(cx + t, 0, cz + half + 0.05)
				1: p = Vector3(cx + t, 0, cz - half - 0.05)
				2: p = Vector3(cx + half + 0.05, 0, cz + t); ry = PI / 2
				3: p = Vector3(cx - half - 0.05, 0, cz + t); ry = PI / 2
			g.box(w, h, 0.12, p.x, y, p.z, col, ry)

func mosque(cx: float, cz: float, size: float, h: float, r: float, col: Color, semis: int) -> void:
	var hs := size / 2.0
	g.box(size, h, size, cx, 0, cz, col)
	g.box(size + 0.5, 0.5, size + 0.5, cx, h, cz, shade(col, 0.85))
	arch_windows(cx, cz, hs, 2.0, int(size / 3.2), 1.0, 2.2, C("#3b4652"))
	arch_windows(cx, cz, hs, h - 4.0, int(size / 3.2), 1.0, 2.2, C("#3b4652"))
	g.box(size * 0.62, 3.0, size * 0.62, cx, h + 0.5, cz, shade(col, 0.95))
	var top := h + 3.5
	dome(cx, top, cz, r, 0.72, 1.6)
	if semis > 0:
		for k in semis:
			var a := k * TAU / semis
			dome(cx + cos(a) * r * 0.95, h + 0.5, cz + sin(a) * r * 0.95, r * 0.62, 0.72, 0.6)
	for p: Vector2 in [Vector2(-1, -1), Vector2(1, -1), Vector2(-1, 1), Vector2(1, 1)]:
		var px := cx + p.x * (hs - 3.2); var pz := cz + p.y * (hs - 3.2)
		g.put("cyl8", Vector3(px, h + 2.0, pz), shade(col, 0.95), PI / 8, Vector3(1.8, 4.0, 1.8))
		dome(px, h + 4.0, pz, 1.7, 0.8, 0.0)
	add_col(cx - hs, cx + hs, cz - hs, cz + hs)

func build_ayasofya() -> void:
	var cx := 62.0; var cz := 99.0
	var B := C("#d99a74")
	g.box(36, 11, 30, cx, 0, cz, B)
	g.box(37, 0.5, 31, cx, 11, cz, shade(B, 0.85))
	for k in range(-3, 4):
		for side in [-1.0, 1.0]:
			g.box(3.0, 9.0, 3.4, cx + k * 5.0, 0, cz + side * 16.2, shade(B, 0.9))
			g.put("pyr", Vector3(cx + k * 5.0, 9.0, cz + side * 16.2), shade(B, 0.8), 0, Vector3(3.0, 1.6, 3.4), "roof")
	for side in [-1.0, 1.0]:
		g.box(4, 16, 7, cx + side * 9, 0, cz - 17.5, shade(B, 0.88))
		g.box(4, 16, 7, cx + side * 9, 0, cz + 17.5, shade(B, 0.88))
	arch_windows(cx, cz, 15.0, 3.0, 9, 1.4, 2.6, C("#3b4652"))
	arch_windows(cx, cz, 15.0, 7.0, 9, 1.4, 2.6, C("#3b4652"))
	g.box(22, 5, 24, cx, 11, cz, shade(B, 0.95))
	g.box(4.5, 6.5, 0.2, cx - 18.1, 0, cz, C("#5e4337"), PI / 2)
	dome(cx, 16.0, cz, 12.0, 0.5, 2.2)
	dome(cx - 12.0, 13.0, cz, 7.5, 0.62, 0.0)
	dome(cx + 12.0, 13.0, cz, 7.5, 0.62, 0.0)
	for p: Vector2 in [Vector2(-1, -1), Vector2(1, -1), Vector2(-1, 1), Vector2(1, 1)]:
		dome(cx + p.x * 15.0, 11.0, cz + p.y * 9.0, 2.6, 0.7, 0.5)
	minaret(cx - 21, cz - 18, 34, C("#efe5d6"), 2)
	minaret(cx - 21, cz + 18, 34, C("#efe5d6"), 2)
	minaret(cx + 21, cz + 18, 30, C("#b86b4b"), 1, 1.2)
	minaret(cx + 21, cz - 18, 32, C("#efe5d6"), 1)
	add_col(cx - 18.5, cx + 18.5, cz - 17, cz + 17)
	add_col(cx - 11, cx - 7, cz - 21, cz + 21, 14, false)
	add_col(cx + 7, cx + 11, cz - 21, cz + 21, 14, false)
	label("Ayasofya", Vector3(cx, 36, cz), 150, C("#23302b"), C("#fffaf1"), 34)

func build_sultanahmet_camii() -> void:
	var cx := 7.0; var cz := 137.0
	var Bc := C("#dcd8cf")
	mosque(cx, cz, 34, 13, 11.5, Bc, 4)
	minaret(cx - 19.5, cz - 19.5, 40, C("#ebe6dc"), 3)
	minaret(cx + 19.5, cz - 19.5, 40, C("#ebe6dc"), 3)
	minaret(cx - 19.5, cz + 19.5, 40, C("#ebe6dc"), 3)
	minaret(cx + 19.5, cz + 19.5, 40, C("#ebe6dc"), 3)
	minaret(-35, 119, 36, C("#ebe6dc"), 2)
	minaret(-35, 155, 36, C("#ebe6dc"), 2)
	# avlu: revaklar ve kubbe sırası
	var ax0 := -34.0; var ax1 := -10.0; var az0 := 120.0; var az1 := 154.0
	for seg in [[ax0, ax1, az0, az0 + 2.6], [ax0, ax1, az1 - 2.6, az1], [ax0, ax0 + 2.6, az0, az1]]:
		g.box(seg[1] - seg[0], 4.2, seg[3] - seg[2], (seg[0] + seg[1]) / 2.0, 0, (seg[2] + seg[3]) / 2.0, Bc)
		add_col(seg[0], seg[1], seg[2], seg[3])
	var x := ax0 + 2.0
	while x < ax1 - 1.0:
		dome(x, 4.2, az0 + 1.3, 1.25, 0.8, 0.0)
		dome(x, 4.2, az1 - 1.3, 1.25, 0.8, 0.0)
		x += 3.2
	var z := az0 + 4.0
	while z < az1 - 3.0:
		dome(ax0 + 1.3, 4.2, z, 1.25, 0.8, 0.0)
		z += 3.2
	g.box(4.5, 6.5, 2.0, ax0 + 1.3, 0, (az0 + az1) / 2.0, C("#6b5246"), PI / 2)
	# şadırvan
	var sx := -22.0; var sz := 137.0
	g.put("cyl8", Vector3(sx, 0.6, sz), C("#e6e0d4"), PI / 8, Vector3(2.6, 1.2, 2.6))
	for k in 8:
		var a := k * TAU / 8 + PI / 8
		g.put("cyl", Vector3(sx + cos(a) * 2.4, 2.4, sz + sin(a) * 2.4), C("#e6e0d4"), 0, Vector3(0.15, 2.4, 0.15))
	g.put("cyl8", Vector3(sx, 3.8, sz), C("#d9d2c4"), PI / 8, Vector3(3.2, 0.4, 3.2))
	dome(sx, 4.0, sz, 2.8, 0.75, 0.0)
	add_col(sx - 2.6, sx + 2.6, sz - 2.6, sz + 2.6)
	label("Sultan Ahmet Camii", Vector3(cx, 44, cz), 150, C("#23302b"), C("#fffaf1"), 34)

func build_yeni_cami() -> void:
	var cx := -12.0; var cz := 12.0
	mosque(cx, cz, 26, 11, 8.5, C("#cfc7b8"), 4)
	minaret(cx - 14.5, cz - 14.5, 32, C("#e2dccf"), 2)
	minaret(cx + 14.5, cz - 14.5, 32, C("#e2dccf"), 2)
	# basamaklar
	for k in 4:
		g.box(20 - k * 1.0, 0.25 * (k + 1), 1.2, cx, 0, cz - 13.0 - 3.5 + k * 1.0, C("#d6cfc2"))
	label("Yeni Cami", Vector3(cx, 32, cz), 130, C("#23302b"), C("#fffaf1"), 30)

func build_misir_carsisi() -> void:
	var x0 := -76.0; var x1 := -42.0; var z0 := -2.0; var z1 := 22.0
	var col := C("#d6b48a")
	g.wall_box(x1 - x0, 7.5, z1 - z0, (x0 + x1) / 2.0, 0, (z0 + z1) / 2.0, col, 0, "win_c", 3.4, 7.5)
	g.box(x1 - x0 + 0.4, 0.5, z1 - z0 + 0.4, (x0 + x1) / 2.0, 7.5, (z0 + z1) / 2.0, shade(col, 0.82))
	var x := x0 + 3.0
	while x < x1 - 2.0:
		dome(x, 8.0, (z0 + z1) / 2.0 - 5.0, 2.2, 0.75, 0.3)
		dome(x, 8.0, (z0 + z1) / 2.0 + 5.0, 2.2, 0.75, 0.3)
		x += 5.2
	# doğu giriş kemeri
	g.box(1.2, 10.0, 9.0, x1 + 0.6, 0, (z0 + z1) / 2.0, shade(col, 0.9))
	g.box(0.3, 6.0, 4.5, x1 + 1.25, 0, (z0 + z1) / 2.0, C("#4a3a30"))
	add_col(x0, x1 + 1.2, z0, z1)
	label("Mısır Çarşısı", Vector3(x1 + 2, 12.5, (z0 + z1) / 2.0), 90, C("#23302b"), C("#fffaf1"), 26)

func build_galata_kulesi() -> void:
	var x := 27.0; var z := -128.0
	var S := C("#cbb796")
	g.put("cyl", Vector3(x, 1.0, z), shade(S, 0.85), 0, Vector3(6.4, 2.0, 6.4))
	g.put("cyl", Vector3(x, 15.0, z), S, 0, Vector3(5.6, 30.0, 5.6))
	for k in 5:
		g.put("cyl", Vector3(x, 6.0 + k * 5.0, z), shade(S, 0.9), 0, Vector3(5.7, 0.35, 5.7))
	for row in 4:
		var n := 8
		for k in n:
			var a := k * TAU / n + row * 0.4
			g.box(0.9, 1.8, 0.12, x + cos(a) * 5.66, 7.0 + row * 5.5, z + sin(a) * 5.66, C("#3b4652"), -a + PI / 2)
	g.put("cyl", Vector3(x, 30.4, z), shade(S, 0.75), 0, Vector3(6.4, 0.8, 6.4))
	g.put("cyl", Vector3(x, 31.3, z), C("#2b2b2b"), 0, Vector3(6.35, 1.0, 6.35))
	g.put("cyl", Vector3(x, 33.0, z), S, 0, Vector3(5.2, 4.0, 5.2))
	for k in 12:
		var a2 := k * TAU / 12
		g.box(1.1, 2.4, 0.12, x + cos(a2) * 5.22, 32.0, z + sin(a2) * 5.22, C("#3b4652"), -a2 + PI / 2)
	g.put("cone", Vector3(x, 39.8, z), C("#4d5963"), 0, Vector3(5.6, 9.6, 5.6))
	g.put("cyl8", Vector3(x, 45.2, z), C("#d4a93c"), 0, Vector3(0.1, 1.6, 0.1), "gold")
	g.box(2.4, 3.4, 0.4, x, 0, z + 5.6, C("#5e4337"))
	add_col(x - 6.4, x + 6.4, z - 6.4, z + 6.4)
	label("Galata Kulesi", Vector3(x, 50, z), 140, C("#23302b"), C("#fffaf1"), 32)

func build_bridge() -> void:
	var z0 := -58.0; var z1 := -22.0
	g.box(16, 0.7, z1 - z0, 0, -0.72, (z0 + z1) / 2.0, C("#7f8a8f"))
	g.ground(-4.5, 4.5, z0, z1, 0.0, "slab", 3.0, C("#77746f"))
	g.ground(-7.0, -4.5, z0, z1, 0.02, "wood", 2.0)
	g.ground(4.5, 7.0, z0, z1, 0.02, "wood", 2.0)
	g.box(0.2, 0.18, z1 - z0, -4.5, 0, (z0 + z1) / 2.0, C("#bdb6aa"))
	g.box(0.2, 0.18, z1 - z0, 4.5, 0, (z0 + z1) / 2.0, C("#bdb6aa"))
	for side in [-1.0, 1.0]:
		var rx: float = side * 7.1
		g.box(0.12, 0.08, z1 - z0, rx, 1.0, (z0 + z1) / 2.0, C("#2f3a3f"))
		g.box(0.08, 0.06, z1 - z0, rx, 0.55, (z0 + z1) / 2.0, C("#2f3a3f"))
		var z := z0 + 0.5
		while z < z1:
			g.box(0.1, 1.05, 0.1, rx, 0, z, C("#2f3a3f"))
			z += 1.6
		var lz := z0 + 4.0
		while lz < z1:
			lamp(side * 6.6, lz)
			lz += 9.0
		add_col(rx - 0.25 if side < 0 else rx - 0.05, rx + 0.05 if side < 0 else rx + 0.25, z0, z1, 4)
	# ayaklar
	var pz := z0 + 3.0
	while pz < z1:
		for px in [-5.0, 5.0]:
			g.box(1.6, 4.0, 1.6, px, -4.6, pz, C("#6f777b"))
		pz += 8.0
	# balıkçılar
	var fz := z0 + 3.5
	var i := 0
	while fz < z1 - 2.0:
		for side in [-1.0, 1.0]:
			if (i + int(side)) % 3 == 0:
				fisherman(side * 6.4, fz + rng.randf() * 1.5, side)
		fz += 3.0
		i += 1
	label("Galata Köprüsü", Vector3(0, 6, -40), 90, C("#23302b"), C("#fffaf1"), 26)

func fisherman(x: float, z: float, side: float) -> void:
	var jacket := pick(["#3b5b7a", "#6b4f3a", "#4f6b3b", "#7a3b3b", "#545454"])
	var ry := side * PI / 2
	g.box(0.34, 0.8, 0.22, x, 0, z, C("#2d3540"), ry)
	g.box(0.48, 0.66, 0.3, x, 0.8, z, jacket, ry)
	g.put("ball", Vector3(x, 1.65, z), C("#d6a982"), 0, Vector3(0.17, 0.19, 0.17))
	g.box(0.36, 0.1, 0.36, x, 1.8, z, C("#2b2b2b"), ry)
	g.box(0.3, 0.12, 0.18, x + side * 0.15, 1.82, z, C("#2b2b2b"), ry)
	var tip := Vector3(x + side * 3.6, 3.2, z)
	var base := Vector3(x + side * 0.2, 1.0, z)
	var mid := (tip + base) / 2.0
	var ln := tip.distance_to(base)
	var ang := atan2(tip.y - base.y, absf(tip.x - base.x))
	g.put("cyl8", mid, C("#2a2a2a"), 0, Vector3(0.025, ln, 0.025), "plain", 0, side * -(PI / 2 - ang))
	g.box(0.012, 3.8, 0.012, tip.x, -0.6, tip.z, C("#e8e8e8"))
	g.put("cyl8", Vector3(x - side * 0.5, 0.25, z + 0.3), C("#3f86b0"), 0, Vector3(0.18, 0.5, 0.18))

func build_pier() -> void:
	# Eminönü iskelesi
	var x0 := 22.0; var x1 := 40.0; var z0 := -40.0; var z1 := -22.0
	g.box(x1 - x0, 0.7, z1 - z0, (x0 + x1) / 2.0, -0.72, (z0 + z1) / 2.0, C("#6f6a62"))
	g.ground(x0, x1, z0, z1, 0.0, "wood", 2.0)
	var bx := (x0 + x1) / 2.0
	g.wall_box(14, 4.5, 6, bx, 0, -36, C("#e8e2d2"), 0, "win_a", 2.6, 4.5)
	g.put("hip", Vector3(bx, 4.5, -36), C("#3d6b55"), 0, Vector3(15.0, 2.2, 7.0), "roof")
	g.box(3.0, 1.0, 0.2, bx, 5.2, -32.8, C("#f3efe6"))
	label("EMİNÖNÜ", Vector3(bx, 5.7, -32.6), 70, C("#23302b"), C("#f3efe6"), 6, false)
	for p: Vector2 in [Vector2(x0 + 0.2, 0), Vector2(x1 - 0.2, 0)]:
		g.box(0.12, 1.0, z1 - z0, p.x, 0, (z0 + z1) / 2.0, C("#2f3a3f"))
	add_col(x0 - 0.3, x0 + 0.1, z0, z1, 4)
	add_col(x1 - 0.1, x1 + 0.3, z0, z1, 4)
	add_col(bx - 7, bx + 7, -39.5, -33)
	add_col(x0, x1, z0 - 1.0, z0 + 0.2, 4)
	lamp(x0 + 1.0, -26); lamp(x1 - 1.0, -26)

func boat(name: String, x: float, z: float, ry: float, kind: String) -> void:
	var n := Node3D.new()
	n.name = name
	mroot.get_node("Hareketli").add_child(n)
	n.owner = mroot
	n.position = Vector3(x, 0, z)
	n.rotation.y = ry
	if kind == "ferry":
		g.box(5, 1.6, 15, 0, -0.9, 0, C("#f4f1ea"))
		g.box(5.05, 0.4, 15.1, 0, -1.1, 0, C("#23415e"))
		g.box(4.2, 1.8, 10, 0, 0.7, 0, C("#f4f1ea"))
		g.box(4.25, 0.6, 10.05, 0, 1.2, 0, C("#2c3a46"))
		g.box(4.6, 0.2, 11, 0, 2.5, 0, C("#e8e4dc"))
		g.put("cyl", Vector3(0, 3.6, 1.0), C("#2b2b2b"), 0, Vector3(0.6, 2.2, 0.6))
		g.put("cyl", Vector3(0, 4.4, 1.0), C("#c8282d"), 0, Vector3(0.62, 0.45, 0.62))
	else:
		g.box(3.2, 1.2, 9, 0, -0.8, 0, C("#c8423a"))
		g.box(3.25, 0.25, 9.05, 0, 0.2, 0, C("#d4a93c"))
		g.box(2.8, 0.1, 6, 0, 2.6, 0, C("#3b6aa8"))
		for px in [-1.3, 1.3]:
			for pz in [-2.8, 2.8]:
				g.box(0.12, 2.4, 0.12, px, 0.2, pz, C("#d4a93c"))
		g.box(2.2, 1.0, 2.0, 0, 0.3, -1.0, C("#f3efe6"))
		label("BALIK EKMEK", Vector3(0, 3.3, 0), 60, C("#f3efe6"), C("#c8423a"), 14)
	g.flush(n, mroot)

func build_tram() -> void:
	var n := Node3D.new()
	n.name = "Tramvay"
	mroot.get_node("Hareketli").add_child(n)
	n.owner = mroot
	for k in [-1.0, 1.0]:
		var oz: float = k * 7.2
		g.box(2.6, 2.6, 13.8, 0, 0.3, oz, C("#e6e3dc"))
		g.box(2.62, 0.5, 13.82, 0, 0.3, oz, C("#c8282d"))
		g.box(2.64, 1.0, 12.6, 0, 1.4, oz, C("#2c3a46"))
		g.box(2.4, 0.3, 13.2, 0, 2.9, oz, C("#9aa0a4"))
	g.box(0.1, 1.0, 2.0, 0, 3.2, 0, C("#3d3d3d"))
	g.flush(n, mroot)

func quay(x0: float, x1: float, z0: float, z1: float) -> void:
	g.box(x1 - x0, 1.0, z1 - z0, (x0 + x1) / 2.0, -0.92, (z0 + z1) / 2.0, C("#b9ad98"), 0, "plain")
	add_col(x0, x1, z0, z1, 4)

# ------------------------------------------------------------ ana kurulum
func _init() -> void:
	rng.seed = 2026
	font = load("res://assets/fonts/ui_font.tres")
	g = Geo.new()
	setup_materials()
	mroot = Node3D.new()
	mroot.name = "Istanbul"
	for n in ["Zemin", "Sehir", "SimgeYapilar", "Dekor", "Carpisma", "Tabelalar", "Hareketli"]:
		var c := Node3D.new(); c.name = n; mroot.add_child(c); c.owner = mroot

	var Z := mroot.get_node("Zemin")
	var S := mroot.get_node("Sehir")
	var L := mroot.get_node("SimgeYapilar")
	var Dk := mroot.get_node("Dekor")

	# ---------- zemin
	g.ground(-150, 100, -22, 160, 0.0, "cobble", 4.0)
	g.ground(-150, 110, -140, -58, 0.0, "cobble", 4.0)
	g.ground(-150, 100, -22, -8, 0.012, "slab", 6.0)
	g.ground(-42, 42, -8, 30, 0.012, "slab", 6.0)
	g.ground(-60, 88, 80, 160, 0.012, "slab", 6.0)
	g.ground(-150, 110, -70, -58, 0.012, "slab", 6.0)
	g.ground(4, 56, -140, -114, 0.012, "slab", 6.0)
	g.ground(56, 100, -14, 80, 0.02, "grass", 5.0)
	g.ground(56, 100, 28, 34, 0.03, "slab", 6.0)
	g.ground(76, 81, -14, 80, 0.03, "slab", 6.0)
	for lw in [[4, 30, 86, 112], [40, 84, 120, 156], [-30, -4, 86, 112], [30, 42, 128, 156]]:
		g.ground(lw[0], lw[1], lw[2], lw[3], 0.03, "grass", 5.0)
		g.box(lw[1] - lw[0], 0.12, 0.25, (lw[0] + lw[1]) / 2.0, 0, lw[2], C("#cfc6b6"))
		g.box(lw[1] - lw[0], 0.12, 0.25, (lw[0] + lw[1]) / 2.0, 0, lw[3], C("#cfc6b6"))
	g.flush(Z, mroot, "Zemin", false)

	# ---------- rıhtımlar ve harita sınırları
	quay(-150, -7, -24, -22); quay(7, 22, -24, -22); quay(40, 102, -24, -22)
	quay(-150, -7, -58, -56); quay(7, 112, -58, -56)
	quay(100, 102, -22, 160); quay(110, 112, -140, -58)
	add_col(-158, -150, -150, 170, 14, false)
	add_col(-160, 120, 160, 168, 14, false)
	add_col(-160, 120, -148, -140, 14, false)
	g.flush(Dk, mroot, "Rihtim", false)

	# ---------- GÜNEY: ara sokaklar (Sirkeci-Hocapaşa), Eminönü batısı, Divanyolu güneyi
	var stS := {"pal": PAL_S, "fmin": 2, "fmax": 4, "shop": 0.35, "wins": ["win_a", "win_b"], "cumba": 0.55}
	var stMain := {"pal": PAL_S, "fmin": 3, "fmax": 4, "shop": 0.75, "wins": ["win_a", "win_b", "win_c"], "cumba": 0.4}
	var xsMid := [[-150, -130], [-125, -104], [-99, -78], [-73, -52], [-47, -26], [-21, 0], [5, 24], [29, 42]]
	grid_blocks(xsMid, [[37, 53]], stMain)
	g.flush(S, mroot, "Sirkeci1")
	grid_blocks(xsMid, [[58, 72]], stS)
	g.flush(S, mroot, "Sirkeci2")
	grid_blocks([[-150, -130], [-125, -104], [-99, -78]], [[-8, 9], [14, 30]], stS)
	g.flush(S, mroot, "EminonuBati")
	grid_blocks([[-150, -130], [-125, -104], [-99, -78], [-73, -60]], [[80, 104], [109, 130], [135, 160]], stS)
	g.flush(S, mroot, "SultanahmetBati")
	# arka plan sıraları (harita kenarı)
	for zz in range(-8, 160, 9):
		var col := pick(PAL_S)
		g.wall_box(8, 9 + rng.randf() * 4, 9, -155, 0, zz + 4.5, col, PI / 2, "win_a", 2.6, 3.0)
	for xx in range(-150, 100, 9):
		g.wall_box(9, 9 + rng.randf() * 4, 8, xx + 4.5, 0, 165, pick(PAL_S), 0, "win_b", 2.6, 3.0)
	g.flush(S, mroot, "ArkaPlanGuney")

	# ---------- KUZEY: Karaköy - Galata (4 dikey, 2 yatay sokak + meydan)
	var stN := {"pal": PAL_N, "fmin": 3, "fmax": 5, "shop": 0.5, "wins": ["win_a", "win_c", "win_c"], "cumba": 0.25}
	var xsN := [[-150, -96], [-90, -44], [-38, -4], [4, 24], [30, 56], [62, 110]]
	grid_blocks(xsN, [[-86, -70]], {"pal": PAL_N, "fmin": 3, "fmax": 5, "shop": 0.8, "wins": ["win_a", "win_c"], "cumba": 0.2})
	g.flush(S, mroot, "Karakoy")
	grid_blocks(xsN, [[-108, -92]], stN)
	g.flush(S, mroot, "Galata1")
	grid_blocks(xsN, [[-140, -114]], stN, [Vector2i(3, 0), Vector2i(4, 0)])
	g.flush(S, mroot, "Galata2")
	for xx in range(-150, 110, 9):
		g.wall_box(9, 14 + rng.randf() * 6, 8, xx + 4.5, 0, -145, pick(PAL_N), 0, "win_c", 2.6, 3.0)
	g.flush(S, mroot, "ArkaPlanKuzey")

	# ---------- simge yapılar
	build_ayasofya(); g.flush(L, mroot, "Ayasofya")
	build_sultanahmet_camii(); g.flush(L, mroot, "SultanAhmetCamii")
	build_yeni_cami(); g.flush(L, mroot, "YeniCami")
	build_misir_carsisi(); g.flush(L, mroot, "MisirCarsisi")
	build_galata_kulesi(); g.flush(L, mroot, "GalataKulesi")
	build_bridge(); g.flush(L, mroot, "GalataKoprusu")
	build_pier(); g.flush(L, mroot, "EminonuIskelesi")

	# ---------- Hipodrom
	var hx := -48.0
	g.box(2.6, 1.6, 2.6, hx, 0, 108, C("#bfb3a0"))
	g.put("box", Vector3(hx, 1.6 + 9.0, 108), C("#c99a86"), 0, Vector3(1.6, 18, 1.6))
	g.put("pyr", Vector3(hx, 19.6, 108), C("#c99a86"), 0, Vector3(1.6, 1.6, 1.6))
	add_col(hx - 1.3, hx + 1.3, 106.7, 109.3)
	g.box(2.4, 1.4, 2.4, hx, 0, 140, C("#a89c88"))
	g.put("box", Vector3(hx, 1.4 + 8.0, 140), C("#8f8676"), 0, Vector3(1.8, 16, 1.8))
	add_col(hx - 1.2, hx + 1.2, 138.8, 141.2)
	# Alman Çeşmesi
	var fx := -48.0; var fz := 88.0
	g.put("cyl8", Vector3(fx, 0.5, fz), C("#d8d2c4"), PI / 8, Vector3(3.2, 1.0, 3.2))
	for k in 8:
		var a := k * TAU / 8 + PI / 8
		g.put("cyl", Vector3(fx + cos(a) * 3.0, 2.6, fz + sin(a) * 3.0), C("#cfc6b6"), 0, Vector3(0.2, 3.2, 0.2))
	g.put("cyl8", Vector3(fx, 4.4, fz), C("#d8d2c4"), PI / 8, Vector3(3.6, 0.6, 3.6))
	dome(fx, 4.7, fz, 3.2, 0.8, 0.0, C("#4f8a6a"))
	add_col(fx - 3.2, fx + 3.2, fz - 3.2, fz + 3.2)
	label("Hipodrom", Vector3(hx, 24, 120), 90, C("#23302b"), C("#fffaf1"), 26)
	# Sultanahmet fıskiyesi
	var sfx := 34.0; var sfz := 118.0
	g.put("cyl", Vector3(sfx, 0.35, sfz), C("#d8d2c4"), 0, Vector3(7.0, 0.7, 7.0))
	g.put("cyl", Vector3(sfx, 0.62, sfz), C("#6fb7d4"), 0, Vector3(6.5, 0.05, 6.5))
	g.put("cyl", Vector3(sfx, 1.0, sfz), C("#d8d2c4"), 0, Vector3(1.2, 1.4, 1.2))
	g.put("cone", Vector3(sfx, 2.6, sfz), C("#bfe3ef"), 0, Vector3(0.6, 2.4, 0.6))
	add_col(sfx - 6.8, sfx + 6.8, sfz - 6.8, sfz + 6.8, 2)
	# Gülhane: duvar ve kapı, çeşme
	var wx := 56.0
	for seg in [[-14, 26], [34, 80]]:
		g.wall_box(1.2, 4.0, seg[1] - seg[0], wx, 0, (seg[0] + seg[1]) / 2.0, C("#c9bca6"), 0, "door", 50, 4)
		add_col(wx - 0.6, wx + 0.6, seg[0], seg[1])
	g.box(1.6, 6.5, 2.0, wx, 0, 25, C("#bfb29c")); g.box(1.6, 6.5, 2.0, wx, 0, 35, C("#bfb29c"))
	g.box(1.6, 1.4, 12, wx, 6.5, 30, C("#bfb29c"))
	g.put("hip", Vector3(wx, 7.9, 30), C(LEAD), PI / 2, Vector3(12.5, 1.4, 2.2), "roof")
	label("Gülhane Parkı", Vector3(wx, 10, 30), 90, C("#23302b"), C("#fffaf1"), 26)
	var gfx := 78.5; var gfz := 31.0
	g.put("cyl8", Vector3(gfx, 0.4, gfz), C("#d8d2c4"), 0, Vector3(3.0, 0.8, 3.0))
	g.put("cyl8", Vector3(gfx, 0.82, gfz), C("#6fb7d4"), 0, Vector3(2.7, 0.04, 2.7))
	g.put("cyl", Vector3(gfx, 1.4, gfz), C("#d8d2c4"), 0, Vector3(0.5, 2.0, 0.5))
	add_col(gfx - 3, gfx + 3, gfz - 3, gfz + 3, 2)
	g.wall_box(1.0, 3.0, 94, 100.5, 0, 33, C("#c9bca6"), 0, "door", 50, 3)
	# Topkapı dış suru
	g.wall_box(3.0, 9.0, 80, 90, 0, 120, C("#b9ab92"), 0, "door", 80, 9)
	var tz := 82.0
	while tz < 160.0:
		g.box(3.2, 1.0, 1.4, 90, 9.0, tz, C("#a99b82"))
		tz += 2.6
	add_col(88.5, 91.5, 80, 160)
	g.flush(L, mroot, "Meydanlar")

	# ---------- ağaçlar, banklar, lambalar
	for p: Vector2 in [Vector2(6, 84), Vector2(28, 84), Vector2(6, 114), Vector2(28, 114), Vector2(-28, 84), Vector2(-6, 84), Vector2(-28, 114), Vector2(-6, 114),
			Vector2(42, 122), Vector2(42, 154), Vector2(82, 122), Vector2(82, 154), Vector2(-40, 96), Vector2(-56, 96), Vector2(-40, 128), Vector2(-56, 128),
			Vector2(-40, 152), Vector2(-56, 152), Vector2(-56, 84)]:
		tree(p.x, p.y, "plane", 1.0)
	for p: Vector2 in [Vector2(17, 86), Vector2(17, 112), Vector2(-17, 86), Vector2(-17, 112), Vector2(62, 124), Vector2(62, 154), Vector2(36, 140)]:
		tree(p.x, p.y, "cypress", 1.0)
	var gz := -10.0
	while gz < 78.0:
		for gxx in [62.0, 70.0, 88.0, 95.0]:
			if absf(gz - 31.0) > 5.0:
				tree(gxx + rng.randf() * 2, gz + rng.randf() * 2, "plane" if rng.randf() < 0.75 else "cypress", 0.9 + rng.randf() * 0.3)
		gz += 9.0
	for b in [[24, 123, 0.0], [44, 123, 0.0], [34, 108, PI], [24, 113, PI], [44, 113, PI], [-20, 98, PI / 2], [12, 98, -PI / 2],
			[60, 27, 0.0], [72, 27, 0.0], [86, 27, 0.0], [72, 36, PI], [86, 36, PI], [-30, -12, PI], [-10, -12, PI], [10, -12, PI],
			[16, -122, 0.0], [40, -122, 0.0], [-3, -40, PI / 2], [3, -46, -PI / 2]]:
		bench(b[0], b[1], b[2])
	for p: Vector2 in [Vector2(-45, -12), Vector2(-20, -12), Vector2(5, -12), Vector2(30, -12), Vector2(55, -12), Vector2(-80, -12), Vector2(-120, -12),
			Vector2(44, 10), Vector2(44, 40), Vector2(44, 66), Vector2(30, 74), Vector2(0, 74), Vector2(-40, 74), Vector2(-80, 74), Vector2(-120, 74),
			Vector2(2, 92), Vector2(32, 92), Vector2(48, 118), Vector2(20, 125), Vector2(-46, 100), Vector2(-46, 128), Vector2(-46, 150), Vector2(70, 160 - 4),
			Vector2(-60, -66), Vector2(-20, -66), Vector2(20, -66), Vector2(60, -66), Vector2(95, -66), Vector2(-100, -66), Vector2(10, -118), Vector2(50, -118),
			Vector2(-2, -88), Vector2(-2, -110), Vector2(27, -98), Vector2(59, -98), Vector2(-41, -98), Vector2(60, 50), Vector2(78, 10), Vector2(78, 60)]:
		lamp(p.x, p.y)
	# simitçi tezgâhları
	for p: Vector2 in [Vector2(18, 108), Vector2(10, -4), Vector2(-24, -66)]:
		var sx := p.x; var sz := p.y
		g.box(2.2, 1.0, 1.2, sx, 0.3, sz, C("#c8423a"))
		g.box(2.4, 0.1, 1.4, sx, 1.3, sz, C("#f7f1e6"))
		for k in 5:
			g.put("cyl", Vector3(sx - 0.8 + k * 0.4, 1.42, sz), C("#c8823a"), 0, Vector3(0.17, 0.06, 0.17))
		g.box(2.3, 0.08, 1.3, sx, 2.7, sz, C("#e2a33b"))
		for px in [-1.0, 1.0]:
			g.box(0.06, 1.4, 0.06, sx + px, 1.3, sz - 0.5, C("#3d3d3d"))
		add_col(sx - 1.2, sx + 1.2, sz - 0.7, sz + 0.7)
	label("SİMİT", Vector3(18, 3.3, 108), 50, C("#23302b"), C("#fffaf1"), 22)
	# T1 tramvay rayları
	for off in [-0.7, 0.7]:
		g.box(0.14, 0.03, 84, 47 + off, 0.0, 34, C("#7b746b"))
		g.box(197, 0.03, 0.14, -51.5, 0.0, 76 + off, C("#7b746b"))
	g.flush(Dk, mroot, "Dekor")

	# ---------- sokak tabelaları
	for s in [["Hamidiye Cd.", -60, 33.5], ["Divanyolu Cd.", -60, 76], ["Alemdar Cd.", 46, 56], ["Hocapaşa Sk.", -101.5, 45], ["Ebussuud Cd.", -23.5, 45],
			["İbni Kemal Cd.", 2.5, 55.5], ["Nöbethane Cd.", -49.5, 64], ["Ankara Cd.", -75.5, 45], ["Kutlugün Sk.", -101.5, 118], ["Akbıyık Cd.", -75.5, 132],
			["Mimar Mehmet Ağa Cd.", -63, 106.5], ["Yüksek Kaldırım", 0, -90], ["Galip Dede Cd.", 27, -100], ["Kemeraltı Cd.", 59, -80], ["Bankalar Cd.", -41, -78],
			["Karaköy Rıhtım", -20, -63], ["Şair Ziya Paşa Cd.", -60, -89], ["Serdar-ı Ekrem Sk.", -20, -111], ["Reşadiye Cd.", -100, -15], ["Hobyar Sk.", -101.5, 11.5]]:
		street_sign(s[0], s[1], s[2])
	g.flush(Dk, mroot, "TabelaDirekleri")

	# ---------- hareketli parçalar
	build_tram()
	boat("VapurIskele", 46.5, -31, 0.0, "ferry")
	boat("VapurBogaz", 135, 20, 0.0, "ferry")
	boat("VapurHalic", -90, -40, PI / 2, "ferry")
	boat("BalikEkmek1", -36, -26.5, PI / 2, "boat")
	boat("BalikEkmek2", -22, -26.5, PI / 2, "boat")

	# ---------- yerler
	place("Sultanahmet Meydanı", -36, 88, 80, 160)
	place("Hipodrom", -60, -36, 80, 160)
	place("Ayasofya Önü", 40, 88, 80, 118)
	place("Gülhane Parkı", 56, 100, -14, 80)
	place("Alemdar Caddesi", 42, 56, -8, 80)
	place("Divanyolu Caddesi", -150, 42, 72, 80)
	place("Hamidiye Caddesi", -150, 42, 30, 37)
	place("Sirkeci Ara Sokakları", -150, 42, 37, 72)
	place("Eminönü Meydanı", -42, 42, -8, 30)
	place("Mısır Çarşısı", -78, -42, -8, 30)
	place("Eminönü Sahili", -150, 100, -22, -8)
	place("Eminönü İskelesi", 22, 40, -40, -22)
	place("Galata Köprüsü", -7, 7, -58, -22)
	place("Karaköy Rıhtımı", -150, 110, -70, -58)
	place("Yüksek Kaldırım", -4, 4, -114, -70)
	place("Galip Dede Caddesi", 24, 30, -114, -70)
	place("Galata Meydanı", 4, 56, -140, -114)
	place("Bankalar Caddesi", -44, -38, -114, -70)
	place("Kemeraltı Caddesi", 56, 62, -114, -70)

	# ---------- kaydet
	for n in mroot.get_children():
		_own(n)
	var ps := PackedScene.new()
	var err := ps.pack(mroot)
	if err != OK:
		push_error("pack failed %d" % err)
	err = ResourceSaver.save(ps, "res://map/istanbul.scn", ResourceSaver.FLAG_COMPRESS)
	print("scn kaydedildi: ", err)
	var data := {
		"col": COL, "places": places,
		"fountains": [[34, 118], [78.5, 31], [-48, 88], [-22, 137], [27, -120], [8, 26]],
		"bridge": [-7, 7, -58, -22],
		"start": [20, 99, -1.5708],
		"tram": [[47, -6], [47, 76], [-145, 76]],
		"animals": [
			["pamuk", true, "#f2efe9", "Pamuk", 41.5, 96, 0, "Ayasofya'nın kapısında"],
			["karabas", false, "#3a3536", "Karabaş", 22, 104, 0, "Sultanahmet Meydanı"],
			["kinali", false, "#b5713a", "Kınalı", 44, 128, 0, "Fıskiyenin yanında"],
			["tarcin", true, "#c98b55", "Tarçın", -8, 117, 0, "Sultan Ahmet Camii önü"],
			["boncuk", false, "#e2cfa6", "Boncuk", -44, 96, 0, "Hipodrom"],
			["fistik", true, "#e58a3a", "Fıstık", 72, 28.6, 0.5, "Gülhane'de bankın üstünde"],
			["zeytin", true, "#2b2828", "Zeytin", 53, 30, 0, "Gülhane kapısı"],
			["pasa", false, "#7a5232", "Paşa", 85, 52, 0, "Gülhane Parkı"],
			["simit", false, "#d9b46a", "Simit", -12, -6, 0, "Yeni Cami basamakları"],
			["misir", true, "#a8622e", "Mısır", -39, 10, 0, "Mısır Çarşısı kapısı"],
			["lokum", true, "#f0e2cc", "Lokum", -30, -19.5, 0, "Balık ekmekçilerin yanında"],
			["hamsi", true, "#6d7378", "Hamsi", -5.5, -36, 0, "Köprüde balıkçıların yanında"],
			["martı", false, "#efe8dc", "Martı", 5.5, -50, 0, "Galata Köprüsü"],
			["tekir", true, "#8b8d92", "Tekir", -88, 34, 0, "Hamidiye Caddesi"],
			["sutlac", false, "#efe8dc", "Sütlaç", -100, 76, 0, "Divanyolu Caddesi"],
			["limon", true, "#e8b04a", "Limon", -75.5, 120, 0, "Akbıyık ara sokağı"],
			["duman", true, "#5d6168", "Duman", -2, 62, 0, "Sirkeci ara sokağı"],
			["badem", false, "#c99a5b", "Badem", 30, -64, 0, "Karaköy Rıhtımı"],
			["cakil", true, "#9aa0a6", "Çakıl", 0, -100, 0, "Yüksek Kaldırım"],
			["komur", false, "#2b2828", "Kömür", 14, -126, 0, "Galata Meydanı"]]}
	var f := FileAccess.open("res://map/istanbul.json", FileAccess.WRITE)
	f.store_string(JSON.stringify(data))
	f.close()
	print("json kaydedildi, carpisma: ", COL.size(), " lamba: ", lamps.size())
	quit()

func _own(n: Node) -> void:
	n.owner = mroot
	for c in n.get_children():
		_own(c)
