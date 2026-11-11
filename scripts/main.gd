extends Node3D
## Mahalle Dostları: İstanbul. Harita önceden kurulup res://map/istanbul.scn olarak kaydedilir
## (tools/build_map.gd). Bu betik oyuncuyu, hayvanları, oyunları ve arayüzü yönetir.

const AnimalScript := preload("res://scripts/animal.gd")
const PlayerScript := preload("res://scripts/player.gd")
const HudScript := preload("res://scripts/hud.gd")
const NpcScript := preload("res://scripts/npc.gd")
const TREAT_PRICE := 40
const Breeds := preload("res://scripts/breeds.gd")
const LOOKS := ["character-male-a", "character-female-c"]
const COLOR_PRICE := 50
const CLOTH_COLS := ["#c8423a", "#e2a33b", "#2f7d6d", "#3b6aa8", "#8e3b5a", "#f2efe9", "#2b2b2b", "#d98aa0", "#6b4f3a", "#5a7f3b", "#7cc6ea", "#9a5ac8"]
const HAIR_COLS := ["#2b2320", "#5a3a28", "#8a5a32", "#c9a46a", "#e8d8a8", "#b8442a", "#8a8a8a", "#1a1a1a", "#d98aa0", "#3b6aa8"]
var pet_node = null
const HOME_IN := Vector3(1000, 0, 1000)
const HomeScript := preload("res://scripts/home.gd")
var home_node = null
var in_home := false
var idle_home_t := 0.0
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
var city := "istanbul"
var movers: Array = []
var dbg_walk := Vector3.ZERO
const CITIES := {
	"istanbul": {"loc": "İstanbul'da", "name": "İstanbul", "hello": "İstanbul'a hoş geldin! Sultanahmet'te dostlar seni bekliyor"},
	"paris": {"loc": "Paris'te", "name": "Paris", "hello": "Bienvenue! Paris sokaklarında dostlar seni bekliyor"},
	"roma": {"loc": "Roma'da", "name": "Roma", "hello": "Benvenuto! Roma'nın meydanlarında dostlar seni bekliyor"},
	"londra": {"loc": "Londra'da", "name": "Londra", "hello": "Welcome! Londra sokaklarında dostlar seni bekliyor"},
	"barselona": {"loc": "Barselona'da", "name": "Barselona", "hello": "Benvinguts! Barselona'da dostlar seni bekliyor"},
}
var tram2: Node3D
var tram2_s := 0.0
var tram2_dir := 1.0
var npcs: Array = []
var map_t := 0.0
var ferries := {}
var gulls: Array = []
var D := {}
var near = null
var last_place := ""
var cam_yaw := 0.0
var cam_pitch := -0.18
var manual_cam_t := 0.0
var yaw_off := 0.0     # elle bakış (bırakınca sıfıra döner)
var pitch_off := 0.0
var joy_id := -1
var joy_o := Vector2.ZERO
var joy_v := Vector2.ZERO
var joy_raw := Vector2.ZERO
const JOY_R := 85.0
var out_cam := 5.5
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
	if is_touch:
		# telefonda karakter daha küçük görünsün, etraf daha çok görünsün
		out_cam = 7.4
		cam_pitch = -0.3
	_load_save_city()
	var f := FileAccess.open("res://map/%s.json" % city, FileAccess.READ)
	MAP = JSON.parse_string(f.get_as_text())
	COL = MAP.col
	_make_environment()
	map_root = (load("res://map/%s.scn" % city) as PackedScene).instantiate()
	add_child(map_root)
	if city == "istanbul":
		tram = map_root.get_node("Hareketli/Tramvay")
		for n in ["VapurIskele", "VapurBogaz", "VapurHalic", "BalikEkmek1", "BalikEkmek2"]:
			ferries[n] = map_root.get_node("Hareketli/" + n)
		for p in MAP.tram:
			tram_path.append(Vector3(p[0], 0, p[1]))
		tram2 = map_root.get_node("Hareketli/TramvayIstiklal")
	for mv in MAP.get("movers", []):
		var nd := map_root.get_node_or_null("Hareketli/" + str(mv.node))
		if nd:
			movers.append({"n": nd, "path": mv.path, "sp": float(mv.speed), "s": randf() * 50.0, "dir": 1.0, "float": mv.get("float", false)})
	for pth in MAP.npcs:
		var npc = NpcScript.new()
		add_child(npc)
		npc.setup(Vector3(pth[0], 0, pth[1]), Vector3(pth[2], 0, pth[3]))
		npcs.append(npc)
	# seyyar satıcılar: arabanın başında durur
	for v in MAP.get("vendors", []):
		var sv = NpcScript.new()
		add_child(sv)
		var vp := Vector3(v[0], 0, v[1])
		sv.setup(vp, vp)
		sv.position = vp
		sv.rotation.y = float(v[2])
		sv.still = true
		npcs.append(sv)
	# tramvaylara çarpışma kutusu: içinden geçilmez
	if tram:
		_body_box(tram, Vector3(2.8, 3.2, 29.0))
	if tram2:
		_body_box(tram2, Vector3(2.8, 3.2, 9.0))
	_make_gulls()
	_make_pigeons()
	_make_play_props()
	_load_save()
	_make_player()
	_make_animals()
	_spawn_pet()
	_apply_player_colors()
	home_node = HomeScript.new()
	add_child(home_node)
	home_node.build(HOME_IN)
	for did in D.get("decor", []):
		home_node.add_decor(str(did))

	hud = HudScript.new()
	add_child(hud)
	hud.action.connect(_on_action)
	hud.buy.connect(_on_buy)
	hud.newday_pressed.connect(_on_new_day)
	_fit_screen.call_deferred()
	var mb: Array = MAP.bounds
	hud.set_map(load("res://map/%s_mini.png" % city), Rect2(mb[0], mb[1], mb[2], mb[3]), MAP.landmarks)
	hud.set_hint("Sol alttaki çubukla yürü  ·  Sağ tarafı sürükleyip etrafa bak" if is_touch else "WASD: yürü  ·  Fareyle sürükle: kamera  ·  Tekerlek: yakınlaştır")
	_sync_hud()
	hud.toast(CITIES[city].hello, 3.5)
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
	# titremeyen gölge: tek parça gölge haritası (dilim sınırı yok), uzakta yavaşça solar
	sun.directional_shadow_mode = DirectionalLight3D.SHADOW_ORTHOGONAL
	sun.directional_shadow_max_distance = 70.0
	sun.directional_shadow_fade_start = 0.75
	sun.shadow_bias = 0.12
	sun.shadow_normal_bias = 2.2
	add_child(sun)
	var lp := 1
	for a in OS.get_cmdline_user_args():
		if a.begins_with("--light="):
			lp = int(a.substr(8))
	if lp >= 1:
		# sıcak güneş + soğuk gökyüzü dolgu ışığı: gölgedeki yüzler de yönüne göre farklı tonlanır
		sun.light_energy = 0.68
		sun.light_color = Color("#ffdcae")
		sun.rotation_degrees = Vector3(-36, -50, 0)
		env.ambient_light_color = Color("#9fb0c8")
		env.ambient_light_energy = 0.26
		var fill := DirectionalLight3D.new()
		fill.rotation_degrees = Vector3(-55, 130, 0)
		fill.light_energy = 0.22 if lp == 1 else 0.3
		fill.light_color = Color("#a9c4e8")
		fill.shadow_enabled = false
		fill.light_specular = 0.0
		add_child(fill)
		env.adjustment_enabled = true
		env.adjustment_contrast = 1.1
		env.adjustment_saturation = 1.04 if lp == 1 else 0.96
		env.fog_light_color = Color("#e6d4c0")
		env.fog_density = 0.0024
	# su
	var water := MeshInstance3D.new()
	var pm := PlaneMesh.new()
	var mb0: Array = MAP.bounds
	pm.size = Vector2(float(mb0[2]) + 400.0, float(mb0[3]) + 400.0)
	pm.subdivide_width = 70
	pm.subdivide_depth = 70
	water.mesh = pm
	var wm := ShaderMaterial.new()
	wm.shader = load("res://map/water.gdshader")
	water.material_override = wm
	water.position = Vector3(float(mb0[0]) + float(mb0[2]) / 2.0, -0.62, float(mb0[1]) + float(mb0[3]) / 2.0)
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
		var centers := [Vector3(0, 0, -25), Vector3(-50, 0, -22), Vector3(40, 0, -30), Vector3(110, 0, -25)]
		gulls.append({"n": gnode, "c": centers[i % centers.size()], "r": 7.0 + i * 1.6, "a": i * 1.1, "h": 7.0 + (i % 4) * 2.0, "sp": 0.35 + (i % 3) * 0.08, "dive": 0.0, "dp": Vector3.ZERO})

# --- güvercinler: yem gagalar, yaklaşınca kanat çırpıp kaçar ---
var pigeons: Array = []
func _make_pigeons() -> void:
	var cols := [Color("#8e97a3"), Color("#7d8590"), Color("#a7aeb6"), Color("#6c6f75"), Color("#c9c3ba")]
	var sph := SphereMesh.new(); sph.radius = 0.5; sph.height = 1.0; sph.radial_segments = 8; sph.rings = 5
	var neck := StandardMaterial3D.new(); neck.albedo_color = Color("#5f7a6e")
	var beak := StandardMaterial3D.new(); beak.albedo_color = Color("#e0a050")
	var flocks := [Vector3(-10, 0, 10), Vector3(42, 0, 240), Vector3(30, 0, -192), Vector3(-30, 0, 2), Vector3(180, 0, -300)]
	if city != "istanbul":
		# diğer şehirlerde sürüler meydan çeşmelerinin yanında
		flocks.clear()
		for fo in MAP.get("fountains", []):
			flocks.append(Vector3(float(fo[0]) + 9.0, 0, float(fo[1]) + 6.0))
	for f in flocks:
		for i in 9:
			var pn := Node3D.new()
			var bm := StandardMaterial3D.new(); bm.albedo_color = cols[randi() % cols.size()]
			var body := MeshInstance3D.new(); body.mesh = sph; body.material_override = bm; body.scale = Vector3(0.16, 0.15, 0.26); body.position.y = 0.13; pn.add_child(body)
			var hd := Node3D.new(); hd.position = Vector3(0, 0.24, 0.1); pn.add_child(hd)
			var h := MeshInstance3D.new(); h.mesh = sph; h.material_override = neck; h.scale = Vector3(0.09, 0.09, 0.1); hd.add_child(h)
			var bk := MeshInstance3D.new(); bk.mesh = sph; bk.material_override = beak; bk.scale = Vector3(0.025, 0.025, 0.06); bk.position = Vector3(0, -0.01, 0.06); hd.add_child(bk)
			var wings := []
			for sx in [-1.0, 1.0]:
				var w := MeshInstance3D.new(); w.mesh = sph; w.material_override = bm; w.scale = Vector3(0.22, 0.03, 0.16); w.position = Vector3(sx * 0.1, 0.16, -0.02); pn.add_child(w)
				wings.append(w)
			for c in pn.find_children("*", "MeshInstance3D", true, false):
				(c as MeshInstance3D).cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_OFF
			add_child(pn)
			var home: Vector3 = f + Vector3(randf_range(-4, 4), 0, randf_range(-4, 4))
			pn.position = home
			pn.rotation.y = randf() * TAU
			pn.scale = Vector3.ONE * 1.3
			pigeons.append({"n": pn, "hd": hd, "w": wings, "c": f, "fly": 0.0, "v": Vector3.ZERO, "ph": randf() * 6.0, "walk": 0.0})

func _tick_pigeons(delta: float) -> void:
	var pp := player.global_position
	for p in pigeons:
		var n: Node3D = p.n
		var near := Vector2(n.position.x - pp.x, n.position.z - pp.z).length()
		if near > 60.0:
			n.visible = false
			continue
		n.visible = true
		p.ph += delta
		if p.fly > 0.0:
			p.fly -= delta
			n.position += p.v * delta
			p.v.y -= 1.2 * delta
			for w in p.w:
				(w as Node3D).rotation.z = sin(p.ph * 28.0) * 0.9 * (1.0 if (w as Node3D).position.x > 0 else -1.0)
			if p.fly <= 0.0:
				# yeni bir noktaya süzülerek iner
				var land: Vector3 = p.c + Vector3(randf_range(-5, 5), 0, randf_range(-5, 5))
				var tw := create_tween()
				tw.tween_property(n, "position", land, 1.2).set_trans(Tween.TRANS_SINE).set_ease(Tween.EASE_OUT)
				tw.tween_callback(func(): for w in p.w: (w as Node3D).rotation.z = 0.0)
			continue
		if near < 2.6 and n.position.y < 0.05:
			var away := Vector3(n.position.x - pp.x, 0, n.position.z - pp.z).normalized()
			p.v = away * randf_range(3.0, 5.0) + Vector3(0, randf_range(3.5, 5.0), 0)
			p.fly = randf_range(1.2, 2.0)
			n.rotation.y = atan2(away.x, away.z)
			continue
		# gagalama ve küçük adımlar
		(p.hd as Node3D).rotation.x = maxf(0.0, sin(p.ph * 5.0)) * 0.9 if fmod(p.ph, 4.0) < 2.0 else 0.0
		p.walk -= delta
		if p.walk <= 0.0:
			p.walk = randf_range(1.0, 3.0)
			n.rotation.y += randf_range(-1.2, 1.2)
		if fmod(p.ph, 4.0) >= 2.0:
			n.position += Vector3(sin(n.rotation.y), 0, cos(n.rotation.y)) * delta * 0.35

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
			player.facing = cam_yaw + PI
			player.rotation.y = player.facing
			pivot.global_position = player.position + Vector3(0, 1.5, 0)
		if a.begins_with("--far="):
			var q := a.substr(6).split(",")
			cam_pitch = float(q[0]); spring.spring_length = float(q[1])
		if a.begins_with("--walk="):
			var w := a.substr(7).split(",")
			dbg_walk = Vector3(float(w[0]), 0, float(w[1]))
		if a == "--nohud":
			hud.visible = false
			player.visible = false
		if a.begins_with("--goto="):
			_go_city(a.substr(7))
		if a == "--home":
			_enter_home()
		if a.begins_with("--homecam="):
			var r := a.substr(10).split(",")
			player.position = home_node.position + Vector3(float(r[0]), 0.1, float(r[1]))
			cam_yaw = float(r[2]); cam_pitch = float(r[3]); spring.spring_length = float(r[4])
			pivot.global_position = player.position + Vector3(0, 1.5, 0)
	if shot == "":
		return
	await get_tree().create_timer(3.0).timeout
	print("DBG player pos ", player.position)
	get_viewport().get_texture().get_image().save_png(shot)
	get_tree().quit()

# --- oyuncu ve kamera ---
func _make_player() -> void:
	player = PlayerScript.new()
	player.look = str(D.get("ch", LOOKS[0]))
	if not LOOKS.has(player.look):
		player.look = LOOKS[0]
	var st: Array = MAP.start
	player.position = Vector3(st[0], 0.1, st[1])
	add_child(player)
	pivot = Node3D.new()
	pivot.top_level = true
	add_child(pivot)
	spring = SpringArm3D.new()
	spring.spring_length = out_cam
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
	get_tree().root.size_changed.connect(_fit_screen)
	_fit_screen()
	pivot.global_position = player.global_position + Vector3(0, 1.5, 0)
	cam_yaw = st[2]
	# başlangıçta karakterin sırtı kameraya dönük olsun
	player.facing = cam_yaw + PI
	player.rotation.y = player.facing

# --- hayvanlar ---
func _make_animals() -> void:
	var today := _today()
	for a in MAP.animals:
		var n = AnimalScript.new()
		n.id = a[0]; n.cat = a[1]; n.color = Color(a[2]); n.animal_name = a[3]
		n.home = Vector3(a[4], a[6], a[5]); n.place_name = a[7]
		if a.size() > 8:
			n.pattern = a[8]; n.color2 = Color(a[9]) if a[9] != "" else n.color; n.size = a[10]; n.tagged = a[11]
		# sokakta da ırk çeşitliliği (her hayvan için sabit)
		var rnd := float(absi(hash(n.id)) % 1000) / 1000.0
		n.breed = Breeds.street_breed(n.cat, n.pattern, n.color, rnd)
		if n.breed != "":
			n.size = 1.0 if not n.cat else float(Breeds.get_breed(true, n.breed).get("size", 1.0)) * randf_range(0.95, 1.05)
		n.cols = COL; n.font = font
		var r: Dictionary = D.fr.get(n.id, {})
		n.friend = int(r.get("f", 0))
		n.hungry = r.get("fd", "") != today
		n.thirsty = r.get("wd", "") != today and (true if r.size() > 0 else randf() < 0.6)
		add_child(n)
		n.build()
		n.greeted.connect(_on_greeted)
		animals.append(n)

# --- sahiplenme ---
func _pet_items() -> Array:
	var owned: Array = D.get("pets", [])
	var items := []
	for key in owned:
		var p := str(key).split(":")
		var b: Dictionary = Breeds.get_breed(p[0] == "cat", p[1])
		var on := str(D.get("pet", "")) == str(key)
		items.append({"id": "walk:" + str(key), "title": "Senin dostun: " + str(b.name), "sub": "Şu an yanında" if on else "Yanına alıp birlikte gez.",
			"price": "Yanında" if on else "Yanına al", "enabled": not on})
	for cat in [false, true]:
		var tbl: Dictionary = Breeds.CATS if cat else Breeds.DOGS
		var keys := tbl.keys()
		keys.sort_custom(func(x, y): return int(tbl[x].price) < int(tbl[y].price))
		for k in keys:
			var key := ("cat:" if cat else "dog:") + str(k)
			if owned.has(key):
				continue
			items.append({"id": "pet:" + key, "title": "Sahiplen: " + str(tbl[k].name), "sub": "Kedi" if cat else "Köpek",
				"price": "%d puan" % int(tbl[k].price), "enabled": int(D.pts) >= int(tbl[k].price)})
	return items

# --- ev ---
func _enter_home() -> void:
	_stop_romp()
	in_home = true
	player.position = home_node.door_pos
	player.facing = -PI / 2.0
	cam_yaw = PI / 2.0
	spring.spring_length = 3.6
	pivot.global_position = player.position + Vector3(0, 1.5, 0)
	if pet_node:
		pet_node.position = player.position + Vector3(-1.2, 0, 0.8)
		pet_node.mode = "follow"
	hud.show_place("Evin")
	last_place = "Evin"

func _exit_home() -> void:
	in_home = false
	player.position = Vector3(MAP.home[0] + 1.2, 0, MAP.home[1])
	player.facing = PI / 2.0
	cam_yaw = -PI / 2.0
	spring.spring_length = out_cam
	pivot.global_position = player.position + Vector3(0, 1.5, 0)
	if pet_node:
		pet_node.position = player.position + Vector3(1.0, 0, 1.0)
		pet_node.mode = "follow"

# --- köpekler arada birbiriyle kovalamaca oynar ---
var romp := {}
var romp_cd := 8.0
func _tick_romp(delta: float) -> void:
	if not romp.is_empty():
		var a = romp.a; var b = romp.b
		romp.t -= delta
		if not (a.mode in ["chase", "go"]) or not (b.mode in ["chase", "go"]) or romp.t <= 0.0:
			_stop_romp()
			romp_cd = randf_range(10.0, 20.0)
			return
		var gap: float = Vector2(a.position.x - b.position.x, a.position.z - b.position.z).length()
		if romp.phase == "meet":
			# önce birbirlerine koşarlar
			a.goal = a.position; b.goal = a.position
			if gap < 1.6:
				romp.phase = "chase"
				romp.t = randf_range(6.0, 9.0)
				a.mode = "chase"; b.mode = "go"; b.run_spd = 4.6
				b.goal = _romp_goal(b)
				a.happy = 1.0; b.happy = 1.0
			return
		a.goal = b.position
		if Vector2(b.position.x - b.goal.x, b.position.z - b.goal.z).length() < 0.6:
			b.goal = _romp_goal(b)
		romp.sw = float(romp.get("sw", 0.0)) - delta
		if gap < 1.0 and romp.sw <= 0.0:
			romp.sw = 2.0
			# yakalayınca roller değişir
			romp.a = b; romp.b = a
			a.mode = "go"; a.run_spd = 4.6; a.goal = _romp_goal(a)
			b.mode = "chase"; b.run_spd = 0.0
		return
	romp_cd -= delta
	if romp_cd > 0.0:
		return
	romp_cd = 3.0
	var pp := player.position
	var dogs := []
	for an in animals:
		if not an.cat and an.visible and an.mode == "" and not an.greet and not an.sleeping and an.position.distance_to(pp) > 4.0 and an.position.distance_to(pp) < 45.0:
			dogs.append(an)
	for i in dogs.size():
		for j in range(i + 1, dogs.size()):
			if dogs[i].position.distance_to(dogs[j].position) < 50.0 and _line_clear(dogs[i].position, dogs[j].position):
				var a2 = dogs[i]; var b2 = dogs[j]
				a2.mode = "go"; b2.mode = "go"
				a2.run_spd = 5.0; b2.run_spd = 5.0
				romp = {"a": a2, "b": b2, "t": 20.0, "phase": "meet"}
				return

func _play_pet() -> void:
	if pet_node == null or not play.is_empty():
		return
	idle_home_t = 0.0
	pet_node.friend = maxi(1, pet_node.friend)
	near = pet_node
	_start_play()

func _love_pet() -> void:
	if pet_node == null:
		return
	pet_node.mode = "follow"
	pet_node.happy = 3.0
	idle_home_t = 0.0
	player.act("interact-right")
	hud.toast("%s mutlulukla sana sokuldu" % pet_node.animal_name, 2.0)

func _tick_home(delta: float) -> void:
	if not in_home or pet_node == null:
		return
	if player.moving:
		idle_home_t = 0.0
		if pet_node.mode == "go":
			pet_node.mode = "follow"
	else:
		idle_home_t += delta
		if idle_home_t > 6.0 and pet_node.mode == "follow":
			# dost minderine gidip kıvrılır
			pet_node.goal = home_node.pet_bed
			pet_node.mode = "go"

# --- pasaport: şehirler sırayla açılır ---
const CITY_ORDER := ["istanbul", "paris", "roma", "londra"]
const UNLOCK_FRIENDS := 15
const UNLOCK_PTS := 1500

func _met_in(c: String) -> int:
	var n := 0
	for id in D.fr:
		var r: Dictionary = D.fr[id]
		if int(r.get("f", 0)) < 1:
			continue
		var sid := str(id)
		var belongs := sid.begins_with(c + "_")
		if c == "istanbul":
			belongs = true
			for o in CITY_ORDER:
				if o != "istanbul" and sid.begins_with(o + "_"):
					belongs = false
		if belongs:
			n += 1
	return n

func _unlocked(c: String) -> bool:
	return c == "istanbul" or (D.get("unlocked", []) as Array).has(c)

func _city_items() -> Array:
	var items := []
	for i in CITY_ORDER.size():
		var k: String = CITY_ORDER[i]
		if k == city:
			continue
		var nm := str(CITIES[k].name)
		if _unlocked(k):
			items.append({"id": "city:" + k, "title": "Pasaport: " + nm, "sub": "Bu şehre uç. %d dostunla tanıştın." % _met_in(k), "price": "Git", "enabled": true})
			continue
		var prev: String = CITY_ORDER[i - 1]
		var met := _met_in(prev)
		if not _unlocked(prev):
			items.append({"id": "city:" + k, "title": "Pasaport: " + nm, "sub": "Önce %s pasaportunu aç." % CITIES[prev].name, "price": "Kilitli", "enabled": false})
		elif met >= UNLOCK_FRIENDS:
			items.append({"id": "unlock:" + k, "title": "Pasaport: " + nm, "sub": "%s %d dostla tanıştın. Pasaportun hazır!" % [CITIES[prev].loc, met], "price": "Ücretsiz aç", "enabled": true})
		else:
			items.append({"id": "unlock:" + k, "title": "Pasaport: " + nm, "sub": "%s %d/%d dostla tanış ya da puanla hemen aç." % [CITIES[prev].loc, met, UNLOCK_FRIENDS], "price": "%d puan" % UNLOCK_PTS, "enabled": int(D.pts) >= UNLOCK_PTS})
	return items

func _unlock_city(k: String) -> void:
	var i := CITY_ORDER.find(k)
	if i <= 0 or _unlocked(k):
		return
	var free := _met_in(CITY_ORDER[i - 1]) >= UNLOCK_FRIENDS
	if not free:
		if int(D.pts) < UNLOCK_PTS:
			hud.toast("Yeterli puan yok")
			return
		D.pts = int(D.pts) - UNLOCK_PTS
	var ul: Array = D.get("unlocked", [])
	ul.append(k)
	D.unlocked = ul
	_save(); _sync_hud()
	hud.toast("%s pasaportu açıldı! Mağazadan uçabilirsin" % CITIES[k].name, 3.0)

## Şehir haritası paketi (tarayıcıda ilk gidişte indirilir)
var pack_req: HTTPRequest
var pack_city := ""

func _city_ready(c: String) -> bool:
	if FileAccess.file_exists("res://map/%s.json" % c):
		return true
	var up := "user://packs/%s.pck" % c
	if FileAccess.file_exists(up):
		ProjectSettings.load_resource_pack(up)
	return FileAccess.file_exists("res://map/%s.json" % c)

func _download_city(c: String) -> void:
	if pack_req:
		return
	DirAccess.make_dir_recursive_absolute("user://packs")
	pack_req = HTTPRequest.new()
	add_child(pack_req)
	pack_city = c
	pack_req.download_file = "user://packs/%s.pck" % c
	pack_req.download_chunk_size = 1048576
	pack_req.use_threads = not OS.has_feature("web")
	pack_req.request_completed.connect(_on_pack_done)
	var base := ""
	if OS.has_feature("web"):
		base = str(JavaScriptBridge.eval("window.location.href.split('?')[0].replace(/[^/]*$/, '')"))
	else:
		base = "https://icanyesilyurt.github.io/mahalle-dostlari/"
		for a in OS.get_cmdline_user_args():
			if a.begins_with("--packbase="):
				base = a.substr(11)
	var ver := FileAccess.get_file_as_string("res://version.txt").strip_edges()
	pack_req.request(base + "%s.pck?v=%s" % [c, ver])
	hud.toast("%s haritası indiriliyor…" % CITIES[c].name, 60.0)

func _on_pack_done(result: int, code: int, _h, _b) -> void:
	var c := pack_city
	pack_req.queue_free()
	pack_req = null
	if result != HTTPRequest.RESULT_SUCCESS or code != 200 or not _city_ready(c):
		DirAccess.remove_absolute("user://packs/%s.pck" % c)
		hud.toast("Harita indirilemedi. İnternetini kontrol edip tekrar dene", 3.0)
		return
	_go_city(c)

func _decor_items() -> Array:
	var owned: Array = D.get("decor", [])
	var items := []
	for k in HomeScript.DECOR:
		var info: Dictionary = HomeScript.DECOR[k]
		if owned.has(k):
			continue
		items.append({"id": "decor:" + k, "title": "Evin için: " + str(info.name), "sub": "Hipodrom'daki evine yerleşir.", "price": "%d puan" % int(info.price), "enabled": int(D.pts) >= int(info.price)})
	return items

## Dikey/yatay ekrana uyum: arayüz ölçeği ve kamera görüş açısı
func _fit_screen() -> void:
	var ws := Vector2(DisplayServer.window_get_size())
	if OS.has_feature("web"):
		ws = Vector2(get_tree().root.size)
	var portrait := ws.y > ws.x
	get_tree().root.content_scale_size = Vector2i(720, 1280) if portrait else Vector2i(1280, 720)
	if hud:
		hud.set_rotate(portrait and is_touch)
	if camera:
		if portrait:
			# dikeyde yatay görüşü sabit tut: karakter devleşmesin, etraf görünsün
			camera.keep_aspect = Camera3D.KEEP_WIDTH
			camera.fov = 78.0
			cam_pitch = -0.17
			camera.v_offset = 0.6
		else:
			camera.keep_aspect = Camera3D.KEEP_HEIGHT
			camera.fov = 64.0
			camera.v_offset = 0.0

func _body_box(n: Node3D, size: Vector3) -> void:
	var ab := AnimatableBody3D.new()
	ab.sync_to_physics = false
	var cs := CollisionShape3D.new()
	var bs := BoxShape3D.new(); bs.size = size
	cs.shape = bs
	cs.position.y = size.y / 2.0
	ab.add_child(cs)
	n.add_child(ab)

## Oyuncu yayaların ve hayvanların içinden geçmesin: yumuşakça kenara itilir
func _separate(delta: float) -> void:
	var pp := Vector2(player.position.x, player.position.z)
	var push := Vector2.ZERO
	for n in npcs:
		if not n.visible:
			continue
		var d := pp - Vector2(n.position.x, n.position.z)
		var L := d.length()
		# yaya, önündeki oyuncuya çarpmadan durur
		var ahead := Vector2(sin(n.rotation.y), cos(n.rotation.y))
		n.blocked = L < 1.4 and L > 0.001 and ahead.dot(d / L) > 0.3
		if L < 0.75 and L > 0.001:
			push += d / L * (0.75 - L)
	for a in animals:
		if not a.visible:
			continue
		var r: float = (0.42 if a.cat else 0.6) * float(a.size)
		var d2 := pp - Vector2(a.position.x, a.position.z)
		var L2 := d2.length()
		if L2 < r + 0.35 and L2 > 0.001:
			push += d2 / L2 * (r + 0.35 - L2)
	if pet_node:
		var d3 := pp - Vector2(pet_node.position.x, pet_node.position.z)
		var L3 := d3.length()
		if L3 < 0.8 and L3 > 0.001:
			push += d3 / L3 * (0.8 - L3) * 0.5
	if push.length() > 0.0:
		var step := push.limit_length(4.0 * delta + push.length() * 0.5)
		var mv := player.move_and_collide(Vector3(step.x, 0, step.y), true)
		if mv == null:
			player.position += Vector3(step.x, 0, step.y)

func _load_save_city() -> void:
	# kayıt dosyasından hangi şehirde olduğumuzu oku (kayıt asıl _load_save ile yüklenir)
	if FileAccess.file_exists("user://kayit.json"):
		var ff := FileAccess.open("user://kayit.json", FileAccess.READ)
		var d = JSON.parse_string(ff.get_as_text())
		if d is Dictionary and CITIES.has(str(d.get("city", "istanbul"))):
			city = str(d.get("city", "istanbul"))
	for a in OS.get_cmdline_user_args():
		if a.begins_with("--city="):
			city = a.substr(7)
	if not _city_ready(city):
		city = "istanbul"

func _go_city(id: String) -> void:
	if id == city or not CITIES.has(id) or not _unlocked(id):
		return
	if not _city_ready(id):
		_download_city(id)
		return
	D.city = id
	_save()
	get_tree().reload_current_scene()

func _apply_player_colors() -> void:
	var cur: Dictionary = D.get("cols", {})
	player.colors.clear()
	for part in ["shirt", "pants", "hair"]:
		if cur.has(part + "_i"):
			var pal: Array = HAIR_COLS if part == "hair" else CLOTH_COLS
			player.colors[part] = Color(pal[int(cur[part + "_i"]) % pal.size()])
	player.apply_colors()

func _adopt(id: String) -> void:
	var key := id.substr(4)
	var p := key.split(":")
	var b: Dictionary = Breeds.get_breed(p[0] == "cat", p[1])
	if int(D.pts) < int(b.price):
		hud.toast("Yeterli puan yok")
		return
	D.pts = int(D.pts) - int(b.price)
	var owned: Array = D.get("pets", [])
	owned.append(key)
	D.pets = owned
	D.pet = key
	_save(); _spawn_pet(); _sync_hud()
	hud.toast("%s artık senin! Yanından ayrılmayacak" % b.name, 3.0)

func _spawn_pet() -> void:
	if pet_node:
		pet_node.queue_free()
		pet_node = null
	var key := str(D.get("pet", ""))
	if key == "":
		return
	var p := key.split(":")
	var b: Dictionary = Breeds.get_breed(p[0] == "cat", p[1])
	if b.is_empty():
		return
	var n = AnimalScript.new()
	n.id = "pet"; n.cat = p[0] == "cat"; n.breed = p[1]; n.animal_name = b.name
	n.size = float(b.get("size", 1.0)) if n.cat else 1.0
	n.home = player.position + Vector3(1.2, 0, 1.2)
	n.cols = COL; n.font = font
	n.friend = 9; n.hungry = false; n.thirsty = false; n.mode = "follow"
	add_child(n)
	n.build()
	pet_node = n

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
	D.city = city
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

# --- günlük görevler: basit, her gün yenilenen hedefler ---
const MISSIONS := [
	["fd", 5, "5 dosta mama ver", 50],
	["wd", 3, "3 dosta su ver", 30],
	["pd", 2, "2 dostla oyun oyna", 40],
	["td", 1, "Bir dostuna ödül maması ver", 20],
	["fish", 3, "Köprüden 3 kez balıkları besle", 20],
]
func _mis() -> Dictionary:
	var m: Dictionary = D.get("mis", {})
	if str(m.get("day", "")) != _today():
		m = {"day": _today()}
		D.mis = m
	return m

func _mission(key: String) -> void:
	var m := _mis()
	m[key] = int(m.get(key, 0)) + 1
	for ms in MISSIONS:
		if ms[0] == key and int(m[key]) == int(ms[1]):
			D.pts = int(D.pts) + int(ms[3])
			hud.toast("Günlük görev tamam: %s  +%d puan" % [ms[2], ms[3]], 3.0)
	D.mis = m
	_save()

func _mission_entries() -> Array:
	var m := _mis()
	var out := []
	for ms in MISSIONS:
		if ms[0] == "fish" and not (MAP.has("bridge") or MAP.has("fishing")):
			continue
		var n := mini(int(m.get(ms[0], 0)), int(ms[1]))
		var done := n >= int(ms[1])
		out.append({"known": true, "color": Color("#7fbf6a") if done else Color("#f6c445"), "title": "Görev: " + str(ms[2]),
			"sub": "%d / %d" % [n, ms[1]], "level": "Tamamlandı" if done else "+%d puan" % ms[3]})
	return out

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
	hud.set_book(_mission_entries() + entries, met, animals.size())
	hud.set_shop([
		{"id": "treat", "title": "Ödül maması", "sub": "Oyundan sonra ver. Dostluğunu bir kat artırır.", "price": "%d puan" % TREAT_PRICE, "enabled": int(D.pts) >= TREAT_PRICE},
		{"id": "treat5", "title": "5 ödül maması", "sub": "Toplu al, biraz daha ucuz.", "price": "%d puan" % (TREAT_PRICE * 4), "enabled": int(D.pts) >= TREAT_PRICE * 4},
		{"id": "look", "title": "Kadın / erkek karakter", "sub": "Karakterini değiştir.", "price": "Değiştir", "enabled": true},
		] + _city_items() + _decor_items() + [
		{"id": "col:shirt", "title": "Üst rengi", "sub": "Sıradaki renge geç.", "price": "%d puan" % COLOR_PRICE, "enabled": int(D.pts) >= COLOR_PRICE},
		{"id": "col:pants", "title": "Pantolon / etek rengi", "sub": "Sıradaki renge geç.", "price": "%d puan" % COLOR_PRICE, "enabled": int(D.pts) >= COLOR_PRICE},
		{"id": "col:hair", "title": "Saç rengi", "sub": "Sıradaki renge geç.", "price": "%d puan" % COLOR_PRICE, "enabled": int(D.pts) >= COLOR_PRICE}] + _pet_items())

# --- eylem kartı ---
func _on_bridge_rail() -> bool:
	var p := player.position
	if MAP.has("fishing"):
		for r in MAP.fishing:
			if p.x > r[0] and p.x < r[1] and p.z > r[2] and p.z < r[3]:
				return true
		return false
	if not MAP.has("bridge"):
		return false
	var b: Array = MAP.bridge
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
	if in_home:
		var acts := [{"id": "home_out", "label": "Dışarı çık", "enabled": true, "color": Color("#e9e4d6")}]
		if pet_node:
			acts.push_front({"id": "pet_play", "label": "Lazerle oyna" if pet_node.cat else "Top oyna", "enabled": true, "color": Color("#c8e6b0")})
			acts.push_front({"id": "pet_love", "label": "%s'i sev" % pet_node.animal_name, "enabled": true, "color": Color("#f2b8c6")})
		hud.show_actions("Evin", "Dostunla baş başa. Bir süre durursan minderine gidip uyur." if pet_node else "Mağazadan bir dost sahiplenirsen burada seninle yaşar.", acts)
		return
	if MAP.has("home") and Vector2(player.position.x - MAP.home[0], player.position.z - MAP.home[1]).length() < 2.6:
		hud.show_actions("Evin", "Kendi evin ve dostunun köşesi.", [{"id": "home_in", "label": "Eve gir", "enabled": true, "color": Color("#f6c445")}])
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
		"home_in": _enter_home()
		"home_out": _exit_home()
		"pet_love": _love_pet()
		"pet_play": _play_pet()

func _on_buy(id: String) -> void:
	if id == "look":
		var i := (LOOKS.find(player.look) + 1) % LOOKS.size()
		player.set_look(LOOKS[i])
		D.ch = LOOKS[i]
		_apply_player_colors()
		_save()
		return
	if id.begins_with("unlock:"):
		_unlock_city(id.substr(7))
		return
	if id.begins_with("city:"):
		_go_city(id.substr(5))
		return
	if id.begins_with("decor:"):
		var did := id.substr(6)
		var info: Dictionary = HomeScript.DECOR[did]
		if int(D.pts) < int(info.price):
			return
		D.pts = int(D.pts) - int(info.price)
		var dl: Array = D.get("decor", [])
		dl.append(did)
		D.decor = dl
		home_node.add_decor(did)
		_save(); _sync_hud()
		hud.toast("%s evine yerleşti" % info.name, 2.2)
		return
	if id.begins_with("col:"):
		if int(D.pts) < COLOR_PRICE:
			return
		var part := id.substr(4)
		var pal: Array = HAIR_COLS if part == "hair" else CLOTH_COLS
		var cur: Dictionary = D.get("cols", {})
		var i := (int(cur.get(part + "_i", -1)) + 1) % pal.size()
		cur[part + "_i"] = i
		D.cols = cur
		D.pts = int(D.pts) - COLOR_PRICE
		_apply_player_colors()
		_save(); _sync_hud()
		return
	if id.begins_with("pet:"):
		_adopt(id)
		return
	if id.begins_with("walk:"):
		D.pet = id.substr(5)
		_save(); _spawn_pet(); _sync_hud()
		return
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
	_mission("fd")
	near.happy = 1.6
	near.eat(3.0)
	player.act("interact-right")
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
	_mission("wd")
	near.happy = 1.6
	near.eat(2.2)
	player.act("interact-right")
	hud.toast("Teşekkürler!", 1.2)
	near.refresh()
	_save(); _sync_hud()

func _give_treat() -> void:
	if near == null or int(D.treats) <= 0:
		return
	D.treats = int(D.treats) - 1
	_rec(near, "td")
	_mission("td")
	near.happy = 3.0
	near.eat(2.0)
	player.act("pick-up")
	_hearts(near.global_position + Vector3(0, near.top_y, 0))
	hud.toast("%s bayıldı! Dostluğunuz arttı" % near.animal_name, 2.4)
	near.refresh()
	_save(); _sync_hud()

# --- oyun: top ve lazer ---
## Kaçan köpek için engelsiz bir hedef: evinin çevresinde, düz çizgiyle ulaşılabilir
func _romp_goal(d) -> Vector3:
	for i in 12:
		var q: Vector3 = d.home + Vector3(randf_range(-5, 5), 0, randf_range(-5, 5))
		q.y = 0.0
		if q.distance_to(d.position) > 2.0 and _line_clear(d.position, q):
			return q
	return Vector3(d.home.x, 0, d.home.z)

func _line_clear(p: Vector3, q: Vector3) -> bool:
	var n := int(p.distance_to(q) / 0.8) + 1
	for i in n + 1:
		var r := p.lerp(q, float(i) / n)
		for c in COL:
			if r.x > c[0] - 0.3 and r.x < c[1] + 0.3 and r.z > c[2] - 0.3 and r.z < c[3] + 0.3:
				return false
	return true

func _stop_romp() -> void:
	if romp.is_empty():
		return
	for d in [romp.a, romp.b]:
		d.run_spd = 0.0
		if d.mode in ["chase", "go"]:
			d.mode = ""
			d.target = d.home
			d.happy = 1.5
	romp = {}

func _start_play() -> void:
	_stop_romp()
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
	if in_home:
		var hp: Vector3 = home_node.position
		return absf(p.x - hp.x) < 5.0 and absf(p.z - hp.z) < 3.5
	for c in COL:
		if p.x > c[0] - 0.6 and p.x < c[1] + 0.6 and p.z > c[2] - 0.6 and p.z < c[3] + 0.6:
			return false
	for b in MAP.get("walk_over", [MAP.get("bridge", [0, 0, 0, 0]), MAP.get("pier", [0, 0, 0, 0])]):
		if p.x > b[0] + 0.5 and p.x < b[1] - 0.5 and p.z > b[2] + 0.5 and p.z < b[3] - 0.5:
			return true
	for w in MAP.water:
		if p.x > w[0] - 0.5 and p.x < w[1] + 0.5 and p.z > w[2] - 0.5 and p.z < w[3] + 0.5:
			return false
	return true

func _throw_ball() -> void:
	if play.is_empty() or play.state != "ready":
		return
	var vy := cam_yaw + yaw_off
	var fwd := -Vector3(sin(vy), 0, cos(vy))
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
	a.mode = "follow" if a == pet_node else ""
	a.target = a.home
	ball.visible = false
	dot.visible = false
	if done:
		a.happy = 3.0
		_hearts(a.global_position + Vector3(0, a.top_y, 0))
		if _rget(a, "pd") != _today():
			D.pts = int(D.pts) + PLAY_REWARD
			_rec(a, "pd")
			_mission("pd")
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
		var p := player.global_position + -Vector3(sin(cam_yaw + yaw_off), 0, cos(cam_yaw + yaw_off)) * 4.0
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
	_mission("fish")
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
			var jh := Vector2(JOY_R + 95.0, vs.y - JOY_R - 95.0)
			if joy_id == -1 and (e.position.distance_to(jh) < JOY_R * 2.3 or (e.position.x < vs.x * 0.3 and e.position.y > vs.y * 0.45)):
				# sabit joystick: halka yerinde durur, parmağın yönü okunur
				joy_id = e.index; joy_o = jh
				joy_raw = (e.position - jh).limit_length(JOY_R) / JOY_R
			elif look_id == -1:
				look_id = e.index
		else:
			if e.index == joy_id:
				joy_id = -1; joy_raw = Vector2.ZERO
			if e.index == look_id:
				look_id = -1
	elif event is InputEventScreenDrag:
		var d := event as InputEventScreenDrag
		if d.index == joy_id:
			joy_raw = (d.position - joy_o).limit_length(JOY_R) / JOY_R
		elif d.index == look_id:
			var k := 1100.0 / maxf(vs.x, 600.0)
			yaw_off -= d.relative.x * 0.0055 * k
			pitch_off = clampf(pitch_off - d.relative.y * 0.0035 * k, -0.9 - cam_pitch, -0.05 - cam_pitch)
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
		yaw_off -= mm.relative.x * 0.005
		pitch_off = clampf(pitch_off - mm.relative.y * 0.004, -0.9 - cam_pitch, -0.05 - cam_pitch)

func _place_at(x: float, z: float) -> String:
	if in_home:
		return "Evin"
	var best := ""
	var best_area := 1e12
	for p in MAP.roads + MAP.areas:
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
		if Input.is_physical_key_pressed(KEY_Q): yaw_off += delta * 1.8
		if Input.is_physical_key_pressed(KEY_E): yaw_off -= delta * 1.8
	# joystick: ölü bölge, yumuşak tepki, ekranda hep görünür
	var jr := joy_raw
	var jl := jr.length()
	if jl < 0.15:
		jr = Vector2.ZERO
	else:
		jr = jr / jl * clampf((jl - 0.15) / 0.75, 0.0, 1.0)
	joy_v = joy_v.lerp(jr, minf(1.0, delta * 18.0))
	if is_touch or joy_id != -1:
		var vsz := get_viewport().get_visible_rect().size
		joy_o = Vector2(JOY_R + 95.0, vsz.y - JOY_R - 95.0)
		hud.set_joy(true, joy_o, joy_v, joy_id != -1)
	var fwd := -Vector3(sin(cam_yaw), 0, cos(cam_yaw))
	var right := Vector3(cos(cam_yaw), 0, -sin(cam_yaw))
	var f_in := kz - joy_v.y
	var r_in := kx + joy_v.x
	var mv := fwd * f_in + right * r_in
	if mv.length() > 1.0:
		mv = mv.normalized()
	player.move_input = mv
	if dbg_walk != Vector3.ZERO:
		player.move_input = dbg_walk

	# kamera hep karakterin arkasında; geri geri yürürken dönmez
	if f_in > -0.3 and (play.is_empty() or player.moving):
		cam_yaw = lerp_angle(cam_yaw, player.facing + PI, minf(1.0, delta * (3.5 + absf(r_in) * 1.5)))
	# elle bakış: parmak/fare bırakılınca kamera yerine döner (oyun sırasında kalır)
	var looking := look_id != -1 or mouse_drag or Input.is_physical_key_pressed(KEY_Q) or Input.is_physical_key_pressed(KEY_E)
	if not looking and play.is_empty():
		yaw_off = lerp_angle(yaw_off, 0.0, minf(1.0, delta * 4.0))
		pitch_off = lerpf(pitch_off, 0.0, minf(1.0, delta * 4.0))
	var look_ahead := Vector3(player.velocity.x, 0, player.velocity.z) * 0.22
	var target := player.global_position + Vector3(0, 1.5, 0) + look_ahead
	var pp := pivot.global_position
	pp.x = lerpf(pp.x, target.x, minf(1.0, delta * 12.0))
	pp.z = lerpf(pp.z, target.z, minf(1.0, delta * 12.0))
	pp.y = lerpf(pp.y, target.y, minf(1.0, delta * 3.0))
	pivot.global_position = pp
	pivot.rotation = Vector3(cam_pitch + pitch_off, cam_yaw + yaw_off, 0)

	var best = null
	var bd := 2.4
	var ppos := Vector2(player.position.x, player.position.z)
	_tick_pigeons(delta)
	_tick_home(delta)
	if not in_home and play.is_empty():
		_tick_romp(delta)
	if pet_node:
		pet_node.tick(delta, player.global_position, t)
	for a in animals:
		var d: float = Vector2(a.position.x - player.position.x, a.position.z - player.position.z).length()
		var vis: bool = d < 75.0 or a.mode != "" or a.greet
		a.visible = vis
		if not vis:
			continue
		a.tick(delta, player.global_position, t)
		if d < bd and a.mode == "":
			bd = d; best = a
	near = best
	_separate(delta)
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
	for npc in npcs:
		var dn: float = Vector2(npc.position.x, npc.position.z).distance_to(ppos)
		if (dn < 70.0) != npc.visible:
			npc.set_active(dn < 70.0)
		if dn < 90.0:
			npc.tick(delta)
	map_t -= delta
	if map_t <= 0.0:
		map_t = 0.1
		var dots := []
		for a in animals:
			dots.append([a.position.x, a.position.z, Color("#d9573a") if a.friend > 0 else Color(0.35, 0.38, 0.36, 0.8)])
		hud.update_map(Vector2(MAP.home[0], MAP.home[1]) if in_home else ppos, player.facing, dots)

func _update_movers(delta: float) -> void:
	# genel hareketliler (otobüs, tekne...): yol boyunca ileri geri
	for mv in movers:
		var path: Array = mv.path
		var total := 0.0
		for i in path.size() - 1:
			total += Vector2(path[i + 1][0] - path[i][0], path[i + 1][1] - path[i][1]).length()
		mv.s += mv.dir * mv.sp * delta
		if mv.s > total: mv.dir = -1.0
		if mv.s < 0.0: mv.dir = 1.0
		var s2: float = clampf(mv.s, 0.0, total)
		for i in path.size() - 1:
			var a := Vector3(path[i][0], 0, path[i][1]); var b := Vector3(path[i + 1][0], 0, path[i + 1][1])
			var L := a.distance_to(b)
			if s2 <= L or i == path.size() - 2:
				var dir := (b - a).normalized()
				var nd: Node3D = mv.n
				nd.position = a + dir * minf(s2, L)
				if mv.float:
					nd.position.y = sin(t * 1.1 + nd.position.x) * 0.1
				nd.rotation.y = atan2(dir.x * mv.dir, dir.z * mv.dir)
				break
			s2 -= L
	if city != "istanbul":
		return
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
	tram2_s += tram2_dir * 3.0 * delta
	var t2a: Array = MAP.tram2[0]; var t2b: Array = MAP.tram2[1]
	var t2len: float = Vector2(t2b[0] - t2a[0], t2b[1] - t2a[1]).length()
	if tram2_s > t2len: tram2_dir = -1.0
	if tram2_s < 0.0: tram2_dir = 1.0
	tram2.position = Vector3(t2a[0], 0, t2a[1]).lerp(Vector3(t2b[0], 0, t2b[1]), clampf(tram2_s / t2len, 0.0, 1.0))
	var fb: Node3D = ferries.VapurBogaz
	fb.position = Vector3(275, sin(t * 0.8) * 0.08, 40 + sin(t * 0.025) * 230)
	fb.rotation.y = 0.0 if cos(t * 0.03) > 0 else PI
	var fh: Node3D = ferries.VapurHalic
	fh.position = Vector3(-130 + sin(t * 0.03) * 90, sin(t * 0.9) * 0.08, -25)
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
