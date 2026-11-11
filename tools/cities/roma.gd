extends RefCounted
## Roma: Tiber nehri (batıda, kuzey-güney), Vatikan ve San Pietro, Trastevere, Piazza Navona,
## Pantheon, Trevi Çeşmesi, İspanyol Merdivenleri, Via del Corso, Piazza del Popolo,
## Piazza Venezia (Vittoriano), Forum, Kolezyum. x -240..260, z -515..310.

const OCHRE := ["#e0a96d", "#d98e5a", "#e8c07a", "#c97a4a", "#efcf98", "#d4a373", "#e6b47e", "#dba06a", "#f0d6a8"]
const TERRA := ["#b4573d", "#a8502f", "#c06440", "#9e4a30"]
const NAMES_V := ["Via del Corso", "Via del Babuino", "Via Margutta", "Via dei Coronari", "Via Giulia", "Via del Governo Vecchio", "Via della Scrofa", "Via Condotti", "Via Frattina", "Via del Tritone", "Via Nazionale", "Via Cavour"]
const NAMES_H := ["Via dei Fori", "Via del Seminario", "Via delle Muratte", "Via della Vite", "Via Borgognona", "Via di Ripetta", "Via della Lungara", "Via della Scala", "Via Garibaldi", "Via di San Francesco", "Via della Lungaretta", "Via dei Cartari"]
const CATS := ["Micio", "Gattino", "Pepe", "Biscotto", "Mozzarella", "Pistacchio", "Gelato", "Tortellino", "Luna", "Nerone", "Romolo", "Cleo", "Fragola", "Cannolo", "Olivia", "Tiramisù", "Bruno", "Polpetta"]
const DOGS := ["Fido", "Rocco", "Bella", "Ciccio", "Leone", "Pippo", "Brunello", "Remo", "Toto", "Lupo", "Nocciola", "Birba", "Zeus", "Cesare"]

static func pine(B, x: float, z: float, s: float = 1.0) -> void:
	var g = B.g
	g.put("cyl8", Vector3(x, 4.0 * s, z), B.C("#7a5a40"), 0, Vector3(0.35 * s, 8.0 * s, 0.35 * s))
	for k in 4:
		var a: float = k * TAU / 4.0 + B.rng.randf()
		g.put("ico", Vector3(x + cos(a) * 2.2 * s, 8.6 * s, z + sin(a) * 2.2 * s), B.C("#3f6a35").lerp(B.C("#567d3f"), B.rng.randf()), B.rng.randf(), Vector3(3.2, 1.3, 3.2) * s)
	g.put("ico", Vector3(x, 9.1 * s, z), B.C("#4a7438"), 0, Vector3(3.8, 1.4, 3.8) * s)
	B.add_col(x - 0.4, x + 0.4, z - 0.4, z + 0.4, 6, false, 2)

static func build(B) -> Dictionary:
	var g = B.g
	var st := {"pal": OCHRE, "fmin": 3, "fmax": 5, "shop": 0.6, "wins": ["win_a", "win_b", "win_c"], "cumba": 0.0, "roof": TERRA, "roof_h": 1.0,
		"shutters": 0.7, "shutter_cols": ["#3f6b4a", "#4f7a4a", "#6b6f4a", "#7a4a2a"], "balcony": 0.35, "ornate": true, "stone": 0.05}
	# --- zemin: Tiber batıda kuzeyden güneye akar
	g.ground(-240, -150, -515, 310, 0.0, "cobble", 4.0)
	g.ground(-112, 260, -515, 310, 0.0, "cobble", 4.0)
	g.ground(-112, -102, -515, 310, 0.012, "slab", 6.0)
	g.flush(B.mroot.get_node("Zemin"), B.mroot, "ZeminRoma", false)
	B.road("Lungotevere", -112, -102, -515, 310)
	var bridges := [[-300.0, "Ponte Sant'Angelo", 9.0], [-60.0, "Ponte Sisto", 8.0], [150.0, "Ponte Garibaldi", 12.0]]
	var gaps := []
	var walk := []
	for b in bridges:
		gaps.append([b[0] - b[2] / 2.0, b[0] + b[2] / 2.0])
	B.water_v(-150, -112, -515, 310, gaps)
	for b in bridges:
		bridge_x(B, b[1], b[0], -150, -112, b[2])
		walk.append([-150, -112, b[0] - b[2] / 2.0, b[0] + b[2] / 2.0])
	# Sant'Angelo kalesi (köprünün batı ucunda)
	g.put("cyl", Vector3(-205, 9, -300), B.stone(B.C("#c9a782")), 0, Vector3(18, 18, 18), "stonewall")
	g.put("cyl", Vector3(-205, 21, -300), B.stone(B.C("#d4b48e")), 0, Vector3(9, 6, 9), "stonewall")
	g.box(4, 3, 4, -205, 24, -300, B.C("#b0846a"))
	g.put("cyl8", Vector3(-205, 28.5, -300), B.C("#5a7a6a"), 0, Vector3(0.8, 3.0, 0.8))
	B.add_col(-223, -187, -318, -282)
	B.label("Castel Sant'Angelo", Vector3(-205, 34, -300), 70, B.C("#23302b"), B.C("#fffaf1"), 18, true)
	for k in 28:
		pine(B, -106.0, -500.0 + k * 29.0, 0.8)
	B.flush_chunk("Tevere")

	# --- Vatikan: San Pietro ve meydan
	san_pietro(B, -195.0, -440.0)
	# --- Trastevere (batı yaka)
	B.grid([-237.0, -195.0, -153.0], [-275.0, -230.0, -185.0, -140.0, -95.0, -50.0, -5.0, 40.0, 85.0, 130.0, 175.0, 220.0, 265.0, 307.0], st, ["Via della Lungara", "Via Garibaldi", "Via di Trastevere"], NAMES_H.slice(6), [[-236.0, -154.0, -94.0, -55.0]], 5.0, "Trastevere")
	g.ground(-237, -153, -96, -54, 0.02, "slab", 6.0)
	B.fountain_round(-195, -75, 4.5)
	B.cafe_row(-230.0, -90.0, 4, 3.0, 0.0)
	for bx: float in [-215.0, -175.0]:
		B.bench(bx, -62.0, PI)
		B.bench(bx, -88.0, 0.0)
	B.area("Piazza di Santa Maria in Trastevere", -237, -153, -96, -54)

	# --- Doğu yaka: tarihi merkez
	var skips := [[-90, -50, -305, -175], [-35, 15, -270, -200], [35, 90, -310, -255], [85, 120, -515, 0], [100, 175, -480, -400], [-40, 165, -45, 15], [40, 260, 20, 310]]
	B.grid([-100.0, -55.0, -10.0, 40.0, 85.0], [-505.0, -460.0, -415.0, -370.0, -325.0, -280.0, -235.0, -190.0, -145.0, -100.0, -50.0], st, NAMES_V, NAMES_H, skips, 5.0, "CentroOvest")
	B.grid([125.0, 175.0, 215.0, 258.0], [-505.0, -460.0, -415.0, -370.0, -325.0, -280.0, -235.0, -190.0, -145.0, -100.0, -50.0], st, NAMES_V.slice(7), NAMES_H.slice(3), skips, 5.0, "CentroEst")
	B.grid([-100.0, -40.0], [20.0, 65.0, 110.0, 155.0, 200.0, 250.0, 307.0], st, ["Via della Bocca", "Via dei Cerchi"], ["Via Petroselli", "Via di Teatro"], [], 5.0, "Ripa")
	# Via del Corso
	g.ground(85, 120, -505, -45, 0.012, "slab", 5.0)
	B.road("Via del Corso", 85, 120, -505, -45)
	var vz := -490.0
	while vz < -60.0:
		B.lamp(88.5, vz); B.lamp(116.5, vz + 9.0)
		vz += 18.0
	for k in 6:
		B.cafe_row(89.0, -420.0 + k * 60.0, 2, 0.0, 3.0)
	B.flush_chunk("Corso")
	# Piazza del Popolo (kuzey ucu)
	g.ground(60, 150, -515, -490, 0.02, "slab", 7.0)
	B.squares.append([60, 150, -515, -490])
	B.obelisk(103, -503, 16.0, B.C("#d9c7a8"))
	B.area("Piazza del Popolo", 60, 150, -515, -490)
	# Piazza Navona
	navona(B, -90, -50, -305, -175)
	# Pantheon
	pantheon(B, -10.0, -248.0)
	# Trevi
	trevi(B, 62.0, -290.0)
	# İspanyol Merdivenleri
	spagna(B, 137.0, -440.0)
	# Piazza Venezia ve Vittoriano
	vittoriano(B, 62.0, -18.0)
	# Forum ve Kolezyum
	forum(B, 40, 160, 22, 140)
	colosseo(B, 175.0, 215.0)
	for k in 9:
		pine(B, 60.0 + k * 22.0, 150.0 + (k % 2) * 6.0, 1.0)
	for k in 6:
		pine(B, 240.0, 40.0 + k * 40.0, 1.1)
	B.flush_chunk("Palatino")
	# boş kalan güney ve batı mahalleleri
	B.grid([40.0, 85.0, 130.0], [160.0, 205.0, 250.0, 307.0], st, ["Via Labicana", "Via Celimontana"], ["Via di San Gregorio", "Via Claudia"], [], 5.0, "Celio")
	B.grid([215.0, 258.0], [20.0, 65.0, 110.0, 155.0], st, ["Via Merulana"], ["Via Emanuele Filiberto", "Via Tasso"], [], 5.0, "Esquilino")
	B.grid([215.0, 258.0], [250.0, 307.0], st, ["Via Ostilia"], ["Via dei Santi Quattro"], [], 5.0, "Laterano")
	B.grid([-237.0, -195.0, -153.0], [-390.0, -345.0, -310.0, -275.0], st, ["Borgo Pio", "Borgo Vittorio"], ["Via dei Corridori", "Via Crescenzio"], [[-225, -185, -320, -280]], 5.0, "Borgo")
	# vespalar
	for k in 14:
		var vx: float = -95.0 + (k % 7) * 45.0 + 2.6
		var vzz: float = -480.0 + int(k / 7) * 180.0 + (k * 37 % 90)
		vespa(B, vx, vzz, B.pick(["#c8423a", "#e2a33b", "#7cc6ea", "#f2efe9", "#5f8f45"]))
	B.flush_chunk("Vespa")
	B.big_label("Tevere", Vector3(-131, 8, -180), 90)
	B.boat("Battello", -131, 0, 0.0, "ferry")
	return {
		"lands": [[-240, -150, -515, 310], [-112, 260, -515, 310]],
		"mini_extra": [[-150, -112, -304.5, -295.5, "#c9bda6"], [-150, -112, -64, -56, "#c9bda6"], [-150, -112, 144, 156, "#c9bda6"]],
		"water": [[-150, -112, -515, 310]],
		"walk_over": walk, "fishing": walk,
		"carts": [["Gelato", "#e58a3a"], ["Pizza", "#c8423a"], ["Caffè", "#5e4337"], ["Granita", "#3b6aa8"]],
		"fishers": [[-300.0, -147.0, -115.0, 9.0, false], [-60.0, -147.0, -115.0, 8.0, false], [150.0, -147.0, -115.0, 12.0, false]],
		"bounds": Rect2(-240, -515, 500, 825),
		"start": [100.0, -150.0, 0.0],
		"fountains": [[-70, -280], [-70, -240], [-70, -200], [62, -275], [-10, -222], [-195, -75], [137, -405], [103, -495]],
		"landmarks": [["San Pietro", -205, -470], ["Castel Sant'Angelo", -205, -300], ["Piazza Navona", -70, -240], ["Pantheon", -10, -248], ["Trevi", 62, -290],
			["İspanyol Merdivenleri", 137, -440], ["Piazza del Popolo", 103, -503], ["Via del Corso", 102, -250], ["Vittoriano", 62, -18], ["Forum", 100, 80],
			["Kolezyum", 175, 215], ["Trastevere", -195, 100]],
		"movers": [{"node": "Battello", "path": [[-131, -280], [-131, -80]], "speed": 2.2, "float": true}],
		"cat_names": CATS, "dog_names": DOGS,
		"fixed_animals": [[true, 175.0, 168.0, 0.0, "Kolezyum kemerlerinde"], [true, 150.0, 230.0, 0.0, "Kolezyum gölgesinde"], [true, 90.0, 60.0, 0.0, "Forum taşlarında"],
			[true, 120.0, 100.0, 0.0, "Forum sütunları"], [false, 102.0, -120.0, 0.0, "Via del Corso"], [true, -70.0, -260.0, 0.0, "Piazza Navona"],
			[false, -70.0, -220.0, 0.0, "Navona çeşmesi"], [true, -10.0, -222.0, 0.0, "Pantheon önü"], [false, 62.0, -268.0, 0.0, "Trevi Çeşmesi"],
			[true, 137.0, -415.0, 0.0, "İspanyol Merdivenleri"], [false, 103.0, -495.0, 0.0, "Piazza del Popolo"], [true, -195.0, -75.0, 0.0, "Trastevere meydanı"],
			[false, -195.0, -400.0, 0.0, "San Pietro Meydanı"], [true, -131.0, -60.0, 0.0, "Ponte Sisto"], [false, 62.0, -40.0, 0.0, "Piazza Venezia"],
			[true, -190.0, 150.0, 0.0, "Trastevere sokakları"], [false, -70.0, 60.0, 0.0, "Ripa"]],
	}

## Doğu-batı köprü (Tiber dikey aktığı için köprü x boyunca)
static func bridge_x(B, name: String, z: float, x0: float, x1: float, w: float) -> void:
	var g = B.g
	var col: Color = B.C("#d8c7a8")
	g.box(x1 - x0, 0.6, w, (x0 + x1) / 2.0, -0.45, z, col)
	g.ground(x0, x1, z - w / 2.0, z + w / 2.0, 0.16, "slab", 4.0)
	for e: float in [-1.0, 1.0]:
		g.box(x1 - x0, 1.0, 0.45, (x0 + x1) / 2.0, 0.0, z + e * (w / 2.0 - 0.22), col.lightened(0.1))
		B.add_col(x0, x1, z + e * (w / 2.0 - 0.22) - 0.22, z + e * (w / 2.0 - 0.22) + 0.22, 2.0, false)
		if name == "Ponte Sant'Angelo":
			for k in 5:
				var sx := x0 + 4.0 + k * (x1 - x0 - 8.0) / 4.0
				g.box(0.8, 1.0, 0.8, sx, 1.0, z + e * (w / 2.0 - 0.3), B.C("#e6dcc6"))
				g.put("cyl8", Vector3(sx, 2.8, z + e * (w / 2.0 - 0.3)), B.C("#efe8da"), 0, Vector3(0.35, 1.8, 0.35))
				g.put("ball", Vector3(sx, 3.9, z + e * (w / 2.0 - 0.3)), B.C("#efe8da"), 0, Vector3(0.3, 0.3, 0.3))
	for k in 3:
		g.put("cyl", Vector3(x0 + (k + 0.5) * (x1 - x0) / 3.0, -5.8, z), col.darkened(0.15), 0, Vector3(5.0, w + 0.2, 5.0), "plain", PI / 2.0, 0.0)
	B.road(name, x0, x1, z - w / 2.0, z + w / 2.0)

static func san_pietro(B, cx: float, cz: float) -> void:
	var g = B.g
	var S: Color = B.stone(B.C("#e6dcc6"))
	# bazilika (batıda), cephesi doğuya (Tiber'e) bakar -> burada güneye (+z) bakar
	g.wall_box(60, 22, 34, cx - 5, 0, cz - 40, S, 0, "win_c", 3.6, 7.3, true)
	g.box(62, 2.0, 35, cx - 5, 22, cz - 40, B.C("#d8ccb2"))
	for k in 13:
		var sx := cx - 33 + k * 4.7
		g.put("cyl8", Vector3(sx, 8.5, cz - 22.6), B.C("#efe8da"), 0, Vector3(0.9, 17.0, 0.9))
		g.put("cyl8", Vector3(sx, 24.6, cz - 22.6), B.C("#efe8da"), 0, Vector3(0.5, 2.0, 0.5))
	g.put("cyl", Vector3(cx - 5, 28, cz - 46), S, 0, Vector3(13, 10, 13), "stonewall")
	B.dome(cx - 5, 33, cz - 46, 13.0, 1.25, 0.0, B.C("#8e9ba0"))
	B.add_col(cx - 36, cx + 26, cz - 58, cz - 22)
	# oval meydan + sütun dizileri
	var mz := cz + 10.0
	g.ground(cx - 38, cx + 20, cz - 22, cz + 45, 0.02, "slab", 7.0)
	B.squares.append([cx - 38, cx + 20, cz - 22, cz + 45])
	B.road("Piazza San Pietro", cx - 38, cx + 20, cz - 22, cz + 45)
	B.area("Vatikan", -240, -150, -515, -360)
	for k in 16:
		var a := PI * 0.12 + k * (PI * 0.76) / 15.0
		for e: float in [-1.0, 1.0]:
			var px := cx - 9 + e * cos(a) * 26.0
			var pz := mz + sin(a) * 18.0 * (1.0 if e > 0 else 1.0) - 6.0
			g.put("cyl8", Vector3(px, 4.0, pz), B.C("#efe8da"), 0, Vector3(0.7, 8.0, 0.7))
			g.box(2.6, 1.0, 2.6, px, 8.0, pz, B.C("#e6dcc6"))
			g.put("ball", Vector3(px, 9.6, pz), B.C("#efe8da"), 0, Vector3(0.4, 0.6, 0.4))
	B.obelisk(cx - 9, mz, 18.0, B.C("#c9a38a"))
	B.fountain_round(cx - 22, mz, 3.5)
	B.fountain_round(cx + 4, mz, 3.5)
	B.label("Basilica di San Pietro", Vector3(cx - 5, 52, cz - 46), 90, B.C("#23302b"), B.C("#fffaf1"), 24, true)
	B.flush_chunk("SanPietro")

static func navona(B, x0: float, x1: float, z0: float, z1: float) -> void:
	var g = B.g
	g.ground(x0, x1, z0, z1, 0.02, "slab", 6.0)
	B.squares.append([x0, x1, z0, z1])
	B.road("Piazza Navona", x0, x1, z0, z1)
	B.area("Piazza Navona", x0, x1, z0, z1)
	var cx := (x0 + x1) / 2.0
	for k in 3:
		B.fountain_round(cx, z0 + 25.0 + k * 40.0, 5.0 if k == 1 else 4.0, B.C("#e6dcc6"))
	B.obelisk(cx, -240.0, 14.0, B.C("#d9c7a8"))
	# Sant'Agnese kilisesi (batı kenar)
	var S: Color = B.stone(B.C("#efe0c4"))
	g.wall_box(14, 16, 24, x0 - 7, 0, -240, S, 0, "win_c", 3.4, 5.3, true)
	B.dome(x0 - 10, 16, -240, 6.0, 1.2, 2.5, B.C("#8e9ba0"))
	for e: float in [-1.0, 1.0]:
		g.wall_box(5, 8, 5, x0 - 2.5, 16, -240 + e * 9.5, S, 0, "win_c", 2.5, 4.0, true)
	B.add_col(x0 - 14, x0, -252, -228)
	for k in 8:
		B.cafe(x1 - 3.0, z0 + 10.0 + k * 14.0, B.pick(["#f2efe9", "#c8423a", "#3f6b4a"]))
	for k in 6:
		g.box(0.06, 1.4, 0.06, x0 + 4.0, 0, z0 + 20.0 + k * 15.0, B.C("#5a3f2c"))
		g.box(0.8, 0.6, 0.05, x0 + 4.0, 1.0, z0 + 20.1 + k * 15.0, B.pick(["#e2a33b", "#3b6aa8", "#c8423a", "#5f8f45"]))
	B.flush_chunk("Navona")

static func pantheon(B, cx: float, cz: float) -> void:
	var g = B.g
	var S: Color = B.stone(B.C("#cdbb9a"))
	g.put("cyl", Vector3(cx, 7.5, cz - 4), S, 0, Vector3(14, 15, 14), "stonewall")
	g.put("dome", Vector3(cx, 15, cz - 4), B.C("#a9a69c"), 0, Vector3(14.2, 8.0, 14.2))
	g.box(24, 14, 10, cx, 0, cz + 12, S)
	for k in 8:
		g.put("cyl8", Vector3(cx - 10.5 + k * 3.0, 6.0, cz + 17.6), B.C("#d8c9ad"), 0, Vector3(0.75, 12.0, 0.75))
	g.box(24.6, 1.4, 11, cx, 12.6, cz + 12.4, B.C("#d8c9ad"))
	g.put("pyr", Vector3(cx, 14.0, cz + 12.4), B.C("#cdbb9a"), 0, Vector3(25, 4.5, 11))
	B.add_col(cx - 14, cx + 14, cz - 18, cz + 7)
	B.add_col(cx - 12, cx + 12, cz + 7, cz + 16)
	g.ground(cx - 22, cx + 22, cz + 18, cz + 42, 0.02, "slab", 6.0)
	B.squares.append([cx - 22, cx + 22, cz + 18, cz + 42])
	B.road("Piazza della Rotonda", cx - 22, cx + 22, cz + 18, cz + 42)
	B.fountain_round(cx, cz + 28, 4.0)
	B.obelisk(cx, cz + 28, 6.0, B.C("#c9a38a"))
	B.cafe_row(cx - 18, cz + 39, 6, 6.0, 0.0)
	B.label("Pantheon", Vector3(cx, 30, cz), 90, B.C("#23302b"), B.C("#fffaf1"), 24, true)
	B.flush_chunk("Pantheon")

static func trevi(B, cx: float, cz: float) -> void:
	var g = B.g
	var S: Color = B.stone(B.C("#efe6d4"))
	g.wall_box(48, 24, 12, cx, 0, cz - 10, S, 0, "win_c", 3.2, 6.0, true)
	for k in 4:
		g.put("cyl8", Vector3(cx - 10 + k * 6.6, 9, cz - 3.8), B.C("#f4ede0"), 0, Vector3(0.9, 18, 0.9))
	g.box(14, 14, 2, cx, 4, cz - 4, B.C("#f4ede0"))
	g.box(5, 7, 0.6, cx, 6, cz - 2.8, B.C("#d9c7a8"))
	g.put("cyl8", Vector3(cx, 8.0, cz - 2.3), B.C("#f4ede0"), 0, Vector3(1.0, 4.0, 1.0))
	# kayalık ve havuz
	for k in 9:
		g.put("ico", Vector3(cx - 14 + k * 3.5, 0.8, cz - 1.5), B.C("#d8d2c4"), B.rng.randf(), Vector3(2.5, 1.6, 2.0))
	g.box(36, 0.8, 12, cx, 0, cz + 6, B.C("#e6dcc6"))
	g.box(35, 0.05, 11, cx, 0.75, cz + 6, B.C("#5fc4e8"))
	B.add_col(cx - 24, cx + 24, cz - 16, cz + 12, 1.0)
	g.ground(cx - 24, cx + 24, cz + 12, cz + 30, 0.02, "slab", 5.0)
	B.squares.append([cx - 24, cx + 24, cz + 12, cz + 30])
	B.road("Fontana di Trevi", cx - 24, cx + 24, cz + 12, cz + 30)
	B.label("Fontana di Trevi", Vector3(cx, 28, cz), 80, B.C("#23302b"), B.C("#fffaf1"), 22, true)
	B.flush_chunk("Trevi")

static func spagna(B, cx: float, cz: float) -> void:
	var g = B.g
	g.ground(cx - 37, cx + 38, cz + 15, cz + 40, 0.02, "slab", 6.0)
	B.squares.append([cx - 37, cx + 38, cz + 15, cz + 40])
	B.road("Piazza di Spagna", cx - 37, cx + 38, cz + 15, cz + 40)
	# Barcaccia çeşmesi
	g.box(6, 0.6, 3, cx, 0, cz + 30, B.C("#d8d2c4"))
	g.put("cyl", Vector3(cx, 0.6, cz + 30), B.C("#d9c7a8"), 0, Vector3(2.2, 0.8, 1.0))
	# merdivenler: geniş basamaklar ve saksı çiçekler
	for k in 12:
		g.box(30.0 - (k % 4) * 2.0, 0.5 + k * 0.5, 1.4, cx, 0, cz + 14 - k * 1.4, B.C("#ece2cc"))
	for k in 8:
		g.put("ico", Vector3(cx - 13 + (k % 2) * 26, 1.0 + k * 0.7, cz + 13 - k * 2.0), B.C("#e0483a"), 0, Vector3(0.9, 0.6, 0.9))
	B.add_col(cx - 16, cx + 16, cz - 4, cz + 14.5)
	# Trinità dei Monti
	var S: Color = B.stone(B.C("#f0e2c8"))
	g.box(30, 6, 26, cx, 0, cz - 17, B.C("#d8ccb2"))
	g.wall_box(18, 14, 12, cx, 6, cz - 12, S, 0, "win_c", 3.4, 7.0, true)
	for e: float in [-1.0, 1.0]:
		g.wall_box(5, 12, 5, cx + e * 7.0, 20, cz - 8.5, S, 0, "win_c", 2.5, 6.0, true)
		g.put("pyr", Vector3(cx + e * 7.0, 32, cz - 8.5), B.C("#8e9ba0"), 0, Vector3(5.4, 3.0, 5.4))
	B.obelisk(cx, cz - 3, 10.0, B.C("#d9c7a8"))
	B.add_col(cx - 15, cx + 15, cz - 30, cz - 4)
	B.label("Scalinata di Trinità dei Monti", Vector3(cx, 40, cz - 10), 70, B.C("#23302b"), B.C("#fffaf1"), 20, true)
	B.flush_chunk("Spagna")

static func vittoriano(B, cx: float, cz: float) -> void:
	var g = B.g
	var W: Color = B.stone(B.C("#f6f3ec"))
	g.ground(cx - 100, cx + 100, cz - 27, cz + 33, 0.02, "slab", 7.0)
	B.squares.append([cx - 100, cx + 100, cz - 27, cz + 33])
	B.road("Piazza Venezia", cx - 100, cx + 100, cz - 27, cz + 15)
	B.area("Piazza Venezia", cx - 100, cx + 100, cz - 27, cz + 33)
	for k in 5:
		g.box(64 - k * 4.0, 2.0, 26 - k * 2.0, cx, k * 2.0, cz + 22, W)
	g.wall_box(56, 14, 14, cx, 10, cz + 25, W, 0, "win_c", 2.8, 7.0, true)
	for k in 16:
		g.put("cyl8", Vector3(cx - 24 + k * 3.2, 17, cz + 17.6), B.C("#fbf9f4"), 0, Vector3(0.7, 14.0, 0.7))
	g.box(58, 2.0, 15, cx, 24, cz + 25, B.C("#ece6da"))
	for e: float in [-1.0, 1.0]:
		g.put("box", Vector3(cx + e * 26, 28, cz + 25), B.C("#c9a85a"), 0, Vector3(3, 4, 3), "gold")
	g.box(5, 3, 8, cx, 10, cz + 12, B.C("#ece6da"))
	g.put("box", Vector3(cx, 15, cz + 12), B.C("#7a6a40"), 0, Vector3(2.2, 4.0, 4.5))
	B.add_col(cx - 32, cx + 32, cz + 8, cz + 35)
	B.label("Vittoriano", Vector3(cx, 36, cz + 25), 90, B.C("#23302b"), B.C("#fffaf1"), 24, true)
	B.flush_chunk("Venezia")

static func forum(B, x0: float, x1: float, z0: float, z1: float) -> void:
	var g = B.g
	g.ground(x0, x1, z0, z1, 0.02, "slab", 3.0)
	B.parks.append([x0, x1, z0, z1])
	B.area("Forum Romanum", x0, x1, z0, z1)
	B.road("Via Sacra", x0, x1, (z0 + z1) / 2.0 - 3.0, (z0 + z1) / 2.0 + 3.0)
	var stn: Color = B.C("#d9cdb3")
	# sütun grupları, yıkık duvarlar, zafer takı
	var temples := [[x0 + 18, z0 + 20, 8], [x0 + 60, z0 + 25, 3], [x0 + 95, z0 + 18, 6], [x0 + 30, z1 - 25, 4], [x0 + 80, z1 - 20, 5]]
	for tp in temples:
		g.box(tp[2] * 3.2 + 2.0, 1.4, 8, tp[0], 0, tp[1], B.C("#cdbb9a"))
		for k in int(tp[2]):
			var h := 10.0 if B.rng.randf() < 0.7 else 5.0
			g.put("cyl8", Vector3(tp[0] - tp[2] * 1.6 + 1.6 + k * 3.2, 1.4 + h / 2.0, tp[1] + 3.0), stn, 0, Vector3(0.7, h, 0.7))
			B.add_col(tp[0] - tp[2] * 1.6 + 1.6 + k * 3.2 - 0.7, tp[0] - tp[2] * 1.6 + 1.6 + k * 3.2 + 0.7, tp[1] + 2.3, tp[1] + 3.7, 4.0, false)
		if tp[2] >= 6:
			g.box(tp[2] * 3.2, 1.5, 1.8, tp[0], 11.4, tp[1] + 3.0, stn)
	for k in 12:
		var rx: float = B.rng.randf_range(x0 + 5, x1 - 5)
		var rz: float = B.rng.randf_range(z0 + 5, z1 - 5)
		g.box(B.rng.randf_range(2, 6), B.rng.randf_range(0.6, 3.5), B.rng.randf_range(1, 2), rx, 0, rz, B.C("#c4b496"), B.rng.randf())
	# Titus takı
	# Titus takı: Via Sacra kemerin altından geçer
	var mz := (z0 + z1) / 2.0
	for e: float in [-1.0, 1.0]:
		g.box(5, 13, 3.6, x1 - 10, 0, mz + e * 4.0, B.stone(B.C("#d9cdb3")))
		B.add_col(x1 - 12.5, x1 - 7.5, mz + e * 4.0 - 1.8, mz + e * 4.0 + 1.8)
	g.box(5, 4.6, 12, x1 - 10, 8.4, mz, B.stone(B.C("#d9cdb3")))
	B.flush_chunk("Forum")

static func colosseo(B, cx: float, cz: float) -> void:
	var g = B.g
	var S: Color = B.stone(B.C("#d6c09a"))
	var A: Color = B.C("#5a4a3c")
	var rx := 36.0; var rz := 29.0
	var n := 40
	for k in n:
		var a := k * TAU / n
		var a2 := (k + 1) * TAU / n
		var p1 := Vector2(cos(a) * rx, sin(a) * rz)
		var p2 := Vector2(cos(a2) * rx, sin(a2) * rz)
		var mid := (p1 + p2) / 2.0
		var L := p1.distance_to(p2)
		var ry := -atan2(p2.y - p1.y, p2.x - p1.x)
		# güneybatı yarısı yıkık: daha alçak
		var tiers := 4 if (a < PI * 0.9 or a > PI * 1.6) else 2
		for t in tiers:
			var y := t * 7.5
			g.put("box", Vector3(cx + mid.x, y + 3.75, cz + mid.y), S, ry, Vector3(L + 0.05, 7.5, 2.2))
			if t < 3:
				var outv := mid.normalized()
				g.put("box", Vector3(cx + mid.x + outv.x * 1.12, y + 3.0, cz + mid.y + outv.y * 1.12), A, ry, Vector3(L * 0.55, 4.6, 0.1))
				g.put("cyl", Vector3(cx + mid.x + outv.x * 1.13, y + 5.3, cz + mid.y + outv.y * 1.13), A, ry, Vector3(L * 0.275, 0.1, L * 0.275), "plain", PI / 2.0, 0.0)
		# çarpışma: dış halka
		B.add_col(cx + mid.x - 1.6, cx + mid.x + 1.6, cz + mid.y - 1.6, cz + mid.y + 1.6, 14.0, false)
	# iç basamaklar ve arena
	g.ground(cx - rx + 6, cx + rx - 6, cz - rz + 6, cz + rz - 6, 0.04, "slab", 3.0)
	for k in 24:
		var a := k * TAU / 24.0
		g.put("box", Vector3(cx + cos(a) * (rx - 5), 3.0, cz + sin(a) * (rz - 5)), B.C("#c4ae88"), -a, Vector3(4.0, 6.0, 8.0))
	B.area("Colosseo", cx - rx, cx + rx, cz - rz, cz + rz)
	B.label("Colosseo", Vector3(cx, 38, cz), 110, B.C("#23302b"), B.C("#fffaf1"), 26, true)
	B.flush_chunk("Colosseo")

static func vespa(B, x: float, z: float, col: Color) -> void:
	var g = B.g
	g.box(0.5, 0.55, 1.4, x, 0.25, z, col)
	g.box(0.45, 0.25, 0.6, x, 0.8, z - 0.2, B.C("#2b2b2b"))
	g.box(0.08, 0.8, 0.08, x, 0.5, z + 0.6, B.C("#3a3a3a"))
	g.box(0.6, 0.06, 0.06, x, 1.3, z + 0.6, B.C("#3a3a3a"))
	for e: float in [-1.0, 1.0]:
		g.put("cyl8", Vector3(x, 0.22, z + e * 0.55), B.C("#2b2b2b"), 0, Vector3(0.22, 0.12, 0.22), "plain", 0.0, PI / 2.0)
