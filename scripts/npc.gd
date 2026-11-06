extends Node3D
## Yaya: iki nokta arasında gidip gelir, uçlarda biraz durur. (Kenney Mini Characters)

var a := Vector3.ZERO
var b := Vector3.ZERO
var to_b := true
var speed := 1.3
var wait := 0.0
var anim: AnimationPlayer
var cur := ""
var still := false   # satıcı: yerinde durur
var blocked := false # oyuncu önünü kesince bekler

const LOOKS := ["character-male-a", "character-male-b", "character-male-c", "character-male-d", "character-male-e", "character-male-f",
	"character-female-a", "character-female-b", "character-female-c", "character-female-d", "character-female-e", "character-female-f"]
static var scenes := {}

func setup(pa: Vector3, pb: Vector3, skip := "") -> void:
	a = pa; b = pb
	position = a.lerp(b, randf())
	to_b = randf() < 0.5
	speed = randf_range(1.0, 1.6)
	var id: String = LOOKS[randi() % LOOKS.size()]
	if id == skip:
		id = LOOKS[(LOOKS.find(id) + 1) % LOOKS.size()]
	if not scenes.has(id):
		scenes[id] = load("res://assets/chars/%s.glb" % id)
	var model: Node3D = (scenes[id] as PackedScene).instantiate()
	model.scale = Vector3.ONE * randf_range(1.9, 2.15)
	add_child(model)
	for mi in model.find_children("*", "MeshInstance3D", true, false):
		(mi as MeshInstance3D).cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_OFF
	anim = model.find_child("AnimationPlayer", true, false) as AnimationPlayer
	for n in ["idle", "walk"]:
		anim.get_animation(n).loop_mode = Animation.LOOP_LINEAR
	_play("walk")
	anim.seek(randf() * 1.0)

func _play(n: String) -> void:
	if cur != n:
		cur = n
		anim.play(n, 0.2)

func set_active(on: bool) -> void:
	visible = on
	anim.active = on

func tick(delta: float) -> void:
	if still or blocked:
		_play("idle")
		return
	if wait > 0.0:
		wait -= delta
		_play("idle")
		return
	var tgt := b if to_b else a
	var to := Vector3(tgt.x - position.x, 0, tgt.z - position.z)
	var d := to.length()
	if d < 0.2:
		to_b = not to_b
		wait = randf_range(1.0, 4.0)
		return
	_play("walk")
	anim.speed_scale = speed / 1.4
	position += to / d * minf(d, speed * delta)
	rotation.y = lerp_angle(rotation.y, atan2(to.x, to.z), minf(1.0, delta * 6.0))
