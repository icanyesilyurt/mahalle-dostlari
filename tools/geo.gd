extends RefCounted
## Geometri tamponu: malzemeye göre gruplanmış üçgenler, tek seferde ArrayMesh'e dökülür.

class Buf:
	var P := PackedVector3Array()
	var N := PackedVector3Array()
	var C := PackedColorArray()
	var U := PackedVector2Array()
	func tri_list(pv: PackedVector3Array, pn: PackedVector3Array, bas: Basis, nb: Basis, pos: Vector3, col: Color) -> void:
		for i in pv.size():
			P.append(bas * pv[i] + pos)
			N.append((nb * pn[i]).normalized())
			C.append(col)
			U.append(Vector2.ZERO)
	func quad(a: Vector3, b: Vector3, c: Vector3, d: Vector3, n: Vector3, col: Color, ua: Vector2, ub: Vector2, uc: Vector2, ud: Vector2) -> void:
		for v in [[a, ua], [b, ub], [c, uc], [a, ua], [c, uc], [d, ud]]:
			P.append(v[0]); N.append(n); C.append(col); U.append(v[1])

var bufs := {}
var mats := {}
var prims := {}

func buf(key: String) -> Buf:
	if not bufs.has(key):
		bufs[key] = Buf.new()
	return bufs[key]

func _prim(name: String) -> Array:
	if prims.has(name):
		return prims[name]
	var pv := PackedVector3Array()
	var pn := PackedVector3Array()
	if name == "pyr" or name == "hip":
		var a := Vector3(-0.5, 0, -0.5); var b := Vector3(0.5, 0, -0.5); var c := Vector3(0.5, 0, 0.5); var d := Vector3(-0.5, 0, 0.5)
		var tris := []
		if name == "pyr":
			var top := Vector3(0, 1, 0)
			tris = [[a, b, top], [b, c, top], [c, d, top], [d, a, top]]
		else:
			var t1 := Vector3(-0.2, 1, 0); var t2 := Vector3(0.2, 1, 0)
			tris = [[a, b, t2], [a, t2, t1], [c, d, t1], [c, t1, t2], [b, c, t2], [d, a, t1]]
		for tri in tris:
			var n: Vector3 = (tri[1] - tri[0]).cross(tri[2] - tri[0]).normalized()
			var cen: Vector3 = (tri[0] + tri[1] + tri[2]) / 3.0
			if n.dot(cen - Vector3(0, 0.2, 0)) < 0:
				n = -n
			for p in tri:
				pv.append(p); pn.append(n)
	else:
		var m: PrimitiveMesh
		match name:
			"box":
				m = BoxMesh.new()
			"cyl":
				var cm := CylinderMesh.new(); cm.top_radius = 1; cm.bottom_radius = 1; cm.height = 1; cm.radial_segments = 20; cm.rings = 1; m = cm
			"cyl8":
				var cm := CylinderMesh.new(); cm.top_radius = 1; cm.bottom_radius = 1; cm.height = 1; cm.radial_segments = 8; cm.rings = 1; m = cm
			"cone":
				var cm := CylinderMesh.new(); cm.top_radius = 0; cm.bottom_radius = 1; cm.height = 1; cm.radial_segments = 16; cm.rings = 1; m = cm
			"cone8":
				var cm := CylinderMesh.new(); cm.top_radius = 0; cm.bottom_radius = 1; cm.height = 1; cm.radial_segments = 8; cm.rings = 1; m = cm
			"dome":
				var sm := SphereMesh.new(); sm.radius = 1; sm.height = 1; sm.is_hemisphere = true; sm.radial_segments = 28; sm.rings = 9; m = sm
			"ico":
				var sm := SphereMesh.new(); sm.radius = 1; sm.height = 2; sm.radial_segments = 7; sm.rings = 4; m = sm
			"ball":
				var sm := SphereMesh.new(); sm.radius = 1; sm.height = 2; sm.radial_segments = 12; sm.rings = 6; m = sm
		var arr := m.get_mesh_arrays()
		var v: PackedVector3Array = arr[Mesh.ARRAY_VERTEX]
		var n2: PackedVector3Array = arr[Mesh.ARRAY_NORMAL]
		var idx: PackedInt32Array = arr[Mesh.ARRAY_INDEX]
		for i in idx:
			pv.append(v[i]); pn.append(n2[i])
		if name == "dome":
			var miny := 1e9
			for p in pv:
				miny = minf(miny, p.y)
			for i in pv.size():
				pv[i].y -= miny
	prims[name] = [pv, pn]
	return prims[name]

## Herhangi bir ilkel şekli yerleştir (UV'siz). rot: Vector3 euler (YXZ).
func put(name: String, pos: Vector3, col: Color, ry: float = 0.0, scl: Vector3 = Vector3.ONE, key: String = "plain", rx: float = 0.0, rz: float = 0.0) -> void:
	var pr: Array = _prim(name)
	var bas := Basis.from_euler(Vector3(rx, ry, rz), EULER_ORDER_YXZ) * Basis.from_scale(scl)
	var nb := bas.inverse().transposed()
	buf(key).tri_list(pr[0], pr[1], bas, nb, pos, col)

func box(w: float, h: float, d: float, x: float, y: float, z: float, col: Color, ry: float = 0.0, key: String = "plain") -> void:
	put("box", Vector3(x, y + h / 2.0, z), col, ry, Vector3(w, h, d), key)

## UV'li kutu: duvar dokusu her mw x mh metrede bir tekrar eder (pencere modülü).
func wall_box(w: float, h: float, d: float, x: float, y: float, z: float, col: Color, ry: float, key: String, mw: float, mh: float, top: bool = false) -> void:
	var bas := Basis(Vector3.UP, ry)
	var o := Vector3(x, y, z)
	var hw := w / 2.0; var hd := d / 2.0
	var faces := [
		[Vector3(-hw, 0, hd), Vector3(hw, 0, hd), Vector3(0, 0, 1), w],
		[Vector3(hw, 0, -hd), Vector3(-hw, 0, -hd), Vector3(0, 0, -1), w],
		[Vector3(hw, 0, hd), Vector3(hw, 0, -hd), Vector3(1, 0, 0), d],
		[Vector3(-hw, 0, -hd), Vector3(-hw, 0, hd), Vector3(-1, 0, 0), d]]
	var b := buf(key)
	for f in faces:
		var fw: float = f[3]
		var reps := maxf(1.0, roundf(fw / mw))
		var vr := h / mh
		var p0: Vector3 = bas * f[0] + o
		var p1: Vector3 = bas * f[1] + o
		var up := Vector3(0, h, 0)
		b.quad(p0, p1, p1 + up, p0 + up, bas * (f[2] as Vector3), col, Vector2(0, vr), Vector2(reps, vr), Vector2(reps, 0), Vector2(0, 0))
	if top:
		var c0 := bas * Vector3(-hw, h, -hd) + o; var c1 := bas * Vector3(hw, h, -hd) + o
		var c2 := bas * Vector3(hw, h, hd) + o; var c3 := bas * Vector3(-hw, h, hd) + o
		b.quad(c0, c1, c2, c3, Vector3.UP, col, Vector2(0.01, 0.01), Vector2(0.01, 0.01), Vector2(0.01, 0.01), Vector2(0.01, 0.01))

## Düz zemin dikdörtgeni (UV dünya koordinatından, tile metre)
func ground(x0: float, x1: float, z0: float, z1: float, y: float, key: String, tile: float, col: Color = Color.WHITE) -> void:
	var a := Vector3(x0, y, z0); var bb := Vector3(x1, y, z0); var c := Vector3(x1, y, z1); var d := Vector3(x0, y, z1)
	buf(key).quad(a, bb, c, d, Vector3.UP, col, Vector2(x0, z0) / tile, Vector2(x1, z0) / tile, Vector2(x1, z1) / tile, Vector2(x0, z1) / tile)

func flush(parent: Node, owner: Node, name: String = "", shadow: bool = true) -> MeshInstance3D:
	var am := ArrayMesh.new()
	var keys := bufs.keys()
	keys.sort()
	for key in keys:
		var b: Buf = bufs[key]
		if b.P.is_empty():
			continue
		var arr := []
		arr.resize(Mesh.ARRAY_MAX)
		arr[Mesh.ARRAY_VERTEX] = b.P
		arr[Mesh.ARRAY_NORMAL] = b.N
		arr[Mesh.ARRAY_COLOR] = b.C
		arr[Mesh.ARRAY_TEX_UV] = b.U
		am.add_surface_from_arrays(Mesh.PRIMITIVE_TRIANGLES, arr)
		am.surface_set_material(am.get_surface_count() - 1, mats[key])
	bufs.clear()
	if am.get_surface_count() == 0:
		return null
	var mi := MeshInstance3D.new()
	mi.mesh = am
	if name != "":
		mi.name = name
	mi.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_ON if shadow else GeometryInstance3D.SHADOW_CASTING_SETTING_OFF
	parent.add_child(mi)
	mi.owner = owner
	return mi
