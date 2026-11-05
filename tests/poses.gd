extends Node3D
var cats := []
var t := 0.0
func _ready():
	var env := WorldEnvironment.new(); env.environment = Environment.new(); env.environment.background_mode = Environment.BG_COLOR; env.environment.background_color = Color(0.72,0.82,0.88); env.environment.ambient_light_color = Color.WHITE; env.environment.ambient_light_energy = 0.55; add_child(env)
	var sun := DirectionalLight3D.new(); sun.rotation = Vector3(-0.9, 0.5, 0); sun.light_energy = 0.75; add_child(sun)
	var A = load("res://scripts/animal.gd")
	var defs := [["tekir","stand"],["sarman","sit"],["british","loaf"],["siyam","groom"],["maine_coon","sit"]]
	var x := -1.2
	for d in defs:
		var a = A.new(); a.cat = true; a.breed = d[0]; a.home = Vector3(x, 0, 0); a.animal_name = d[0]; a.friend = 1; a.greeted_today = true
		add_child(a); a.build(); a.bowl.visible = false; a.drop.visible = false; a.name_label.visible = false
		a.rotation.y = PI / 2.2; a.wt = 99.0; a.target = a.home
		a.pose = d[1]; a.pose_t = 99.0
		cats.append(a); x += 0.6
	var cam := Camera3D.new(); add_child(cam); cam.look_at_from_position(Vector3(0, 0.8, 2.0), Vector3(0, 0.25, 0))
	await get_tree().create_timer(1.5).timeout
	get_viewport().get_texture().get_image().save_png(OS.get_cmdline_user_args()[0])
	get_tree().quit()
func _process(d):
	t += d
	for a in cats:
		a.pose_t = 99.0
		a.tick(d, Vector3(0, 0, 2.0), t)
