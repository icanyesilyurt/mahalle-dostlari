extends CharacterBody3D
## Oyuncu karakteri: yürür, döner, yürüme/durma animasyonu oynatır.

var move_input := Vector3.ZERO   # dünya yönünde hareket isteği (uzunluk 0..1)
var speed := 4.8
var facing := 0.0
var model: Node3D
var anim: AnimationPlayer
var steps: AudioStreamPlayer
var moving := false

func _ready() -> void:
	collision_mask = 3
	var shape := CollisionShape3D.new()
	var cap := CapsuleShape3D.new()
	cap.radius = 0.32
	cap.height = 1.6
	shape.shape = cap
	shape.position.y = 0.8
	add_child(shape)

	model = (load("res://assets/character/character.glb") as PackedScene).instantiate()
	add_child(model)
	# Modeli yaklaşık 1.6 m boya ölçekle
	var box := AABB()
	var first := true
	for mi in model.find_children("*", "MeshInstance3D", true, false):
		var b: AABB = (mi as MeshInstance3D).global_transform * (mi as MeshInstance3D).get_aabb()
		if first:
			box = b
			first = false
		else:
			box = box.merge(b)
	if not first and box.size.y > 0.01:
		model.scale = Vector3.ONE * (1.6 / box.size.y)

	anim = model.find_child("AnimationPlayer", true, false) as AnimationPlayer
	if anim:
		for n in ["idle", "walk"]:
			if anim.has_animation(n):
				anim.get_animation(n).loop_mode = Animation.LOOP_LINEAR
		if anim.has_animation("idle"):
			anim.play("idle")

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

	if anim:
		if moving:
			if anim.current_animation != "walk" and anim.has_animation("walk"):
				anim.play("walk", 0.15)
			anim.speed_scale = clampf(hv.length() / 3.2, 0.6, 1.6)
		else:
			if anim.current_animation != "idle" and anim.has_animation("idle"):
				anim.play("idle", 0.2)
			anim.speed_scale = 1.0
	if steps.stream:
		if moving and not steps.playing:
			steps.play()
		elif not moving and steps.playing:
			steps.stop()
