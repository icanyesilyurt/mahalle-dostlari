extends SceneTree
var m
var f := 0
func _init():
	m = load("res://scenes/main.tscn").instantiate()
	root.add_child(m)
func _process(d):
	f += 1
	if f == 10:
		m.look_id = 1
		m.yaw_off = 2.5
		m.pitch_off = -0.3
	if f == 12:
		print("held ", snappedf(m.yaw_off, 0.01), " ", snappedf(m.pitch_off, 0.01))
		m.look_id = -1
	if f == 120:
		print("released ", snappedf(m.yaw_off, 0.01), " ", snappedf(m.pitch_off, 0.01))
	if f == 130:
		m.dbg_walk = Vector3(1, 0, 0)
	if f == 400:
		print("walk east: facing ", snappedf(m.player.facing, 0.01), " cam_yaw ", snappedf(wrapf(m.cam_yaw, -PI, PI), 0.01), " expect ", snappedf(wrapf(m.player.facing + PI, -PI, PI), 0.01))
		quit()
	return false
