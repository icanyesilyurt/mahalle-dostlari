extends Node3D
## Oyuncunun evi (iç mekân): oturma köşesi, yatak, yemek masası ve dostun köşesi.
## Harita dışında, ORIGIN noktasında kurulur. Kapı +x duvarında.

const W := 12.0
const D := 9.0
const H := 3.4
var door_pos := Vector3.ZERO     # kapının iç tarafı (dünya koordinatı)
var pet_bed := Vector3.ZERO
var bowls := Vector3.ZERO

func _mat(c: Color, tex: Texture2D = null, uv := Vector3.ONE) -> StandardMaterial3D:
	var m := StandardMaterial3D.new()
	m.albedo_color = c
	if tex:
		m.albedo_texture = tex
		m.uv1_scale = uv
	m.roughness = 0.9
	return m

func _box(size: Vector3, pos: Vector3, mat: Material, collide := true) -> void:
	var mi := MeshInstance3D.new()
	var bm := BoxMesh.new(); bm.size = size
	mi.mesh = bm; mi.material_override = mat; mi.position = pos
	add_child(mi)
	if collide:
		_col(size, pos)

func _col(size: Vector3, pos: Vector3) -> void:
	var sb := StaticBody3D.new()
	var cs := CollisionShape3D.new(); var sh := BoxShape3D.new(); sh.size = size
	cs.shape = sh; sb.add_child(cs); sb.position = pos
	add_child(sb)

func _prop(name: String, pos: Vector3, ry := 0.0, s := 1.0, collide := true) -> Node3D:
	var ps: PackedScene = load("res://assets/furniture/%s.gltf" % name)
	if ps == null:
		return null
	var n: Node3D = ps.instantiate()
	n.position = pos; n.rotation.y = ry; n.scale = Vector3.ONE * s
	add_child(n)
	if collide:
		# modelin kapladığı alana göre basit çarpışma kutusu
		var ab := AABB()
		var first := true
		for mi in n.find_children("*", "MeshInstance3D", true, false):
			var m := mi as MeshInstance3D
			var local := n.global_transform.affine_inverse() * m.global_transform
			var bb: AABB = local * m.get_aabb()
			ab = bb if first else ab.merge(bb)
			first = false
		if not first:
			var sz := ab.size * s
			var c := n.transform * ab.get_center()
			if ry != 0.0 and absf(sin(ry)) > 0.7:
				sz = Vector3(sz.z, sz.y, sz.x)
			_col(Vector3(sz.x, maxf(sz.y, 0.4), sz.z), c)
	return n

func build(origin: Vector3) -> void:
	position = origin
	var wood: Texture2D = load("res://map/tex/wood.png")
	# zemin ve duvarlar
	_box(Vector3(W, 0.2, D), Vector3(0, -0.1, 0), _mat(Color("#c99a6a"), wood, Vector3(3, 3, 1)))
	var wall := _mat(Color("#f3e3c8"))
	var low := _mat(Color("#7a9a8a"))
	_box(Vector3(W, H, 0.2), Vector3(0, H / 2, -D / 2 - 0.1), wall)
	_box(Vector3(W, H, 0.2), Vector3(0, H / 2, D / 2 + 0.1), wall)
	_box(Vector3(0.2, H, D), Vector3(-W / 2 - 0.1, H / 2, 0), wall)
	_box(Vector3(0.2, H, D / 2 - 0.8), Vector3(W / 2 + 0.1, H / 2, -(D / 4 + 0.4)), wall)
	_box(Vector3(0.2, H, D / 2 - 0.8), Vector3(W / 2 + 0.1, H / 2, D / 4 + 0.4), wall)
	_box(Vector3(0.2, H - 2.4, 1.6), Vector3(W / 2 + 0.1, 2.4 + (H - 2.4) / 2, 0), wall, false)
	# lambri ve süpürgelik
	for z in [-D / 2 + 0.02, D / 2 - 0.02]:
		_box(Vector3(W, 1.0, 0.04), Vector3(0, 0.5, z), low, false)
	_box(Vector3(0.04, 1.0, D), Vector3(-W / 2 + 0.02, 0.5, 0), low, false)
	# kapı (dışarı açılır gibi duran koyu ahşap) ve paspas
	_box(Vector3(0.08, 2.3, 1.4), Vector3(W / 2 + 0.25, 1.15, 0), _mat(Color("#7a3a22")), false)
	_box(Vector3(1.0, 0.03, 1.4), Vector3(W / 2 - 0.7, 0.015, 0), _mat(Color("#b5532f")), false)
	door_pos = origin + Vector3(W / 2 - 1.2, 0, 0)
	# pencereler: gökyüzü rengi camlar, ahşap çerçeve
	var sky := _mat(Color("#bfe3f5"))
	sky.emission_enabled = true; sky.emission = Color("#bfe3f5"); sky.emission_energy_multiplier = 0.6
	var frame := _mat(Color("#6e4a3a"))
	for x in [-3.5, 0.5, 4.0]:
		_box(Vector3(1.4, 1.5, 0.05), Vector3(x, 1.9, -D / 2 + 0.01), sky, false)
		_box(Vector3(1.6, 0.1, 0.12), Vector3(x, 1.1, -D / 2 + 0.05), frame, false)
		_box(Vector3(0.06, 1.5, 0.08), Vector3(x, 1.9, -D / 2 + 0.04), frame, false)
	for z in [-2.0, 2.0]:
		_box(Vector3(0.05, 1.5, 1.4), Vector3(-W / 2 + 0.01, 1.9, z), sky, false)
	# oturma köşesi
	_prop("rug_rectangle_stripes_A", Vector3(-3.2, 0.01, -2.4), 0.0, 1.0, false)
	_prop("couch_pillows", Vector3(-3.2, 0, -3.9), 0.0)
	_prop("table_low", Vector3(-3.2, 0, -2.2), 0.0)
	_prop("armchair_pillows", Vector3(-0.6, 0, -2.6), -PI / 2.0)
	_prop("lamp_standing", Vector3(-5.4, 0, -4.0), 0.0)
	_prop("shelf_B_large_decorated", Vector3(2.0, 0, -4.15), 0.0)
	_prop("cabinet_medium_decorated", Vector3(4.6, 0, -4.15), 0.0)
	_prop("pictureframe_large_A", Vector3(-3.2, 1.9, -4.45), 0.0, 1.0, false)
	_prop("cactus_medium_A", Vector3(-5.4, 0, -1.4), 0.0)
	# yatak köşesi
	_prop("bed_double_A", Vector3(-4.6, 0, 2.9), PI / 2.0)
	_prop("lamp_table", Vector3(-5.5, 0.0, 0.9), 0.0, 1.0, false)
	_prop("pictureframe_medium", Vector3(-5.95, 1.8, 2.9), PI / 2.0, 1.0, false)
	# yemek masası
	_prop("table_medium", Vector3(0.6, 0, 2.6), 0.0)
	_prop("chair_A_wood", Vector3(0.6, 0, 1.6), 0.0, 1.0, false)
	_prop("chair_A_wood", Vector3(0.6, 0, 3.6), PI, 1.0, false)
	# dostun köşesi: halı, minder, mama ve su kabı, top, tırmalama direği
	_prop("rug_oval_A", Vector3(4.2, 0.01, 2.8), 0.0, 1.2, false)
	pet_bed = origin + Vector3(4.6, 0, 3.4)
	var cyl := CylinderMesh.new(); cyl.top_radius = 0.65; cyl.bottom_radius = 0.7; cyl.height = 0.22
	var bed := MeshInstance3D.new(); bed.mesh = cyl; bed.material_override = _mat(Color("#c8423a")); bed.position = Vector3(4.6, 0.11, 3.4); add_child(bed)
	var cush := CylinderMesh.new(); cush.top_radius = 0.5; cush.bottom_radius = 0.5; cush.height = 0.08
	var c2 := MeshInstance3D.new(); c2.mesh = cush; c2.material_override = _mat(Color("#f2e6d0")); c2.position = Vector3(4.6, 0.24, 3.4); add_child(c2)
	bowls = origin + Vector3(2.8, 0, 3.9)
	var bw := CylinderMesh.new(); bw.top_radius = 0.2; bw.bottom_radius = 0.15; bw.height = 0.1
	for k in 2:
		var b := MeshInstance3D.new(); b.mesh = bw; b.material_override = _mat(Color("#f6c445") if k == 0 else Color("#7cc6ea"))
		b.position = Vector3(2.6 + k * 0.5, 0.05, 3.9); add_child(b)
	var ball := MeshInstance3D.new(); var sp := SphereMesh.new(); sp.radius = 0.12; sp.height = 0.24
	ball.mesh = sp; ball.material_override = _mat(Color("#e2483a")); ball.position = Vector3(3.4, 0.12, 2.2); add_child(ball)
	_box(Vector3(0.5, 0.06, 0.5), Vector3(5.5, 0.03, 1.4), _mat(Color("#8a6a4a")), false)
	var post := MeshInstance3D.new(); var pc := CylinderMesh.new(); pc.top_radius = 0.1; pc.bottom_radius = 0.1; pc.height = 1.0
	post.mesh = pc; post.material_override = _mat(Color("#d8c39a")); post.position = Vector3(5.5, 0.53, 1.4); add_child(post)
	_box(Vector3(0.45, 0.06, 0.45), Vector3(5.5, 1.06, 1.4), _mat(Color("#8a6a4a")), false)
	# ışık
	var l := OmniLight3D.new(); l.position = Vector3(0, 3.0, 0); l.omni_range = 11.0; l.light_energy = 0.7; l.light_color = Color("#ffe8c8"); add_child(l)
	var lb := Label3D.new(); lb.text = "Evin"; lb.font_size = 64; lb.pixel_size = 0.006; lb.position = Vector3(W / 2 - 0.1, 2.9, 0); lb.rotation.y = -PI / 2.0
	lb.modulate = Color("#7a3a22"); add_child(lb)

## Puanla alınan ev süsleri: her biri evde sabit bir yere konur
const DECOR := {
	"bitki": {"name": "Bitki köşesi", "price": 150},
	"kitaplik": {"name": "Büyük kitaplık", "price": 200},
	"tablo": {"name": "Manzara tablosu", "price": 100},
	"hali": {"name": "Yatak odası halısı", "price": 150},
	"minder": {"name": "Dostuna yastıklar", "price": 200},
	"okuma": {"name": "Okuma köşesi", "price": 300},
}
var placed := {}

func add_decor(id: String) -> void:
	if placed.has(id):
		return
	placed[id] = true
	match id:
		"bitki":
			_prop("cactus_medium_B", Vector3(5.4, 0, -2.6), 0.0)
			_prop("cactus_small_A", Vector3(5.5, 0, -1.9), 0.0, 1.0, false)
			_prop("cactus_small_B", Vector3(-5.4, 0, 4.2), 0.0, 1.0, false)
		"kitaplik":
			_prop("shelf_A_big", Vector3(-5.75, 0, -0.4), PI / 2.0)
		"tablo":
			_prop("pictureframe_large_B", Vector3(0.6, 1.9, 4.45), PI, 1.0, false)
		"hali":
			_prop("rug_rectangle_B", Vector3(-3.4, 0.012, 2.6), PI / 2.0, 1.0, false)
		"minder":
			_prop("pillow_A", Vector3(4.0, 0.25, 3.9), 0.4, 1.0, false)
			_prop("pillow_B", Vector3(5.2, 0.25, 2.8), -0.5, 1.0, false)
		"okuma":
			_prop("armchair", Vector3(-1.6, 0, 3.9), PI)
			_prop("table_small", Vector3(-2.7, 0, 4.0), 0.0)
			_prop("book_set", Vector3(-2.7, 0.62, 4.0), 0.3, 1.0, false)
			_prop("pictureframe_standing_A", Vector3(4.6, 0.95, -4.2), 0.0, 1.0, false)
