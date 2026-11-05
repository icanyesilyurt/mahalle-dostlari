extends Node3D
func _ready():
	var env := WorldEnvironment.new(); env.environment = Environment.new(); env.environment.background_mode = Environment.BG_COLOR; env.environment.background_color = Color(0.6,0.75,0.85); env.environment.ambient_light_color = Color.WHITE; env.environment.ambient_light_energy = 0.5; add_child(env)
	var sun := DirectionalLight3D.new(); sun.rotation = Vector3(-0.9, 0.5, 0); sun.light_energy = 0.8; add_child(sun)
	var tests := [
		[{}, {}],
		[{"FrontUpperLeg.L":0.6,"FrontUpperLeg.R":0.6,"BackLeg.L":0.6,"BackLeg.R":0.6}, {}],
		[{"Head":1.3}, {"Ear1.L":Vector3(1.2,0,0),"Ear1.R":Vector3(1.2,0,0)}],
		[{}, {"Ear1.L":Vector3(0,1.2,0),"Ear1.R":Vector3(0,1.2,0)}],
		[{}, {"Ear1.L":Vector3(0,0,1.2),"Ear1.R":Vector3(0,0,1.2)}],
		[{"Torso":Vector3(1,1.4,1)}, {}],
		[{"Torso":Vector3(1,1,1.4)}, {}],
		[{"Body":Vector3(1.4,1,1)}, {}],
	]
	var x := -1.65
	var zi := 0
	for t in tests:
		var n: Node3D = (load("res://assets/animals/shiba.glb") as PackedScene).instantiate()
		n.scale = Vector3.ONE * 0.27; n.position = Vector3(x, 0, -1.4 * (zi / 4)); n.rotation.y = PI/2; add_child(n)
		var ap := n.find_child("AnimationPlayer", true, false) as AnimationPlayer; ap.play("Idle")
		var sk := n.find_child("Skeleton3D", true, false) as Skeleton3D
		var m = load("res://scripts/dog_shape.gd").new(); m.setup(t[0], t[1]); sk.add_child(m)
		x += 1.1; zi += 1
		if zi == 4: x = -1.65
	var cam := Camera3D.new(); add_child(cam); cam.look_at_from_position(Vector3(0, 1.8, 3.2), Vector3(0, 0.1, -0.7))
	await get_tree().create_timer(0.6).timeout
	get_viewport().get_texture().get_image().save_png(OS.get_cmdline_user_args()[0])
	get_tree().quit()
