extends SkeletonModifier3D
## Köpek ırkı biçimi: animasyonun üstüne kemik ölçeği ve kulak düşüklüğü uygular.

var scales := {}      # kemik adı -> ölçek (float ya da Vector3)
var rots := {}        # kemik adı -> Vector3 (euler, radyan) ek dönüş
var _s: Array = []
var _r: Array = []

func setup(sc: Dictionary, rt: Dictionary) -> void:
	scales = sc
	rots = rt
	_s.clear(); _r.clear()

func _resolve() -> void:
	var sk := get_skeleton()
	if sk == null:
		return
	for k in scales:
		var i := sk.find_bone(k)
		if i >= 0:
			var v = scales[k]
			_s.append([i, v if v is Vector3 else Vector3.ONE * float(v)])
	for k in rots:
		var i := sk.find_bone(k)
		if i >= 0:
			_r.append([i, Quaternion.from_euler(rots[k])])

func _process_modification() -> void:
	var sk := get_skeleton()
	if sk == null:
		return
	if _s.is_empty() and _r.is_empty() and (not scales.is_empty() or not rots.is_empty()):
		_resolve()
	for e in _s:
		sk.set_bone_pose_scale(e[0], sk.get_bone_pose_scale(e[0]) * (e[1] as Vector3))
	for e in _r:
		sk.set_bone_pose_rotation(e[0], sk.get_bone_pose_rotation(e[0]) * (e[1] as Quaternion))
