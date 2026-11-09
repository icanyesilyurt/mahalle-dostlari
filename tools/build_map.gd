extends SceneTree
## Mini İstanbul haritasını kurar: res://map/istanbul.scn, istanbul.json, minimap.png
## Çalıştırma: godot --headless --script res://tools/build_map.gd
##
## Plan: "Mini İstanbul / Oyun yerleşim taslağı 01" (100 yol). Ölçek ~450 x 740 m, düz zemin.
## Koordinatlar: x doğu, z güney (kuzey = -z).
##   Yarımada: x -225..235, z 0..295   ·   Haliç: z -50..0   ·   Köprü: x -8..8
##   Karaköy-Galata: x -150..230, z -265..-50   ·   İstiklal: x 120..240, z -440..-265

const Geo := preload("res://tools/geo.gd")

var g
var mroot: Node3D
var rng := RandomNumberGenerator.new()
var font: Font
var COL: Array = []
var roads: Array = []        # [ad, x0, x1, z0, z1]
var areas: Array = []        # büyük bölge adları [ad, x0, x1, z0, z1]
var parks: Array = []        # mini harita için yeşil alanlar
var squares: Array = []      # mini harita için meydanlar
var animals: Array = []
var npc_paths: Array = []
var chunk_cells := {}
var pet_spots: Array = []
var vendors: Array = []
var ALLCOL: Array = []
var city_id := "istanbul"
var lands: Array = [[-225, 237, 0, 295], [-150, 230, -265, -50], [120, 240, -505, -259]]
var mini_extra: Array = [[-7, 7, -50, 0, "#9a9a9a"], [40, 58, -20, 0, "#a88b6a"]]

const PAL_S := ["#e9b9a3", "#f1d59c", "#c8d8bf", "#e8c4cb", "#bcd0e3", "#efe1c6", "#d9a37f", "#d9c2a7", "#a9c1b4", "#e6a98c", "#f3e3b5", "#c9a9a6"]
const PAL_N := ["#d8cdb8", "#c9bba4", "#e5dccb", "#b9b0a5", "#d6c3a8", "#c7c9c3", "#e1cfb0", "#b8a48a", "#cfd6d2", "#dcc0a8"]
const PAL_I := ["#e8d9c4", "#d4c1a6", "#f0e4cf", "#c9b59a", "#e3c9b8", "#d9d2c3", "#cfbfae"]
const ROOF := ["#b4573d", "#a24a34", "#9a5a44", "#b9623f"]
const AWN := ["#c8423a", "#2f7d6d", "#e2a33b", "#3b6aa8", "#8e3b5a"]
const LEAD := "#8e989c"
const WOODC := ["#8a5a3c", "#a8714a", "#7a4f36", "#c9a27a", "#d8b48a", "#b9c4a8", "#d9a891", "#e2cfa0", "#9fb3bf"]
const BRICK := ["#a5543a", "#b8674a", "#9a4b35", "#b5725a", "#8f4a38"]

# Yarımada ızgarası (plan 01-12)
const V := [-215.0, -130.0, -45.0, 40.0, 125.0, 210.0]       # 07..12
const VW := [3.0, 4.0, 4.0, 4.0, 4.0, 3.0]
const H := [6.0, 60.0, 110.0, 160.0, 210.0, 285.0]           # 01..06 (01 kıyı caddesi merkezi)
const HW := [6.0, 4.0, 4.0, 4.0, 5.0, 4.0]
const NAMES_H := ["Eminönü Kıyı Caddesi", "Sirkeci Caddesi", "Gülhane Bağlantı Caddesi", "Cağaloğlu Caddesi", "Divan Yolu Caddesi", "Sultanahmet Alt Sokak"]
const NAMES_V := ["Tahtakale Yolu", "Hanlar Caddesi", "Sultanahmet Bağlantısı", "Ayasofya Yolu", "Gülhane Park Yolu", "Saray Duvarı Yolu"]
const SUB_NAMES := {
	"0,0": ["Bakırcı Sokağı", "Baharat Sokağı"], "1,0": ["Sepetçi Sokağı", "Kahveci Sokağı"], "2,0": ["İskele Sokağı", "Han Avlusu Sokağı"],
	"3,0": ["Fırın Sokağı", "Çınar Sokağı"], "4,0": ["Kitapçı Sokağı", "Simitçi Sokağı"],
	"0,1": ["Çeşme Sokağı", "Kiremit Sokağı"], "1,1": ["Cumba Sokağı", "Lale Sokağı"], "2,1": ["Sarmaşık Sokağı", "Taş Merdiven Sokağı"],
	"3,1": ["Yasemin Sokağı", "Çömlekçi Sokağı"], "4,1": ["Arnavut Taşı Sokağı", "Serçe Sokağı"],
	"0,2": ["Manolya Sokağı", "Kestane Sokağı"], "1,2": ["İncir Sokağı", "Kemer Sokağı"], "2,2": ["Defne Sokağı", "Mimoza Sokağı"],
	"3,2": ["Güvercin Sokağı", "Sahil Sokağı"], "4,2": ["Çiçekçi Sokağı", "Sedef Sokağı"],
	"0,3": ["Pencere Sokağı", "Gölge Sokağı"], "1,3": ["Dut Sokağı", "Avlu Sokağı"], "2,3": ["Küçük Meydan Sokağı", "Asma Sokağı"],
	"3,3": ["Kuyu Sokağı", "Eski Kapı Sokağı"], "4,3": ["Fener Sokağı", "Akşam Sokağı"],
	"0,4": ["Sabah Sokağı", "Rüzgâr Sokağı"], "1,4": ["Dostluk Sokağı", "Pati Sokağı"], "2,4": ["Mama Sokağı", "Su Kabı Sokağı"],
	"3,4": ["Oyuncakçı Sokağı", "Ihlamur Sokağı"]}
# özel hücreler: (sütun, kuşak)
const SPECIAL := {"1,0": "misir", "2,0": "eminonu", "3,0": "sirkeci", "4,1": "gulhane", "4,2": "gulhane", "4,3": "gulhane",
	"2,3": "sultanahmet", "3,3": "sultanahmet", "2,4": "sultanahmet", "3,4": "sultanahmet", "1,3": "hipodrom", "1,4": "hipodrom"}

# Kuzey (plan 62-77)
const VN := [-90.0, 0.0, 90.0, 180.0]                        # 66-69 / 74-77
const NAMES_VN_K := ["Perşembe Pazarı Sokağı", "Köprü Bağlantı Yolu", "Kamondo Bağlantısı", "Rıhtım Ara Sokağı"]
const NAMES_VN_G := ["Şişhane Yokuşu", "Kule Yokuşu", "Galip Dede Oyun Yolu", "Serdar Ekrem Oyun Yolu"]
const HN := [[-56.0, 6.0, "Karaköy Rıhtım Yolu"], [-85.0, 3.5, "Karaköy Çarşı Caddesi"], [-108.0, 3.5, "Bankalar Bağlantısı"], [-131.0, 3.5, "Karaköy Üst Sokak"],
	[-150.0, 3.5, "Galata Etek Sokağı"], [-185.0, 3.5, "Galata Çarşı Sokağı"], [-220.0, 3.5, "Kule Meydanı Caddesi"], [-255.0, 4.0, "Tünel Alt Caddesi"]]
const IST_NAMES := ["Tramvay", "Pera", "Pasaj", "Sahaf", "Sahne", "Plakçı", "Sinema", "Balkon", "Atölye", "Kırmızı Vagon", "Tünel"]

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
	var clear := Image.create(4, 4, false, Image.FORMAT_RGBA8)
	clear.fill(Color(0, 0, 0, 0))
	var sw := ShaderMaterial.new()
	sw.shader = load("res://map/wall.gdshader")
	sw.set_shader_parameter("tex", ImageTexture.create_from_image(clear))
	g.mats["stonewall"] = sw
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
	ALLCOL.append([x0, x1, z0, z1])
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

func road(n: String, x0: float, x1: float, z0: float, z1: float) -> void:
	roads.append([n, x0, x1, z0, z1])

func area(n: String, x0: float, x1: float, z0: float, z1: float) -> void:
	areas.append([n, x0, x1, z0, z1])

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
	l.visibility_range_end = 120.0
	mroot.get_node("Tabelalar").add_child(l)

func big_label(text: String, pos: Vector3, size: int) -> void:
	label(text, pos, size, C("#23302b"), C("#fffaf1"), 32)
	var l: Label3D = mroot.get_node("Tabelalar").get_child(-1)
	l.visibility_range_end = 400.0

func street_sign(text: String, x: float, z: float) -> void:
	var best_d := 1e9
	var bp := Vector2(x, z)
	for c in COL:
		var q := Vector2(clampf(x, c[0], c[1]), clampf(z, c[2], c[3]))
		var dd := q.distance_to(Vector2(x, z))
		if dd < best_d and dd > 0.01:
			best_d = dd
			bp = q + (Vector2(x, z) - q).normalized() * 0.7
	if best_d > 8.0:
		bp = Vector2(x, z)
	label(text, Vector3(bp.x, 3.0, bp.y), 40, Color.WHITE, C("#1d5aa6"), 24)
	g.put("cyl8", Vector3(bp.x, 1.4, bp.y), C("#3a4248"), 0, Vector3(0.05, 2.8, 0.05))

func lamp(x: float, z: float) -> void:
	add_col(x - 0.18, x + 0.18, z - 0.18, z + 0.18, 3.0, false, 2)
	g.put("cyl8", Vector3(x, 0.25, z), C("#262b2e"), 0, Vector3(0.22, 0.5, 0.22))
	g.put("cyl8", Vector3(x, 2.4, z), C("#262b2e"), 0, Vector3(0.07, 4.4, 0.07))
	g.box(0.36, 0.5, 0.36, x, 4.45, z, C("#fff1c8"), 0.0, "glow")
	g.put("cone8", Vector3(x, 5.1, z), C("#262b2e"), 0, Vector3(0.32, 0.35, 0.32))

func tree(x: float, z: float, kind: String = "plane", s: float = 1.0) -> void:
	if kind == "cypress":
		g.put("cyl8", Vector3(x, 0.6 * s, z), C("#5a4630"), 0, Vector3(0.18 * s, 1.2 * s, 0.18 * s))
		g.put("cone8", Vector3(x, 4.2 * s, z), C("#2f4a2c"), rng.randf(), Vector3(1.0 * s, 7.5 * s, 1.0 * s))
		g.put("cone8", Vector3(x, 3.4 * s, z), C("#355531"), rng.randf(), Vector3(1.15 * s, 5.0 * s, 1.15 * s))
	else:
		g.put("cyl8", Vector3(x, 1.8 * s, z), C("#7a6a52"), 0, Vector3(0.32 * s, 3.6 * s, 0.32 * s))
		for k in 3:
			var a := k * 2.1 + rng.randf()
			g.put("ico", Vector3(x + cos(a) * 1.3 * s, (4.2 + rng.randf() * 1.4) * s, z + sin(a) * 1.3 * s), C("#5c8a3c").lerp(C("#7aa34b"), rng.randf()), rng.randf() * 3, Vector3(2.1, 1.7, 2.1) * s)
		g.put("ico", Vector3(x, 6.0 * s, z), C("#6a9842"), rng.randf(), Vector3(2.2, 1.8, 2.2) * s)
	add_col(x - 0.4 * s, x + 0.4 * s, z - 0.4 * s, z + 0.4 * s, 6, false, 2)

func bench(x: float, z: float, ry: float = 0.0) -> void:
	var fw := Vector3(cos(ry), 0, -sin(ry))
	var bk := Vector3(sin(ry), 0, cos(ry))
	var ex := absf(fw.x) * 1.0 + absf(bk.x) * 0.35
	var ez := absf(fw.z) * 1.0 + absf(bk.z) * 0.35
	add_col(x - ex, x + ex, z - ez, z + ez, 1.2, false, 2)
	g.box(2.0, 0.1, 0.55, x, 0.45, z, C("#7b5a3c"), ry)
	var p := Vector3(x, 0, z) - bk * 0.26
	g.box(2.0, 0.45, 0.08, p.x, 0.6, p.z, C("#7b5a3c"), ry)
	for sx in [-0.85, 0.85]:
		var q: Vector3 = Vector3(x, 0, z) + fw * sx
		g.box(0.08, 0.45, 0.5, q.x, 0, q.z, C("#2e3236"), ry)

## Dar sokağın iki yakası arasında çamaşır ipi (z boyunca uzanır)
func laundry(x: float, za: float, zb: float, y: float = 5.6) -> void:
	var L := zb - za
	g.box(0.04, 0.04, L, x, y, (za + zb) / 2.0, C("#3a3633"))
	var n := int(L / 1.1)
	for i in n:
		if rng.randf() < 0.75:
			var z := za + 0.7 + i * (L - 1.4) / maxf(1.0, n - 1)
			var hh := 0.5 + rng.randf() * 0.4
			g.box(0.04, hh, 0.55 + rng.randf() * 0.3, x, y - hh, z, pick(["#f2efe9", "#c8423a", "#3b6aa8", "#e2a33b", "#8fbf5a", "#d98aa0", "#f2efe9", "#6fb3d6"]))

## Kafe: masa, sandalyeler, şemsiye
func cafe(x: float, z: float, col: Color) -> void:
	add_col(x - 0.95, x + 0.95, z - 0.95, z + 0.95, 1.2, false, 2)
	g.put("cyl", Vector3(x, 0.72, z), C("#f2efe9"), 0, Vector3(0.45, 0.05, 0.45))
	g.put("cyl8", Vector3(x, 0.36, z), C("#3a3633"), 0, Vector3(0.05, 0.72, 0.05))
	for k in 3:
		var a := k * TAU / 3.0 + rng.randf() * 0.4
		var cxp := x + cos(a) * 0.75; var czp := z + sin(a) * 0.75
		g.box(0.42, 0.06, 0.42, cxp, 0.45, czp, C("#8a5a3c"), -a)
		g.box(0.42, 0.5, 0.05, cxp + cos(a) * 0.2, 0.45, czp + sin(a) * 0.2, C("#8a5a3c"), -a + PI / 2)
		for q in 4:
			var lx := cxp + cos(a + q * PI / 2 + PI / 4) * 0.2; var lz := czp + sin(a + q * PI / 2 + PI / 4) * 0.2
			g.box(0.04, 0.45, 0.04, lx, 0, lz, C("#3a3633"))
	g.put("cyl8", Vector3(x, 1.2, z), C("#3a3633"), 0, Vector3(0.04, 2.4, 0.04))
	g.put("cone8", Vector3(x, 2.55, z), col, 0, Vector3(1.4, 0.55, 1.4))

func cafe_row(x0: float, z0: float, n: int, dx: float, dz: float) -> void:
	var col := pick(AWN)
	for i in n:
		cafe(x0 + dx * i, z0 + dz * i, col if rng.randf() < 0.7 else C("#f2efe9"))

func flower_bed(x: float, z: float, w: float, d: float) -> void:
	add_col(x - w / 2.0, x + w / 2.0, z - d / 2.0, z + d / 2.0, 1.0, false, 2)
	g.box(w, 0.35, d, x, 0, z, C("#b9ab94"))
	g.box(w - 0.3, 0.05, d - 0.3, x, 0.35, z, C("#5a3f2c"))
	for i in int(w * d * 1.2):
		var fx := x + (rng.randf() - 0.5) * (w - 0.5); var fz := z + (rng.randf() - 0.5) * (d - 0.5)
		g.put("ico", Vector3(fx, 0.5, fz), pick(["#e0483a", "#f2c230", "#d98aa0", "#f2efe9", "#9a5ac8", "#5f8f45", "#5f8f45"]), rng.randf(), Vector3(0.28, 0.25, 0.28))

## Sokak hayvanı yuvası: köpek kulübesi ya da kedi evi. ry = kapının baktığı yön (0: +z)
func pet_house(x: float, z: float, ry: float, dog: bool) -> void:
	var fw := Vector3(sin(ry), 0, cos(ry))
	if dog:
		var wc := pick(["#a8714a", "#8a5a3c", "#c98a5a", "#7a8a5a", "#3b6aa8"])
		g.box(1.15, 0.85, 1.25, x, 0.08, z, wc, ry)
		g.put("hip", Vector3(x, 0.93, z), pick(["#b5532f", "#a24a34", "#2f5a3a"]), ry + PI / 2.0, Vector3(1.45, 0.55, 1.4), "roof")
		var d := Vector3(x, 0, z) + fw * 0.63
		g.box(0.5, 0.55, 0.04, d.x, 0.1, d.z, C("#2a2422"), ry)
		g.put("cyl", Vector3(d.x, 0.65, d.z), C("#2a2422"), ry, Vector3(0.25, 0.04, 0.25), "plain", PI / 2.0, 0.0)
		g.box(0.6, 0.12, 0.05, d.x, 0.95, d.z + 0.0, C("#f2efe9"), ry)
		var b := Vector3(x, 0, z) + fw * 1.05 + Vector3(fw.z, 0, -fw.x) * 0.35
		g.put("cyl", Vector3(b.x, 0.05, b.z), C("#f6c445"), 0, Vector3(0.17, 0.1, 0.17))
		g.put("cyl", Vector3(b.x, 0.11, b.z), C("#a8622e"), 0, Vector3(0.13, 0.02, 0.13))
	else:
		var cc := pick(["#f2efe9", "#d98aa0", "#7cc6ea", "#f6c445", "#9fb3bf"])
		g.box(0.8, 0.7, 0.8, x, 0.08, z, cc, ry)
		g.box(0.92, 0.08, 0.92, x, 0.78, z, C("#8a5a3c"), ry)
		g.put("cyl", Vector3(x, 0.92, z), C("#c8423a"), 0, Vector3(0.3, 0.12, 0.3))
		var d2 := Vector3(x, 0, z) + fw * 0.41
		g.put("cyl", Vector3(d2.x, 0.4, d2.z), C("#2a2422"), ry, Vector3(0.2, 0.03, 0.2), "plain", PI / 2.0, 0.0)
		var b2 := Vector3(x, 0, z) + fw * 0.75
		g.put("cyl", Vector3(b2.x, 0.05, b2.z), C("#7cc6ea"), 0, Vector3(0.14, 0.09, 0.14))
	var r := 0.68 if dog else 0.48
	add_col(x - r, x + r, z - r, z + r, 1.2, false, 2)
	pet_spots.append([snappedf(x + fw.x * 1.2, 0.1), snappedf(z + fw.z * 1.2, 0.1)])

## Parkta yan yana dizili barınaklar
func shelter_row(x: float, z: float, n: int, dx: float, dz: float, ry: float) -> void:
	for i in n:
		pet_house(x + dx * i, z + dz * i, ry, i % 2 == 0)
	label("Dostlar Barınağı", Vector3(x + dx * (n - 1) / 2.0, 2.2, z + dz * (n - 1) / 2.0), 34, C("#fffaf1"), C("#2f7d6d"), 8, true)

func flower_pot(x: float, z: float) -> void:
	g.put("cyl8", Vector3(x, 0.3, z), C("#b5643c"), 0, Vector3(0.3, 0.6, 0.3))
	g.put("ico", Vector3(x, 0.8, z), C("#5f8f45"), rng.randf(), Vector3(0.4, 0.35, 0.4))

func simit_cart(x: float, z: float) -> void:
	g.box(2.2, 1.0, 1.2, x, 0.3, z, C("#c8423a"))
	g.box(2.4, 0.1, 1.4, x, 1.3, z, C("#f7f1e6"))
	for k in 5:
		g.put("cyl8", Vector3(x - 0.8 + k * 0.4, 1.42, z), C("#c8823a"), 0, Vector3(0.17, 0.06, 0.17))
	g.box(2.3, 0.08, 1.3, x, 2.7, z, C("#e2a33b"))
	for px in [-1.0, 1.0]:
		g.box(0.06, 1.4, 0.06, x + px, 1.3, z - 0.5, C("#3d3d3d"))
	add_col(x - 1.2, x + 1.2, z - 0.7, z + 0.7)
	vendors.append([snappedf(x, 0.1), snappedf(z + 1.3, 0.1), PI])

# ------------------------------------------------------------ evler
func house_row(ax: float, az: float, ux: float, uz: float, L: float, nx: float, nz: float, st: Dictionary, d: float = 5.0) -> void:
	var s := 0.0
	var ry := atan2(-uz, ux)
	while s < L - 2.0:
		var w := minf(5.0 + rng.randf() * 3.5, L - s)
		if L - s - w < 4.0:
			w = L - s
		var floors: int = rng.randi_range(st.fmin, st.fmax)
		var fh := 3.0
		var gf := 3.4
		var h := gf + (floors - 1) * fh
		var mid := s + w / 2.0
		var cx := ax + ux * mid - nx * d / 2.0
		var cz := az + uz * mid - nz * d / 2.0
		var col := pick(st.pal)
		var kind := "siva"
		var r := rng.randf()
		if r < st.get("wood", 0.0) and floors <= 4:
			kind = "ahsap"
			col = pick(WOODC); col.a = 0.5
		elif r < st.get("wood", 0.0) + st.get("brick", 0.0):
			kind = "tugla"
			col = pick(BRICK); col.a = 0.25
		if kind == "siva" and rng.randf() < st.get("stone", 0.0):
			col.a = 0.1
		var shop: bool = rng.randf() < st.shop
		var wk: String = st.wins[rng.randi() % st.wins.size()]
		var gcol := shade(col, 0.93)
		if kind == "ahsap":
			gcol = pick(["#cfc3ad", "#bfb39c", "#d8cdb6"]); gcol.a = 1.0
		g.wall_box(w - 0.04, gf, d, cx, 0, cz, gcol, ry, "shop" if shop else "door", 4.2 if shop else w, gf)
		g.wall_box(w - 0.04, h - gf, d, cx, gf, cz, col, ry, wk, 2.6, fh)
		var trim := shade(col, 0.74) if kind != "tugla" else C("#d8cfc0")
		trim.a = 1.0
		# kat silmesi ve köşe pilastrları
		g.box(w + 0.02, 0.2, d + 0.24, cx, gf - 0.1, cz, trim, ry)
		var fx := ax + ux * mid
		var fz := az + uz * mid
		if w > 4.5:
			for e: float in [-1.0, 1.0]:
				var px := cx + ux * e * (w / 2.0 - 0.18)
				var pz := cz + uz * e * (w / 2.0 - 0.18)
				g.box(0.36, h - gf, d + 0.16, px, gf, pz, trim, ry)
		# Galata/Karaköy/İstiklal: pencere alınlıkları, diş sırası, ana giriş çerçevesi
		if st.get("ornate", false) and kind != "ahsap" and floors >= 2:
			var fw2 := w - 0.04
			var reps2 := maxf(1.0, roundf(fw2 / 2.6))
			var mw2 := fw2 / reps2
			var orn := C("#efe6d4") if kind == "tugla" else shade(col, 1.12)
			orn.a = 1.0
			for fl2 in floors - 1:
				var ytop2 := h - fl2 * fh
				for q2 in int(reps2):
					var cu2 := -fw2 / 2.0 + (q2 + 0.5) * mw2
					var ox := fx + ux * cu2 + nx * 0.08
					var oz := fz + uz * cu2 + nz * 0.08
					g.box(mw2 * 0.62, 0.14, 0.2, ox, ytop2 - 0.11 * fh + 0.02, oz, orn, ry)
					if fl2 == 0 or rng.randf() < 0.3:
						g.put("pyr", Vector3(ox, ytop2 - 0.11 * fh + 0.16, oz), orn, ry, Vector3(mw2 * 0.6, 0.32, 0.16))
					g.box(mw2 * 0.56, 0.1, 0.16, ox, ytop2 - 0.84 * fh - 0.1, oz, orn, ry)
			var dn := int(fw2 / 0.45)
			for q3 in dn:
				var du := -fw2 / 2.0 + (q3 + 0.5) * fw2 / dn
				g.box(0.16, 0.18, 0.22, fx + ux * du + nx * 0.1, h - 0.36, fz + uz * du + nz * 0.1, orn, ry)
		# pencere kanatları (ahşap evler) ve çiçekli pencere önleri
		var shut: bool = kind == "ahsap" or (st.get("shutters", 0.0) > 0.0 and rng.randf() < st.get("shutters", 0.0))
		if shut or rng.randf() < 0.25:
			var fw := w - 0.04
			var reps := maxf(1.0, roundf(fw / 2.6))
			var mw := fw / reps
			var shc := pick(st.get("shutter_cols", ["#3f6b4a", "#5a3a28", "#2f4f6f", "#7a2f2a", "#6b6f4a"]))
			for fl in floors - 1:
				var ytop := h - fl * fh
				var wy0 := ytop - 0.84 * fh
				var wh := 0.73 * fh
				for q in int(reps):
					var cu := -fw / 2.0 + (q + 0.5) * mw
					var px := fx + ux * cu + nx * 0.06
					var pz := fz + uz * cu + nz * 0.06
					if shut:
						for e: float in [-1.0, 1.0]:
							g.box(mw * 0.17, wh, 0.06, px + ux * e * mw * 0.36, wy0, pz + uz * e * mw * 0.36, shc, ry)
					elif fl == floors - 2 and rng.randf() < 0.6:
						g.box(mw * 0.5, 0.22, 0.32, px + nx * 0.12, wy0 - 0.22, pz + nz * 0.12, C("#8a5a3c"), ry)
						for f2 in 3:
							var fo := (f2 - 1) * mw * 0.15
							g.put("ico", Vector3(px + ux * fo + nx * 0.14, wy0 + 0.05, pz + uz * fo + nz * 0.14), pick(["#e0483a", "#d98aa0", "#f2c230", "#5f8f45"]), rng.randf(), Vector3(0.22, 0.2, 0.22))
		var eave := 1.3 if kind == "ahsap" else 0.5
		g.box(w + 0.25, 0.3, d + 0.25, cx, h - 0.15, cz, trim, ry)
		if kind == "ahsap":
			g.box(w + eave * 2.0, 0.12, d + eave * 2.0, cx, h + 0.02, cz, C("#5b3a28"), ry)
		var rk: String = st.get("roof_kind", "hip")
		var rcols: Array = st.get("roof", ROOF)
		if rk == "mansard":
			# Paris: dik eğimli arduvaz çatı + çatı pencereleri
			g.box(w + 0.2, 2.6, d - 0.6, cx, h, cz, pick(rcols), ry)
			g.put("hip" if w > d else "pyr", Vector3(cx, h + 2.6, cz), pick(rcols), ry, Vector3(w - 0.4, 0.9, d - 1.4), "roof")
			var nd := int(w / 2.4)
			for q in nd:
				var du := -w / 2.0 + (q + 0.5) * w / nd
				var dx := fx + ux * du + nx * 0.05
				var dz := fz + uz * du + nz * 0.05
				g.wall_box(1.0, 1.6, 0.8, dx, h + 0.5, dz, C("#e8e2d6"), ry, "win_a", 1.0, 1.6)
				g.put("pyr", Vector3(dx, h + 2.1, dz), pick(rcols), ry, Vector3(1.2, 0.5, 1.0))
		elif rk == "flat":
			# düz teras çatı + korkuluk
			g.box(w + 0.1, 0.9, 0.18, fx - nx * 0.05, h, fz - nz * 0.05, trim, ry)
			if rng.randf() < 0.5:
				g.box(1.6, 1.6, 1.6, cx, h, cz, shade(col, 0.9), ry)
		else:
			g.put("hip" if w > d else "pyr", Vector3(cx, h + 0.1, cz), pick(rcols), ry, Vector3(w + eave, st.get("roof_h", 1.4) + rng.randf() * 0.5, d + eave), "roof")
		if rng.randf() < 0.45:
			var off := (rng.randf() - 0.5) * w * 0.5
			g.box(0.55, 1.6, 0.55, cx + ux * off - nx * d * 0.15, h + 0.4, cz + uz * off - nz * d * 0.15, C("#9a6a52"), ry)
			g.box(0.7, 0.12, 0.7, cx + ux * off - nx * d * 0.15, h + 2.0, cz + uz * off - nz * d * 0.15, C("#6e4a3a"), ry)
		if kind != "ahsap" and floors >= 2 and rng.randf() < 0.18:
			# klima dış ünitesi
			var k: int = rng.randi_range(1, floors - 1)
			var off2 := (rng.randf() - 0.5) * (w - 2.0)
			g.box(0.8, 0.55, 0.35, fx + ux * off2 + nx * 0.18, gf + (k - 1) * fh + 0.15, fz + uz * off2 + nz * 0.18, C("#e9e7e1"), ry)
		if shop:
			# dükkân tabelası
			g.box(minf(w * 0.7, 4.0), 0.55, 0.12, fx + nx * 0.08, gf - 0.75, fz + nz * 0.08, pick(AWN), ry)
		if shop and rng.randf() < 0.6:
			var tx := ax + ux * mid + nx * 0.85
			var tz := az + uz * mid + nz * 0.85
			g.put("box", Vector3(tx, gf - 0.55, tz), pick(AWN), ry, Vector3(w * 0.9, 0.08, 1.7), "plain", -0.25 if nz != 0 else 0.0, 0.0 if nz != 0 else (0.25 * nx))
		if floors >= 3 and rng.randf() < st.cumba + (0.35 if kind == "ahsap" else 0.0):
			var cw := minf(w * 0.62, 4.2)
			var cd := 1.1
			var kx := ax + ux * mid + nx * cd / 2.0
			var kz := az + uz * mid + nz * cd / 2.0
			g.wall_box(cw, fh * 1.8, cd, kx, gf + 0.2, kz, shade(col, 0.95), ry, "win_a", cw / 2.0, fh * 0.9)
			g.box(cw + 0.2, 0.2, cd + 0.2, kx, gf + 0.2 + fh * 1.8, kz, trim, ry)
			# cumba altı payandaları
			for e2: float in [-1.0, 1.0]:
				g.put("box", Vector3(kx + ux * e2 * cw * 0.4, gf - 0.2, kz + uz * e2 * cw * 0.4), trim, ry, Vector3(0.15, 0.6, cd * 0.8), "plain", -0.5 * absf(nz) * signf(nz), 0.5 * absf(nx) * signf(nx))
		elif kind != "ahsap" and floors >= 3 and rng.randf() < st.get("balcony", 0.2):
			# demir korkuluklu balkon
			var bw := minf(w * 0.5, 3.0)
			for k2 in range(1, floors):
				if rng.randf() < 0.6:
					var by := gf + (k2 - 1) * fh + 0.05
					g.box(bw, 0.12, 0.8, fx + nx * 0.4, by, fz + nz * 0.4, trim, ry)
					g.box(bw, 0.06, 0.06, fx + nx * 0.78, by + 0.95, fz + nz * 0.78, C("#2c2b2a"), ry)
					var nb := int(bw / 0.25)
					for q in nb:
						var o := -bw / 2.0 + (q + 0.5) * bw / nb
						g.box(0.03, 0.9, 0.03, fx + ux * o + nx * 0.78, by + 0.05, fz + uz * o + nz * 0.78, C("#2c2b2a"))
		if rng.randf() < 0.08:
			flower_pot(ax + ux * (mid + w * 0.3) + nx * 0.45, az + uz * (mid + w * 0.3) + nz * 0.45)
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
	if W > 8.0 and D > 8.0 and rng.randf() < 0.6:
		var side := rng.randi() % 4
		var dog := rng.randf() < 0.5
		var off := 0.62 if dog else 0.45
		match side:
			0: pet_house(rng.randf_range(X0 + 2, X1 - 2), Z0 - off, PI, dog)
			1: pet_house(rng.randf_range(X0 + 2, X1 - 2), Z1 + off, 0.0, dog)
			2: pet_house(X0 - off, rng.randf_range(Z0 + 2, Z1 - 2), -PI / 2.0, dog)
			_: pet_house(X1 + off, rng.randf_range(Z0 + 2, Z1 - 2), PI / 2.0, dog)
	if W < 7.0 or D < 7.0:
		var col := pick(st.pal)
		g.wall_box(W, 7.0, D, (X0 + X1) / 2.0, 0, (Z0 + Z1) / 2.0, col, 0, st.wins[0], 2.6, 3.0)
		g.put("hip", Vector3((X0 + X1) / 2.0, 7.0, (Z0 + Z1) / 2.0), pick(ROOF), 0 if W > D else PI / 2, Vector3(W + 0.4, 1.5, D + 0.4) if W > D else Vector3(D + 0.4, 1.5, W + 0.4), "roof")
		return
	if D < 13.0:
		# ince şerit: sırt sırta iki ev dizisi (uzun kenarlar)
		var hd := D / 2.0
		house_row(X0, Z0, 1, 0, W, 0, -1, st, hd)
		house_row(X1, Z1, -1, 0, W, 0, 1, st, hd)
		return
	if W < 13.0:
		var hw := W / 2.0
		house_row(X1, Z0, 0, 1, D, 1, 0, st, hw)
		house_row(X0, Z1, 0, -1, D, -1, 0, st, hw)
		return
	if W > 10.2 and D > 10.2:
		g.box(W - 9.8, 7.5, D - 9.8, (X0 + X1) / 2.0, 0, (Z0 + Z1) / 2.0, C("#b0846a"))
	house_row(X0, Z0, 1, 0, W, 0, -1, st)
	house_row(X1, Z1, -1, 0, W, 0, 1, st)
	house_row(X1, Z0 + 5.0, 0, 1, D - 10.0, 1, 0, st)
	house_row(X0, Z1 - 5.0, 0, -1, D - 10.0, -1, 0, st)

func flush_chunk(name: String, vis: float = 260.0) -> void:
	print("chunk ", name, " ", Time.get_ticks_msec())
	var mi: MeshInstance3D = g.flush(mroot.get_node("Sehir"), mroot, name)
	if mi:
		mi.visibility_range_end = vis
		mi.visibility_range_end_margin = 20.0

# ------------------------------------------------------------ simge yapılar
func stone(c: Color) -> Color:
	return Color(c.r, c.g, c.b, 0.1)

func minaret(x: float, z: float, h: float, col: Color, balconies: int = 2, r: float = 0.85) -> void:
	g.put("cyl8", Vector3(x, 1.5, z), stone(shade(col, 0.95)), PI / 8, Vector3(r * 1.5, 3.0, r * 1.5), "stonewall")
	g.put("cyl", Vector3(x, h / 2.0, z), stone(col), 0, Vector3(r, h, r), "stonewall")
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
	g.wall_box(size, h, size, cx, 0, cz, stone(col), 0, "win_c", 3.4, h / 2.0, true)
	g.box(size + 0.5, 0.5, size + 0.5, cx, h, cz, shade(col, 0.85))
	g.wall_box(size * 0.62, 3.0, size * 0.62, cx, h + 0.5, cz, stone(shade(col, 0.95)), 0, "win_c", 2.6, 3.0)
	dome(cx, h + 3.5, cz, r, 0.72, 1.6)
	if semis > 0:
		for k in semis:
			var a := k * TAU / semis
			dome(cx + cos(a) * r * 0.95, h + 0.5, cz + sin(a) * r * 0.95, r * 0.62, 0.72, 0.6)
	for p: Vector2 in [Vector2(-1, -1), Vector2(1, -1), Vector2(-1, 1), Vector2(1, 1)]:
		var px := cx + p.x * (hs - 3.2); var pz := cz + p.y * (hs - 3.2)
		g.put("cyl8", Vector3(px, h + 2.0, pz), stone(shade(col, 0.95)), PI / 8, Vector3(1.8, 4.0, 1.8), "stonewall")
		dome(px, h + 4.0, pz, 1.7, 0.8, 0.0)
	add_col(cx - hs, cx + hs, cz - hs, cz + hs)

## Şadırvan: sekizgen abdest çeşmesi, sütunlar ve kubbe
func sadirvan(x: float, z: float, s: float = 1.0) -> void:
	g.put("cyl8", Vector3(x, 0.5 * s, z), C("#e6e0d4"), PI / 8, Vector3(2.4 * s, 1.0 * s, 2.4 * s))
	for k in 8:
		var a := k * TAU / 8 + PI / 8
		g.put("cyl", Vector3(x + cos(a) * 2.3 * s, 2.2 * s, z + sin(a) * 2.3 * s), C("#e6e0d4"), 0, Vector3(0.14 * s, 2.4 * s, 0.14 * s))
		g.put("cyl8", Vector3(x + cos(a) * 1.15 * s, 0.85 * s, z + sin(a) * 1.15 * s), C("#d4a93c"), 0, Vector3(0.05, 0.3, 0.05), "gold")
	g.put("cyl8", Vector3(x, 3.5 * s, z), C("#d9d2c4"), PI / 8, Vector3(3.0 * s, 0.4 * s, 3.0 * s))
	dome(x, 3.7 * s, z, 2.7 * s, 0.75, 0.0)
	add_col(x - 2.3 * s, x + 2.3 * s, z - 2.3 * s, z + 2.3 * s)

## Kapalıçarşı kapısı (Nuruosmaniye): cadde cephesinde taş kapı, kemer, tuğra
func kapalicarsi_gate(x: float, z: float, ry: float) -> void:
	var S := stone(C("#e2d6bc"))
	var fw := Vector3(sin(ry), 0, cos(ry))
	var sd := Vector3(fw.z, 0, -fw.x)
	for e: float in [-1.0, 1.0]:
		var p := Vector3(x, 0, z) + sd * e * 3.6
		g.box(1.5, 9.0, 1.8, p.x, 0, p.z, S, ry)
		g.box(1.8, 0.4, 2.0, p.x, 9.0, p.z, C("#cfc3a8"), ry)
		g.put("cone8", Vector3(p.x, 9.4, p.z), C("#8e989c"), 0, Vector3(0.9, 1.8, 0.9))
	g.box(5.2, 2.6, 2.0, x, 6.4, z, S, ry)
	g.put("cyl", Vector3(x, 6.4, z), S, ry, Vector3(2.6, 2.0, 2.6), "plain", PI / 2.0, 0.0)
	var t := Vector3(x, 0, z) + fw * 1.05
	g.box(1.6, 1.2, 0.1, t.x, 7.4, t.z, C("#2f6b4a"), ry)
	g.put("cyl", Vector3(t.x, 7.95, t.z), C("#d4a93c"), ry, Vector3(0.35, 0.08, 0.35), "gold", PI / 2.0, 0.0)
	var d := Vector3(x, 0, z) - fw * 0.6
	g.box(4.8, 6.2, 0.2, d.x, 0, d.z, C("#3a2a22"), ry)
	label("Kapalıçarşı", Vector3(x, 10.5, z) + fw * 1.2, 70, C("#fff1c8"), C("#2f6b4a"), 12, true)
	for e2: float in [-1.0, 1.0]:
		var p2 := Vector3(x, 0, z) + sd * e2 * 3.6
		add_col(p2.x - 0.75, p2.x + 0.75, p2.z - 0.9, p2.z + 0.9)

func build_ayasofya(cx: float, cz: float) -> void:
	var B := C("#d99a74")
	g.wall_box(36, 11, 30, cx, 0, cz, B, 0, "win_c", 3.6, 5.5, true)
	g.box(37, 0.5, 31, cx, 11, cz, shade(B, 0.85))
	for k in range(-3, 4):
		for side in [-1.0, 1.0]:
			g.box(3.0, 9.0, 3.4, cx + k * 5.0, 0, cz + side * 16.2, shade(B, 0.9))
			g.put("pyr", Vector3(cx + k * 5.0, 9.0, cz + side * 16.2), shade(B, 0.8), 0, Vector3(3.0, 1.6, 3.4), "roof")
	for side in [-1.0, 1.0]:
		g.box(4, 16, 7, cx + side * 9, 0, cz - 17.5, shade(B, 0.88))
		g.box(4, 16, 7, cx + side * 9, 0, cz + 17.5, shade(B, 0.88))
	g.wall_box(22, 5, 24, cx, 11, cz, shade(B, 0.95), 0, "win_c", 2.8, 5.0, true)
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
	big_label("Ayasofya", Vector3(cx, 36, cz), 150)

func build_sultanahmet_camii(cx: float, cz: float) -> void:
	var Bc := C("#dcd8cf")
	mosque(cx, cz, 34, 13, 11.5, Bc, 4)
	for p: Vector2 in [Vector2(-19.5, -19.5), Vector2(19.5, -19.5), Vector2(-19.5, 19.5), Vector2(19.5, 19.5)]:
		minaret(cx + p.x, cz + p.y, 40, C("#ebe6dc"), 3)
	var ax1 := cx - 17.0; var ax0 := ax1 - 26.0; var az0 := cz - 17.0; var az1 := cz + 17.0
	minaret(ax0 - 1.0, az0 - 1.0, 36, C("#ebe6dc"), 2)
	minaret(ax0 - 1.0, az1 + 1.0, 36, C("#ebe6dc"), 2)
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
	g.box(4.5, 6.5, 2.0, ax0 + 1.3, 0, cz, C("#6b5246"), PI / 2)
	var sx := (ax0 + ax1) / 2.0
	g.put("cyl8", Vector3(sx, 0.6, cz), C("#e6e0d4"), PI / 8, Vector3(2.6, 1.2, 2.6))
	for k in 8:
		var a := k * TAU / 8 + PI / 8
		g.put("cyl", Vector3(sx + cos(a) * 2.4, 2.4, cz + sin(a) * 2.4), C("#e6e0d4"), 0, Vector3(0.15, 2.4, 0.15))
	g.put("cyl8", Vector3(sx, 3.8, cz), C("#d9d2c4"), PI / 8, Vector3(3.2, 0.4, 3.2))
	dome(sx, 4.0, cz, 2.8, 0.75, 0.0)
	add_col(sx - 2.6, sx + 2.6, cz - 2.6, cz + 2.6)
	big_label("Sultan Ahmet Camii", Vector3(cx, 44, cz), 150)

func build_yeni_cami(cx: float, cz: float) -> void:
	mosque(cx, cz, 26, 11, 8.5, C("#cfc7b8"), 4)
	minaret(cx - 14.5, cz - 14.5, 32, C("#e2dccf"), 2)
	minaret(cx + 14.5, cz - 14.5, 32, C("#e2dccf"), 2)
	for k in 4:
		g.box(20 - k * 1.0, 0.25 * (k + 1), 1.2, cx, 0, cz - 13.0 - 3.5 + k * 1.0, C("#d6cfc2"))
	big_label("Yeni Cami", Vector3(cx, 32, cz), 130)

func build_misir_carsisi(x0: float, x1: float, z0: float, z1: float) -> void:
	var col := stone(C("#d6b48a"))
	g.wall_box(x1 - x0, 7.5, z1 - z0, (x0 + x1) / 2.0, 0, (z0 + z1) / 2.0, col, 0, "win_c", 3.4, 7.5)
	g.box(x1 - x0 + 0.4, 0.5, z1 - z0 + 0.4, (x0 + x1) / 2.0, 7.5, (z0 + z1) / 2.0, shade(col, 0.82))
	var x := x0 + 3.0
	while x < x1 - 2.0:
		dome(x, 8.0, (z0 + z1) / 2.0 - 5.0, 2.2, 0.75, 0.3)
		dome(x, 8.0, (z0 + z1) / 2.0 + 5.0, 2.2, 0.75, 0.3)
		x += 5.2
	g.box(1.2, 10.0, 9.0, x1 + 0.6, 0, (z0 + z1) / 2.0, shade(col, 0.9))
	g.box(0.3, 6.0, 4.5, x1 + 1.25, 0, (z0 + z1) / 2.0, C("#4a3a30"))
	add_col(x0, x1 + 1.2, z0, z1)
	big_label("Mısır Çarşısı", Vector3(x1 + 2, 13, (z0 + z1) / 2.0), 90)

func build_sirkeci(x0: float, x1: float, z0: float, z1: float) -> void:
	var col := C("#e3cfb2")
	g.wall_box(x1 - x0, 10, z1 - z0, (x0 + x1) / 2.0, 0, (z0 + z1) / 2.0, col, 0, "win_c", 3.2, 5.0)
	g.box(x1 - x0 + 0.6, 0.6, z1 - z0 + 0.6, (x0 + x1) / 2.0, 10, (z0 + z1) / 2.0, C("#b46a4a"))
	for px in [x0 + 4.0, (x0 + x1) / 2.0, x1 - 4.0]:
		g.box(6, 14, 6, px, 0, z0 + 3.0, shade(col, 0.95))
		g.put("pyr", Vector3(px, 14, z0 + 3.0), C("#b46a4a"), 0, Vector3(6.5, 3.0, 6.5), "roof")
		g.put("cyl", Vector3(px, 12, z0 - 0.05), C("#f3efe6"), PI / 2, Vector3(1.4, 0.1, 1.4), "plain", PI / 2)
	add_col(x0, x1, z0, z1)
	big_label("Sirkeci Garı", Vector3((x0 + x1) / 2.0, 20, z0), 100)

func build_galata_kulesi(x: float, z: float) -> void:
	var S := C("#cbb796")
	g.put("cyl", Vector3(x, 1.0, z), stone(shade(S, 0.85)), 0, Vector3(6.4, 2.0, 6.4), "stonewall")
	g.put("cyl", Vector3(x, 15.0, z), stone(S), 0, Vector3(5.6, 30.0, 5.6), "stonewall")
	for k in 5:
		g.put("cyl", Vector3(x, 6.0 + k * 5.0, z), shade(S, 0.9), 0, Vector3(5.7, 0.35, 5.7))
	for row in 4:
		for k in 8:
			var a := k * TAU / 8 + row * 0.4
			g.box(0.9, 1.8, 0.12, x + cos(a) * 5.66, 7.0 + row * 5.5, z + sin(a) * 5.66, C("#3b4652"), -a + PI / 2)
	g.put("cyl", Vector3(x, 30.4, z), shade(S, 0.75), 0, Vector3(6.4, 0.8, 6.4))
	g.put("cyl", Vector3(x, 31.3, z), C("#2b2b2b"), 0, Vector3(6.35, 1.0, 6.35))
	g.put("cyl", Vector3(x, 33.0, z), stone(S), 0, Vector3(5.2, 4.0, 5.2), "stonewall")
	for k in 12:
		var a2 := k * TAU / 12
		g.box(1.1, 2.4, 0.12, x + cos(a2) * 5.22, 32.0, z + sin(a2) * 5.22, C("#3b4652"), -a2 + PI / 2)
	g.put("cone", Vector3(x, 39.8, z), C("#4d5963"), 0, Vector3(5.6, 9.6, 5.6))
	g.put("cyl8", Vector3(x, 45.2, z), C("#d4a93c"), 0, Vector3(0.1, 1.6, 0.1), "gold")
	g.box(2.4, 3.4, 0.4, x, 0, z + 5.6, C("#5e4337"))
	add_col(x - 6.4, x + 6.4, z - 6.4, z + 6.4)
	big_label("Galata Kulesi", Vector3(x, 50, z), 140)

func fisherman(x: float, z: float, side: float) -> void:
	# balıkçının kendisi oyunda karakter olarak yerleşir (satıcılar gibi)
	vendors.append([snappedf(x, 0.1), snappedf(z, 0.1), side * PI / 2])
	add_col(x - 0.35, x + 0.35, z - 0.35, z + 0.35, 2.0, false, 2)
	var tip := Vector3(x + side * 3.6, 3.2, z)
	var base := Vector3(x + side * 0.2, 1.0, z)
	var ang := atan2(tip.y - base.y, absf(tip.x - base.x))
	g.put("cyl8", (tip + base) / 2.0, C("#2a2a2a"), 0, Vector3(0.025, tip.distance_to(base), 0.025), "plain", 0, side * -(PI / 2 - ang))
	g.box(0.012, 3.8, 0.012, tip.x, -0.6, tip.z, C("#e8e8e8"))
	g.put("cyl8", Vector3(x - side * 0.5, 0.25, z + 0.3), C("#3f86b0"), 0, Vector3(0.18, 0.5, 0.18))

func build_bridge(z0: float, z1: float) -> void:
	g.box(16, 0.7, z1 - z0, 0, -0.72, (z0 + z1) / 2.0, C("#7f8a8f"))
	g.ground(-4.5, 4.5, z0, z1, 0.0, "slab", 3.0, C("#77746f"))
	g.ground(-7.0, -4.5, z0, z1, 0.02, "wood", 2.0)
	g.ground(4.5, 7.0, z0, z1, 0.02, "wood", 2.0)
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
			lz += 10.0
		add_col(rx - 0.25 if side < 0 else rx - 0.05, rx + 0.05 if side < 0 else rx + 0.25, z0, z1, 4)
	var pz := z0 + 3.0
	while pz < z1:
		for px in [-5.0, 5.0]:
			g.box(1.6, 4.0, 1.6, px, -4.6, pz, C("#6f777b"))
		pz += 8.0
	var fz := z0 + 3.5
	var i := 0
	while fz < z1 - 2.0:
		for side in [-1.0, 1.0]:
			if (i + int(side)) % 3 == 0:
				fisherman(side * 6.4, fz + rng.randf() * 1.5, side)
		fz += 3.0
		i += 1
	big_label("Galata Köprüsü", Vector3(0, 7, (z0 + z1) / 2.0), 90)

func build_pier(x0: float, x1: float, z0: float, z1: float) -> void:
	g.box(x1 - x0, 0.7, z1 - z0, (x0 + x1) / 2.0, -0.72, (z0 + z1) / 2.0, C("#6f6a62"))
	g.ground(x0, x1, z0, z1, 0.0, "wood", 2.0)
	var bx := (x0 + x1) / 2.0
	g.wall_box(x1 - x0 - 4, 4.5, 6, bx, 0, z0 + 4, C("#e8e2d2"), 0, "win_a", 2.6, 4.5)
	g.put("hip", Vector3(bx, 4.5, z0 + 4), C("#3d6b55"), 0, Vector3(x1 - x0 - 3, 2.2, 7.0), "roof")
	label("EMİNÖNÜ", Vector3(bx, 5.7, z0 + 7.3), 70, C("#23302b"), C("#f3efe6"), 6, false)
	for px in [x0 + 0.2, x1 - 0.2]:
		g.box(0.12, 1.0, z1 - z0, px, 0, (z0 + z1) / 2.0, C("#2f3a3f"))
	add_col(x0 - 0.3, x0 + 0.1, z0, z1, 4)
	add_col(x1 - 0.1, x1 + 0.3, z0, z1, 4)
	add_col(bx - (x1 - x0 - 4) / 2.0, bx + (x1 - x0 - 4) / 2.0, z0 + 1, z0 + 7)
	add_col(x0, x1, z0 - 1.0, z0 + 0.2, 4)

func boat(name: String, x: float, z: float, ry: float, kind: String) -> void:
	var n := Node3D.new()
	n.name = name
	mroot.get_node("Hareketli").add_child(n)
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
	g.flush(n, mroot)

func build_tram(name: String, cars: int, red: bool) -> void:
	var n := Node3D.new()
	n.name = name
	mroot.get_node("Hareketli").add_child(n)
	for k in cars:
		var oz: float = (k - (cars - 1) / 2.0) * 7.2 * (2.0 if cars == 2 else 1.0)
		var body := C("#c8282d") if red else C("#e6e3dc")
		g.box(2.6, 2.6, 13.8 if not red else 8.0, 0, 0.3, oz, body)
		g.box(2.62, 0.5, 13.82 if not red else 8.02, 0, 0.3, oz, C("#f2ece0") if red else C("#c8282d"))
		g.box(2.64, 1.0, 12.6 if not red else 7.2, 0, 1.4, oz, C("#2c3a46"))
		g.box(2.4, 0.3, 13.2 if not red else 7.6, 0, 2.9, oz, C("#9aa0a4"))
	g.box(0.1, 1.0, 2.0, 0, 3.2, 0, C("#3d3d3d"))
	g.flush(n, mroot)

func quay(x0: float, x1: float, z0: float, z1: float) -> void:
	g.box(x1 - x0, 1.0, z1 - z0, (x0 + x1) / 2.0, -0.92, (z0 + z1) / 2.0, C("#b9ad98"))
	add_col(x0, x1, z0, z1, 4, false)

# ------------------------------------------------------------ yerleşim
func pen_cell(c: int, b: int) -> Array:
	return [V[c] + VW[c], V[c + 1] - VW[c + 1], H[b] + HW[b], H[b + 1] - HW[b + 1]]

func build_peninsula() -> void:
	var stS := {"pal": PAL_S, "fmin": 2, "fmax": 4, "shop": 0.35, "wins": ["win_a", "win_b"], "cumba": 0.5, "wood": 0.4, "brick": 0.03}
	var stMain := {"pal": PAL_S, "fmin": 3, "fmax": 4, "shop": 0.7, "wins": ["win_a", "win_b", "win_c"], "cumba": 0.35, "wood": 0.15, "brick": 0.05}
	# ana yollar
	for i in H.size():
		var x1 := 235.0
		if i == 1: x1 = V[4] + VW[4]
		if i == 4: x1 = V[1] + VW[1]
		road(NAMES_H[i], -225, x1, H[i] - HW[i], H[i] + HW[i])
	for i in V.size():
		var z1 := 295.0
		if i == 3: z1 = H[3] + HW[3]
		road(NAMES_V[i], V[i] - VW[i], V[i] + VW[i], 0, z1)
	# hücreler
	for c in 5:
		for b in 5:
			var key := "%d,%d" % [c, b]
			var cell := pen_cell(c, b)
			var x0: float = cell[0]; var x1: float = cell[1]; var z0: float = cell[2]; var z1: float = cell[3]
			var nm: Array = SUB_NAMES.get(key, [])
			var sp: String = SPECIAL.get(key, "")
			var bh := z1 - z0
			var s1 := z0 + bh / 3.0
			var s2 := z0 + 2.0 * bh / 3.0
			var sw := 2.5
			if nm.size() == 2 and sp != "sultanahmet":
				road(nm[0], x0, x1, s1 - sw, s1 + sw)
				road(nm[1], x0, x1, s2 - sw, s2 + sw)
			if sp != "":
				if nm.size() == 2 and sp != "sultanahmet":
					g.ground(x0, x1, s1 - sw, s1 + sw, 0.025, "slab", 6.0, C("#e2d8c6"))
					g.ground(x0, x1, s2 - sw, s2 + sw, 0.025, "slab", 6.0, C("#e2d8c6"))
				continue
			var st := stMain if (b == 0 or b == 3 or c == 1) else stS
			if nm.size() == 2:
				block(x0, x1, z0, s1 - sw, st)
				block(x0, x1, s1 + sw, s2 - sw, st)
				block(x0, x1, s2 + sw, z1, st)
				for sc: float in [s1, s2]:
					var lx := x0 + 9.0
					while lx < x1 - 9.0:
						if rng.randf() < 0.45:
							laundry(lx, sc - sw - 1.4, sc + sw + 1.4)
						lx += 13.0 + rng.randf() * 6.0
			else:
				block(x0, x1, z0, z1, st)
			chunk_cells[key] = true
		flush_chunk("YarimadaSutun%d" % c)
	# doğu şeridi (12. yolun doğusu) ve batı kenar arka planı
	block(V[5] + VW[5], 235, H[4] + HW[4], H[5] - HW[5], stS)
	block(V[5] + VW[5], 235, H[0] + HW[0], H[1] - HW[1], stMain)
	var zz := 0.0
	while zz < 295.0:
		g.wall_box(9, 9 + rng.randf() * 4, 9, -229.5, 0, zz + 4.5, pick(PAL_S), PI / 2, "win_a", 2.6, 3.0)
		zz += 9.0
	var xx := -225.0
	while xx < 235.0:
		g.wall_box(9, 9 + rng.randf() * 4, 8, xx + 4.5, 0, 299, pick(PAL_S), 0, "win_b", 2.6, 3.0)
		xx += 9.0
	flush_chunk("YarimadaKenar", 600.0)
	add_col(-240, -225, -5, 310, 14, false)
	add_col(-240, 250, 295, 310, 14, false)

func build_specials() -> void:
	var L := mroot.get_node("SimgeYapilar")
	# ---- Eminönü meydanı + Yeni Cami
	var e := pen_cell(2, 0)
	g.ground(e[0] - 4, e[1] + 4, e[2], e[3], 0.012, "slab", 6.0)
	squares.append([e[0], e[1], e[2], e[3]])
	build_yeni_cami(-10.0, 34.0)
	area("Eminönü Meydanı", e[0], e[1], e[2], e[3])
	simit_cart(15, 18)
	for p: Vector2 in [Vector2(-38, 18), Vector2(20, 50), Vector2(-38, 52)]:
		tree(p.x, p.y, "plane", 0.9)
	g.flush(L, mroot, "YeniCami")
	# ---- Mısır Çarşısı
	var m := pen_cell(1, 0)
	g.ground(m[0], m[1], m[2], m[3], 0.012, "slab", 6.0)
	squares.append([m[0], m[1], m[2], m[3]])
	build_misir_carsisi(m[0] + 6, m[1] - 14, m[2] + 8, m[2] + 30)
	area("Mısır Çarşısı", m[0], m[1], m[2], m[3])
	g.flush(L, mroot, "MisirCarsisi")
	# ---- Sirkeci Garı
	var s := pen_cell(3, 0)
	g.ground(s[0], s[1], s[2], s[3], 0.012, "slab", 6.0)
	squares.append([s[0], s[1], s[2], s[3]])
	build_sirkeci(s[0] + 10, s[1] - 10, s[2] + 10, s[3] - 8)
	area("Sirkeci", s[0], s[1], s[2], s[3])
	g.flush(L, mroot, "Sirkeci")
	# ---- Gülhane Parkı
	var gx0: float = V[4] + VW[4]; var gz0: float = H[1] + HW[1]; var gz1: float = H[4] - HW[4]
	g.ground(gx0, 235, gz0, gz1, 0.02, "grass", 5.0)
	parks.append([gx0, 235, gz0, gz1])
	for zp: float in [H[2], (gz0 + gz1) / 2.0]:
		g.ground(gx0, 235, zp - 3, zp + 3, 0.03, "slab", 6.0)
	g.ground(175, 181, gz0, gz1, 0.03, "slab", 6.0)
	g.wall_box(1.2, 4.0, H[2] - 5 - gz0, gx0 + 0.6, 0, (gz0 + H[2] - 5) / 2.0, C("#c9bca6"), 0, "door", 80, 4)
	add_col(gx0, gx0 + 1.2, gz0, H[2] - 5)
	g.wall_box(1.2, 4.0, gz1 - (H[2] + 5), gx0 + 0.6, 0, (H[2] + 5 + gz1) / 2.0, C("#c9bca6"), 0, "door", 80, 4)
	add_col(gx0, gx0 + 1.2, H[2] + 5, gz1)
	g.box(1.6, 6.5, 2.0, gx0 + 0.6, 0, H[2] - 5, C("#bfb29c")); g.box(1.6, 6.5, 2.0, gx0 + 0.6, 0, H[2] + 5, C("#bfb29c"))
	g.box(1.6, 1.4, 12, gx0 + 0.6, 6.5, H[2], C("#bfb29c"))
	g.put("hip", Vector3(gx0 + 0.6, 7.9, H[2]), C(LEAD), PI / 2, Vector3(12.5, 1.4, 2.2), "roof")
	big_label("Gülhane Parkı", Vector3(gx0, 11, H[2]), 100)
	var gfx := 178.0; var gfz: float = H[2]
	g.put("cyl8", Vector3(gfx, 0.4, gfz), C("#d8d2c4"), 0, Vector3(3.6, 0.8, 3.6))
	g.put("cyl8", Vector3(gfx, 0.82, gfz), C("#6fb7d4"), 0, Vector3(3.3, 0.04, 3.3))
	g.put("cyl", Vector3(gfx, 1.4, gfz), C("#d8d2c4"), 0, Vector3(0.5, 2.0, 0.5))
	add_col(gfx - 3.6, gfx + 3.6, gfz - 3.6, gfz + 3.6, 2)
	var tz := gz0 + 6.0
	while tz < gz1 - 4.0:
		for tx in [gx0 + 10.0, gx0 + 25.0, 168.0, 190.0, 210.0, 228.0]:
			if absf(tz - H[2]) > 6.0 and absf(tz - (gz0 + gz1) / 2.0) > 6.0:
				tree(tx + rng.randf() * 3, tz + rng.randf() * 3, "plane" if rng.randf() < 0.7 else "cypress", 0.9 + rng.randf() * 0.3)
		tz += 11.0
	for b in [[165, H[2] - 4.5, 0.0], [190, H[2] - 4.5, 0.0], [165, H[2] + 4.5, PI], [190, H[2] + 4.5, PI], [200, (gz0 + gz1) / 2.0 - 4.5, 0.0]]:
		bench(b[0], b[1], b[2])
	# lale tarhları: yol kenarı ve fıskiye çevresi
	var fx2 := gx0 + 6.0
	while fx2 < 172.0:
		flower_bed(fx2, H[2] - 4.2, 4.0, 1.2)
		flower_bed(fx2, H[2] + 4.2, 4.0, 1.2)
		fx2 += 8.0
	for k in 6:
		var ga := k * TAU / 6.0 + 0.5
		flower_bed(gfx + cos(ga) * 6.2, gfz + sin(ga) * 6.2, 1.6, 1.6)
	var lzp := gz0 + 8.0
	while lzp < gz1 - 4.0:
		lamp(174.2, lzp); lamp(181.8, lzp + 9.0)
		lzp += 18.0
	shelter_row(gx0 + 14.0, gz0 + 5.0, 6, 2.1, 0.0, 0.0)
	area("Gülhane Parkı", gx0, 235, gz0, gz1)
	g.wall_box(3.0, 9.0, gz1 - gz0, 236.5, 0, (gz0 + gz1) / 2.0, C("#b9ab92"), 0, "door", 200, 9)
	add_col(235, 238, gz0, gz1)
	g.flush(L, mroot, "Gulhane")
	# ---- Sultanahmet meydanı (iki sütun x iki kuşak)
	var a := pen_cell(2, 3); var b2 := pen_cell(3, 4)
	var sx0: float = a[0]; var sx1: float = b2[1]; var sz0: float = a[2]; var sz1: float = b2[3]
	g.ground(sx0 - 4, sx1 + 4, sz0, sz1, 0.012, "slab", 6.0)
	squares.append([sx0, sx1, sz0, sz1])
	area("Sultanahmet Meydanı", sx0, sx1, sz0, sz1)
	build_ayasofya(88.0, 186.0)
	sadirvan(60.0, 172.0, 0.9)
	kapalicarsi_gate(-172.0, 205.2, 0.0)
	build_sultanahmet_camii(-2.0, 255.0)
	g.flush(L, mroot, "Camiler")
	# park: çim adacıkları, fıskiye, yollar
	var fcx := 42.0; var fcz := 222.0
	for lw in [[sx0 + 4, fcx - 12, sz0 + 6, fcz - 12], [fcx + 12, 64, sz0 + 6, fcz - 12], [fcx + 12, sx1 - 4, fcz + 12, sz1 - 6], [20, fcx - 12, fcz + 12, sz1 - 6]]:
		g.ground(lw[0], lw[1], lw[2], lw[3], 0.03, "grass", 5.0)
		parks.append(lw)
		g.box(lw[1] - lw[0], 0.12, 0.25, (lw[0] + lw[1]) / 2.0, 0, lw[2], C("#cfc6b6"))
		g.box(lw[1] - lw[0], 0.12, 0.25, (lw[0] + lw[1]) / 2.0, 0, lw[3], C("#cfc6b6"))
		var tx: float = lw[0] + 4.0
		while tx < lw[1] - 3.0:
			tree(tx, lw[2] + 3.0, "plane" if int(tx) % 3 != 0 else "cypress", 1.0)
			tx += 12.0
	g.put("cyl", Vector3(fcx, 0.35, fcz), C("#d8d2c4"), 0, Vector3(8.0, 0.7, 8.0))
	g.put("cyl", Vector3(fcx, 0.62, fcz), C("#6fb7d4"), 0, Vector3(7.5, 0.05, 7.5))
	g.put("cyl", Vector3(fcx, 1.0, fcz), C("#d8d2c4"), 0, Vector3(1.4, 1.4, 1.4))
	g.put("cone", Vector3(fcx, 2.8, fcz), C("#bfe3ef"), 0, Vector3(0.7, 2.8, 0.7))
	add_col(fcx - 7.8, fcx + 7.8, fcz - 7.8, fcz + 7.8, 2)
	for k in 8:
		var ang := k * TAU / 8.0
		bench(fcx + cos(ang) * 11.0, fcz + sin(ang) * 11.0, -ang + PI / 2)
		lamp(fcx + cos(ang + 0.4) * 13.0, fcz + sin(ang + 0.4) * 13.0)
	# çay bahçesi ve çiçek tarhları
	cafe_row(-30.0, 214.0, 4, 0.0, 3.6)
	cafe_row(-24.0, 216.0, 3, 0.0, 3.6)
	for k in 4:
		var fa := k * TAU / 4.0 + PI / 4.0
		flower_bed(fcx + cos(fa) * 17.0, fcz + sin(fa) * 17.0, 3.0, 3.0)
	simit_cart(58, 214)
	label("SİMİT", Vector3(58, 3.3, 214), 50, C("#23302b"), C("#fffaf1"), 22)
	g.flush(L, mroot, "SultanahmetPark")
	# ---- Hipodrom
	var hp := pen_cell(1, 3); var hp2 := pen_cell(1, 4)
	var hx0: float = hp[0]; var hx1: float = hp[1]; var hz0: float = hp[2]; var hz1: float = hp2[3]
	g.ground(hx0, hx1 + 4, hz0, hz1, 0.012, "slab", 6.0)
	squares.append([hx0, hx1, hz0, hz1])
	area("Hipodrom", hx0, hx1, hz0, hz1)
	var hx := (hx0 + hx1) / 2.0
	g.box(2.6, 1.6, 2.6, hx, 0, 222, C("#bfb3a0"))
	g.put("box", Vector3(hx, 10.6, 222), C("#c99a86"), 0, Vector3(1.6, 18, 1.6))
	g.put("pyr", Vector3(hx, 19.6, 222), C("#c99a86"), 0, Vector3(1.6, 1.6, 1.6))
	add_col(hx - 1.3, hx + 1.3, 220.7, 223.3)
	g.box(2.4, 1.4, 2.4, hx, 0, 262, C("#a89c88"))
	g.put("box", Vector3(hx, 9.4, 262), C("#8f8676"), 0, Vector3(1.8, 16, 1.8))
	add_col(hx - 1.2, hx + 1.2, 260.8, 263.2)
	var fx := hx; var fz := 182.0
	g.put("cyl8", Vector3(fx, 0.5, fz), C("#d8d2c4"), PI / 8, Vector3(3.2, 1.0, 3.2))
	for k in 8:
		var a3 := k * TAU / 8 + PI / 8
		g.put("cyl", Vector3(fx + cos(a3) * 3.0, 2.6, fz + sin(a3) * 3.0), C("#cfc6b6"), 0, Vector3(0.2, 3.2, 0.2))
	g.put("cyl8", Vector3(fx, 4.4, fz), C("#d8d2c4"), PI / 8, Vector3(3.6, 0.6, 3.6))
	dome(fx, 4.7, fz, 3.2, 0.8, 0.0, C("#4f8a6a"))
	add_col(fx - 3.2, fx + 3.2, fz - 3.2, fz + 3.2)
	big_label("Hipodrom", Vector3(hx, 24, 240), 100)
	player_home(hx0 + 14.5, 240.0)
	shelter_row(hx0 + 9.0, 220.0, 5, 0.0, 2.0, PI / 2.0)
	for zt in range(int(hz0) + 6, int(hz1) - 4, 14):
		tree(hx0 + 5, zt, "plane", 1.0)
		tree(hx1 - 5, zt + 7, "plane", 1.0)
	g.flush(L, mroot, "Hipodrom")
	# ---- Haliç kıyısı, köprü, iskele
	quay(-225, -7, -2, 0); quay(7, 40, -2, 0); quay(58, 237, -2, 0)
	quay(237, 239, -2, 295)
	add_col(-240, -7, -49.6, -0.5, 4, false); add_col(7, 40, -49.6, -0.5, 4, false); add_col(58, 260, -49.6, -0.5, 4, false)
	add_col(236.5, 260, -2, 310, 4, false)
	build_bridge(-50, 0)
	build_pier(40, 58, -20, 0)
	road("Galata Köprüsü", -7, 7, -50, 0)
	area("Eminönü İskelesi", 40, 58, -20, 0)
	g.flush(L, mroot, "KopruIskele")

func build_north() -> void:
	var stK := {"pal": PAL_N, "fmin": 3, "fmax": 5, "shop": 0.75, "wins": ["win_a", "win_c"], "cumba": 0.2, "brick": 0.4, "balcony": 0.4, "ornate": true}
	var stG := {"pal": PAL_N, "fmin": 3, "fmax": 5, "shop": 0.45, "wins": ["win_a", "win_c", "win_c"], "cumba": 0.25, "brick": 0.35, "wood": 0.05, "balcony": 0.4, "ornate": true}
	# zemin ve kenarlar
	g.ground(-150, 230, -265, -50, 0.0, "cobble", 4.0)
	g.ground(-150, 230, -62, -50, 0.012, "slab", 6.0)
	g.flush(mroot.get_node("Zemin"), mroot, "ZeminKuzey", false)
	quay(-150, -7, -52, -50); quay(7, 232, -52, -50)
	# Karaköy rıhtımı: balıkçı lokantaları, babalar, banklar
	var qx := -140.0
	while qx < 225.0:
		if absf(qx) > 14.0:
			g.put("cyl8", Vector3(qx, 0.3, -50.8), C("#2c2b2a"), 0, Vector3(0.35, 0.6, 0.35))
		qx += 7.0
	cafe_row(-120.0, -60.2, 10, 3.2, 0.0)
	cafe_row(-60.0, -60.2, 9, 3.2, 0.0)
	cafe_row(70.0, -60.2, 12, 3.2, 0.0)
	cafe_row(150.0, -60.2, 10, 3.2, 0.0)
	var kb := -135.0
	while kb < 220.0:
		if absf(kb) > 20.0:
			bench(kb, -52.6, PI)
		kb += 23.0
	# Karaköy iskelesi
	g.box(18, 0.5, 9, 28, -0.3, -45.5, C("#7a6a5a"))
	g.wall_box(14, 4.0, 6, 28, 0.2, -45.5, C("#e6dccb"), 0, "door", 3.5, 4.0)
	g.put("hip", Vector3(28, 4.2, -45.5), C(LEAD), 0, Vector3(16, 1.6, 8), "roof")
	label("KARAKÖY İSKELESİ", Vector3(28, 6.4, -45.5), 60, C("#fffaf1"), C("#1f3a5a"), 8, true)
	quay(230, 232, -265, -50)
	add_col(-150, -7, -50, -49.5, 4, false); add_col(7, 240, -50, -49.5, 4, false)
	add_col(230, 245, -265, -50, 14, false)
	add_col(-160, -150, -275, -50, 14, false)
	# yollar
	for i in HN.size():
		var hn: Array = HN[i]
		road(hn[2], -150, 230, hn[0] - hn[1], hn[0] + hn[1])
	for i in VN.size():
		road(NAMES_VN_K[i], VN[i] - 3.5, VN[i] + 3.5, -150, -50)
		road(NAMES_VN_G[i], VN[i] - 3.5, VN[i] + 3.5, -265, -150)
	# bloklar
	var xs := [[-150.0, VN[0] - 3.5], [VN[0] + 3.5, VN[1] - 3.5], [VN[1] + 3.5, VN[2] - 3.5], [VN[2] + 3.5, VN[3] - 3.5], [VN[3] + 3.5, 230.0]]
	for j in HN.size() - 1:
		var z1: float = HN[j][0] - HN[j][1]
		var z0: float = HN[j + 1][0] + HN[j + 1][1]
		for i in xs.size():
			if j == 5 and (i == 2):
				continue  # Galata kule meydanı
			block(xs[i][0], xs[i][1], z0, z1, stK if j < 3 else stG)
		flush_chunk("Kuzey%d" % j)
	# Galata meydanı ve kule
	var gz0: float = HN[6][0] + HN[6][1]; var gz1: float = HN[5][0] - HN[5][1]
	var gx0: float = VN[1] + 3.5; var gx1: float = VN[2] - 3.5
	g.ground(gx0, gx1, gz0, gz1, 0.012, "slab", 6.0)
	squares.append([gx0, gx1, gz0, gz1])
	area("Galata Meydanı", gx0, gx1, gz0, gz1)
	build_galata_kulesi((gx0 + gx1) / 2.0, (gz0 + gz1) / 2.0)
	for p: Vector2 in [Vector2(gx0 + 6, gz0 + 5), Vector2(gx1 - 6, gz0 + 5), Vector2(gx0 + 6, gz1 - 5), Vector2(gx1 - 6, gz1 - 5)]:
		tree(p.x, p.y, "plane", 0.9)
		bench(p.x + 3, p.y, 0.0)
	g.put("cyl8", Vector3(gx0 + 10, 0.5, (gz0 + gz1) / 2.0), C("#d8d2c4"), 0, Vector3(1.4, 1.0, 1.4))
	cafe_row(gx0 + 17, gz1 - 3.2, 4, 3.0, 0.0)
	cafe_row(gx1 - 26, gz1 - 3.2, 4, 3.0, 0.0)
	cafe_row(gx1 - 26, gz0 + 3.2, 4, 3.0, 0.0)
	flower_bed(gx0 + 25, gz0 + 4.5, 6.0, 2.0)
	flower_bed((gx0 + gx1) / 2.0 - 10.0, (gz0 + gz1) / 2.0, 2.0, 5.0)
	flower_bed((gx0 + gx1) / 2.0 + 10.0, (gz0 + gz1) / 2.0, 2.0, 5.0)
	g.flush(mroot.get_node("SimgeYapilar"), mroot, "GalataKulesi")
	# arka plan
	var xx := -150.0
	while xx < 120.0:
		g.wall_box(9, 14 + rng.randf() * 6, 8, xx + 4.5, 0, -270, pick(PAL_N), 0, "win_c", 2.6, 3.0)
		xx += 9.0
	flush_chunk("KuzeyArka", 600.0)
	add_col(-160, 120, -280, -265, 14, false)

## Oyuncunun evi: iki katlı ahşap Osmanlı evi, kapı +x yönüne bakar
var home_door := Vector3.ZERO
func player_home(cx: float, cz: float) -> void:
	var w := 7.0; var d := 9.0
	var wood := C("#c98a5a"); wood.a = 0.5
	var base := C("#d8cdb6")
	g.wall_box(d, 3.4, w, cx, 0, cz, base, PI / 2.0, "door", d, 3.4)
	g.wall_box(d, 3.2, w, cx, 3.4, cz, wood, PI / 2.0, "win_b", 2.6, 3.2)
	g.box(w + 0.2, 0.2, d + 0.2, cx, 3.3, cz, C("#6e4a3a"))
	g.wall_box(4.4, 2.6, 1.0, cx + w / 2.0 + 0.5, 3.6, cz, wood, PI / 2.0, "win_a", 2.2, 2.6)
	g.box(w + 2.6, 0.12, d + 2.6, cx, 6.62, cz, C("#5b3a28"))
	g.put("hip", Vector3(cx, 6.7, cz), C("#b5532f"), PI / 2.0, Vector3(d + 1.6, 2.2, w + 1.6), "roof")
	g.box(0.55, 1.4, 0.55, cx - 1.5, 7.2, cz + 2.5, C("#9a6a52"))
	# kapı ve saçak
	var dx := cx + w / 2.0
	g.box(0.12, 2.3, 1.5, dx + 0.02, 0, cz, C("#7a3a22"))
	g.box(0.13, 0.08, 0.08, dx + 0.1, 1.1, cz + 0.45, C("#e8c060"))
	g.box(1.4, 0.1, 2.4, dx + 0.6, 2.6, cz, C("#6e4a3a"))
	g.box(1.6, 0.18, 2.2, dx + 0.8, 0, cz, C("#bfb39c"))
	label("EVİN", Vector3(dx + 0.3, 3.0, cz), 70, C("#fff1c8"), C("#7a3a22"), 10, true)
	# ön bahçe çiti ve çiçekler
	var gx := dx + 4.0
	for k in 15:
		var zz := cz - 4.2 + k * 0.6
		if absf(zz - cz) > 1.2:
			g.box(0.08, 0.9, 0.08, gx, 0, zz, C("#f2efe9"))
	for e: float in [-1.0, 1.0]:
		g.box(0.06, 0.08, 3.0, gx, 0.65, cz + e * 2.7, C("#f2efe9"))
		g.box(4.0, 0.9, 0.08, dx + 2.0, 0, cz + e * 4.5, C("#f2efe9"))
		flower_bed(dx + 2.0, cz + e * 3.2, 3.0, 1.6)
	g.ground(dx, gx, cz - 4.5, cz + 4.5, 0.03, "grass", 4.0)
	tree(cx - 1.0, cz - 6.5, "plane", 0.9)
	add_col(cx - w / 2.0, cx + w / 2.0, cz - d / 2.0, cz + d / 2.0)
	add_col(gx - 0.1, gx + 0.1, cz - 4.5, cz - 1.2); add_col(gx - 0.1, gx + 0.1, cz + 1.2, cz + 4.5)
	add_col(dx, gx, cz - 4.6, cz - 4.4); add_col(dx, gx, cz + 4.4, cz + 4.6)
	home_door = Vector3(dx + 0.9, 0, cz)

## Pasaj girişi: iki taş ayak, kemer, karanlık iç, tabela. side: -1 batı cephesi (+x'e bakar), +1 doğu
func pasaj(name: String, x: float, z: float, side: float) -> void:
	# cepheye gömülü, iki katlı süslü giriş: taş çerçeve, kemer, ışıklı iç koridor, cam saçak
	var c := stone(C("#e8dcc4"))
	var ry := PI / 2.0
	var fx := x - side * 1.1
	for e: float in [-1.0, 1.0]:
		g.box(0.7, 7.2, 0.8, fx, 0, z + e * 2.8, c)
		g.box(0.8, 0.3, 0.9, fx, 7.2, z + e * 2.8, C("#cbbd9f"))
	g.box(0.7, 1.6, 6.4, fx, 7.5, z, c)
	g.put("cyl", Vector3(fx, 5.6, z), c, 0, Vector3(4.8, 0.7, 4.8), "plain", PI / 2.0)
	# cepheye yaslanan ışıklı giriş: sıcak renkli iç, yan duvarlar, cam tavan
	g.box(0.08, 5.4, 4.6, x - side * 0.08, 0, z, C("#f2c878"))
	g.box(0.06, 3.2, 2.0, x - side * 0.14, 0, z, C("#6b4a2a"))
	g.box(1.1, 0.03, 4.6, x - side * 0.6, 0.01, z, C("#d8b88a"))
	for e2: float in [-1.0, 1.0]:
		g.box(1.1, 5.4, 0.12, x - side * 0.6, 0, z + e2 * 2.3, C("#e6cfa0"))
	g.box(1.2, 0.1, 4.7, x - side * 0.6, 5.4, z, C("#bfe3f5"))
	# cam saçak
	g.box(1.4, 0.08, 6.0, fx - side * 0.7, 4.6, z, C("#9cc7d8"))
	g.box(0.06, 0.06, 6.0, fx - side * 1.35, 4.55, z, C("#2c2b2a"))
	# tabela
	g.box(0.2, 1.0, 5.2, fx - side * 0.42, 6.4, z, C("#1f3a5a"))
	label(name, Vector3(fx - side * 0.6, 6.45, z), 52, C("#f6e7b8"), C("#1f3a5a"), 8, true)
	# kapı önü fenerleri
	for e3: float in [-1.0, 1.0]:
		g.put("ball", Vector3(fx - side * 0.5, 4.0, z + e3 * 3.4), C("#fff1c8"), 0, Vector3(0.35, 0.35, 0.35))

func bunting(x0: float, x1: float, z: float, y: float) -> void:
	g.box(x1 - x0, 0.03, 0.03, (x0 + x1) / 2.0, y, z, C("#3a3633"))
	var n := int((x1 - x0) / 0.7)
	for i in n:
		var fx := x0 + 0.35 + i * 0.7
		var sag := sin(float(i) / float(n) * PI) * 0.6
		g.put("pyr", Vector3(fx, y - 0.45 - sag * 0.3, z), pick(["#c8423a", "#f2c230", "#3b6aa8", "#2f7d6d", "#f2efe9", "#e58a3a"]), 0, Vector3(0.45, -0.45, 0.04))

func street_cart(x: float, z: float, text: String, col: Color) -> void:
	g.box(1.6, 0.9, 0.9, x, 0.35, z, col)
	g.box(1.7, 0.08, 1.0, x, 1.25, z, C("#f2efe9"))
	for e: float in [-1.0, 1.0]:
		g.put("cyl8", Vector3(x + e * 0.55, 0.3, z + 0.48), C("#2c2b2a"), 0, Vector3(0.3, 0.06, 0.3), "plain", PI / 2.0)
		g.box(0.05, 1.2, 0.05, x + e * 0.75, 1.3, z, C("#3a3633"))
	g.put("hip", Vector3(x, 2.5, z), col, 0, Vector3(2.0, 0.5, 1.3), "roof")
	label(text, Vector3(x, 3.1, z), 34, C("#fffaf1"), col, 6, true)
	add_col(x - 0.85, x + 0.85, z - 0.5, z + 0.5)
	vendors.append([snappedf(x, 0.1), snappedf(z - 1.1, 0.1), 0.0])

## Taksim Meydanı: İstiklal'in kuzey ucu
func build_taksim(ax: float, z_top: float) -> void:
	var tz0 := -505.0
	g.ground(110, 250, tz0, z_top, 0.0, "cobble", 4.0)
	g.ground(122, 238, tz0 + 6, z_top, 0.012, "slab", 6.0)
	area("Taksim Meydanı", 122, 238, tz0 + 6, z_top)
	squares.append([122, 238, tz0 + 6, z_top])
	road("Taksim Meydanı", 122, 238, tz0 + 6, z_top)
	# Cumhuriyet Anıtı (sadeleştirilmiş): yuvarlak basamaklar, çift kemerli taş gövde, iki yüzde figür grupları
	var mx := ax; var mz := -470.0
	for k in 3:
		g.put("cyl", Vector3(mx, k * 0.35 + 0.175, mz), C("#d6cfc2"), 0, Vector3(16.0 - k * 2.5, 0.35, 16.0 - k * 2.5))
	g.put("cyl", Vector3(mx, 1.2, mz), C("#5f8f45"), 0, Vector3(10.0, 0.1, 10.0))
	for k in 12:
		var fa := k * TAU / 12.0
		g.put("ico", Vector3(mx + cos(fa) * 4.4, 1.35, mz + sin(fa) * 4.4), pick(["#e0483a", "#f2efe9", "#e0483a"]), fa, Vector3(0.6, 0.4, 0.6))
	var sc := stone(C("#cfc5b2"))
	g.box(7.0, 3.0, 5.0, mx, 1.05, mz, sc)
	for e: float in [-1.0, 1.0]:
		g.box(1.4, 9.0, 1.4, mx + e * 3.2, 4.05, mz, sc)
		g.box(1.7, 0.4, 1.7, mx + e * 3.2, 13.05, mz, C("#bfb39c"))
	g.box(8.2, 1.4, 1.6, mx, 13.4, mz, sc)
	g.put("cyl", Vector3(mx, 11.6, mz), sc, 0, Vector3(5.0, 1.6, 5.0), "plain", 0.0, PI / 2.0)
	# figür grupları (iki yüz)
	for fz: float in [-1.0, 1.0]:
		for k in 5:
			var fx2 := mx - 2.4 + k * 1.2
			var hh := 2.2 + (0.6 if k == 2 else 0.0)
			g.put("cyl8", Vector3(fx2, 4.05 + hh / 2.0, mz + fz * 1.3), C("#4f6b55"), 0, Vector3(0.4, hh, 0.35))
			g.put("ball", Vector3(fx2, 4.25 + hh, mz + fz * 1.3), C("#4f6b55"), 0, Vector3(0.32, 0.32, 0.32))
	g.put("cyl8", Vector3(mx, 15.2, mz), C("#4f6b55"), 0, Vector3(0.12, 2.4, 0.12))
	g.box(1.4, 0.9, 0.05, mx + 0.7, 15.6, mz, C("#d9302a"))
	add_col(mx - 8, mx + 8, mz - 8, mz + 8)
	# Gezi Parkı (batı) ve çevre binalar
	g.ground(122, 160, tz0 + 6, z_top - 18, 0.03, "grass", 5.0)
	parks.append([122, 160, tz0 + 6, z_top - 18])
	shelter_row(130.0, z_top - 21.0, 6, 2.2, 0.0, 0.0)
	var tx := 126.0
	while tx < 158.0:
		var tzz := tz0 + 10.0
		while tzz < z_top - 22.0:
			tree(tx + rng.randf() * 2, tzz + rng.randf() * 2, "plane", 1.0)
			tzz += 9.0
		tx += 9.0
	# kültür merkezi (doğu): cam cepheli modern bina
	g.wall_box(34, 13, 22, 222, 0, -478, C("#cfd6d9"), 0, "shop", 3.0, 4.3, true)
	g.box(36, 0.6, 24, 222, 13, -478, C("#6f7a80"))
	add_col(205, 239, -489, -467)
	g.wall_box(140, 16, 6, 180, 0, tz0 + 3, C("#e3d6c2"), 0, "win_c", 2.6, 3.2)
	add_col(110, 250, tz0 - 10, tz0 + 6, 14, false)
	add_col(110, 122, tz0, z_top, 14, false)
	add_col(238, 250, tz0, z_top, 14, false)
	for k in 6:
		lamp(165 + k * 6.5, -452.0)
	for b: float in [168.0, 176.0, 184.0, 192.0]:
		bench(b, -458.0, 0.0)
	simit_cart(200, -455)
	big_label("Taksim Meydanı", Vector3(mx, 18, mz), 120)

func build_istiklal() -> void:
	var stI := {"pal": PAL_I, "fmin": 4, "fmax": 5, "shop": 0.85, "wins": ["win_c", "win_a"], "cumba": 0.15, "brick": 0.2, "balcony": 0.5, "ornate": true}
	var ax := VN[3]
	var z_top := -440.0; var z_bot := -259.0
	g.ground(120, 240, z_top, -265, 0.0, "cobble", 4.0)
	g.ground(ax - 6, ax + 6, z_top, z_bot, 0.012, "slab", 6.0)
	road("İstiklal Caddesi", ax - 6, ax + 6, z_top, -259)
	area("İstiklal", 120, 240, z_top, -259)
	for off in [-0.7, 0.7]:
		g.box(0.14, 0.03, z_bot - z_top, ax + off, 0.0, (z_top + z_bot) / 2.0, C("#7b746b"))
	# 22 cep sokak
	var z := -272.0
	var k := 0
	var prev_w := -265.0
	while k < 11:
		var cz := z - k * 15.5
		var nm: String = IST_NAMES[k]
		road("%s Batı Sokağı" % nm, 132, ax - 6, cz - 2.0, cz + 2.0)
		road("%s Doğu Sokağı" % nm, ax + 6, 228, cz - 2.0, cz + 2.0)
		g.ground(132, ax - 6, cz - 2.0, cz + 2.0, 0.012, "slab", 6.0, C("#e8dfd0"))
		g.ground(ax + 6, 228, cz - 2.0, cz + 2.0, 0.012, "slab", 6.0, C("#e8dfd0"))
		# blok: önceki sokak ile bu sokak arası
		block(124, ax - 6, cz + 2.0, prev_w, stI)
		block(ax + 6, 236, cz + 2.0, prev_w, stI)
		for lx: float in [150.0, 205.0]:
			if rng.randf() < 0.6:
				laundry(lx + rng.randf() * 8.0, cz - 3.4, cz + 3.4, 7.0)
		# cep sokak sonu: küçük avlu (saksı, bank)
		flower_pot(133.5, cz + 1.0); flower_pot(226.5, cz - 1.0)
		prev_w = cz - 2.0
		k += 1
	block(124, ax - 6, z_top, prev_w, stI)
	block(ax + 6, 236, z_top, prev_w, stI)
	# pasaj girişleri (cadde cephesinde süslü kemerli kapılar)
	var pasajlar := [["Çiçek Pasajı", -1.0, -282.0], ["Atlas Pasajı", 1.0, -313.0], ["Hazzopulo Pasajı", -1.0, -344.0], ["Avrupa Pasajı", 1.0, -375.0], ["Sahaflar Pasajı", -1.0, -406.0]]
	for pj in pasajlar:
		pasaj(pj[0], ax + float(pj[1]) * 7.45, float(pj[2]), float(pj[1]))
	# caddeye gerilen renkli bayrak süsleri
	var bz := -268.0
	while bz > z_top + 8.0:
		bunting(ax - 7.4, ax + 7.4, bz, 9.5)
		bz -= 11.0
	street_cart(ax - 3.5, -298.0, "KESTANE", C("#8a3a2a"))
	street_cart(ax + 3.5, -352.0, "DONDURMA", C("#3b6aa8"))
	street_cart(ax - 3.5, -395.0, "SİMİT", C("#c8423a"))
	# cep sokak uçları kapalı duvar
	for zz in range(int(z_top), -265, 6):
		g.wall_box(6, 12, 6, 127, 0, zz + 3, pick(PAL_I), 0, "win_a", 2.6, 3.0)
		g.wall_box(6, 12, 6, 233, 0, zz + 3, pick(PAL_I), 0, "win_a", 2.6, 3.0)
	add_col(110, 124, z_top - 10, -259, 14, false)
	add_col(236, 250, z_top - 10, -259, 14, false)
	build_taksim(ax, z_top)
	var lz := -275.0
	while lz > z_top + 10:
		lamp(ax - 5.0, lz); lamp(ax + 5.0, lz - 7.0)
		lz -= 22.0
	flush_chunk("Istiklal", 300.0)
	big_label("İstiklal Caddesi", Vector3(ax, 22, -300), 110)

func build_decor() -> void:
	var D := mroot.get_node("Dekor")
	# T1 tramvay rayları: Sirkeci -> Gülhane Park Yolu -> Cağaloğlu
	var x11: float = V[4]
	for off in [-0.7, 0.7]:
		g.box(0.14, 0.03, H[3] - 6.0, x11 + off, 0.0, (6.0 + H[3]) / 2.0, C("#7b746b"))
		g.box(x11 + 215.0, 0.03, 0.14, (x11 - 215.0) / 2.0, 0.0, H[3] + off, C("#7b746b"))
	# lambalar ana yollar boyunca
	for i in H.size():
		var x := -215.0
		while x < 230.0:
			lamp(x, H[i] + HW[i] - 0.6)
			x += 34.0
	# kıyıda banklar, simitçi, ağaç
	var bx := -200.0
	while bx < 230.0:
		if absf(bx) > 12 and (bx < 38 or bx > 60):
			bench(bx, 2.4, PI)
		bx += 26.0
	simit_cart(-20, 6); simit_cart(30, -60)
	# sokak tabelaları: her yol için bir tabela
	for r in roads:
		var cx: float = (r[1] + r[2]) / 2.0
		var cz: float = (r[3] + r[4]) / 2.0
		var w: float = r[2] - r[1]
		var d: float = r[4] - r[3]
		if w > d:
			street_sign(r[0], r[1] + minf(14.0, w * 0.2), r[3] - 0.5)
		else:
			street_sign(r[0], r[1] - 0.5, r[3] + minf(14.0, d * 0.2))
	g.flush(D, mroot, "Dekor")
	# hareketliler
	build_tram("Tramvay", 2, false)
	build_tram("TramvayIstiklal", 1, true)
	boat("VapurIskele", 64, -11, 0.0, "ferry")
	boat("VapurBogaz", 275, 60, 0.0, "ferry")
	boat("VapurHalic", -120, -25, PI / 2, "ferry")
	boat("BalikEkmek1", -40, -6, PI / 2, "boat")
	boat("BalikEkmek2", -26, -6, PI / 2, "boat")

# ------------------------------------------------------------ hayvanlar ve NPC'ler
const CAT_NAMES := ["Pamuk", "Tarçın", "Fıstık", "Zeytin", "Mısır", "Lokum", "Hamsi", "Tekir", "Limon", "Duman", "Çakıl", "Sütlü", "Kestane", "Minnoş", "Kurabiye", "Boncuk Göz", "Pati", "Mırmır", "Ayva", "Leblebi", "Nohut", "Çörek"]
const DOG_NAMES := ["Karabaş", "Kınalı", "Boncuk", "Paşa", "Simit", "Martı", "Sütlaç", "Badem", "Kömür", "Kont", "Cesur", "Bulut", "Aslan", "Tarzan", "Fındık", "Gofret"]
const CAT_STYLES := [["tekir", "#8b8d92", "#4d4f53"], ["tekir", "#c98b55", "#8a5528"], ["solid", "#f2efe9", ""], ["solid", "#2b2828", ""],
	["smokin", "#2b2828", "#f5f2ec"], ["smokin", "#5d6168", "#f5f2ec"], ["uc_renk", "#f2efe9", "#e58a3a"], ["solid", "#e58a3a", ""], ["tekir", "#e8b04a", "#b97a2a"], ["solid", "#9aa0a6", ""]]
const DOG_STYLES := [["solid", "#c99a5b", ""], ["solid", "#e2cfa6", ""], ["solid", "#2b2828", ""], ["benekli", "#efe8dc", "#3a3536"], ["solid", "#7a5232", ""],
	["solid", "#b5713a", ""], ["benekli", "#d9b46a", "#6b4a2a"], ["solid", "#9a948a", ""]]

func add_animal(cat: bool, name: String, x: float, z: float, y: float, place_txt: String, style: Array, size: float, prefix: String = "") -> void:
	animals.append([(prefix + "_" if prefix != "" else "") + name.to_lower().replace(" ", "_") + "_%d" % animals.size(), cat, style[1], name, snappedf(x, 0.1), snappedf(z, 0.1), y, place_txt, style[0], style[2], snappedf(size, 0.01), rng.randf() < 0.7 and not cat])

func place_animals() -> void:
	var ci := 0; var di := 0
	var fixed := [
		[true, 69.0, 184.0, 0.0, "Ayasofya'nın kapısında"], [false, 30.0, 200.0, 0.0, "Sultanahmet Meydanı"], [false, 55.0, 238.0, 0.0, "Fıskiyenin yanında"],
		[true, -24.0, 232.0, 0.0, "Sultan Ahmet Camii avlusu"], [false, -88.0, 200.0, 0.0, "Hipodrom"], [true, 165.0, 105.6, 0.5, "Gülhane'de bankta"],
		[true, 132.0, 115.0, 0.0, "Gülhane kapısı"], [false, 200.0, 160.0, 0.0, "Gülhane Parkı"], [false, -10.0, 16.0, 0.0, "Yeni Cami basamakları"],
		[true, -54.0, 28.0, 0.0, "Mısır Çarşısı kapısı"], [true, -33.0, 2.5, 0.0, "Balık ekmekçilerin yanında"], [true, -5.5, -25.0, 0.0, "Köprüde balıkçıların yanında"],
		[false, 5.5, -40.0, 0.0, "Galata Köprüsü"], [false, 25.0, -56.0, 0.0, "Karaköy Rıhtımı"], [true, 0.0, -170.0, 0.0, "Kule Yokuşu"],
		[false, 30.0, -195.0, 0.0, "Galata Meydanı"], [true, 60.0, -210.0, 0.0, "Kulenin dibinde"], [true, 175.0, -300.0, 0.0, "İstiklal Caddesi"],
		[false, 185.0, -360.0, 0.0, "İstiklal Caddesi"], [true, 140.0, -319.0, 0.0, "Pasaj Batı Sokağı"], [true, 220.0, -365.0, 0.0, "Sahne Doğu Sokağı"],
		[true, 80.0, 30.0, 0.0, "Sirkeci Garı önü"], [false, 120.0, 60.0, 0.0, "Sirkeci Caddesi"], [true, 82.0, 222.0, 0.0, "Sultanahmet çimenlerinde"],
		[false, 172.0, -462.0, 0.0, "Taksim Anıtı önünde"], [true, 140.0, -470.0, 0.0, "Gezi Parkı"], [true, -45.0, -58.5, 0.0, "Karaköy balıkçılarında"],
		[false, 120.0, -54.0, 0.0, "Karaköy Rıhtımı"], [true, 176.0, -330.0, 0.0, "İstiklal vitrin önü"]]
	for f in fixed:
		if f[0]:
			add_animal(true, CAT_NAMES[ci % CAT_NAMES.size()], f[1], f[2], f[3], f[4], CAT_STYLES[rng.randi() % CAT_STYLES.size()], rng.randf_range(0.9, 1.1)); ci += 1
		else:
			add_animal(false, DOG_NAMES[di % DOG_NAMES.size()], f[1], f[2], f[3], f[4], DOG_STYLES[rng.randi() % DOG_STYLES.size()], rng.randf_range(0.9, 1.3)); di += 1
	# ara sokaklara dağılmış dostlar
	var side_roads := []
	for r in roads:
		if String(r[0]).ends_with("Sokağı") or String(r[0]).ends_with("Sokak"):
			side_roads.append(r)
	var n := 0
	while n < 16 and side_roads.size() > 0:
		var r: Array = side_roads[rng.randi() % side_roads.size()]
		var horiz: bool = (r[2] - r[1]) > (r[4] - r[3])
		var x: float = rng.randf_range(r[1] + 4, r[2] - 4) if horiz else (r[1] + 0.8)
		var z: float = (r[3] + 0.8) if horiz else rng.randf_range(r[3] + 4, r[4] - 4)
		var cat := rng.randf() < 0.65
		if cat:
			add_animal(true, CAT_NAMES[ci % CAT_NAMES.size()], x, z, 0.0, r[0], CAT_STYLES[rng.randi() % CAT_STYLES.size()], rng.randf_range(0.85, 1.1)); ci += 1
		else:
			add_animal(false, DOG_NAMES[di % DOG_NAMES.size()], x, z, 0.0, r[0], DOG_STYLES[rng.randi() % DOG_STYLES.size()], rng.randf_range(0.85, 1.3)); di += 1
		n += 1
	# yuvalarının önünde yaşayan dostlar
	var k := 0
	for sp in pet_spots:
		if rng.randf() < 0.3 and k < 14:
			var cat2 := rng.randf() < 0.5
			if cat2:
				add_animal(true, CAT_NAMES[ci % CAT_NAMES.size()], sp[0], sp[1], 0.0, "Yuvasının önünde", CAT_STYLES[rng.randi() % CAT_STYLES.size()], rng.randf_range(0.85, 1.1)); ci += 1
			else:
				add_animal(false, DOG_NAMES[di % DOG_NAMES.size()], sp[0], sp[1], 0.0, "Kulübesinin önünde", DOG_STYLES[rng.randi() % DOG_STYLES.size()], rng.randf_range(0.85, 1.3)); di += 1
			k += 1
	# bankta güneşlenen kediler (listenin sonunda: eski dostlukların kimlikleri değişmesin)
	for bk in [[49.78, 229.78], [31.0, 222.0], [42.0, 211.0]]:
		add_animal(true, CAT_NAMES[ci % CAT_NAMES.size()], bk[0], bk[1], 0.5, "Bankta güneşleniyor", CAT_STYLES[rng.randi() % CAT_STYLES.size()], rng.randf_range(0.9, 1.05)); ci += 1

func place_npc_paths() -> void:
	# yayalar: yol orta çizgisine paralel, kaldırıma yakın gidip gelirler
	var cands := []
	for r in roads:
		var L: float = maxf(r[2] - r[1], r[4] - r[3])
		if L > 30.0 and r[0] != "Galata Köprüsü":
			cands.append(r)
	for i in 40:
		var r: Array = cands[rng.randi() % cands.size()]
		var horiz: bool = (r[2] - r[1]) > (r[4] - r[3])
		var off := rng.randf_range(-0.35, 0.35)
		if horiz:
			var z: float = lerpf(r[3], r[4], 0.5 + off)
			var x0: float = rng.randf_range(r[1] + 3, (r[1] + r[2]) / 2.0)
			npc_paths.append([snappedf(x0, 0.1), snappedf(z, 0.1), snappedf(minf(x0 + rng.randf_range(25, 60), r[2] - 3), 0.1), snappedf(z, 0.1)])
		else:
			var x: float = lerpf(r[1], r[2], 0.5 + off)
			var z0: float = rng.randf_range(r[3] + 3, (r[3] + r[4]) / 2.0)
			npc_paths.append([snappedf(x, 0.1), snappedf(z0, 0.1), snappedf(x, 0.1), snappedf(minf(z0 + rng.randf_range(25, 60), r[4] - 3), 0.1)])
	# köprüde ve meydanlarda ekstra
	npc_paths.append([-3.0, -48.0, -3.0, -4.0]); npc_paths.append([3.0, -4.0, 3.0, -46.0]); npc_paths.append([2.0, -10.0, 2.0, -45.0])
	npc_paths.append([20.0, 205.0, 65.0, 240.0]); npc_paths.append([10.0, 230.0, 60.0, 200.0]); npc_paths.append([30.0, 175.0, 30.0, 270.0])
	npc_paths.append([178.0, -270.0, 178.0, -420.0]); npc_paths.append([183.0, -410.0, 183.0, -280.0]); npc_paths.append([176.0, -300.0, 176.0, -380.0])
	# İstiklal kalabalığı, Taksim ve Karaköy rıhtımı
	for k in 8:
		var xx := 175.5 + (k % 4) * 3.0
		npc_paths.append([xx, -268.0 - k * 9.0, xx, -436.0 + k * 7.0])
	npc_paths.append([165.0, -455.0, 205.0, -455.0]); npc_paths.append([200.0, -462.0, 165.0, -490.0]); npc_paths.append([190.0, -445.0, 190.0, -495.0])
	npc_paths.append([-130.0, -54.0, -20.0, -54.0]); npc_paths.append([20.0, -53.5, 140.0, -53.5]); npc_paths.append([60.0, -55.0, 200.0, -55.0])

## Yaya yollarını engellerden arındır: engel varsa en uzun açık parçayı tut
func _blocked_at(x: float, z: float) -> bool:
	for c in ALLCOL:
		if x > c[0] - 0.4 and x < c[1] + 0.4 and z > c[2] - 0.4 and z < c[3] + 0.4:
			return true
	return false

func clean_npc_paths() -> void:
	var out := []
	for p in npc_paths:
		var a := Vector2(p[0], p[1]); var b := Vector2(p[2], p[3])
		var L := a.distance_to(b)
		var n := maxi(2, int(L / 0.8))
		var best := [0, -1]
		var start := -1
		for i in n + 1:
			var q := a.lerp(b, float(i) / n)
			var free := not _blocked_at(q.x, q.y)
			if free and start < 0:
				start = i
			if (not free or i == n) and start >= 0:
				var e := i - 1 if not free else i
				if e - start > best[1] - best[0]:
					best = [start, e]
				start = -1
		if best[1] > best[0] and (best[1] - best[0]) * L / n > 6.0:
			var pa := a.lerp(b, float(best[0]) / n); var pb := a.lerp(b, float(best[1]) / n)
			out.append([snappedf(pa.x, 0.1), snappedf(pa.y, 0.1), snappedf(pb.x, 0.1), snappedf(pb.y, 0.1)])
	npc_paths = out

# ------------------------------------------------------------ mini harita
func make_minimap(bounds: Rect2) -> void:
	var sc := 1.0
	var w := int(bounds.size.x * sc); var h := int(bounds.size.y * sc)
	var img := Image.create(w, h, false, Image.FORMAT_RGBA8)
	img.fill(C("#7fb7d1"))
	var to_px := func(x0: float, x1: float, z0: float, z1: float) -> Rect2i:
		return Rect2i(int((x0 - bounds.position.x) * sc), int((z0 - bounds.position.y) * sc), max(1, int((x1 - x0) * sc)), max(1, int((z1 - z0) * sc)))
	for land in lands:
		img.fill_rect(to_px.call(land[0], land[1], land[2], land[3]), C("#efe4cf"))
	for sq in squares:
		img.fill_rect(to_px.call(sq[0], sq[1], sq[2], sq[3]), C("#f7f0e2"))
	for p in parks:
		img.fill_rect(to_px.call(p[0], p[1], p[2], p[3]), C("#a9cf8a"))
	for c in COL:
		if (c[1] - c[0]) * (c[3] - c[2]) > 6.0:
			img.fill_rect(to_px.call(c[0], c[1], c[2], c[3]), C("#c9a98a"))
	for b in mini_extra:
		img.fill_rect(to_px.call(b[0], b[1], b[2], b[3]), C(b[4]))
	img.save_png("res://map/%s_mini.png" % city_id)


# ------------------------------------------------------------ şehirler için ortak yardımcılar
## Izgara mahalle: xs/zs yol eksenleri; aralarına blok koyar (skip dikdörtgenleriyle çakışanlar hariç)
func grid(xs0: Array, zs0: Array, st: Dictionary, vnames: Array, hnames: Array, skips: Array, rw: float = 5.0, chunk: String = "Mahalle") -> void:
	var xs := xs0.duplicate(); xs.sort()
	var zs := zs0.duplicate(); zs.sort()
	for i in xs.size():
		road(str(vnames[i % vnames.size()]), xs[i] - rw / 2.0, xs[i] + rw / 2.0, zs[0], zs[zs.size() - 1])
	for j in zs.size():
		road(str(hnames[j % hnames.size()]), xs[0], xs[xs.size() - 1], zs[j] - rw / 2.0, zs[j] + rw / 2.0)
	for j in zs.size() - 1:
		for i in xs.size() - 1:
			var bx0: float = xs[i] + rw / 2.0; var bx1: float = xs[i + 1] - rw / 2.0
			var bz0: float = zs[j] + rw / 2.0; var bz1: float = zs[j + 1] - rw / 2.0
			var skip := false
			for r in skips:
				if bx1 > r[0] and bx0 < r[1] and bz1 > r[2] and bz0 < r[3]:
					skip = true
			if not skip and bx1 - bx0 > 6.0 and bz1 - bz0 > 6.0:
				block(bx0, bx1, bz0, bz1, st)
		flush_chunk("%s_%d" % [chunk, j])
	for j in range(0, zs.size(), 2):
		for i in range(0, xs.size(), 2):
			if rng.randf() < 0.5:
				street_sign(str(vnames[i % vnames.size()]), xs[i] + rw / 2.0 + 0.4, zs[j] + rw / 2.0 + 0.4)

## Nehir/deniz: su alanı, kıyı duvarı ve çarpışma (köprü aralıkları boş bırakılır). Yatay nehir (x boyunca).
func water_h(x0: float, x1: float, z0: float, z1: float, gaps: Array, wall_n := true, wall_s := true) -> void:
	var cuts := [x0]
	for gp in gaps:
		cuts.append(gp[0]); cuts.append(gp[1])
	cuts.append(x1)
	for k in range(0, cuts.size(), 2):
		var a: float = cuts[k]; var b: float = cuts[k + 1]
		if b - a > 0.5:
			add_col(a, b, z0, z1, 14.0, false)
	var sc := stone(C("#c9bda6"))
	for k in range(0, cuts.size(), 2):
		var a2: float = cuts[k]; var b2: float = cuts[k + 1]
		if b2 - a2 < 0.5:
			continue
		if wall_n:
			g.box(b2 - a2, 1.6, 0.8, (a2 + b2) / 2.0, -1.0, z0 + 0.4, sc)
			g.box(b2 - a2, 0.7, 0.5, (a2 + b2) / 2.0, 0.0, z0 - 0.25, C("#d8cfbd"))
		if wall_s:
			g.box(b2 - a2, 1.6, 0.8, (a2 + b2) / 2.0, -1.0, z1 - 0.4, sc)
			g.box(b2 - a2, 0.7, 0.5, (a2 + b2) / 2.0, 0.0, z1 + 0.25, C("#d8cfbd"))

## Dikey (z boyunca) su
func water_v(x0: float, x1: float, z0: float, z1: float, gaps: Array) -> void:
	var cuts := [z0]
	for gp in gaps:
		cuts.append(gp[0]); cuts.append(gp[1])
	cuts.append(z1)
	for k in range(0, cuts.size(), 2):
		var a: float = cuts[k]; var b: float = cuts[k + 1]
		if b - a > 0.5:
			add_col(x0, x1, a, b, 14.0, false)
			g.box(0.8, 1.6, b - a, x0 + 0.4, -1.0, (a + b) / 2.0, stone(C("#c9bda6")))
			g.box(0.8, 1.6, b - a, x1 - 0.4, -1.0, (a + b) / 2.0, stone(C("#c9bda6")))

## Taş köprü (z boyunca): tabliye, korkuluk, kemerler
func stone_bridge(name: String, x: float, z0: float, z1: float, w: float, col: Color, arches: int = 3, rail: Color = Color("#d8cfbd")) -> void:
	g.box(w, 0.6, z1 - z0, x, -0.45, (z0 + z1) / 2.0, col)
	g.ground(x - w / 2.0, x + w / 2.0, z0, z1, 0.16, "slab", 4.0)
	for e: float in [-1.0, 1.0]:
		g.box(0.45, 1.0, z1 - z0, x + e * (w / 2.0 - 0.22), 0.0, (z0 + z1) / 2.0, rail)
		add_col(x + e * (w / 2.0 - 0.22) - 0.22, x + e * (w / 2.0 - 0.22) + 0.22, z0, z1, 2.0, false)
	var L := z1 - z0
	for k in arches:
		var az := z0 + (k + 0.5) * L / arches
		g.put("cyl", Vector3(x, -1.0, az), col.darkened(0.15), 0, Vector3(L / arches * 0.42, w + 0.2, L / arches * 0.42), "plain", 0.0, PI / 2.0)
		if k > 0:
			g.box(w + 0.6, 2.0, 1.4, x, -2.4, z0 + k * L / arches, col)
	road(name, x - w / 2.0, x + w / 2.0, z0, z1)
	for k in int(L / 14.0):
		lamp(x + w / 2.0 - 0.5, z0 + 7.0 + k * 14.0)

## Kafe terası: tente + masalar (cephe önü)
func terrace(x0: float, z: float, n: int, col: Color, dz: float = 1.0) -> void:
	g.box(n * 2.6 + 0.6, 0.08, 2.0, x0 + n * 1.3, 2.9, z + dz * 1.0, col)
	for k in n:
		cafe(x0 + 1.3 + k * 2.6, z + dz * 1.4, col)

## Park: çim, yollar, ağaçlar, banklar
func park(x0: float, x1: float, z0: float, z1: float, name: String, kind: String = "plane", step: float = 10.0) -> void:
	g.ground(x0, x1, z0, z1, 0.03, "grass", 5.0)
	parks.append([x0, x1, z0, z1])
	area(name, x0, x1, z0, z1)
	var cx := (x0 + x1) / 2.0; var cz := (z0 + z1) / 2.0
	g.ground(cx - 2.5, cx + 2.5, z0, z1, 0.05, "slab", 4.0)
	g.ground(x0, x1, cz - 2.5, cz + 2.5, 0.05, "slab", 4.0)
	var x := x0 + 5.0
	while x < x1 - 4.0:
		var z := z0 + 5.0
		while z < z1 - 4.0:
			if absf(x - cx) > 5.0 and absf(z - cz) > 5.0 and rng.randf() < 0.8:
				tree(x + rng.randf_range(-1.5, 1.5), z + rng.randf_range(-1.5, 1.5), kind, rng.randf_range(0.85, 1.15))
			z += step
		x += step
	for k in 4:
		bench(cx + 4.2, z0 + 8.0 + k * (z1 - z0 - 16.0) / 3.0, -PI / 2.0)
		bench(cx - 4.2, z0 + 8.0 + k * (z1 - z0 - 16.0) / 3.0, PI / 2.0)

func fountain_round(x: float, z: float, r: float, col: Color = Color("#d8d2c4")) -> void:
	g.put("cyl", Vector3(x, 0.35, z), col, 0, Vector3(r, 0.7, r))
	g.put("cyl", Vector3(x, 0.72, z), C("#7cc6ea"), 0, Vector3(r * 0.9, 0.04, r * 0.9))
	g.put("cyl8", Vector3(x, 1.4, z), col, 0, Vector3(0.5, 2.0, 0.5))
	g.put("cyl", Vector3(x, 2.4, z), col, 0, Vector3(r * 0.4, 0.25, r * 0.4))
	g.put("ball", Vector3(x, 3.0, z), C("#bfe3f5"), 0, Vector3(0.5, 0.9, 0.5))
	add_col(x - r, x + r, z - r, z + r, 1.0, false)

func obelisk(x: float, z: float, h: float, col: Color) -> void:
	g.box(3.0, 1.6, 3.0, x, 0, z, C("#bfb39c"))
	g.put("box", Vector3(x, 1.6 + h / 2.0, z), col, 0, Vector3(1.3, h, 1.3))
	g.put("pyr", Vector3(x, 1.6 + h, z), C("#d4a93c"), 0, Vector3(1.3, 1.2, 1.3))
	add_col(x - 1.5, x + 1.5, z - 1.5, z + 1.5)

# ------------------------------------------------------------ ana kurulum
func _init() -> void:
	for a in OS.get_cmdline_user_args():
		if a.begins_with("--city="):
			city_id = a.substr(7)
	if city_id == "istanbul":
		_init_istanbul()
	else:
		_init_city()

## Diğer şehirler: tools/cities/<id>.gd -> build(B) veri sözlüğü döndürür
func _init_city() -> void:
	rng.seed = hash(city_id)
	font = load("res://assets/fonts/ui_font.tres")
	g = Geo.new()
	setup_materials()
	mroot = Node3D.new()
	mroot.name = city_id.capitalize()
	for n in ["Zemin", "Sehir", "SimgeYapilar", "Dekor", "Carpisma", "Tabelalar", "Hareketli"]:
		var c := Node3D.new(); c.name = n; mroot.add_child(c)
	var CityB = load("res://tools/cities/%s.gd" % city_id)
	if CityB == null or not CityB.can_instantiate():
		push_error("şehir betiği yüklenemedi")
		quit(1)
		return
	var data: Dictionary = CityB.build(self)
	lands = data.lands
	mini_extra = data.get("mini_extra", [])
	place_animals_generic(data.get("fixed_animals", []), data.cat_names, data.dog_names, data.get("street_animals", 22))
	place_npc_paths_generic(data.get("extra_npcs", []))
	clean_npc_paths()
	for n in mroot.get_children():
		_own(n)
	var ps := PackedScene.new()
	ps.pack(mroot)
	print("scn: ", ResourceSaver.save(ps, "res://map/%s.scn" % city_id, ResourceSaver.FLAG_COMPRESS))
	var bounds: Rect2 = data.bounds
	make_minimap(bounds)
	var out := {
		"col": COL, "roads": roads, "areas": areas,
		"fountains": data.fountains, "water": data.water, "walk_over": data.get("walk_over", []),
		"fishing": data.get("fishing", []), "start": data.start,
		"bounds": [bounds.position.x, bounds.position.y, bounds.size.x, bounds.size.y],
		"animals": animals, "npcs": npc_paths, "vendors": vendors, "pet_spots": pet_spots, "landmarks": data.landmarks, "movers": data.get("movers", [])}
	var f := FileAccess.open("res://map/%s.json" % city_id, FileAccess.WRITE)
	f.store_string(JSON.stringify(out))
	f.close()
	print("json: carpisma %d yol %d hayvan %d npc %d" % [COL.size(), roads.size(), animals.size(), npc_paths.size()])
	quit()

func place_animals_generic(fixed: Array, cat_names: Array, dog_names: Array, extra: int) -> void:
	var ci := 0; var di := 0
	for f in fixed:
		if f[0]:
			add_animal(true, cat_names[ci % cat_names.size()], f[1], f[2], f[3], f[4], CAT_STYLES[rng.randi() % CAT_STYLES.size()], rng.randf_range(0.9, 1.1), city_id); ci += 1
		else:
			add_animal(false, dog_names[di % dog_names.size()], f[1], f[2], f[3], f[4], DOG_STYLES[rng.randi() % DOG_STYLES.size()], rng.randf_range(0.9, 1.3), city_id); di += 1
	var side := []
	for r in roads:
		if minf(r[2] - r[1], r[4] - r[3]) < 7.0 and maxf(r[2] - r[1], r[4] - r[3]) > 20.0:
			side.append(r)
	var n := 0
	while n < extra and side.size() > 0:
		var r: Array = side[rng.randi() % side.size()]
		var horiz: bool = (r[2] - r[1]) > (r[4] - r[3])
		var x: float = rng.randf_range(r[1] + 4, r[2] - 4) if horiz else (r[1] + 0.8)
		var z: float = (r[3] + 0.8) if horiz else rng.randf_range(r[3] + 4, r[4] - 4)
		var cat := rng.randf() < 0.6
		if cat:
			add_animal(true, cat_names[ci % cat_names.size()], x, z, 0.0, r[0], CAT_STYLES[rng.randi() % CAT_STYLES.size()], rng.randf_range(0.85, 1.1), city_id); ci += 1
		else:
			add_animal(false, dog_names[di % dog_names.size()], x, z, 0.0, r[0], DOG_STYLES[rng.randi() % DOG_STYLES.size()], rng.randf_range(0.85, 1.3), city_id); di += 1
		n += 1

func place_npc_paths_generic(extra: Array) -> void:
	var cands := []
	for r in roads:
		var L: float = maxf(r[2] - r[1], r[4] - r[3])
		if L > 30.0 and minf(r[2] - r[1], r[4] - r[3]) < 30.0:
			cands.append(r)
	for i in 48:
		if cands.is_empty():
			break
		var r: Array = cands[rng.randi() % cands.size()]
		var horiz: bool = (r[2] - r[1]) > (r[4] - r[3])
		var off := rng.randf_range(-0.35, 0.35)
		if horiz:
			var z: float = lerpf(r[3], r[4], 0.5 + off)
			var x0: float = rng.randf_range(r[1] + 3, (r[1] + r[2]) / 2.0)
			npc_paths.append([snappedf(x0, 0.1), snappedf(z, 0.1), snappedf(minf(x0 + rng.randf_range(25, 60), r[2] - 3), 0.1), snappedf(z, 0.1)])
		else:
			var x: float = lerpf(r[1], r[2], 0.5 + off)
			var z0: float = rng.randf_range(r[3] + 3, (r[3] + r[4]) / 2.0)
			npc_paths.append([snappedf(x, 0.1), snappedf(z0, 0.1), snappedf(x, 0.1), snappedf(minf(z0 + rng.randf_range(25, 60), r[4] - 3), 0.1)])
	for e in extra:
		npc_paths.append(e)

func _init_istanbul() -> void:
	rng.seed = 2027
	font = load("res://assets/fonts/ui_font.tres")
	g = Geo.new()
	setup_materials()
	mroot = Node3D.new()
	mroot.name = "Istanbul"
	for n in ["Zemin", "Sehir", "SimgeYapilar", "Dekor", "Carpisma", "Tabelalar", "Hareketli"]:
		var c := Node3D.new(); c.name = n; mroot.add_child(c)
	g.ground(-225, 237, 0, 295, 0.0, "cobble", 4.0)
	g.ground(-225, 237, 0, 12, 0.012, "slab", 6.0)
	g.flush(mroot.get_node("Zemin"), mroot, "ZeminGuney", false)

	build_peninsula()
	build_specials()
	build_north()
	build_istiklal()
	build_decor()
	place_animals()
	place_npc_paths()
	clean_npc_paths()

	for n in mroot.get_children():
		_own(n)
	var ps := PackedScene.new()
	ps.pack(mroot)
	print("scn: ", ResourceSaver.save(ps, "res://map/istanbul.scn", ResourceSaver.FLAG_COMPRESS))
	var bounds := Rect2(-240, -515, 500, 825)
	make_minimap(bounds)
	var data := {
		"col": COL, "roads": roads, "areas": areas,
		"fountains": [[42, 222], [178, 110], [-88, 182], [-30, 255], [57, -202], [15, 48], [180, -350], [0, -70]],
		"bridge": [-7, 7, -50, 0], "pier": [40, 58, -20, 0],
		"water": [[-260, 260, -50, 0], [237, 300, -50, 310], [230, 300, -270, -50]],
		"start": [42.0, 240.0, -0.72],
		"home": [home_door.x, home_door.z],
		"tram": [[125, 8], [125, 160], [-210, 160]],
		"tram2": [[180, -268], [180, -425]],
		"bounds": [bounds.position.x, bounds.position.y, bounds.size.x, bounds.size.y],
		"animals": animals, "npcs": npc_paths, "vendors": vendors, "pet_spots": pet_spots,
		"landmarks": [["Ayasofya", 88, 186], ["Sultan Ahmet Camii", -2, 255], ["Hipodrom", -88, 222], ["Evin", -111, 240], ["Kapalıçarşı", -172, 205], ["Gülhane", 185, 130], ["Yeni Cami", -10, 34],
			["Mısır Çarşısı", -90, 25], ["Sirkeci", 80, 30], ["Galata Köprüsü", 0, -25], ["Karaköy", -40, -75], ["Galata Kulesi", 45, -202], ["İstiklal", 180, -350], ["Taksim", 180, -470]]}
	var f := FileAccess.open("res://map/istanbul.json", FileAccess.WRITE)
	f.store_string(JSON.stringify(data))
	f.close()
	print("json: carpisma ", COL.size(), " yol ", roads.size(), " hayvan ", animals.size(), " npc ", npc_paths.size())
	quit()

func _own(n: Node) -> void:
	n.owner = mroot
	for c in n.get_children():
		_own(c)
