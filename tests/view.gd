extends Node3D
var animals := []
func _ready():
	var env := WorldEnvironment.new(); env.environment = Environment.new(); env.environment.background_mode = Environment.BG_COLOR; env.environment.background_color = Color(0.6,0.75,0.85); env.environment.ambient_light_color = Color.WHITE; env.environment.ambient_light_energy = 0.45; add_child(env)
	var sun := DirectionalLight3D.new(); sun.rotation = Vector3(-0.9, 0.5, 0); sun.light_energy = 0.8; sun.shadow_enabled = true; add_child(sun)
	var fl := MeshInstance3D.new(); var pm := PlaneMesh.new(); pm.size = Vector2(20, 20); fl.mesh = pm; var fm := StandardMaterial3D.new(); fm.albedo_color = Color("#e6d6b8"); fl.material_override = fm; add_child(fl)
	var A = load("res://scripts/animal.gd")
	var defs := [[false,"#d9b46a","benekli","#6b4a2a",1.1,true],[false,"#3a3332","solid","",1.25,true],[false,"#efe8dc","solid","",1.0,false],
		[true,"#8b8d92","tekir","#4d4f53",1.0,false],[true,"#f2efe9","uc_renk","#e58a3a",1.0,false],[true,"#2b2828","smokin","#f2efe9",1.0,false],[true,"#e8b04a","tekir","#b97a2a",1.0,false]]
	var x := -2.4
	for d in defs:
		var a = A.new()
		a.cat = d[0]; a.color = Color(d[1]); a.pattern = d[2]; a.color2 = Color(d[3]) if d[3] != "" else Color.WHITE; a.size = d[4]; a.tagged = d[5]
		a.home = Vector3(x, 0, 0); a.animal_name = "Test"; a.friend = 1
		add_child(a); a.build(); a.rotation.y = 0.6
		animals.append(a)
		x += 0.8
	var N = load("res://scripts/npc.gd")
	for i in 3:
		var n = N.new(); add_child(n); n.setup(Vector3(-2 + i * 1.5, 0, -2), Vector3(-2 + i * 1.5, 0, -2.01))
	var cam := Camera3D.new(); add_child(cam); cam.look_at_from_position(Vector3(0, 1.6, 3.6), Vector3(0, 0.35, 0))
	await get_tree().create_timer(0.8).timeout
	get_viewport().get_texture().get_image().save_png(OS.get_cmdline_user_args()[0])
	get_tree().quit()
func _process(d):
	for a in animals: a.happy = 1.0
