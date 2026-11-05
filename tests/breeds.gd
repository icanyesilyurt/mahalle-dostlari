extends Node3D
func _ready():
	var env := WorldEnvironment.new(); env.environment = Environment.new(); env.environment.background_mode = Environment.BG_COLOR; env.environment.background_color = Color(0.72,0.82,0.88); env.environment.ambient_light_color = Color.WHITE; env.environment.ambient_light_energy = 0.55; add_child(env)
	var sun := DirectionalLight3D.new(); sun.rotation = Vector3(-0.9, 0.5, 0); sun.light_energy = 0.75; add_child(sun)
	var B = load("res://scripts/breeds.gd")
	var A = load("res://scripts/animal.gd")
	var out: String = OS.get_cmdline_user_args()[0]
	var cam := Camera3D.new(); add_child(cam)
	var i := 0
	for cat in [false, true]:
		var tbl: Dictionary = B.CATS if cat else B.DOGS
		for id in tbl:
			var a = A.new(); a.cat = cat; a.breed = id; a.size = 1.0; a.home = Vector3.ZERO; a.animal_name = tbl[id].name; a.friend = 1
			add_child(a); a.build(); a.rotation.y = 0.9; a.bowl.visible = false; a.drop.visible = false
			var d := 1.5 if not cat else 1.1
			cam.look_at_from_position(Vector3(0, 0.55 * d, d), Vector3(0, 0.3 if not cat else 0.25, 0))
			await get_tree().create_timer(0.3).timeout
			get_viewport().get_texture().get_image().save_png("%s_%02d.png" % [out, i])
			a.queue_free(); i += 1
	get_tree().quit()
