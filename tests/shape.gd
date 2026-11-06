extends Node3D
## Her test için tek köpek, yakın çekim; out_N.png
func _ready():
	var env := WorldEnvironment.new(); env.environment = Environment.new(); env.environment.background_mode = Environment.BG_COLOR; env.environment.background_color = Color(0.6,0.75,0.85); env.environment.ambient_light_color = Color.WHITE; env.environment.ambient_light_energy = 0.5; add_child(env)
	var sun := DirectionalLight3D.new(); sun.rotation = Vector3(-0.9, 0.5, 0); sun.light_energy = 0.8; add_child(sun)
	var tests: Array = JSON.parse_string(FileAccess.get_file_as_string(OS.get_cmdline_user_args()[0]))
	var out: String = OS.get_cmdline_user_args()[1]
	var cam := Camera3D.new(); add_child(cam); cam.look_at_from_position(Vector3(1.8, 1.4, 1.8), Vector3(0, 0.1, 0))
	var i := 0
	for t in tests:
		var n: Node3D = (load("res://assets/animals/%s.glb" % t.get("model", "shiba")) as PackedScene).instantiate()
		n.scale = Vector3.ONE * 0.27; var ms = t.get("ms", [1,1,1]); n.scale *= Vector3(ms[0], ms[1], ms[2]); add_child(n)
		var ap := n.find_child("AnimationPlayer", true, false) as AnimationPlayer; ap.play(t.get("anim", "Idle"))
		var sk := n.find_child("Skeleton3D", true, false) as Skeleton3D
		var sc := {}; var rt := {}
		for k in t.get("s", {}): var v = t.s[k]; sc[k] = Vector3(v[0], v[1], v[2]) if v is Array else v
		for k in t.get("r", {}): var v = t.r[k]; rt[k] = Vector3(v[0], v[1], v[2])
		var m = load("res://scripts/dog_shape.gd").new(); m.setup(sc, rt); sk.add_child(m)
		await get_tree().create_timer(2.5).timeout
		get_viewport().get_texture().get_image().save_png("%s_%d.png" % [out, i])
		n.queue_free(); i += 1
	get_tree().quit()
