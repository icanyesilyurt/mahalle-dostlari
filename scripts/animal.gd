extends Node3D
## Bir sokak hayvanı: kendi köşesinde dolaşır, acıkır, susar, seni hatırlar, seninle oynar.

signal greeted(animal)

var id := ""
var animal_name := ""
var place_name := ""
var cat := true
var color := Color.WHITE
var home := Vector3.ZERO
var target := Vector3.ZERO
var hungry := true
var thirsty := true
var friend := 0
var greet := false
var greeted_today := false
var happy := 0.0
var wt := 0.0
var ph := 0.0
var cols: Array = []
var font: Font
var pattern := "solid"      # solid, tekir, smokin, uc_renk, benekli
var color2 := Color.WHITE
var size := 1.0
var tagged := false         # küpeli sokak köpeği

# oyun modu: "" (serbest), "go" (hedefe koş), "wait" (yanında bekle), "chase" (lazer kovala)
var mode := ""
var goal := Vector3.ZERO
var hop := 0.0

var legs: Array = []
var tail: Node3D
var head: Node3D
var bowl: Node3D
var drop: Node3D
var name_label: Label3D
var top_y := 1.35

func _mat(c: Color, unshaded := false) -> StandardMaterial3D:
	var m := StandardMaterial3D.new()
	m.albedo_color = c
	m.roughness = 0.9
	if unshaded:
		m.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	return m

func _part(parent: Node3D, size: Vector3, pos: Vector3, m: Material, mesh: Mesh = null) -> MeshInstance3D:
	var mi := MeshInstance3D.new()
	if mesh == null:
		var bm := BoxMesh.new()
		bm.size = size
		mi.mesh = bm
	else:
		mi.mesh = mesh
		mi.scale = size
	mi.material_override = m
	mi.position = pos
	parent.add_child(mi)
	return mi

const DOG_SCALE := 0.27
const Breeds := preload("res://scripts/breeds.gd")
const DogShader := preload("res://map/dog.gdshader")
var breed := ""
var anim: AnimationPlayer
var wag: Node
var eat_t := 0.0
var cur_anim := ""
# kedi pozları: ayakta, oturma, ekmek (yatma), yalanma
var rig: Node3D
var leg_h := 0.24
var eye_n: Array = []
var pose := "stand"
var pose_t := 0.0
var sit_k := 0.0
var loaf_k := 0.0
var groom_k := 0.0
var blink_t := 2.0
var look_y := 0.0
var idle_t := 4.0
var jumped := false

func build() -> void:
	ph = randf() * 6.0
	wt = randf() * 4.0
	target = home
	position = home
	var sph := SphereMesh.new(); sph.radius = 1.0; sph.height = 2.0; sph.radial_segments = 16; sph.rings = 8
	if cat:
		_build_cat(sph)
	else:
		_build_dog(sph)

	bowl = Node3D.new(); bowl.position = Vector3(-0.2, top_y, 0); add_child(bowl)
	var cyl := CylinderMesh.new(); cyl.top_radius = 1.0; cyl.bottom_radius = 0.7; cyl.height = 1.0; cyl.radial_segments = 16
	_part(bowl, Vector3(0.2, 0.1, 0.2), Vector3.ZERO, _mat(Color("#f6c445"), true), cyl)
	for k in 3:
		_part(bowl, Vector3(0.06, 0.06, 0.06), Vector3(-0.08 + k * 0.08, 0.07, 0), _mat(Color("#a8622e"), true), sph)
	drop = Node3D.new(); drop.position = Vector3(0.2, top_y, 0); add_child(drop)
	var cone2 := CylinderMesh.new(); cone2.top_radius = 0.0; cone2.bottom_radius = 1.0; cone2.height = 1.0; cone2.radial_segments = 12
	_part(drop, Vector3(0.12, 0.12, 0.12), Vector3.ZERO, _mat(Color("#7cc6ea"), true), sph)
	_part(drop, Vector3(0.105, 0.16, 0.105), Vector3(0, 0.13, 0), _mat(Color("#7cc6ea"), true), cone2)

	name_label = Label3D.new()
	name_label.billboard = BaseMaterial3D.BILLBOARD_ENABLED
	name_label.font = font
	name_label.font_size = 56
	name_label.pixel_size = 0.005
	name_label.outline_size = 14
	name_label.modulate = Color("#23302b")
	name_label.outline_modulate = Color("#fffaf1")
	name_label.position = Vector3(0, top_y + 0.4, 0)
	add_child(name_label)
	scale = Vector3.ONE * size
	refresh()

## Kedi: tombul, büyük kafalı, yuvarlak hatlı (prosedürel). Irk parametreleri breeds.gd'de.
func _build_cat(sph: SphereMesh) -> void:
	var B: Dictionary = Breeds.get_breed(true, breed)
	if not B.is_empty():
		color = Color(B.base)
		color2 = Color(B.get("second", "#ffffff"))
		pattern = B.get("pattern", "solid")
	var fluff: float = B.get("fluff", 0.0)
	var hs: float = B.get("head", 1.0)
	var es: float = B.get("ears", 1.0)
	var ls: float = B.get("legs", 1.0)
	var ts: float = B.get("tail", 1.0)
	var hairless: bool = B.get("hairless", false)
	var flat: bool = B.get("flat", false)
	var pts := pattern == "points"
	top_y = 1.15
	rig = Node3D.new(); add_child(rig)
	leg_h = 0.24 * ls
	var m := _mat(color)
	var light := _mat(color.lightened(0.3) if not pts else color.lightened(0.15))
	var dk := _mat(Color("#2a2623"))
	var pk := _mat(Color("#f2a0a8"))
	var ptm := _mat(color2)
	var eyes: Array = B.get("eyes", [])
	if eyes.is_empty():
		var e0: String = ["#9ccf5a", "#e8b53a", "#6fb3d6", "#c9a03a"][randi() % 4]
		eyes = [e0, e0]
	var shine := _mat(Color.WHITE, true)
	var lh := 0.24 * ls
	var bw := 1.0 + fluff * 0.3
	var body := _part(rig, Vector3(0.17 * bw, 0.155 * bw, 0.27 * (1.0 + fluff * 0.15)), Vector3(0, 0.06 + lh, -0.02), m, sph)
	body.rotation.x = -0.08
	_part(rig, Vector3(0.12 * bw, 0.12 * bw, 0.17), Vector3(0, 0.03 + lh, 0.06), light, sph)
	if fluff > 0.0:
		# kabarık göğüs yelesi
		_part(rig, Vector3(0.15, 0.13, 0.1) * (1.0 + fluff * 0.4), Vector3(0, 0.12 + lh, 0.15), light, sph)
	head = Node3D.new(); head.position = Vector3(0, 0.28 + lh + fluff * 0.03, 0.22 + fluff * 0.02); head.scale = Vector3.ONE * hs; rig.add_child(head)
	_part(head, Vector3(0.175, 0.155, 0.16 if not flat else 0.13) * (1.0 + fluff * 0.12), Vector3.ZERO, ptm if (pts and false) else m, sph)
	if pts:
		_part(head, Vector3(0.1, 0.085, 0.06), Vector3(0, -0.035, 0.11), ptm, sph)
	var mz := 0.12 if not flat else 0.1
	for sx: float in [-1.0, 1.0]:
		_part(head, Vector3(0.06, 0.05, 0.05), Vector3(0.04 * sx, -0.06, mz), light if not pts else ptm, sph)
	_part(head, Vector3(0.022, 0.016, 0.015), Vector3(0, -0.03, mz + 0.035), pk, sph)
	var cone := CylinderMesh.new(); cone.top_radius = 0.0; cone.bottom_radius = 1.0; cone.height = 1.0; cone.radial_segments = 8
	var em := ptm if pts else m
	for i in 2:
		var sx := -1.0 if i == 0 else 1.0
		if B.get("fold", false):
			var f := _part(head, Vector3(0.06, 0.05, 0.045), Vector3(0.075 * sx, 0.125, 0.02), em, sph)
			f.rotation.x = 0.5
		else:
			var e := _part(head, Vector3(0.065 * es, 0.12 * es, 0.04), Vector3(0.095 * sx, 0.13 + 0.02 * es, -0.01), em, cone)
			e.rotation.z = -0.32 * sx
			var ei := _part(head, Vector3(0.035 * es, 0.07 * es, 0.02), Vector3(0.093 * sx, 0.12 + 0.02 * es, 0.012), pk, cone)
			ei.rotation.z = -0.32 * sx
			if B.get("tufts", false):
				var tf := _part(head, Vector3(0.015, 0.06, 0.015), Vector3(0.12 * sx, 0.25, -0.01), dk, cone)
				tf.rotation.z = -0.32 * sx
		var ez := 0.132 if not flat else 0.11
		var eye := Node3D.new(); eye.position = Vector3(0.07 * sx, 0.02, ez); head.add_child(eye)
		_part(eye, Vector3(0.042, 0.048, 0.025), Vector3.ZERO, _mat(Color(eyes[i])), sph)
		_part(eye, Vector3(0.024, 0.04, 0.01), Vector3(0, 0, 0.02), dk, sph)
		_part(eye, Vector3(0.01, 0.01, 0.006), Vector3(0.008 * sx, 0.015, 0.028), shine, sph)
		eye_n.append(eye)
	for p: Vector2 in [Vector2(-0.075, 0.13), Vector2(0.075, 0.13), Vector2(-0.075, -0.15), Vector2(0.075, -0.15)]:
		var leg := Node3D.new(); leg.position = Vector3(p.x, lh, p.y)
		if p.y > 0.0: rig.add_child(leg)
		else: add_child(leg)
		_part(leg, Vector3(0.045, 0.12 * ls, 0.045) * (1.0 + fluff * 0.2), Vector3(0, -0.12 * ls, 0), ptm if pts else m, sph)
		_part(leg, Vector3(0.05, 0.035, 0.06), Vector3(0, -lh + 0.03, 0.015), ptm if pts else m, sph)
		legs.append(leg)
	tail = Node3D.new(); tail.position = Vector3(0, 0.12 + lh, -0.26); rig.add_child(tail)
	var seg: Node3D = tail
	var bend := [-0.9, -0.35, -0.3, -0.25]
	var tw := 1.0 + fluff * 1.2
	if hairless: tw = 0.6
	for k in 4:
		var j := Node3D.new(); j.rotation.x = bend[k]; seg.add_child(j)
		if k > 0:
			j.position = Vector3(0, 0, -0.1 * ts)
		_part(j, Vector3((0.035 - k * 0.003) * tw, (0.035 - k * 0.003) * tw, 0.07 * ts), Vector3(0, 0, -0.05 * ts), ptm if (pts and k > 1) else m, sph)
		seg = j
	if hairless:
		# kırışık alın
		for k in 3:
			_part(head, Vector3(0.06, 0.006, 0.02), Vector3(0, 0.07 + k * 0.022, 0.12), _mat(color.darkened(0.15)), sph)
	_decorate(sph)

## Kedi desenleri: tekir çizgileri, smokin göğüs ve patiler, üç renkli lekeler, benekler
func _decorate(sph: SphereMesh) -> void:
	var m2 := _mat(color2)
	var lh: float = (legs[0] as Node3D).position.y if legs.size() > 0 else 0.24
	match pattern:
		"tekir":
			for k in 4:
				var st := _part(rig, Vector3(0.13, 0.03, 0.035), Vector3(0, 0.2 + lh, -0.16 + k * 0.08), m2, sph)
				st.rotation.x = 0.1
			for k in 3:
				_part(head, Vector3(0.012, 0.012, 0.05), Vector3(-0.03 + k * 0.03, 0.14, 0.06), m2, sph)
		"smokin":
			_part(rig, Vector3(0.1, 0.11, 0.07), Vector3(0, 0.06 + lh, 0.17), m2, sph)
			_part(head, Vector3(0.09, 0.06, 0.05), Vector3(0, -0.07, 0.12), m2, sph)
			for l in legs:
				_part(l as Node3D, Vector3(0.052, 0.037, 0.062), Vector3(0, -lh + 0.035, 0.016), m2, sph)
		"uc_renk":
			_part(rig, Vector3(0.1, 0.07, 0.11), Vector3(0.05, 0.18 + lh, -0.08), m2, sph)
			_part(rig, Vector3(0.08, 0.06, 0.09), Vector3(-0.06, 0.17 + lh, 0.06), _mat(Color("#2b2828")), sph)
			_part(head, Vector3(0.08, 0.07, 0.08), Vector3(0.06, 0.08, 0.0), m2, sph)
		"benek":
			for k in 9:
				_part(rig, Vector3(0.035, 0.02, 0.035), Vector3(randf_range(-0.12, 0.12), 0.17 + lh + randf() * 0.02, randf_range(-0.2, 0.15)), m2, sph)
		"solid", "points":
			if pattern == "solid" and breed == "" and randf() < 0.3:
				_part(head, Vector3(0.05, 0.04, 0.04), Vector3(0, 0.1, 0.1), _mat(color.darkened(0.45)), sph)
	if breed == "" and randf() < 0.25:
		var tor := TorusMesh.new(); tor.inner_radius = 0.8; tor.outer_radius = 1.0
		_part(head, Vector3(0.09, 0.09, 0.09), Vector3(0, -0.11, -0.02), _mat(Color(["#c8423a", "#3b6aa8", "#e2a33b"][randi() % 3])), tor)

## Köpek: Quaternius animasyonlu model; ırka göre kemik ölçeği, kulak, renk ve desen
func _build_dog(sph: SphereMesh) -> void:
	var B: Dictionary = Breeds.get_breed(false, breed)
	top_y = 1.25
	var model_id: String = B.get("model", "")
	if model_id == "":
		model_id = "husky" if (size > 1.15 or color.get_luminance() < 0.25) else "shiba"
	var model: Node3D = (load("res://assets/animals/%s.glb" % model_id) as PackedScene).instantiate()
	var bs: float = B.get("size", 1.0) if not B.is_empty() else 1.0
	var sq: float = B.get("squash", 1.0)
	var ln: float = B.get("long", 1.0)
	model.scale = Vector3(DOG_SCALE * bs, DOG_SCALE * bs * sq, DOG_SCALE * bs * ln)
	top_y = 1.25 * bs * (0.5 + 0.5 * sq)
	add_child(model)
	var mesh_i: MeshInstance3D
	for n in model.find_children("*", "MeshInstance3D", true, false):
		mesh_i = n
	var main_c := color
	var light_c := color2 if pattern != "solid" else color.lightened(0.35)
	if not B.is_empty():
		main_c = Color(B.main); light_c = Color(B.light)
		color = main_c
	var sm := ShaderMaterial.new()
	sm.shader = DogShader
	sm.set_shader_parameter("base", main_c)
	sm.set_shader_parameter("mark", Color(B.get("mark", "#2a2422")) if not B.is_empty() else color2)
	var ab := mesh_i.mesh.get_aabb()
	sm.set_shader_parameter("box_pos", ab.position)
	sm.set_shader_parameter("box_size", ab.size)
	sm.set_shader_parameter("spots", B.get("spots", 0.35 if (B.is_empty() and pattern == "benekli") else 0.0))
	sm.set_shader_parameter("saddle", B.get("saddle", 0.0))
	sm.set_shader_parameter("mask", B.get("mask", 0.0))
	mesh_i.set_surface_override_material(0, sm)
	mesh_i.set_surface_override_material(1, _mat(light_c))
	var sk := model.find_child("Skeleton3D", true, false) as Skeleton3D
	head = BoneAttachment3D.new()
	(head as BoneAttachment3D).bone_name = "Head"
	sk.add_child(head)
	wag = load("res://scripts/tail_wag.gd").new()
	sk.add_child(wag)
	# ırk biçimi
	var sc := {}
	var rt := {}
	if B.has("head"): sc["Head"] = float(B.head)
	if B.has("ears"):
		sc["Ear1.L"] = float(B.ears); sc["Ear1.R"] = float(B.ears)
	if B.has("floppy"):
		rt["Ear2.L"] = Vector3(float(B.floppy), 0, 0); rt["Ear2.R"] = Vector3(float(B.floppy), 0, 0)
	if B.has("chest"): sc["Torso"] = Vector3(float(B.chest), 1.0, float(B.chest))
	if B.has("neck"): sc["Neck1"] = Vector3(1.0, float(B.neck), 1.0)
	if B.has("tail"): sc["Tail1"] = float(B.tail)
	if not sc.is_empty() or not rt.is_empty():
		var shp = load("res://scripts/dog_shape.gd").new()
		shp.setup(sc, rt)
		sk.add_child(shp)
	anim = model.find_child("AnimationPlayer", true, false) as AnimationPlayer
	for n in ["Idle", "Walk", "Gallop", "Eating", "Idle_2", "Idle_2_HeadLow"]:
		if anim.has_animation(n):
			anim.get_animation(n).loop_mode = Animation.LOOP_LINEAR
	anim.play("Idle")
	anim.seek(randf() * 2.0)
	cur_anim = "Idle"
	# kemiğe takılan parçalar için ölçek telafisi
	var acc := 1.0
	var nd: Node = sk
	while nd != null and nd != self:
		if nd is Node3D:
			acc *= (nd as Node3D).scale.x
		nd = nd.get_parent()
	var hb := sk.find_bone("Head")
	var inv := 1.0 / (acc * sk.get_bone_global_rest(hb).basis.get_scale().x)
	if B.get("puff", false):
		# kaniş ponponları
		var pm := _mat(light_c)
		for bn in ["Head", "Tail3", "FrontLowerLeg.L", "FrontLowerLeg.R"]:
			var at := BoneAttachment3D.new(); at.bone_name = bn; sk.add_child(at)
			_part(at, Vector3.ONE * (0.09 if bn == "Head" else 0.06) * inv, Vector3.ZERO, pm, sph)
	if tagged:
		var ear := BoneAttachment3D.new(); ear.bone_name = "Ear2.R"; sk.add_child(ear)
		_part(ear, Vector3(0.04, 0.05, 0.015) * inv, Vector3.ZERO, _mat(Color("#f2c230")))
	if (not B.is_empty() and breed != "sokak") or randf() < 0.4:
		var neck := BoneAttachment3D.new(); neck.bone_name = "Neck1"; sk.add_child(neck)
		var tor := TorusMesh.new(); tor.inner_radius = 0.8; tor.outer_radius = 1.0; tor.rings = 16; tor.ring_segments = 6
		var c := _part(neck, Vector3(0.13, 0.13, 0.13) * inv, Vector3.ZERO, _mat(Color(["#c8423a", "#3b6aa8", "#2f7d6d"][randi() % 3])), tor)
		c.rotation.x = PI / 2.0

func _cat_pose(delta: float, moving: bool, t: float, wag_on: bool, flat: Vector3) -> void:
	var resting := not moving and mode == "" and not greet and eat_t <= 0.0
	pose_t -= delta
	if not resting:
		if moving and pose != "stand":
			pose = "stand"; pose_t = randf_range(3.0, 6.0)
	elif pose_t <= 0.0:
		pose_t = randf_range(5.0, 11.0)
		var r := randf()
		pose = "stand" if r < 0.25 else ("sit" if r < 0.55 else ("loaf" if r < 0.85 else "groom"))
	var k := minf(1.0, delta * 3.0)
	sit_k = lerpf(sit_k, 1.0 if pose in ["sit", "groom"] else 0.0, k)
	loaf_k = lerpf(loaf_k, 1.0 if pose == "loaf" else 0.0, k)
	groom_k = lerpf(groom_k, 1.0 if pose == "groom" else 0.0, k)
	# gövde arka kalçadan döner (oturma), yatınca alçalır
	var pivot := Vector3(0, leg_h, -0.17)
	var bas := Basis(Vector3.RIGHT, -0.42 * sit_k)
	rig.transform = Transform3D(bas, pivot - bas * pivot + Vector3(0, -leg_h * 0.8 * loaf_k, 0))
	var sw := sin(ph) * 0.6 if moving else 0.0
	for i in legs.size():
		var lg := legs[i] as Node3D
		var front := i < 2
		var sgn := 1.0 if i % 2 == 0 else -1.0
		lg.rotation.x = sw * sgn * (1.0 if front else -1.0)
		var sy := 1.0 - 0.85 * loaf_k
		if front:
			lg.rotation.x += 0.42 * sit_k
			sy *= 1.0 + 0.5 * sit_k
		else:
			sy *= 1.0 - 0.45 * sit_k
		lg.scale.y = maxf(0.12, sy)
	if groom_k > 0.05 and legs.size() > 0:
		# ön patiyi yalayıp yüzünü siler
		(legs[0] as Node3D).rotation.x -= groom_k * (1.3 + sin(t * 6.0) * 0.25)
	tail.rotation.y = sin(t * (14.0 if wag_on else 1.6) + ph) * (0.7 if wag_on else 0.3)
	tail.rotation.x = 0.6 * maxf(sit_k, loaf_k)
	# başı oyuncuya çevir, göz kırp
	var to := flat - global_position
	var want := 0.0
	if to.length() < 6.0 and not moving:
		want = clampf(wrapf(atan2(to.x, to.z) - global_rotation.y, -PI, PI), -0.9, 0.9)
	look_y = lerpf(look_y, want, minf(1.0, delta * 4.0))
	head.rotation.y = look_y + groom_k * 0.4
	head.rotation.x = sin(t * 0.7 + ph) * 0.08 + groom_k * (0.45 + sin(t * 6.0) * 0.12)
	if eat_t > 0.0 and not moving:
		head.rotation.x = 0.45 + sin(t * 9.0) * 0.08
	blink_t -= delta
	var bl := 1.0
	if blink_t < 0.12:
		bl = 0.1
		if blink_t <= 0.0:
			blink_t = randf_range(2.0, 5.0)
	if loaf_k > 0.7 and pose == "loaf" and pose_t < 4.0:
		bl = 0.15  # ekmek pozunda gözlerini yumar
	for e in eye_n:
		(e as Node3D).scale.y = bl

func _play(n: String, blend := 0.2) -> void:
	if anim and cur_anim != n:
		cur_anim = n
		anim.play(n, blend)

## Mama ya da su verildiğinde biraz yesin/içsin
func eat(sec := 2.6) -> void:
	eat_t = sec

func refresh() -> void:
	name_label.text = animal_name
	name_label.visible = friend > 0
	bowl.visible = hungry and mode == ""
	drop.visible = thirsty and mode == ""
	var both := hungry and thirsty
	bowl.position.x = -0.2 if both else 0.0
	drop.position.x = 0.2 if both else 0.0

func mouth_pos() -> Vector3:
	if cat:
		return head.global_position + global_transform.basis.z * 0.18 + Vector3(0, -0.08, 0)
	return head.global_position + global_transform.basis.z * 0.22 * size + Vector3(0, -0.05, 0)

func _push_out(p: Vector3, r: float) -> Vector3:
	for c in cols:
		var cx := clampf(p.x, c[0], c[1])
		var cz := clampf(p.z, c[2], c[3])
		var dx := p.x - cx
		var dz := p.z - cz
		var d2 := dx * dx + dz * dz
		if d2 < r * r and d2 > 0.000001:
			var d := sqrt(d2)
			p.x += dx / d * (r - d)
			p.z += dz / d * (r - d)
	return p

func _step_to(p: Vector3, spd: float, stop: float, delta: float) -> float:
	var to := Vector3(p.x - position.x, 0, p.z - position.z)
	var d := to.length()
	if d > stop:
		position += to / d * minf(d - stop, spd * delta)
		position = _push_out(position, 0.3)
		rotation.y = lerp_angle(rotation.y, atan2(to.x, to.z), minf(1.0, delta * 12.0))
	return d

func tick(delta: float, player_pos: Vector3, t: float) -> void:
	var flat := Vector3(player_pos.x, 0, player_pos.z)
	var moving := false
	if mode != "":
		greet = false
		if mode == "go":
			moving = _step_to(goal, 7.0 if not cat else 5.5, 0.35, delta) > 0.4
		elif mode == "chase":
			var d := _step_to(goal, 6.0, 0.25, delta)
			moving = d > 0.3
		elif mode == "follow":
			# sahiplenilen dost: oyuncunun peşinden gelir
			var df := Vector2(flat.x - position.x, flat.z - position.z).length()
			if df > 25.0:
				position = flat + Vector3(randf_range(-1, 1), 0, randf_range(-1, 1))
			moving = _step_to(flat, 6.8 if df > 4.0 else 4.0, 1.7, delta) > 1.75
		elif mode == "wait":
			var d2 := _step_to(flat, 4.0, 1.3, delta)
			moving = d2 > 1.35
			if not moving:
				var to := flat - position
				rotation.y = lerp_angle(rotation.y, atan2(to.x, to.z), minf(1.0, delta * 8.0))
		position.y = maxf(0.0, position.y - delta * 2.0)
	elif greet or (friend > 0 and not greeted_today and position.distance_to(flat) < 10.0):
		greet = true
		position.y = maxf(0.0, position.y - delta * 2.0)
		var d3 := _step_to(flat, 6.5, 1.3, delta)
		moving = d3 > 1.35
		if not moving:
			greet = false
			greeted_today = true
			happy = 2.4
			wt = 3.5
			target = home
			greeted.emit(self)
	else:
		wt -= delta
		if wt <= 0.0:
			wt = 3.0 + randf() * 5.0
			# poz vermiş kedi yerinden kalkmasın
			if not cat or pose == "stand" or randf() < 0.15:
				target = home + Vector3(randf_range(-0.8, 0.8), 0, randf_range(-0.8, 0.8))
		var to2 := Vector3(target.x - position.x, 0, target.z - position.z)
		var d4 := to2.length()
		if d4 > 0.08:
			var sp := 3.5 if d4 > 3.0 else 0.7
			position += to2 / d4 * minf(d4, sp * delta)
			rotation.y = lerp_angle(rotation.y, atan2(to2.x, to2.z), minf(1.0, delta * 6.0))
			moving = true
		var at_home := Vector2(position.x - home.x, position.z - home.z).length() < 0.6
		position.y = lerpf(position.y, home.y if at_home else 0.0, minf(1.0, delta * 6.0))
	if hop > 0.0:
		hop -= delta
		position.y = sin(clampf(hop / 0.45, 0.0, 1.0) * PI) * 0.45
	if happy > 0.0:
		happy -= delta
	ph += delta * (14.0 if moving else 3.0)
	var wag_on := greet or happy > 0.0 or mode != ""
	if eat_t > 0.0:
		eat_t -= delta
	if anim:
		if eat_t > 0.0 and not moving:
			_play("Eating")
		elif moving:
			var fast := mode != "" or greet or Vector2(target.x - position.x, target.z - position.z).length() > 3.0
			_play("Gallop" if fast else "Walk")
		elif not cur_anim.begins_with("Idle") and not (cur_anim == "Jump_ToIdle" and anim.is_playing() and anim.current_animation_position < anim.current_animation_length - 0.05):
			_play("Idle")
		wag.amount = lerpf(wag.amount, 1.0 if wag_on else 0.15, minf(1.0, delta * 5.0))
	else:
		_cat_pose(delta, moving, t, wag_on, flat)
	if anim and not moving and eat_t <= 0.0:
		# köpek boşta: arada başını eğip koklar, etrafa bakar
		idle_t -= delta
		if idle_t <= 0.0:
			idle_t = randf_range(4.0, 9.0)
			if cur_anim == "Idle":
				_play(["Idle_2", "Idle_2_HeadLow", "Idle"][randi() % 3], 0.3)
			else:
				_play("Idle", 0.3)
		if happy > 1.8 and not jumped:
			jumped = true
			_play("Jump_ToIdle", 0.1)
	if happy <= 0.0:
		jumped = false
	var bob := sin(t * 3.0 + ph) * 0.05
	bowl.position.y = top_y + bob
	drop.position.y = top_y + bob
