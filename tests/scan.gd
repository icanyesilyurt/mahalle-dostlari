extends SceneTree
## Yol eksenleri boyunca oyuncu büyüklüğünde kutu ile tıkanık noktaları bulur
var frames := 0
var mapd: Dictionary
func _init():
	mapd = JSON.parse_string(FileAccess.get_file_as_string("res://map/istanbul.json"))
	var m: Node3D = (load("res://map/istanbul.scn") as PackedScene).instantiate()
	root.add_child(m)
func _process(_d):
	frames += 1
	if frames < 3:
		return false
	var space := root.get_world_3d().direct_space_state
	var q := PhysicsShapeQueryParameters3D.new()
	var sh := CylinderShape3D.new(); sh.radius = 0.4; sh.height = 1.2
	q.shape = sh
	q.collision_mask = 3
	var blocked := []
	for r in mapd.roads:
		var x0: float = r[1]; var x1: float = r[2]; var z0: float = r[3]; var z1: float = r[4]
		var horiz := (x1 - x0) >= (z1 - z0)
		var L := (x1 - x0) if horiz else (z1 - z0)
		var cx := (x0 + x1) / 2.0; var cz := (z0 + z1) / 2.0
		var s := 0.5
		var run_start := -1.0
		while s < L - 0.5:
			var p := Vector3(x0 + s, 0.9, cz) if horiz else Vector3(cx, 0.9, z0 + s)
			q.transform = Transform3D(Basis(), p)
			var hit := space.intersect_shape(q, 1)
			if hit.size() > 0:
				var col: Object = hit[0].collider
				blocked.append("%s @ %.1f,%.1f by %s" % [r[0], p.x, p.z, str((col as Node3D).global_position)])
			s += 2.0
	print("BLOCKED ", blocked.size())
	for b in blocked:
		print(b)
	quit()
	return true
