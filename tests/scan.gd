extends SceneTree
## Yol eksenleri boyunca oyuncu büyüklüğünde kutu ile tıkanık noktaları bulur
var frames := 0
var mapd: Dictionary
func _init():
	var city := "istanbul"
	for a in OS.get_cmdline_user_args():
		if a.begins_with("--city="):
			city = a.substr(7)
	mapd = JSON.parse_string(FileAccess.get_file_as_string("res://map/%s.json" % city))
	var m: Node3D = (load("res://map/%s.scn" % city) as PackedScene).instantiate()
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
				# yol genişliği boyunca bir geçit var mı?
				var half := ((z1 - z0) if horiz else (x1 - x0)) / 2.0
				var free := false
				var o := -half + 0.45
				while o <= half - 0.45 and not free:
					var p2 := p + (Vector3(0, 0, o) if horiz else Vector3(o, 0, 0))
					q.transform = Transform3D(Basis(), p2)
					if space.intersect_shape(q, 1).size() == 0:
						free = true
					o += 0.3
				if not free:
					var co: CollisionObject3D = hit[0].collider
					var oid := co.shape_find_owner(hit[0].shape)
					var cs: Node3D = co.shape_owner_get_owner(oid)
					var shp: Shape3D = co.shape_owner_get_shape(oid, 0)
					var ext := (shp as BoxShape3D).size if shp is BoxShape3D else Vector3.ZERO
					blocked.append("%s @ %.1f,%.1f by %s %s" % [r[0], p.x, p.z, str(cs.global_position), str(ext)])
			s += 2.0
	print("BLOCKED ", blocked.size())
	var seen := {}
	for b in blocked:
		var key: String = b.split(" @ ")[0] + "|" + b.split(" by ")[1]
		if not seen.has(key):
			seen[key] = 0
			print(b)
		seen[key] += 1
	quit()
	return true
