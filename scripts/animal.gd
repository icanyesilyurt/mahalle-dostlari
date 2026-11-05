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
var anim: AnimationPlayer
var wag: Node
var eat_t := 0.0
var cur_anim := ""

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

## Kedi: tombul, büyük kafalı, yuvarlak hatlı (prosedürel)
func _build_cat(sph: SphereMesh) -> void:
	top_y = 1.15
	var m := _mat(color)
	var light := _mat(color.lightened(0.3))
	var dk := _mat(Color("#2a2623"))
	var pk := _mat(Color("#f2a0a8"))
	var eye := _mat(Color(["#9ccf5a", "#e8b53a", "#6fb3d6", "#c9a03a"][randi() % 4]))
	var shine := _mat(Color.WHITE, true)
	var body := _part(self, Vector3(0.17, 0.155, 0.27), Vector3(0, 0.3, -0.02), m, sph)
	body.rotation.x = -0.08
	_part(self, Vector3(0.12, 0.12, 0.17), Vector3(0, 0.27, 0.06), light, sph)
	head = Node3D.new(); head.position = Vector3(0, 0.52, 0.22); add_child(head)
	_part(head, Vector3(0.175, 0.155, 0.16), Vector3.ZERO, m, sph)
	# yanaklar ve ağız bölgesi
	for sx in [-1.0, 1.0]:
		_part(head, Vector3(0.06, 0.05, 0.05), Vector3(0.04 * sx, -0.06, 0.12), light, sph)
	_part(head, Vector3(0.022, 0.016, 0.015), Vector3(0, -0.03, 0.155), pk, sph)
	var cone := CylinderMesh.new(); cone.top_radius = 0.0; cone.bottom_radius = 1.0; cone.height = 1.0; cone.radial_segments = 8
	for sx in [-1.0, 1.0]:
		var e := _part(head, Vector3(0.065, 0.12, 0.04), Vector3(0.095 * sx, 0.15, -0.01), m, cone)
		e.rotation.z = -0.32 * sx
		var ei := _part(head, Vector3(0.035, 0.07, 0.02), Vector3(0.093 * sx, 0.14, 0.012), pk, cone)
		ei.rotation.z = -0.32 * sx
		_part(head, Vector3(0.042, 0.048, 0.025), Vector3(0.07 * sx, 0.02, 0.132), eye, sph)
		_part(head, Vector3(0.024, 0.04, 0.01), Vector3(0.07 * sx, 0.02, 0.152), dk, sph)
		_part(head, Vector3(0.01, 0.01, 0.006), Vector3(0.078 * sx, 0.035, 0.16), shine, sph)
	# yumuşak patiler
	for p: Vector2 in [Vector2(-0.075, 0.13), Vector2(0.075, 0.13), Vector2(-0.075, -0.15), Vector2(0.075, -0.15)]:
		var leg := Node3D.new(); leg.position = Vector3(p.x, 0.24, p.y); add_child(leg)
		_part(leg, Vector3(0.045, 0.12, 0.045), Vector3(0, -0.12, 0), m, sph)
		_part(leg, Vector3(0.05, 0.035, 0.06), Vector3(0, -0.21, 0.015), m, sph)
		legs.append(leg)
	# kıvrık kuyruk: dört boğum
	tail = Node3D.new(); tail.position = Vector3(0, 0.36, -0.26); add_child(tail)
	var seg: Node3D = tail
	var bend := [-0.9, -0.35, -0.3, -0.25]
	for k in 4:
		var j := Node3D.new(); j.rotation.x = bend[k]; seg.add_child(j)
		if k > 0:
			j.position = Vector3(0, 0, -0.1)
		_part(j, Vector3(0.035 - k * 0.003, 0.035 - k * 0.003, 0.07), Vector3(0, 0, -0.05), m, sph)
		seg = j
	_decorate(sph)

## Köpek: Quaternius animasyonlu model, renkleri tek tek boyanır
func _build_dog(sph: SphereMesh) -> void:
	top_y = 1.25
	var big := size > 1.15 or color.get_luminance() < 0.25
	var model: Node3D = (load("res://assets/animals/husky.glb" if big else "res://assets/animals/shiba.glb") as PackedScene).instantiate()
	model.scale = Vector3.ONE * DOG_SCALE
	add_child(model)
	var mi := model.find_child("*", true, false)
	for n in model.find_children("*", "MeshInstance3D", true, false):
		mi = n
	var mesh_i := mi as MeshInstance3D
	var main := _mat(color)
	var second := _mat(color2 if pattern != "solid" else color.lightened(0.35))
	mesh_i.set_surface_override_material(0, main)
	mesh_i.set_surface_override_material(1, second)
	var sk := model.find_child("Skeleton3D", true, false) as Skeleton3D
	head = BoneAttachment3D.new()
	(head as BoneAttachment3D).bone_name = "Head"
	sk.add_child(head)
	wag = load("res://scripts/tail_wag.gd").new()
	sk.add_child(wag)
	anim = model.find_child("AnimationPlayer", true, false) as AnimationPlayer
	for n in ["Idle", "Walk", "Gallop", "Eating", "Idle_2"]:
		if anim.has_animation(n):
			anim.get_animation(n).loop_mode = Animation.LOOP_LINEAR
	anim.play("Idle")
	anim.seek(randf() * 2.0)
	cur_anim = "Idle"
	# kemiğe takılan parçalar için ölçek telafisi (model + iskelet + kemik ölçeği)
	var acc := 1.0
	var nd: Node = sk
	while nd != null and nd != self:
		if nd is Node3D:
			acc *= (nd as Node3D).scale.x
		nd = nd.get_parent()
	var hb := sk.find_bone("Head")
	var inv := 1.0 / (acc * sk.get_bone_global_rest(hb).basis.get_scale().x)
	if tagged:
		# İstanbul sokak köpeklerinin sarı kulak küpesi
		var ear := BoneAttachment3D.new(); ear.bone_name = "Ear2.R"; sk.add_child(ear)
		_part(ear, Vector3(0.04, 0.05, 0.015) * inv, Vector3.ZERO, _mat(Color("#f2c230")))
	if randf() < 0.4:
		var neck := BoneAttachment3D.new(); neck.bone_name = "Neck1"; sk.add_child(neck)
		var tor := TorusMesh.new(); tor.inner_radius = 0.8; tor.outer_radius = 1.0; tor.rings = 16; tor.ring_segments = 6
		var c := _part(neck, Vector3(0.13, 0.13, 0.13) * inv, Vector3.ZERO, _mat(Color(["#c8423a", "#3b6aa8", "#2f7d6d"][randi() % 3])), tor)
		c.rotation.x = PI / 2.0

func _play(n: String, blend := 0.2) -> void:
	if anim and cur_anim != n:
		cur_anim = n
		anim.play(n, blend)

## Mama ya da su verildiğinde biraz yesin/içsin
func eat(sec := 2.6) -> void:
	eat_t = sec

## Kedi desenleri: tekir çizgileri, smokin göğüs ve patiler, üç renkli lekeler
func _decorate(sph: SphereMesh) -> void:
	var m2 := _mat(color2)
	match pattern:
		"tekir":
			for k in 4:
				var st := _part(self, Vector3(0.13, 0.03, 0.035), Vector3(0, 0.44, -0.16 + k * 0.08), m2, sph)
				st.rotation.x = 0.1
			for k in 3:
				_part(head, Vector3(0.012, 0.012, 0.05), Vector3(-0.03 + k * 0.03, 0.14, 0.06), m2, sph)
		"smokin":
			_part(self, Vector3(0.1, 0.11, 0.07), Vector3(0, 0.3, 0.17), m2, sph)
			_part(head, Vector3(0.09, 0.06, 0.05), Vector3(0, -0.07, 0.12), m2, sph)
			for l in legs:
				_part(l as Node3D, Vector3(0.052, 0.037, 0.062), Vector3(0, -0.205, 0.016), m2, sph)
		"uc_renk":
			_part(self, Vector3(0.1, 0.07, 0.11), Vector3(0.05, 0.42, -0.08), m2, sph)
			_part(self, Vector3(0.08, 0.06, 0.09), Vector3(-0.06, 0.41, 0.06), _mat(Color("#2b2828")), sph)
			_part(head, Vector3(0.08, 0.07, 0.08), Vector3(0.06, 0.08, 0.0), m2, sph)
		_:
			if randf() < 0.3:
				_part(head, Vector3(0.05, 0.04, 0.04), Vector3(0, 0.1, 0.1), _mat(color.darkened(0.45)), sph)
	if randf() < 0.25:
		var tor := TorusMesh.new(); tor.inner_radius = 0.8; tor.outer_radius = 1.0
		_part(head, Vector3(0.09, 0.09, 0.09), Vector3(0, -0.11, -0.02), _mat(Color(["#c8423a", "#3b6aa8", "#e2a33b"][randi() % 3])), tor)

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
		else:
			_play("Idle")
		wag.amount = lerpf(wag.amount, 1.0 if wag_on else 0.15, minf(1.0, delta * 5.0))
	else:
		var sw := sin(ph) * 0.6 if moving else 0.0
		for i in legs.size():
			var sgn := 1.0 if i % 2 == 0 else -1.0
			var front := 1.0 if i < 2 else -1.0
			(legs[i] as Node3D).rotation.x = sw * sgn * front
		tail.rotation.y = sin(t * (14.0 if wag_on else 2.0) + ph) * (0.7 if wag_on else 0.25)
		head.rotation.x = sin(t * 0.7 + ph) * 0.08
		if eat_t > 0.0 and not moving:
			head.rotation.x = 0.45 + sin(t * 9.0) * 0.08
	var bob := sin(t * 3.0 + ph) * 0.05
	bowl.position.y = top_y + bob
	drop.position.y = top_y + bob
