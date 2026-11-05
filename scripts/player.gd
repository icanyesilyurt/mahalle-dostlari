extends CharacterBody3D
## Oyuncu karakteri: yürür, döner, yürüme/durma animasyonu oynatır.

var move_input := Vector3.ZERO   # dünya yönünde hareket isteği (uzunluk 0..1)
var speed := 4.8
var facing := 0.0
var model: Node3D
var anim: AnimationPlayer
var steps: AudioStreamPlayer
var moving := false
var look := "character-male-a"
var act_t := 0.0

## Görünüşü değiştir (Kenney Mini Characters)
func set_look(id: String) -> void:
	look = id
	if model:
		model.queue_free()
	model = (load("res://assets/chars/%s.glb" % id) as PackedScene).instantiate()
	model.scale = Vector3.ONE * 2.3
	add_child(model)
	anim = model.find_child("AnimationPlayer", true, false) as AnimationPlayer
	if anim:
		for n in ["idle", "walk", "sprint"]:
			if anim.has_animation(n):
				anim.get_animation(n).loop_mode = Animation.LOOP_LINEAR
		anim.play("idle")

## Tek seferlik hareket: eğilip mama koyma, yerden alma, sevinme
func act(n: String) -> void:
	if anim and anim.has_animation(n):
		anim.play(n, 0.1)
		anim.speed_scale = 1.0
		act_t = anim.get_animation(n).length

func _ready() -> void:
	collision_mask = 3
	var shape := CollisionShape3D.new()
	var cap := CapsuleShape3D.new()
	cap.radius = 0.32
	cap.height = 1.6
	shape.shape = cap
	shape.position.y = 0.8
	add_child(shape)

	set_look(look)
	steps = AudioStreamPlayer.new()
	var s = load("res://assets/sounds/walking.ogg")
	if s is AudioStreamOggVorbis:
		s.loop = true
	steps.stream = s
	steps.volume_db = -8.0
	add_child(steps)

func _physics_process(delta: float) -> void:
	var target := move_input * speed
	velocity.x = lerpf(velocity.x, target.x, minf(1.0, delta * 10.0))
	velocity.z = lerpf(velocity.z, target.z, minf(1.0, delta * 10.0))
	if is_on_floor():
		velocity.y = -0.5
	else:
		velocity.y -= 20.0 * delta
	move_and_slide()

	var hv := Vector2(velocity.x, velocity.z)
	moving = hv.length() > 0.35
	if moving:
		facing = atan2(velocity.x, velocity.z)
	rotation.y = lerp_angle(rotation.y, facing, minf(1.0, delta * 12.0))

	if act_t > 0.0:
		act_t -= delta
		if moving:
			act_t = 0.0
	elif anim:
		if moving:
			var run := hv.length() > 3.6
			var an := "sprint" if run else "walk"
			if anim.current_animation != an:
				anim.play(an, 0.15)
			anim.speed_scale = clampf(hv.length() / (4.6 if run else 2.4), 0.6, 1.5)
		else:
			if anim.current_animation != "idle" and anim.has_animation("idle"):
				anim.play("idle", 0.2)
			anim.speed_scale = 1.0
	if steps.stream:
		if moving and not steps.playing:
			steps.play()
		elif not moving and steps.playing:
			steps.stop()
