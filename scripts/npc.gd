extends Node3D
## Yaya: iki nokta arasında gidip gelir, uçlarda biraz durur.

var a := Vector3.ZERO
var b := Vector3.ZERO
var to_b := true
var speed := 1.3
var wait := 0.0
var ph := 0.0
var leg_l: Node3D
var leg_r: Node3D
var arm_l: Node3D
var arm_r: Node3D

const SKIN := ["#f1c7a1", "#d6a982", "#b98563", "#8d5b3e", "#f3d4b8"]
const HAIR := ["#2b2320", "#4a3428", "#7a5232", "#c9a46a", "#8a8a8a", "#1a1a1a"]
const TOP := ["#3b5b7a", "#c8423a", "#2f7d6d", "#e2a33b", "#6b4f3a", "#8e3b5a", "#f2efe9", "#3a3a3a", "#5a7f3b", "#d98aa0"]
const BOTTOM := ["#2d3540", "#3b3b3b", "#4a5a6a", "#6b5a45", "#1f2a36", "#7a6a5a"]

static var mats := {}

func _m(h: String) -> StandardMaterial3D:
	if not mats.has(h):
		var m := StandardMaterial3D.new()
		m.albedo_color = Color(h)
		m.roughness = 0.9
		mats[h] = m
	return mats[h]

func _box(parent: Node3D, size: Vector3, pos: Vector3, col: String) -> MeshInstance3D:
	var mi := MeshInstance3D.new()
	var bm := BoxMesh.new()
	bm.size = size
	mi.mesh = bm
	mi.material_override = _m(col)
	mi.position = pos
	mi.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_OFF
	parent.add_child(mi)
	return mi

func setup(pa: Vector3, pb: Vector3) -> void:
	a = pa; b = pb
	position = a.lerp(b, randf())
	to_b = randf() < 0.5
	speed = randf_range(1.0, 1.6)
	ph = randf() * 6.0
	var skin: String = SKIN[randi() % SKIN.size()]
	var hair: String = HAIR[randi() % HAIR.size()]
	var top: String = TOP[randi() % TOP.size()]
	var bottom: String = BOTTOM[randi() % BOTTOM.size()]
	var tall := randf_range(0.92, 1.08)
	scale = Vector3.ONE * tall
	leg_l = Node3D.new(); leg_l.position = Vector3(-0.11, 0.85, 0); add_child(leg_l)
	_box(leg_l, Vector3(0.17, 0.85, 0.2), Vector3(0, -0.42, 0), bottom)
	leg_r = Node3D.new(); leg_r.position = Vector3(0.11, 0.85, 0); add_child(leg_r)
	_box(leg_r, Vector3(0.17, 0.85, 0.2), Vector3(0, -0.42, 0), bottom)
	_box(self, Vector3(0.46, 0.62, 0.26), Vector3(0, 1.16, 0), top)
	arm_l = Node3D.new(); arm_l.position = Vector3(-0.3, 1.42, 0); add_child(arm_l)
	_box(arm_l, Vector3(0.12, 0.58, 0.14), Vector3(0, -0.28, 0), top)
	arm_r = Node3D.new(); arm_r.position = Vector3(0.3, 1.42, 0); add_child(arm_r)
	_box(arm_r, Vector3(0.12, 0.58, 0.14), Vector3(0, -0.28, 0), top)
	_box(self, Vector3(0.28, 0.3, 0.27), Vector3(0, 1.64, 0), skin)
	_box(self, Vector3(0.3, 0.12, 0.29), Vector3(0, 1.82, -0.01), hair)
	if randf() < 0.4:
		_box(self, Vector3(0.3, 0.3, 0.08), Vector3(0, 1.66, -0.15), hair)
	if randf() < 0.25:
		_box(self, Vector3(0.36, 0.42, 0.18), Vector3(0, 1.2, -0.22), TOP[randi() % TOP.size()])

func tick(delta: float) -> void:
	if wait > 0.0:
		wait -= delta
		leg_l.rotation.x = 0; leg_r.rotation.x = 0; arm_l.rotation.x = 0; arm_r.rotation.x = 0
		return
	var tgt := b if to_b else a
	var to := Vector3(tgt.x - position.x, 0, tgt.z - position.z)
	var d := to.length()
	if d < 0.2:
		to_b = not to_b
		wait = randf_range(1.0, 4.0)
		return
	position += to / d * minf(d, speed * delta)
	rotation.y = lerp_angle(rotation.y, atan2(to.x, to.z), minf(1.0, delta * 6.0))
	ph += delta * speed * 4.5
	var s := sin(ph) * 0.5
	leg_l.rotation.x = s; leg_r.rotation.x = -s; arm_l.rotation.x = -s * 0.8; arm_r.rotation.x = s * 0.8
