extends SceneTree
var m
var f := 0
func _init():
	m = load("res://scenes/main.tscn").instantiate()
	root.add_child(m)
func _process(d):
	f += 1
	if f == 5:
		m.player.position = Vector3(-100, 0.1, 200)
		m.romp_cd = 0.0
	if f == 30:
		var ds := []
		for an in m.animals:
			if not an.cat and an.position.distance_to(m.player.position) < 45.0: ds.append([an.animal_name, an.visible, an.mode, an.sleeping, an.greet, an.position.distance_to(m.player.position)])
		print("DOGS ", ds, " cd ", m.romp_cd, " home ", m.in_home, " play ", m.play)
	if f % 60 == 0 and not m.romp.is_empty():
		print("ROMP ", m.romp.phase, " ", m.romp.a.animal_name, " -> ", m.romp.b.animal_name, " d=", m.romp.a.position.distance_to(m.romp.b.position), " modes ", m.romp.a.mode, "/", m.romp.b.mode, " bpos ", m.romp.b.position, " bgoal ", m.romp.b.goal, " home ", m.romp.b.home)
	if f > 1800:
		quit()
	return false
