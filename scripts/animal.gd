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

func build() -> void:
	ph = randf() * 6.0
	wt = randf() * 4.0
	target = home
	position = home
	var m := _mat(color)
	var light := _mat(color.lightened(0.25))
	var dk := _mat(Color("#2a2623"))
	var pk := _mat(Color("#f0a3a8"))
	var ear := _mat(color.darkened(0.25))
	var sph := SphereMesh.new(); sph.radius = 1.0; sph.height = 2.0; sph.radial_segments = 10; sph.rings = 6
	if cat:
		top_y = 1.25
		var body := _part(self, Vector3(0.2, 0.17, 0.36), Vector3(0, 0.36, 0), m, sph)
		body.rotation.x = 0.05
		_part(self, Vector3(0.14, 0.11, 0.22), Vector3(0, 0.33, 0.06), light, sph)
		head = Node3D.new(); head.position = Vector3(0, 0.6, 0.36); add_child(head)
		_part(head, Vector3(0.19, 0.16, 0.17), Vector3.ZERO, m, sph)
		_part(head, Vector3(0.09, 0.06, 0.06), Vector3(0, -0.05, 0.12), light, sph)
		var cone := CylinderMesh.new(); cone.top_radius = 0.0; cone.bottom_radius = 1.0; cone.height = 1.0; cone.radial_segments = 4
		for sx in [-1.0, 1.0]:
			var e := _part(head, Vector3(0.07, 0.14, 0.05), Vector3(0.1 * sx, 0.17, -0.01), m, cone)
			e.rotation.z = -0.3 * sx
			_part(head, Vector3(0.028, 0.034, 0.02), Vector3(0.075 * sx, 0.03, 0.15), _mat(Color("#8fbf5a")), sph)
			_part(head, Vector3(0.012, 0.03, 0.01), Vector3(0.075 * sx, 0.03, 0.168), dk)
		_part(head, Vector3(0.03, 0.02, 0.02), Vector3(0, -0.03, 0.17), pk, sph)
		for p: Vector2 in [Vector2(-0.09, 0.2), Vector2(0.09, 0.2), Vector2(-0.09, -0.2), Vector2(0.09, -0.2)]:
			legs.append(_part(self, Vector3(0.07, 0.26, 0.07), Vector3(p.x, 0.13, p.y), m))
		tail = Node3D.new(); tail.position = Vector3(0, 0.45, -0.32); add_child(tail)
		var t := _part(tail, Vector3(0.06, 0.06, 0.5), Vector3(0, 0.15, -0.18), m)
		t.rotation.x = -0.75
	else:
		top_y = 1.6
		_part(self, Vector3(0.25, 0.24, 0.48), Vector3(0, 0.6, 0), m, sph)
		_part(self, Vector3(0.18, 0.15, 0.3), Vector3(0, 0.52, 0.12), light, sph)
		head = Node3D.new(); head.position = Vector3(0, 0.92, 0.48); add_child(head)
		_part(head, Vector3(0.2, 0.2, 0.2), Vector3.ZERO, m, sph)
		_part(head, Vector3(0.12, 0.1, 0.16), Vector3(0, -0.06, 0.2), light, sph)
		_part(head, Vector3(0.05, 0.04, 0.04), Vector3(0, -0.03, 0.35), dk, sph)
		for sx in [-1.0, 1.0]:
			_part(head, Vector3(0.03, 0.035, 0.02), Vector3(0.09 * sx, 0.06, 0.18), dk, sph)
			var e2 := _part(head, Vector3(0.09, 0.22, 0.16), Vector3(0.19 * sx, 0.0, -0.03), ear)
			e2.rotation.z = 0.2 * sx
		for p: Vector2 in [Vector2(-0.13, 0.28), Vector2(0.13, 0.28), Vector2(-0.13, -0.28), Vector2(0.13, -0.28)]:
			legs.append(_part(self, Vector3(0.11, 0.42, 0.11), Vector3(p.x, 0.21, p.y), m))
		tail = Node3D.new(); tail.position = Vector3(0, 0.74, -0.44); add_child(tail)
		var t2 := _part(tail, Vector3(0.08, 0.08, 0.42), Vector3(0, 0.12, -0.15), m)
		t2.rotation.x = -0.8

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
	refresh()

func refresh() -> void:
	name_label.text = animal_name
	name_label.visible = friend > 0
	bowl.visible = hungry and mode == ""
	drop.visible = thirsty and mode == ""
	var both := hungry and thirsty
	bowl.position.x = -0.2 if both else 0.0
	drop.position.x = 0.2 if both else 0.0

func mouth_pos() -> Vector3:
	return head.global_position + global_transform.basis.z * (0.3 if not cat else 0.18) + Vector3(0, -0.08, 0)

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
	var sw := sin(ph) * 0.6 if moving else 0.0
	for i in legs.size():
		var sgn := 1.0 if i % 2 == 0 else -1.0
		var front := 1.0 if i < 2 else -1.0
		(legs[i] as Node3D).rotation.x = sw * sgn * front
	var wag := greet or happy > 0.0 or mode != ""
	tail.rotation.y = sin(t * (16.0 if wag else 2.5) + ph) * (0.8 if wag else 0.25)
	head.rotation.x = sin(t * 0.7 + ph) * 0.08
	var bob := sin(t * 3.0 + ph) * 0.05
	bowl.position.y = top_y + bob
	drop.position.y = top_y + bob
