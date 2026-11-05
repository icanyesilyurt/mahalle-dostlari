extends SkeletonModifier3D
## Köpeğin kuyruğunu animasyonun üstüne ek olarak sallar.

var amount := 0.0      # 0 = durgun, 1 = mutlu
var t := 0.0
var bones: Array[int] = []
var axis := Vector3(0, 0, 1)

func _ready() -> void:
	var sk := get_skeleton()
	if sk:
		for n in ["Tail1", "Tail2", "Tail3"]:
			var i := sk.find_bone(n)
			if i >= 0:
				bones.append(i)

func _process_modification() -> void:
	var sk := get_skeleton()
	if sk == null or amount <= 0.01:
		return
	t += get_process_delta_time() * 17.0
	var a := sin(t) * 0.45 * amount
	for i in bones:
		var q := sk.get_bone_pose_rotation(i)
		sk.set_bone_pose_rotation(i, q * Quaternion(axis, a))
