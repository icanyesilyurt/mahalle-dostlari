extends Node3D
## Mahalle Dostları: İstanbul. Harita önceden kurulup res://map/istanbul.scn olarak kaydedilir
## (tools/build_map.gd). Bu betik oyuncuyu, hayvanları, oyunları ve arayüzü yönetir.

const AnimalScript := preload("res://scripts/animal.gd")
const PlayerScript := preload("res://scripts/player.gd")
const HudScript := preload("res://scripts/hud.gd")
const TREAT_PRICE := 40
const PLAY_REWARD := 20

var font: Font
var MAP := {}
var COL: Array = []
var player: CharacterBody3D
var pivot: Node3D
var spring: SpringArm3D
var camera: Camera3D
var hud
var animals: Array = []
var map_root: Node3D
var tram: Node3D
var tram_s := 0.0
var tram_dir := 1.0
var tram_path: Array = []
var ferries := {}
var gulls: Array = []
var D := {}
var near = null
var last_place := ""
var cam_yaw := 0.0
var cam_pitch := -0.18
var manual_cam_t := 0.0
var joy_id := -1
var joy_o := Vector2.ZERO
var joy_v := Vector2.ZERO
var look_id := -1
var mouse_drag := false
var t := 0.0
var is_touch := false

# oyun oturumu
var play := {}
var ball: MeshInstance3D
var dot: MeshInstance3D
var fish_cd := 0.0

# ------------------------------------------------------------------ kurulum
func _ready() -> void:
	font = load("res://assets/fonts/ui_font.tres")
	is_touch = DisplayServer.is_touchscreen_available()
	var f := FileAccess.open("res://map/istanbul.json", FileAccess.READ)
	MAP = JSON.parse_string(f.get_as_text())
	COL = MAP.col
	_make_environment()
	map_root = (load("res://map/istanbul.scn") as PackedScene).instantiate()
	add_child(map_root)
	tram = map_root.get_node("Hareketli/Tramvay")
	for n in ["VapurIskele", "VapurBogaz", "VapurHalic", "BalikEkmek1", "BalikEkmek2"]:
		ferries[n] = map_root.get_node("Hareketli/" + n)
	for p in MAP.tram:
		tram_path.append(Vector3(p[0], 0, p[1]))
	_make_gulls()
	_make_play_props()
	_load_save()
	_make_player()
	_make_animals()

	hud = HudScript.new()
	add_child(hud)
	hud.action.connect(_on_action)
	hud.buy.connect(_on_buy)
	hud.newday_pressed.connect(_on_new_day)
	hud.set_hint("Sol taraf: yürü  ·  Sağ taraf: kamerayı çevir" if is_touch else "WASD: yürü  ·  Fareyle sürükle: kamera  ·  Tekerlek: yakınlaştır")
	_sync_hud()
	hud.toast("Sultanahmet'e hoş geldin! Balonlu dostlar seni bekliyor", 3.5)
	_debug_shots()

func _make_environment() -> void:
	var env := Environment.new()
	var sky := Sky.new()
	var sm := ProceduralSkyMaterial.new()
	sm.sky_top_color = Color("#4a97cf")
	sm.sky_horizon_color = Color("#f3d9bb")
	sm.ground_horizon_color = Color("#e9d2b6")
	sm.ground_bottom_color = Color("#5d7f96")
	sm.sun_angle_max = 20.0
	sky.sky_material = sm
	env.background_mode = Environment.BG_SKY
	env.sky = sky
	env.ambient_light_source = Environment.AMBIENT_SOURCE_COLOR
	env.ambient_light_color = Color("#b4bccb")
	env.ambient_light_energy = 0.36
	env.tonemap_mode = Environment.TONE_MAPPER_LINEAR
	env.fog_enabled = true
	env.fog_light_color = Color("#ead8c2")
	env.fog_density = 0.0032
	env.fog_sky_affect = 0.0
	var we := WorldEnvironment.new()
	we.environment = env
	add_child(we)
	var sun := DirectionalLight3D.new()
	sun.rotation_degrees = Vector3(-42, -55, 0)
	sun.light_energy = 0.62
	sun.light_color = Color("#ffe6c4")
	sun.shadow_enabled = true
	sun.directional_shadow_max_distance = 55.0
	add_child(sun)
	# su
	var water := MeshInstance3D.new()
	var pm := PlaneMesh.new()
	pm.size = Vector2(760, 720)
	pm.subdivide_width = 70
	pm.subdivide_depth = 70
	water.mesh = pm
	var wm := ShaderMaterial.new()
	wm.shader = load("res://map/water.gdshader")
	water.material_override = wm
	water.position = Vector3(-20, -0.62, 10)
	water.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_OFF
	add_child(water)
	var fl := StaticBody3D.new()
	var cs := CollisionShape3D.new()
	cs.shape = WorldBoundaryShape3D.new()
	fl.add_child(cs)
	add_child(fl)

func _make_gulls() -> void:
	var body_m := StandardMaterial3D.new(); body_m.albedo_color = Color("#f7f7f2")
	var wing_m := StandardMaterial3D.new(); wing_m.albedo_color = Color("#c9ced2")
	var sph := SphereMesh.new(); sph.radius = 0.16; sph.height = 0.32; sph.radial_segments = 8; sph.rings = 4
	var wbm := BoxMesh.new(); wbm.size = Vector3(0.75, 0.03, 0.26)
	for i in 9:
		var gnode := Node3D.new()
		var b := MeshInstance3D.new(); b.mesh = sph; b.material_override = body_m; b.scale = Vector3(1, 1, 2); gnode.add_child(b)
		for s in [-1.0, 1.0]:
			var piv := Node3D.new(); piv.position = Vector3(s * 0.08, 0, 0); gnode.add_child(piv)
			var w := MeshInstance3D.new(); w.mesh = wbm; w.material_override = wing_m; w.position = Vector3(s * 0.38, 0, 0); piv.add_child(w)
		add_child(gnode)
		var centers := [Vector3(0, 0, -40), Vector3(-30, 0, -30), Vector3(30, 0, -45), Vector3(60, 0, -30)]
		gulls.append({"n": gnode, "c": centers[i % centers.size()], "r": 7.0 + i * 1.6, "a": i * 1.1, "h": 7.0 + (i % 4) * 2.0, "sp": 0.35 + (i % 3) * 0.08, "dive": 0.0, "dp": Vector3.ZERO})

func _make_play_props() -> void:
	ball = MeshInstance3D.new()
	var bs := SphereMesh.new(); bs.radius = 0.13; bs.height = 0.26
	ball.mesh = bs
	var bm := StandardMaterial3D.new(); bm.albedo_color = Color("#e83f3f"); bm.roughness = 0.5
	ball.material_override = bm
	ball.visible = false
	add_child(ball)
	dot = MeshInstance3D.new()
	var dm := CylinderMesh.new(); dm.top_radius = 0.09; dm.bottom_radius = 0.09; dm.height = 0.01
	dot.mesh = dm
	var dmat := StandardMaterial3D.new(); dmat.albedo_color = Color(1, 0.1, 0.1); dmat.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	dmat.emission_enabled = true; dmat.emission = Color(1, 0.1, 0.1)
	dot.material_override = dmat
	dot.visible = false
	add_child(dot)

# Geliştirici testi: --shot=dosya.png [--at=x,z,yaw] [--far=pitch,uzaklık]
func _debug_shots() -> void:
	var shot := ""
	for a in OS.get_cmdline_user_args():
		if a.begins_with("--shot="): shot = a.substr(7)
		if a.begins_with("--at="):
			var p := a.substr(5).split(",")
			player.position = Vector3(float(p[0]), 0.1, float(p[1]))
			cam_yaw = float(p[2])
			pivot.global_position = player.position + Vector3(0, 1.5, 0)
		if a.begins_with("--far="):
			var q := a.substr(6).split(",")
			cam_pitch = float(q[0]); spring.spring_length = float(q[1])
	if shot == "":
		return
	await get_tree().create_timer(3.0).timeout
	get_viewport().get_texture().get_image().save_png(shot)
	get_tree().quit()

# --- oyuncu ve kamera ---
func _make_player() -> void:
	player = PlayerScript.new()
	var st: Array = MAP.start
	player.position = Vector3(st[0], 0.1, st[1])
	add_child(player)
	pivot = Node3D.new()
	pivot.top_level = true
	add_child(pivot)
	spring = SpringArm3D.new()
	spring.spring_length = 5.5
	spring.margin = 0.25
	var ss := SphereShape3D.new()
	ss.radius = 0.3
	spring.shape = ss
	pivot.add_child(spring)
	spring.add_excluded_object(player.get_rid())
	camera = Camera3D.new()
	camera.fov = 64
	camera.near = 0.1
	camera.far = 600
	spring.add_child(camera)
	camera.current = true
	pivot.global_position = player.global_position + Vector3(0, 1.5, 0)
	cam_yaw = st[2]

# --- hayvanlar ---
func _make_animals() -> void:
	var today := _today()
	for a in MAP.animals:
		var n = AnimalScript.new()
		n.id = a[0]; n.cat = a[1]; n.color = Color(a[2]); n.animal_name = a[3]
		n.home = Vector3(a[4], a[6], a[5]); n.place_name = a[7]
		n.cols = COL; n.font = font
		var r: Dictionary = D.fr.get(n.id, {})
		n.friend = int(r.get("f", 0))
		n.hungry = r.get("fd", "") != today
		n.thirsty = r.get("wd", "") != today and (true if r.size() > 0 else randf() < 0.6)
		add_child(n)
		n.build()
		n.greeted.connect(_on_greeted)
		animals.append(n)

func _on_greeted(a) -> void:
	_hearts(a.global_position + Vector3(0, a.top_y, 0))
	hud.toast("%s seni hatırladı!" % a.animal_name, 2.4)

func _hearts(at: Vector3) -> void:
	var red := StandardMaterial3D.new()
	red.albedo_color = Color("#e0483a")
	red.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	var sm := SphereMesh.new(); sm.radius = 0.1; sm.height = 0.2; sm.radial_segments = 10; sm.rings = 5
	var bm := BoxMesh.new(); bm.size = Vector3(0.15, 0.15, 0.06)
	for i in 3:
		var hnode := Node3D.new()
		for sx in [-0.07, 0.07]:
			var s := MeshInstance3D.new(); s.mesh = sm; s.material_override = red; s.position = Vector3(sx, 0.02, 0); hnode.add_child(s)
		var b := MeshInstance3D.new(); b.mesh = bm; b.material_override = red; b.rotation.z = PI / 4; b.position = Vector3(0, -0.07, 0); hnode.add_child(b)
		add_child(hnode)
		hnode.global_position = at + Vector3((i - 1) * 0.45, 0, 0)
		var tw := create_tween()
		tw.tween_interval(i * 0.12)
		tw.tween_property(hnode, "global_position", hnode.global_position + Vector3(0, 1.4, 0), 1.3)
		tw.parallel().tween_property(hnode, "scale", Vector3.ONE * 0.2, 1.3)
		tw.tween_callback(hnode.queue_free)

# --- kayıt ---
func _today() -> String:
	return Time.get_date_string_from_system()

func _load_save() -> void:
	D = {"day": _today(), "food": 10, "water": 6, "pts": 0, "treats": 0, "bait": 10, "fr": {}}
	if FileAccess.file_exists("user://kayit.json"):
		var f := FileAccess.open("user://kayit.json", FileAccess.READ)
		var parsed = JSON.parse_string(f.get_as_text())
		if parsed is Dictionary:
			for k in parsed:
				D[k] = parsed[k]
	for k in ["treats", "bait"]:
		if not D.has(k): D[k] = 0 if k == "treats" else 10
	if D.day != _today():
		_new_day_values()
	_save()

func _new_day_values() -> void:
	D.day = _today()
	D.food = maxi(int(D.food), 10)
	D.water = 6
	D.bait = 10

func _save() -> void:
	var f := FileAccess.open("user://kayit.json", FileAccess.WRITE)
	if f:
		f.store_string(JSON.stringify(D))

func _rec(a, key: String) -> Dictionary:
	var r: Dictionary = D.fr.get(a.id, {"f": 0, "fd": "", "wd": ""})
	r[key] = _today()
	if key == "fd" or key == "td":
		r["f"] = int(r.get("f", 0)) + 1
	D.fr[a.id] = r
	a.friend = int(r["f"])
	return r

func _rget(a, key: String) -> String:
	var r: Dictionary = D.fr.get(a.id, {})
	return str(r.get(key, ""))

# --- metinler ---
func _level(a) -> String:
	if a.friend >= 5: return "Can dostun"
	if a.friend >= 3: return "Yakın dost"
	if a.friend >= 1: return "Seni tanıyor"
	return "Seni henüz tanımıyor"

func _need(a) -> String:
	if a.hungry and a.thirsty: return "Aç ve susamış"
	if a.hungry: return "Karnı aç"
	if a.thirsty: return "Susamış"
	return "Mutlu"

func _sync_hud() -> void:
	hud.set_stats(int(D.food), int(D.water), int(D.pts), int(D.treats))
	var entries := []
	var met := 0
	for a in animals:
		var known: bool = a.friend > 0
		if known: met += 1
		entries.append({"known": known, "color": a.color, "title": a.animal_name if known else "???",
			"sub": (a.place_name + "  ·  %d kez" % a.friend) if known else "Henüz tanışmadın", "level": _level(a)})
	hud.set_book(entries, met, animals.size())
	hud.set_shop([
		{"id": "treat", "title": "Ödül maması", "sub": "Oyundan sonra ver. Dostluğunu bir kat artırır.", "price": "%d puan" % TREAT_PRICE, "enabled": int(D.pts) >= TREAT_PRICE},
		{"id": "treat5", "title": "5 ödül maması", "sub": "Toplu al, biraz daha ucuz.", "price": "%d puan" % (TREAT_PRICE * 4), "enabled": int(D.pts) >= TREAT_PRICE * 4}])

# --- eylem kartı ---
func _on_bridge_rail() -> bool:
	var b: Array = MAP.bridge
	var p := player.position
	return p.x > b[0] and p.x < b[1] and p.z > b[2] and p.z < b[3] and absf(p.x) > 4.6

func _update_actions() -> void:
	if not play.is_empty():
		var a = play.a
		if a.cat:
			hud.show_actions("%s ile lazer oyunu" % a.animal_name, "Kamerayı çevirerek kırmızı noktayı gezdir.  Yakalama: %d/5" % play.count,
				[{"id": "end", "label": "Bitir", "enabled": true, "color": Color("#e9e4d6")}])
		else:
			hud.show_actions("%s ile top oyunu" % a.animal_name, "Kameranın baktığı yöne atarsın.  Getirdi: %d/3" % play.count,
				[{"id": "throw", "label": "Topu at", "enabled": play.state == "ready", "color": Color("#f6c445")},
				 {"id": "end", "label": "Bitir", "enabled": true, "color": Color("#e9e4d6")}])
		return
	if near != null:
		var a2 = near
		var info: String = _need(a2) + "  ·  " + _level(a2)
		var played: bool = _rget(a2, "pd") == _today()
		var treated: bool = _rget(a2, "td") == _today()
		hud.show_actions("%s  ·  %s" % [a2.animal_name, "kedi" if a2.cat else "köpek"], info, [
			{"id": "feed", "label": "Mama ver", "enabled": a2.hungry, "color": Color("#f6c445")},
			{"id": "water", "label": "Su ver", "enabled": a2.thirsty, "color": Color("#9fd6ef")},
			{"id": "play", "label": ("Lazerle oyna" if a2.cat else "Top oyna") if a2.friend > 0 else "Oyna (önce besle)", "enabled": a2.friend > 0, "color": Color("#c8e6b0")},
			{"id": "treat", "label": "Ödül maması (%d)" % int(D.treats), "enabled": int(D.treats) > 0 and not treated, "color": Color("#f2b8c6")}])
		return
	if _on_bridge_rail():
		hud.show_actions("Galata Köprüsü", "Balıklar yem bekliyor. Bugünkü yem: %d" % int(D.bait),
			[{"id": "fish", "label": "Balıklara yem at", "enabled": int(D.bait) > 0 and fish_cd <= 0.0, "color": Color("#9fd6ef")}])
		return
	hud.hide_actions()

func _on_action(id: String) -> void:
	match id:
		"feed": _on_feed()
		"water": _on_water()
		"play": _start_play()
		"treat": _give_treat()
		"throw": _throw_ball()
		"end": _end_play(false)
		"fish": _feed_fish()

func _on_buy(id: String) -> void:
	var n := 1 if id == "treat" else 5
	var price := TREAT_PRICE if id == "treat" else TREAT_PRICE * 4
	if int(D.pts) < price:
		hud.toast("Yeterli puan yok")
		return
	D.pts = int(D.pts) - price
	D.treats = int(D.treats) + n
	_save(); _sync_hud()
	hud.toast("%d ödül maması alındı" % n)

func _on_feed() -> void:
	if near == null or not near.hungry:
		return
	if int(D.food) <= 0:
		hud.toast("Bugünkü mamalar bitti. Yarın 10 paket daha gelir")
		return
	D.food = int(D.food) - 1
	D.pts = int(D.pts) + 10
	near.hungry = false
	_rec(near, "fd")
	near.happy = 1.6
	hud.toast("%s seni artık tanıyor" % near.animal_name if near.friend == 1 else "+10 puan", 1.8)
	near.refresh()
	_save(); _sync_hud()

func _on_water() -> void:
	if near == null or not near.thirsty:
		return
	if int(D.water) <= 0:
		hud.toast("Su bitti. Bir çeşmeden doldur")
		return
	D.water = int(D.water) - 1
	near.thirsty = false
	_rec(near, "wd")
	near.happy = 1.6
	hud.toast("Teşekkürler!", 1.2)
	near.refresh()
	_save(); _sync_hud()

func _give_treat() -> void:
	if near == null or int(D.treats) <= 0:
		return
	D.treats = int(D.treats) - 1
	_rec(near, "td")
	near.happy = 3.0
	_hearts(near.global_position + Vector3(0, near.top_y, 0))
	hud.toast("%s bayıldı! Dostluğunuz arttı" % near.animal_name, 2.4)
	near.refresh()
	_save(); _sync_hud()

# --- oyun: top ve lazer ---
func _start_play() -> void:
	if near == null or near.friend <= 0:
		return
	var a = near
	play = {"a": a, "count": 0, "state": "ready", "t": 0.0, "last": Vector3(1e6, 0, 0)}
	a.mode = "wait"
	a.bowl.visible = false; a.drop.visible = false
	if a.cat:
		a.mode = "chase"
		dot.visible = true
		hud.toast("Kamerayı çevir, %s noktayı kovalasın!" % a.animal_name, 2.6)
	else:
		ball.visible = true
		hud.toast("Kameranın baktığı yöne topu at!", 2.2)

func _clear_target(p: Vector3) -> bool:
	for c in COL:
		if p.x > c[0] - 0.6 and p.x < c[1] + 0.6 and p.z > c[2] - 0.6 and p.z < c[3] + 0.6:
			return false
	var b: Array = MAP.bridge
	var on_bridge: bool = p.x > b[0] + 0.5 and p.x < b[1] - 0.5 and p.z > b[2] and p.z < b[3]
	var on_pier: bool = p.x > 22.5 and p.x < 39.5 and p.z > -39.5 and p.z < -22
	if p.z > -57.5 and p.z < -22.5 and not on_bridge and not on_pier:
		return false
	if p.x > 99.5 and p.z > -22.5:
		return false
	return true

func _throw_ball() -> void:
	if play.is_empty() or play.state != "ready":
		return
	var fwd := -Vector3(sin(cam_yaw), 0, cos(cam_yaw))
	var start := player.global_position + Vector3(0, 1.3, 0)
	var dist := 10.0
	var tgt := Vector3.ZERO
	while dist > 1.5:
		tgt = player.global_position + fwd * dist
		tgt.y = 0.13
		if _clear_target(tgt):
			break
		dist -= 0.7
	play.state = "flying"
	play.from = start
	play.to = tgt
	play.t = 0.0
	player.facing = atan2(fwd.x, fwd.z)

func _end_play(done: bool) -> void:
	if play.is_empty():
		return
	var a = play.a
	a.mode = ""
	a.target = a.home
	ball.visible = false
	dot.visible = false
	if done:
		a.happy = 3.0
		_hearts(a.global_position + Vector3(0, a.top_y, 0))
		if _rget(a, "pd") != _today():
			D.pts = int(D.pts) + PLAY_REWARD
			_rec(a, "pd")
			hud.toast("Harika oyundu! +%d puan. Ödül maması verebilirsin" % PLAY_REWARD, 3.0)
		else:
			hud.toast("%s çok eğlendi!" % a.animal_name, 2.4)
		_save(); _sync_hud()
	a.refresh()
	play = {}

func _update_play(delta: float) -> void:
	if play.is_empty():
		return
	var a = play.a
	if a.global_position.distance_to(player.global_position) > 30.0:
		_end_play(false)
		return
	if a.cat:
		play.t += delta
		var vs := get_viewport().get_visible_rect().size
		var c := vs / 2.0 + Vector2(0, vs.y * 0.08)
		var o := camera.project_ray_origin(c)
		var d := camera.project_ray_normal(c)
		var p := player.global_position + -Vector3(sin(cam_yaw), 0, cos(cam_yaw)) * 4.0
		if d.y < -0.01:
			p = o + d * (-(o.y - 0.02) / d.y)
		var off := p - player.global_position
		off.y = 0
		var L := clampf(off.length(), 2.0, 9.0)
		p = player.global_position + off.normalized() * L
		p.y = 0.02
		dot.global_position = dot.global_position.lerp(p, minf(1.0, delta * 12.0)) if dot.visible else p
		a.goal = dot.global_position
		var dd := Vector2(a.position.x - dot.global_position.x, a.position.z - dot.global_position.z).length()
		var moved: float = (dot.global_position - play.last).length()
		if dd < 0.5 and moved > 1.5:
			play.count += 1
			play.last = dot.global_position
			a.hop = 0.45
			if play.count >= 5:
				_end_play(true)
		elif play.t > 45.0:
			_end_play(play.count > 0)
		return
	match play.state:
		"ready":
			var hand := player.global_position + Vector3(0, 1.1, 0) + player.global_transform.basis.x * 0.35
			ball.global_position = hand
			a.mode = "wait"
		"flying":
			play.t += delta / 0.9
			var k := minf(1.0, play.t)
			var p2: Vector3 = (play.from as Vector3).lerp(play.to, k)
			p2.y += sin(k * PI) * 2.6
			ball.global_position = p2
			if k >= 1.0:
				play.state = "landed"
				a.mode = "go"
				a.goal = play.to
		"landed":
			a.goal = play.to
			if Vector2(a.position.x - play.to.x, a.position.z - play.to.z).length() < 0.55:
				play.state = "back"
				a.mode = "wait"
		"back":
			ball.global_position = a.mouth_pos()
			if Vector2(a.position.x - player.position.x, a.position.z - player.position.z).length() < 1.45:
				play.count += 1
				a.happy = 1.2
				if play.count >= 3:
					_end_play(true)
				else:
					play.state = "ready"

# --- köprüde balık ---
func _feed_fish() -> void:
	if int(D.bait) <= 0 or fish_cd > 0.0:
		return
	D.bait = int(D.bait) - 1
	fish_cd = 1.6
	var side := signf(player.position.x)
	var spot := Vector3(side * 10.0, -0.6, player.position.z)
	var fish_m := StandardMaterial3D.new(); fish_m.albedo_color = Color("#c9d3d9"); fish_m.metallic = 0.6; fish_m.roughness = 0.3
	var fm := SphereMesh.new(); fm.radius = 0.09; fm.height = 0.18; fm.radial_segments = 8; fm.rings = 4
	for i in 5:
		var fish := MeshInstance3D.new()
		fish.mesh = fm
		fish.material_override = fish_m
		fish.scale = Vector3(1, 1, 2.6)
		add_child(fish)
		var p0 := spot + Vector3(randf_range(-1.5, 1.5), 0, randf_range(-2.0, 2.0))
		var p1 := p0 + Vector3(randf_range(-0.8, 0.8), 0, randf_range(-0.8, 0.8))
		fish.global_position = p0
		fish.visible = false
		var tw := create_tween()
		tw.tween_interval(i * 0.15)
		tw.tween_callback(func(): fish.visible = true; _splash(p0))
		tw.tween_method(_fish_arc.bind(fish, p0, p1), 0.0, 1.0, 0.7)
		tw.tween_callback(func(): _splash(p1); fish.queue_free())
	var gl: Dictionary = gulls[randi() % gulls.size()]
	gl.dive = 2.2
	gl.dp = spot + Vector3(0, 0.4, 0)
	D.pts = int(D.pts) + 2
	_save(); _sync_hud()
	hud.toast("Balıklar yemi kaptı! +2 puan", 1.6)

func _fish_arc(k: float, fish: Node3D, p0: Vector3, p1: Vector3) -> void:
	var q := p0.lerp(p1, k)
	q.y = -0.6 + sin(k * PI) * 1.1
	fish.global_position = q
	fish.rotation.x = lerpf(-1.0, 1.0, k)

func _splash(p: Vector3) -> void:
	var r := MeshInstance3D.new()
	var tm := TorusMesh.new(); tm.inner_radius = 0.25; tm.outer_radius = 0.32; tm.rings = 16; tm.ring_segments = 4
	r.mesh = tm
	var m := StandardMaterial3D.new(); m.albedo_color = Color(1, 1, 1, 0.8); m.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA; m.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	r.material_override = m
	add_child(r)
	r.global_position = Vector3(p.x, -0.5, p.z)
	var tw := create_tween()
	tw.tween_property(r, "scale", Vector3(3, 1, 3), 0.8)
	tw.parallel().tween_property(m, "albedo_color:a", 0.0, 0.8)
	tw.tween_callback(r.queue_free)

func _on_new_day() -> void:
	_new_day_values()
	for k in D.fr:
		for key in ["fd", "wd", "pd", "td"]:
			D.fr[k][key] = ""
	for a in animals:
		a.hungry = true
		a.thirsty = true
		a.greeted_today = false
		a.greet = false
		a.position = a.home
		a.refresh()
	_save(); _sync_hud()
	hud.toast("Yeni gün. Dün beslediğin dostlarına uğra", 3.0)

# --- girdi ---
func _unhandled_input(event: InputEvent) -> void:
	if hud == null or hud.is_sheet_open():
		return
	var vs := get_viewport().get_visible_rect().size
	if event is InputEventScreenTouch:
		var e := event as InputEventScreenTouch
		if e.pressed:
			if hud.over_ui(e.position):
				return
			if e.position.x < vs.x * 0.45 and joy_id == -1:
				joy_id = e.index; joy_o = e.position; joy_v = Vector2.ZERO
				hud.set_joy(true, joy_o, joy_v)
			elif look_id == -1:
				look_id = e.index
		else:
			if e.index == joy_id:
				joy_id = -1; joy_v = Vector2.ZERO
				hud.set_joy(false, joy_o, joy_v)
			if e.index == look_id:
				look_id = -1
	elif event is InputEventScreenDrag:
		var d := event as InputEventScreenDrag
		if d.index == joy_id:
			joy_v = (d.position - joy_o) / 90.0
			if joy_v.length() > 1.0:
				joy_v = joy_v.normalized()
			hud.set_joy(true, joy_o, joy_v)
		elif d.index == look_id:
			cam_yaw -= d.relative.x * 0.006
			cam_pitch = clampf(cam_pitch - d.relative.y * 0.004, -0.9, -0.05)
			manual_cam_t = 2.5
	elif event is InputEventMouseButton:
		var mb := event as InputEventMouseButton
		if mb.device == InputEvent.DEVICE_ID_EMULATION:
			return
		if mb.button_index == MOUSE_BUTTON_LEFT or mb.button_index == MOUSE_BUTTON_RIGHT:
			mouse_drag = mb.pressed and not hud.over_ui(mb.position)
		elif mb.button_index == MOUSE_BUTTON_WHEEL_UP and mb.pressed:
			spring.spring_length = clampf(spring.spring_length - 0.5, 3.0, 12.0)
		elif mb.button_index == MOUSE_BUTTON_WHEEL_DOWN and mb.pressed:
			spring.spring_length = clampf(spring.spring_length + 0.5, 3.0, 12.0)
	elif event is InputEventMouseMotion and mouse_drag:
		var mm := event as InputEventMouseMotion
		if mm.device == InputEvent.DEVICE_ID_EMULATION:
			return
		cam_yaw -= mm.relative.x * 0.005
		cam_pitch = clampf(cam_pitch - mm.relative.y * 0.004, -0.9, -0.05)
		manual_cam_t = 2.5

func _place_at(x: float, z: float) -> String:
	var best := ""
	var best_area := 1e12
	for p in MAP.places:
		if x >= p[1] and x <= p[2] and z >= p[3] and z <= p[4]:
			var area: float = (p[2] - p[1]) * (p[4] - p[3])
			if area < best_area:
				best_area = area; best = p[0]
	return best

# --- döngü ---
func _process(delta: float) -> void:
	t += delta
	fish_cd = maxf(0.0, fish_cd - delta)
	var kx := 0.0; var kz := 0.0
	if not hud.is_sheet_open():
		if Input.is_physical_key_pressed(KEY_W) or Input.is_physical_key_pressed(KEY_UP): kz += 1.0
		if Input.is_physical_key_pressed(KEY_S) or Input.is_physical_key_pressed(KEY_DOWN): kz -= 1.0
		if Input.is_physical_key_pressed(KEY_D) or Input.is_physical_key_pressed(KEY_RIGHT): kx += 1.0
		if Input.is_physical_key_pressed(KEY_A) or Input.is_physical_key_pressed(KEY_LEFT): kx -= 1.0
		if Input.is_physical_key_pressed(KEY_Q): cam_yaw += delta * 1.8; manual_cam_t = 2.5
		if Input.is_physical_key_pressed(KEY_E): cam_yaw -= delta * 1.8; manual_cam_t = 2.5
	var fwd := -Vector3(sin(cam_yaw), 0, cos(cam_yaw))
	var right := Vector3(cos(cam_yaw), 0, -sin(cam_yaw))
	var f_in := kz - joy_v.y
	var r_in := kx + joy_v.x
	var mv := fwd * f_in + right * r_in
	if mv.length() > 1.0:
		mv = mv.normalized()
	player.move_input = mv

	manual_cam_t -= delta
	if manual_cam_t <= 0.0 and player.moving and f_in > 0.4 and play.is_empty():
		cam_yaw = lerp_angle(cam_yaw, player.facing + PI, minf(1.0, delta * 1.3))
	var target := player.global_position + Vector3(0, 1.5, 0)
	pivot.global_position = pivot.global_position.lerp(target, minf(1.0, delta * 10.0))
	pivot.rotation = Vector3(cam_pitch, cam_yaw, 0)

	var best = null
	var bd := 2.4
	for a in animals:
		a.tick(delta, player.global_position, t)
		var d: float = Vector2(a.position.x - player.position.x, a.position.z - player.position.z).length()
		if d < bd and a.mode == "":
			bd = d; best = a
	near = best
	_update_play(delta)
	_update_actions()

	for f in MAP.fountains:
		if Vector2(player.position.x - f[0], player.position.z - f[1]).length() < 8.0 and int(D.water) < 6:
			D.water = 6
			_save(); _sync_hud()
			hud.toast("Su şişen doldu", 1.6)

	var pl := _place_at(player.position.x, player.position.z)
	if pl != "" and pl != last_place:
		last_place = pl
		hud.show_place(pl)

	_update_movers(delta)

func _update_movers(delta: float) -> void:
	# T1 tramvayı: yol boyunca ileri geri
	var total := 0.0
	var segs := []
	for i in tram_path.size() - 1:
		var L: float = (tram_path[i + 1] - tram_path[i]).length()
		segs.append(L); total += L
	tram_s += tram_dir * 6.0 * delta
	if tram_s > total - 8.0: tram_dir = -1.0
	if tram_s < 8.0: tram_dir = 1.0
	var s := tram_s
	for i in segs.size():
		if s <= segs[i] or i == segs.size() - 1:
			var a: Vector3 = tram_path[i]; var b: Vector3 = tram_path[i + 1]
			var dir := (b - a).normalized()
			tram.position = a + dir * s
			tram.rotation.y = atan2(dir.x, dir.z)
			break
		s -= segs[i]
	var fb: Node3D = ferries.VapurBogaz
	fb.position = Vector3(135, sin(t * 0.8) * 0.08, 10 + sin(t * 0.03) * 120)
	fb.rotation.y = 0.0 if cos(t * 0.03) > 0 else PI
	var fh: Node3D = ferries.VapurHalic
	fh.position = Vector3(-80 + sin(t * 0.04) * 55, sin(t * 0.9) * 0.08, -40)
	fh.rotation.y = PI / 2 if cos(t * 0.04) > 0 else -PI / 2
	for n in ["VapurIskele", "BalikEkmek1", "BalikEkmek2"]:
		var bn: Node3D = ferries[n]
		bn.position.y = sin(t * 1.1 + bn.position.x) * 0.1
		bn.rotation.z = sin(t * 0.9 + bn.position.x) * 0.03
	for gl in gulls:
		var n2: Node3D = gl.n
		if gl.dive > 0.0:
			gl.dive -= delta
			n2.global_position = n2.global_position.lerp(gl.dp + Vector3(0, 1.2, 0), minf(1.0, delta * 2.0))
		else:
			gl.a += gl.sp * delta
			var p: Vector3 = gl.c + Vector3(cos(gl.a) * gl.r, gl.h + sin(gl.a * 2.0) * 0.8, sin(gl.a) * gl.r)
			n2.global_position = n2.global_position.lerp(p, minf(1.0, delta * 3.0))
			n2.rotation.y = -gl.a
		var flap := sin(t * 7.0 + gl.r) * 0.5
		n2.get_child(1).rotation.z = flap
		n2.get_child(2).rotation.z = -flap
