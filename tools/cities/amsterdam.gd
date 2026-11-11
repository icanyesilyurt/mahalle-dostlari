extends RefCounted
## Amsterdam: IJ ve Centraal Station, Damrak, Dam Meydanı (Saray + Ulusal Anıt), dört kanal halkası
## (Singel, Herengracht, Keizersgracht, Prinsengracht) ve köprüleri, yüzen çiçek pazarı, ev tekneleri,
## Westerkerk, Amstel ve Magere Brug, Rijksmuseum ve Museumplein, Vondelpark, yel değirmeni.
## Koordinatlar: x -240..260, z -515..310 (kuzey = -z).

const BRICK := ["#8a4a36", "#7a3e2e", "#9a5a42", "#6e3a2c", "#a8654a", "#5e3428", "#8f5a44", "#e8e2d6", "#2f3236", "#c9b9a0"]
const ROOFS := ["#3a3634", "#4a3f3a", "#5a4a44", "#3f3a38"]
const CATS := ["Poes", "Minoes", "Kaasje", "Tijger", "Snoesje", "Pluis", "Muis", "Stroopwafel", "Dropje", "Bolletje", "Tulp", "Saartje", "Moortje", "Pepernoot", "Guus", "Lotje", "Vlekje", "Kruimel"]
const DOGS := ["Bello", "Max", "Boris", "Fikkie", "Sjors", "Bram", "Joep", "Kees", "Lieke", "Noor", "Tommie", "Hugo", "Pip", "Wolf"]
const NV := ["Spuistraat", "Herenstraat", "Leidsestraat", "Vijzelstraat", "Utrechtsestraat", "Runstraat", "Huidenstraat", "Wolvenstraat", "Berenstraat", "Reestraat", "Hartenstraat", "Gasthuismolensteeg"]
const NH := ["Haarlemmerstraat", "Brouwersgracht", "Raadhuisstraat", "Rozengracht", "Elandsgracht", "Leidsegracht", "Reguliersdwarsstraat", "Kerkstraat", "Lijnbaansgracht", "Nieuwe Spiegelstraat", "Weteringschans", "Ferdinand Bolstraat"]
const XS := [-237.0, -190.0, -140.0, -90.0, -40.0, 10.0, 60.0, 110.0, 145.0, 177.0]
const CANALS := [[-232.0, -220.0, "Singel"], [-152.0, -140.0, "Herengracht"], [-72.0, -60.0, "Keizersgracht"], [8.0, 20.0, "Prinsengracht"]]
const AMSTEL_BR := [[-280.0, "Blauwbrug"], [-186.0, "Hogesluis"], [-106.0, "Amstelbrug"], [-26.0, "Torontobrug"], [65.0, "Magere Brug"], [175.0, "Nieuwe Amstelbrug"]]

static func bike(B, x: float, z: float, ry: float, col: Color) -> void:
	var g = B.g
	var f := Vector3(cos(ry), 0, -sin(ry))
	for e: float in [-1.0, 1.0]:
		var p := Vector3(x, 0.36, z) + f * e * 0.5
		g.put("cyl8", p, B.C("#2b2b2b"), ry, Vector3(0.34, 0.05, 0.34), "plain", PI / 2.0)
	g.box(1.0, 0.07, 0.07, x, 0.62, z, col, ry)
	var sp := Vector3(x, 0, z) - f * 0.2
	g.box(0.07, 0.4, 0.07, sp.x, 0.5, sp.z, col, ry)
	g.box(0.3, 0.06, 0.14, sp.x, 0.92, sp.z, B.C("#2b2b2b"), ry)
	var hp := Vector3(x, 0, z) + f * 0.42
	g.box(0.07, 0.5, 0.07, hp.x, 0.5, hp.z, col, ry)
	g.box(0.07, 0.06, 0.5, hp.x, 1.0, hp.z, B.C("#2b2b2b"), ry)

static func houseboat(B, x: float, z: float) -> void:
	var g = B.g
	var hull: Color = B.pick(["#2f4a5a", "#3a5a3a", "#5a3a2e", "#23415e"])
	var cab: Color = B.pick(["#e8e2d6", "#f2d9b8", "#cfe0d8", "#e6c9c0", "#f0e6b8"])
	g.box(12, 1.0, 3.4, x, -1.0, z, hull)
	g.box(9.5, 1.7, 3.0, x - 0.6, 0.0, z, cab)
	g.box(10.0, 0.15, 3.3, x - 0.6, 1.7, z, hull.darkened(0.2))
	for k in 4:
		g.box(1.0, 0.7, 0.06, x - 4.2 + k * 2.4, 0.6, z - 1.52, B.C("#3b4a5a"))
	for k in 3:
		g.put("cyl8", Vector3(x - 3.0 + k * 2.2, 2.0, z), B.C("#b5643c"), 0, Vector3(0.22, 0.4, 0.22))
		g.put("ico", Vector3(x - 3.0 + k * 2.2, 2.35, z), B.pick(["#5f8f45", "#e0483a", "#f2c230"]), B.rng.randf(), Vector3(0.3, 0.3, 0.3))

static func amstel_bridge(B, name: String, z: float, x0: float, x1: float, w: float, white: bool) -> void:
	var g = B.g
	var col: Color = B.C("#f2efe9") if white else B.C("#a8968a")
	g.box(x1 - x0, 0.6, w, (x0 + x1) / 2.0, -0.45, z, col)
	g.ground(x0, x1, z - w / 2.0, z + w / 2.0, 0.16, "wood" if white else "slab", 3.0)
	for e: float in [-1.0, 1.0]:
		g.box(x1 - x0, 1.0, 0.3, (x0 + x1) / 2.0, 0.0, z + e * (w / 2.0 - 0.15), col)
		B.add_col(x0, x1, z + e * (w / 2.0 - 0.15) - 0.2, z + e * (w / 2.0 - 0.15) + 0.2, 2.0, false)
	if white:
		# açılır köprü portalları
		for px: float in [x0 + 7.0, x1 - 7.0]:
			for e2: float in [-1.0, 1.0]:
				g.box(0.4, 7.0, 0.4, px, 0, z + e2 * (w / 2.0 + 0.3), col)
			g.box(0.4, 0.5, w + 1.2, px, 7.0, z, col)
			g.box(5.0, 0.3, 0.3, px, 7.2, z, col)
			for k in 5:
				g.put("ball", Vector3(px, 7.6, z - w / 2.0 + k * w / 4.0), B.C("#fff1c8"), 0, Vector3(0.12, 0.12, 0.12), "glow")
		B.label("Magere Brug", Vector3((x0 + x1) / 2.0, 9.5, z), 48, B.C("#23302b"), B.C("#fffaf1"), 12, true)
	else:
		g.put("cyl", Vector3((x0 + x1) / 2.0, -5.8, z), col.darkened(0.15), 0, Vector3(5.0, w + 0.2, 5.0), "plain", PI / 2.0, 0.0)
	B.road(name, x0, x1, z - w / 2.0, z + w / 2.0)

static func build(B) -> Dictionary:
	var g = B.g
	var st := {"pal": BRICK, "fmin": 4, "fmax": 5, "shop": 0.55, "wins": ["win_b", "win_a"], "cumba": 0.0, "brick": 0.55, "stone": 0.1,
		"roof_kind": "gable", "roof": ROOFS, "balcony": 0.1}
	# --- zemin
	# zemin kanalları ve Amstel'i açık bırakır (su yüzeyi görünsün)
	g.ground(-240, 260, -470, -317.5, 0.0, "cobble", 4.0)
	g.ground(204, 260, -317.5, 310, 0.0, "cobble", 4.0)
	var zc := -317.5
	for c in CANALS:
		g.ground(-240, 180, zc, c[0], 0.0, "cobble", 4.0)
		zc = c[1]
	g.ground(-240, 180, zc, 310, 0.0, "cobble", 4.0)
	g.ground(-240, 260, -470, -462, 0.012, "slab", 6.0)
	g.flush(B.mroot.get_node("Zemin"), B.mroot, "ZeminAmsterdam", false)
	# --- IJ
	B.water_h(-260, 280, -530, -470, [], false, true)
	B.road("De Ruijterkade", -240, 260, -470, -462)
	for k in 30:
		B.lamp(-230 + k * 16.5, -464.0)
	var walk := []
	var water := [[-260, 280, -530, -470]]
	# --- kanallar: köprüler, kıyı ağaçları, fenerler, bisikletler, ev tekneleri
	for c in CANALS:
		var z0: float = c[0]; var z1: float = c[1]
		var gaps := []
		for i in range(1, XS.size()):
			gaps.append([XS[i] - 3.0, XS[i] + 3.0])
		B.water_h(-260, 180, z0, z1, gaps)
		water.append([-260, 180, z0, z1])
		B.area(c[2], -240, 180, z0, z1)
		for i in range(1, XS.size()):
			var bx: float = XS[i]
			B.stone_bridge("%s köprüsü" % c[2], bx, z0, z1, 6.0, B.C("#9a8a7a"), 1, B.C("#4a4a48"))
			walk.append([bx - 3.0, bx + 3.0, z0, z1])
			for e: float in [-1.0, 1.0]:
				for zz: float in [z0, z1]:
					g.put("ball", Vector3(bx + e * 2.8, 1.3, zz), B.C("#fff1c8"), 0, Vector3(0.18, 0.18, 0.18), "glow")
		for i in XS.size() - 1:
			var xa: float = XS[i] + 4.0
			var xb: float = XS[i + 1] - 4.0
			var x := xa + 3.0
			var k := 0
			while x < xb - 2.0:
				if k % 3 == 0:
					B.tree(x, z0 - 1.3, "plane", 0.95)
					B.tree(x + 6.0, z1 + 1.3, "plane", 0.95)
				elif k % 3 == 1:
					B.lamp(x, z0 - 1.3)
					B.lamp(x, z1 + 1.3)
				else:
					for b in 3:
						bike(B, x - 1.0 + b * 0.9, z0 - 0.75, PI / 2.0, B.pick(["#2b2b2b", "#3b6aa8", "#c8423a", "#5f8f45", "#e8e2d6"]))
					B.add_col(x - 1.5, x + 1.3, z0 - 1.3, z0 - 0.2, 1.2, false, 2)
				x += 7.0
				k += 1
			if B.rng.randf() < 0.7 and xb - xa > 16.0:
				houseboat(B, (xa + xb) / 2.0 + B.rng.randf_range(-4.0, 4.0), z1 - 2.4)
		B.flush_chunk("Kanal_%s" % c[2])
	# Bloemenmarkt: Singel üzerinde yüzen çiçek pazarı
	var fx := 18.0
	while fx < 104.0:
		if absf(fx - 60.0) > 6.0:
			g.box(5.0, 0.8, 4.0, fx, -0.7, -229.8, B.C("#3a4a3a"))
			g.box(5.0, 2.6, 0.12, fx, 0.1, -227.8, B.C("#cfe6ee"))
			g.put("hip", Vector3(fx, 2.7, -229.8), B.C("#2f5a3a"), 0, Vector3(5.4, 0.6, 4.4), "roof")
			for t in 10:
				g.put("cyl8", Vector3(fx - 2.0 + (t % 5) * 1.0, 0.25, -231.2 + int(t / 5) * 0.8), B.C("#8a8a88"), 0, Vector3(0.3, 0.5, 0.3))
				g.put("ico", Vector3(fx - 2.0 + (t % 5) * 1.0, 0.65, -231.2 + int(t / 5) * 0.8), B.pick(["#e8505b", "#f2c230", "#f08bb0", "#ffffff", "#c86ee0", "#f08b3a"]), B.rng.randf(), Vector3(0.3, 0.3, 0.3))
		fx += 7.0
	B.label("Bloemenmarkt", Vector3(60, 4.5, -229), 52, B.C("#fffaf1"), B.C("#2f5a3a"), 10, true)
	B.flush_chunk("Bloemenmarkt")
	# kıyı balıkçıları
	for fp: Array in [[-115.0, -72.0], [-15.0, -72.0], [85.0, -72.0], [-165.0, 8.0], [35.0, 8.0], [128.0, 8.0], [-65.0, -152.0]]:
		var px: float = fp[0]; var pz: float = fp[1] - 0.8
		if not B._blocked_at(px, pz):
			B.fisherman_dir(px, pz, 0.0, 1.0)

	# --- Centraal Station ve meydanı
	centraal(B, 0.0, -447.0)
	g.ground(-60, 60, -432, -400, 0.02, "slab", 6.0)
	B.squares.append([-60, 60, -432, -400])
	B.area("Stationsplein", -60, 60, -432, -400)
	B.road("Stationsplein", -60, 60, -432, -400)
	B.fountain_round(0, -416, 3.5)
	for k in 8:
		bike(B, -50.0 + k * 0.9, -404.0, PI / 2.0, B.pick(["#2b2b2b", "#3b6aa8", "#c8423a", "#e8e2d6"]))
		bike(B, 44.0 + k * 0.9, -404.0, PI / 2.0, B.pick(["#2b2b2b", "#5f8f45", "#c8423a", "#e8e2d6"]))
	B.add_col(-50.6, -43.4, -404.6, -403.4, 1.2, false, 2)
	B.add_col(43.4, 50.6, -404.6, -403.4, 1.2, false, 2)
	B.flush_chunk("Stationsplein")
	B.grid([-237.0, -190.0, -140.0, -90.0, -62.0], [-462.0, -432.0, -400.0], st, NV, NH, [], 5.0, "Haarlemmer")
	B.grid([62.0, 100.0, 145.0, 190.0, 230.0, 258.0], [-462.0, -432.0, -400.0], st, NV.slice(3), NH.slice(1), [], 5.0, "Oosterdok")
	# --- Damrak ve kuzey mahalle
	g.ground(-14, 14, -400, -320, 0.014, "slab", 5.0)
	B.road("Damrak", -14, 14, -400, -320)
	for k in 7:
		B.lamp(-12.5, -395.0 + k * 11.0)
		B.lamp(12.5, -395.0 + k * 11.0)
	B.grid([-237.0, -190.0, -140.0, -90.0, -50.0, -17.0], [-400.0, -360.0, -320.0], st, NV, NH, [], 5.0, "Jordaan")
	B.grid([17.0, 55.0, 100.0, 145.0, 190.0, 230.0, 258.0], [-400.0, -360.0, -320.0], st, NV.slice(4), NH.slice(2), [], 5.0, "Wallen")
	# --- Dam Meydanı
	g.ground(-50, 50, -320, -262, 0.02, "slab", 7.0)
	B.squares.append([-50, 50, -320, -262])
	B.area("Dam", -50, 50, -320, -262)
	B.road("Dam", -50, 50, -320, -262)
	paleis(B, -48.0, -22.0, -318.0, -268.0)
	monument(B, 25.0, -290.0)
	B.fountain_round(0, -306, 3.0)
	B.grid([-237.0, -190.0, -140.0, -90.0, -50.0], [-320.0, -280.0, -237.0], st, NV, NH.slice(2), [], 5.0, "DamBati")
	B.grid([-50.0, -17.0, 17.0, 50.0], [-262.0, -237.0], st, NV.slice(2), NH.slice(3), [], 5.0, "DamGuney")
	B.grid([50.0, 100.0, 145.0, 177.0], [-320.0, -280.0, -237.0], st, NV.slice(5), NH.slice(4), [], 5.0, "DamDogu")
	# --- kanal kuşakları
	B.grid(XS, [-215.0, -186.0, -157.0], st, NV, NH.slice(4), [], 5.0, "Grachten1")
	B.grid(XS, [-135.0, -106.0, -77.0], st, NV.slice(2), NH.slice(6), [[-187.0, -143.0, -132.0, -109.0]], 5.0, "Grachten2")
	westerkerk(B, -165.0, -120.5)
	B.grid(XS, [-55.0, -26.0, 3.0], st, NV.slice(4), NH.slice(8), [], 5.0, "Grachten3")
	B.grid(XS, [25.0, 65.0, 95.0], st, NV.slice(6), NH.slice(9), [], 5.0, "Leidseplein")
	# --- Amstel ve Magere Brug
	var agaps := []
	for ab in AMSTEL_BR:
		agaps.append([ab[0] - 3.5, ab[0] + 3.5])
	B.water_v(180, 204, -317.5, 330, agaps)
	water.append([180, 204, -317.5, 330])
	for ab in AMSTEL_BR:
		amstel_bridge(B, ab[1], ab[0], 180.0, 204.0, 7.0, ab[1] == "Magere Brug")
		walk.append([180.0, 204.0, ab[0] - 3.5, ab[0] + 3.5])
	B.area("Amstel", 180, 204, -317, 310)
	B.boat("AmstelTekne", 192, 120, 0.0, "boat")
	B.flush_chunk("Amstel")
	B.grid([207.0, 258.0], [-320.0, -280.0, -237.0, -215.0, -186.0, -157.0, -135.0, -106.0, -77.0, -55.0, -26.0, 3.0, 25.0, 65.0, 95.0, 135.0, 175.0, 215.0], st, ["Amstel", "Weesperstraat"], NH, [], 5.0, "OostAmstel")
	molen(B, 235.0, 262.0)
	g.ground(207, 258, 218, 305, 0.03, "grass", 5.0)
	B.parks.append([207, 258, 218, 305])
	B.area("De Gooyer", 207, 258, 218, 305)
	B.fountain_round(222, 236, 3.0)
	for k in 4:
		B.bench(212.0 + k * 9.0, 300.0, PI)
	B.flush_chunk("Molen")
	# --- Rijksmuseum, Museumplein, Vondelpark
	rijks(B, -45.0, 85.0, 100.0, 135.0)
	garden(B, -58, 100, 140, 300, "Museumplein", [[-25.0, 65.0, 175.0, 197.0], [55.0, 98.0, 252.0, 292.0], [14.0, 26.0, 224.0, 236.0]], false)
	g.ground(-20, 60, 178, 194, 0.05, "plain", 1.0, B.C("#5fb4d8"))
	g.box(81, 0.5, 17, 20, 0, 186, B.C("#cfc6b6"))
	B.add_col(-20.5, 60.5, 177.5, 194.5, 1.0, false)
	B.fountain_round(20, 230, 4.0)
	vangogh(B, 75.0, 272.0)
	garden(B, -237, -110, 98, 300, "Vondelpark", [[-205.0, -145.0, 165.0, 220.0], [-190.0, -170.0, 130.0, 150.0], [-140.0, -120.0, 240.0, 260.0], [-230.0, -208.0, 106.0, 118.0]], true)
	g.ground(-200, -150, 170, 215, 0.05, "plain", 1.0, B.C("#5fa8c8"))
	B.add_col(-200, -150, 170, 215, 1.0, false)
	for k in 3:
		g.box(1.2, 0.5, 2.6, -190 + k * 18.0, 0.0, 180 + k * 10.0, B.C("#f2efe6"), 0.5 * k)
		g.put("ball", Vector3(-189.6 + k * 18.0, 0.7, 180.6 + k * 10.0), B.C("#f2efe6"), 0, Vector3(0.3, 0.35, 0.3))
	muziektent(B, -180.0, 140.0)
	B.fountain_round(-130, 250, 3.5)
	B.shelter_row(-225.0, 112.0, 4, 4.0, 0.0, PI)
	B.flush_chunk("Vondelpark")
	B.grid([-105.0, -60.0], [95.0, 135.0, 175.0, 215.0, 255.0, 300.0], st, ["Van Baerlestraat", "Hobbemastraat"], NH.slice(3), [], 5.0, "OudZuid")
	B.grid([105.0, 140.0, 177.0], [95.0, 135.0, 175.0, 215.0, 255.0, 300.0], st, ["Ruysdaelkade", "Ferdinand Bolstraat", "Amsteldijk"], NH.slice(5), [], 5.0, "DePijp")
	# --- IJ'de feribotlar
	B.boat("PontBati", -150, -495, PI / 2.0, "ferry")
	B.boat("PontDogu", 150, -500, PI / 2.0, "ferry")
	B.big_label("IJ", Vector3(0, 8, -495), 90)
	return {
		"lands": [[-240, 260, -470, 310]],
		"mini_extra": [],
		"water": water,
		"walk_over": walk, "fishing": walk,
		"carts": [["Stroopwafel", "#c8823a"], ["Haring", "#3b6aa8"], ["Patat", "#e2a33b"], ["Poffertjes", "#c8423a"]],
		"bounds": Rect2(-240, -515, 500, 825),
		"start": [0.0, -275.0, 0.0],
		"fountains": [[0, -306], [0, -416], [20, 230], [-130, 250], [222, 236]],
		"landmarks": [["Centraal Station", 0, -447], ["Damrak", 0, -360], ["Dam", 0, -290], ["Kraliyet Sarayı", -35, -293], ["Bloemenmarkt", 60, -229],
			["Westerkerk", -165, -120], ["Kanallar", -60, -146], ["Magere Brug", 192, 65], ["Rijksmuseum", 20, 117], ["Museumplein", 20, 220],
			["Van Gogh Müzesi", 75, 272], ["Vondelpark", -175, 200], ["Yel Değirmeni", 235, 262]],
		"movers": [{"node": "PontBati", "path": [[-220, -495], [-40, -495]], "speed": 2.5, "float": true}, {"node": "PontDogu", "path": [[40, -500], [230, -500]], "speed": 2.5, "float": true},
			{"node": "AmstelTekne", "path": [[192, 80], [192, 160]], "speed": 1.5, "float": true}],
		"cat_names": CATS, "dog_names": DOGS,
		"fixed_animals": [[true, 10.0, -280.0, 0.0, "Dam Meydanı"], [false, 38.0, -302.0, 0.0, "Ulusal Anıt"], [true, -30.0, -416.0, 0.0, "İstasyon meydanı"],
			[false, 30.0, -418.0, 0.0, "Bisikletlerin yanında"], [false, 0.0, -360.0, 0.0, "Damrak"], [true, 40.0, -237.0, 0.0, "Çiçek pazarı"],
			[true, -115.0, -215.0, 0.0, "Singel kıyısı"], [false, -65.0, -135.0, 0.0, "Herengracht"], [true, 85.0, -55.0, 0.0, "Keizersgracht"],
			[false, -165.0, 25.0, 0.0, "Prinsengracht"], [true, -165.0, -106.0, 0.0, "Westerkerk önü"], [false, 20.0, 118.0, 0.0, "Rijksmuseum geçidi"],
			[true, 40.0, 160.0, 0.0, "Museumplein"], [false, -20.0, 265.0, 0.0, "Museumplein çimleri"], [true, -160.0, 240.0, 0.0, "Vondelpark"],
			[false, -210.0, 135.0, 0.0, "Vondelpark"], [true, -125.0, 200.0, 0.0, "Göl kenarı"], [false, 210.0, 65.0, 0.0, "Magere Brug"],
			[true, 225.0, 250.0, 0.0, "Yel değirmeni"], [true, 176.0, -95.0, 0.0, "Amstel kıyısı"]],
	}

static func garden(B, x0: float, x1: float, z0: float, z1: float, name: String, avoid: Array, trees: bool) -> void:
	var g = B.g
	g.ground(x0, x1, z0, z1, 0.03, "grass", 5.0)
	B.parks.append([x0, x1, z0, z1])
	B.area(name, x0, x1, z0, z1)
	var cx := (x0 + x1) / 2.0; var cz := (z0 + z1) / 2.0
	g.ground(cx - 2.5, cx + 2.5, z0, z1, 0.05, "slab", 4.0)
	g.ground(x0, x1, cz - 2.5, cz + 2.5, 0.05, "slab", 4.0)
	var x := x0 + 5.0
	while x < x1 - 4.0:
		var z := z0 + 5.0
		while z < z1 - 4.0:
			var ok: bool = absf(x - cx) > 7.0 and absf(z - cz) > 7.0 and B.rng.randf() < (0.75 if trees else 0.25)
			for r in avoid:
				if x > r[0] - 4 and x < r[1] + 4 and z > r[2] - 4 and z < r[3] + 4:
					ok = false
			if ok:
				B.tree(x + B.rng.randf_range(-1.5, 1.5), z + B.rng.randf_range(-1.5, 1.5), "plane", B.rng.randf_range(0.9, 1.2))
			z += 12.0
		x += 12.0
	for k in 4:
		B.bench(cx + 4.2, z0 + 8.0 + k * (z1 - z0 - 16.0) / 3.0, -PI / 2.0)
		B.bench(cx - 4.2, z0 + 8.0 + k * (z1 - z0 - 16.0) / 3.0, PI / 2.0)

static func centraal(B, cx: float, cz: float) -> void:
	var g = B.g
	var R: Color = B.C("#9c4a32")
	var T: Color = B.C("#e6d8bc")
	g.wall_box(120, 15, 30, cx, 0, cz, R, 0, "win_a", 4.0, 5.0, true)
	for k in 3:
		g.box(120.4, 0.5, 30.4, cx, 4.8 + k * 5.0, cz, T)
	g.put("hip", Vector3(cx, 15, cz), B.C("#4a4f52"), 0, Vector3(121, 4.0, 31), "roof")
	for e: float in [-1.0, 1.0]:
		var tx := cx + e * 14.0
		g.wall_box(8, 30, 8, tx, 0, cz + 13.0, R, 0, "win_a", 4.0, 5.0, true)
		g.box(8.4, 0.5, 8.4, tx, 20, cz + 13.0, T)
		g.put("pyr", Vector3(tx, 30, cz + 13.0), B.C("#4a4f52"), 0, Vector3(8.6, 5.0, 8.6))
		g.put("cyl8", Vector3(tx, 37, cz + 13.0), B.C("#d4a93c"), 0, Vector3(0.1, 4.0, 0.1), "gold")
		g.put("cyl", Vector3(tx, 25, cz + 17.05), B.C("#f2efe6"), 0, Vector3(2.2, 0.1, 2.2), "plain", PI / 2.0)
		g.put("cyl", Vector3(tx, 25, cz + 17.1), B.C("#d4a93c"), 0, Vector3(0.4, 0.1, 0.4), "gold", PI / 2.0)
	# orta alınlık ve girişler
	g.box(18, 6, 1.0, cx, 15, cz + 15.2, R)
	g.put("pyr", Vector3(cx, 21, cz + 15.2), R, 0, Vector3(18, 5, 1.0))
	for k in 3:
		g.box(4.0, 6.0, 0.4, cx - 6.0 + k * 6.0, 0, cz + 15.1, B.C("#2f2a26"))
	B.add_col(cx - 60, cx + 60, cz - 15, cz + 17.2)
	B.label("Centraal Station", Vector3(cx, 44, cz + 13), 100, B.C("#23302b"), B.C("#fffaf1"), 24, true)
	B.flush_chunk("Centraal")

static func paleis(B, x0: float, x1: float, z0: float, z1: float) -> void:
	var g = B.g
	var S: Color = B.stone(B.C("#d8cdb5"))
	var cx := (x0 + x1) / 2.0; var cz := (z0 + z1) / 2.0
	g.wall_box(x1 - x0, 20, z1 - z0, cx, 0, cz, S, 0, "win_c", 3.4, 5.0, true)
	g.box(x1 - x0 + 0.4, 1.2, z1 - z0 + 0.4, cx, 20, cz, S.darkened(0.08))
	g.box(1.0, 6.0, 18, x1 + 0.3, 17, cz, S)
	g.put("pyr", Vector3(x1 + 0.3, 23, cz), S, 0, Vector3(1.0, 3.0, 18))
	# kubbeli kule
	g.put("cyl8", Vector3(cx, 24, cz), S, PI / 8.0, Vector3(3.6, 8, 3.6), "stonewall")
	g.put("dome", Vector3(cx, 28, cz), B.C("#5f7a6e"), 0, Vector3(3.8, 4.0, 3.8))
	g.put("cyl8", Vector3(cx, 33, cz), B.C("#d4a93c"), 0, Vector3(0.4, 2.0, 0.4), "gold")
	g.put("ball", Vector3(cx, 34.6, cz), B.C("#d4a93c"), 0, Vector3(0.6, 0.6, 0.6), "gold")
	for k in 3:
		g.box(0.4, 3.6, 2.6, x1 + 0.2, 0, cz - 5.0 + k * 5.0, B.C("#2f2a26"))
	B.add_col(x0, x1 + 0.6, z0, z1)
	B.label("Koninklijk Paleis", Vector3(cx, 40, cz), 70, B.C("#23302b"), B.C("#fffaf1"), 18, true)
	B.flush_chunk("Paleis")

static func monument(B, cx: float, cz: float) -> void:
	var g = B.g
	var W: Color = B.stone(B.C("#ece6da"))
	for k in 3:
		g.put("cyl", Vector3(cx, 0.25 + k * 0.5, cz), B.C("#cfc6b6"), 0, Vector3(8.0 - k * 1.6, 0.5, 8.0 - k * 1.6))
	g.box(3.4, 22, 3.4, cx, 1.5, cz, W)
	g.put("pyr", Vector3(cx, 23.5, cz), W, 0, Vector3(3.6, 2.0, 3.6))
	for e: float in [-1.0, 1.0]:
		g.box(1.6, 3.0, 1.6, cx + e * 3.4, 1.5, cz + 1.0, W)
		g.put("ball", Vector3(cx + e * 3.4, 5.0, cz + 1.0), W, 0, Vector3(0.8, 0.8, 0.8))
	B.add_col(cx - 4.5, cx + 4.5, cz - 4.5, cz + 4.5, 1.6, false)
	B.label("Nationaal Monument", Vector3(cx, 28, cz), 56, B.C("#23302b"), B.C("#fffaf1"), 14, true)

static func westerkerk(B, cx: float, cz: float) -> void:
	var g = B.g
	var R: Color = B.C("#7a3e2e")
	var S: Color = B.stone(B.C("#d8cdb5"))
	g.wall_box(32, 16, 18, cx - 4.0, 0, cz, R, 0, "win_a", 4.0, 8.0, true)
	g.put("hip", Vector3(cx - 4.0, 16, cz), B.C("#3a3634"), 0, Vector3(33, 6, 19), "roof")
	var tx := cx + 16.0
	g.wall_box(7, 26, 7, tx, 0, cz, R, 0, "win_a", 3.5, 6.5, true)
	g.box(6.0, 8, 6.0, tx, 26, cz, S)
	g.put("cyl8", Vector3(tx, 38, cz), S, PI / 8.0, Vector3(2.6, 8, 2.6))
	g.put("cyl8", Vector3(tx, 44, cz), B.C("#3b6aa8"), PI / 8.0, Vector3(2.0, 4, 2.0))
	g.put("cone8", Vector3(tx, 48, cz), B.C("#3b6aa8"), PI / 8.0, Vector3(1.6, 4.0, 1.6))
	g.put("ball", Vector3(tx, 50.6, cz), B.C("#d4a93c"), 0, Vector3(0.8, 0.8, 0.8), "gold")
	g.put("cyl", Vector3(tx, 30, cz + 3.05), B.C("#3b6aa8"), 0, Vector3(1.6, 0.1, 1.6), "plain", PI / 2.0)
	B.add_col(cx - 20, cx + 19.5, cz - 9, cz + 9)
	B.label("Westerkerk", Vector3(tx, 56, cz), 64, B.C("#23302b"), B.C("#fffaf1"), 16, true)
	B.flush_chunk("Westerkerk")

static func rijks(B, x0: float, x1: float, z0: float, z1: float) -> void:
	var g = B.g
	var R: Color = B.C("#9c4a32")
	var T: Color = B.C("#e6d8bc")
	var cz := (z0 + z1) / 2.0
	var mid := (x0 + x1) / 2.0
	# ortadaki bisiklet/yaya geçidi açık kalır
	for seg: Array in [[x0, mid - 5.0], [mid + 5.0, x1]]:
		var a: float = seg[0]; var b: float = seg[1]
		g.wall_box(b - a, 16, z1 - z0, (a + b) / 2.0, 0, cz, R, 0, "win_a", 4.0, 5.3, true)
		g.box(b - a + 0.3, 0.5, z1 - z0 + 0.3, (a + b) / 2.0, 5.2, cz, T)
		B.add_col(a, b, z0, z1)
	g.wall_box(10, 9, z1 - z0, mid, 7, cz, R, 0, "win_a", 3.3, 4.5, true)
	g.put("hip", Vector3(mid, 16, cz), B.C("#4a4f52"), 0, Vector3(x1 - x0 + 1, 5.0, z1 - z0 + 1), "roof")
	for e: float in [-1.0, 1.0]:
		var tx := mid + e * 9.0
		g.wall_box(7, 28, 7, tx, 0, z0 + 3.0, R, 0, "win_a", 3.5, 5.6, true)
		g.put("pyr", Vector3(tx, 28, z0 + 3.0), B.C("#4a4f52"), 0, Vector3(7.4, 7.0, 7.4))
		g.put("cyl8", Vector3(tx, 36.5, z0 + 3.0), B.C("#d4a93c"), 0, Vector3(0.1, 3.0, 0.1), "gold")
		B.add_col(tx - 3.5, tx + 3.5, z0, z0 + 6.5)
	g.ground(mid - 5, mid + 5, z0, z1, 0.03, "slab", 3.0)
	B.road("Rijksmuseum geçidi", mid - 5, mid + 5, z0 - 5, z1)
	B.label("Rijksmuseum", Vector3(mid, 42, z0), 90, B.C("#23302b"), B.C("#fffaf1"), 22, true)
	B.flush_chunk("Rijksmuseum")

static func vangogh(B, cx: float, cz: float) -> void:
	var g = B.g
	g.box(22, 12, 20, cx + 4, 0, cz - 4, B.C("#e9e7e1"))
	for k in 4:
		g.box(22.2, 0.6, 20.2, cx + 4, 2.6 + k * 2.8, cz - 4, B.C("#8a8e90"))
	g.put("cyl", Vector3(cx - 10, 4.0, cz + 6), B.C("#cfd3d4"), 0, Vector3(9, 8, 9))
	g.put("cyl", Vector3(cx - 10, 8.05, cz + 6), B.C("#8a8e90"), 0, Vector3(9.1, 0.1, 9.1))
	B.add_col(cx - 19, cx + 15, cz - 14, cz + 15)
	B.label("Van Gogh Museum", Vector3(cx, 17, cz), 56, B.C("#23302b"), B.C("#fffaf1"), 14, true)

static func muziektent(B, cx: float, cz: float) -> void:
	var g = B.g
	g.put("cyl8", Vector3(cx, 0.5, cz), B.C("#cfc6b6"), PI / 8.0, Vector3(6.0, 1.0, 6.0))
	for k in 8:
		var a := k * TAU / 8.0
		g.put("cyl8", Vector3(cx + cos(a) * 5.2, 3.0, cz + sin(a) * 5.2), B.C("#2f5a3a"), 0, Vector3(0.18, 4.0, 0.18))
	g.put("cone8", Vector3(cx, 6.2, cz), B.C("#2f5a3a"), PI / 8.0, Vector3(6.8, 2.6, 6.8))
	g.put("ball", Vector3(cx, 7.7, cz), B.C("#d4a93c"), 0, Vector3(0.4, 0.4, 0.4), "gold")
	B.add_col(cx - 6, cx + 6, cz - 6, cz + 6, 1.0, false)

static func molen(B, cx: float, cz: float) -> void:
	var g = B.g
	var Rb: Color = B.C("#7a3e2e")
	g.put("cyl8", Vector3(cx, 3.0, cz), Rb, PI / 8.0, Vector3(5.0, 6.0, 5.0))
	g.put("cone8", Vector3(cx, 10.0, cz), B.C("#6a5a4a"), PI / 8.0, Vector3(4.6, 18.0, 4.6))
	g.put("cyl8", Vector3(cx, 13.0, cz), B.C("#6a5a4a"), PI / 8.0, Vector3(2.8, 6.0, 2.8))
	g.put("hip", Vector3(cx, 16.0, cz), B.C("#3a3634"), 0, Vector3(4.0, 2.4, 6.0), "roof")
	g.put("cyl8", Vector3(cx, 16.2, cz + 3.2), B.C("#3a2e28"), 0, Vector3(0.4, 1.6, 0.4), "plain", PI / 2.0)
	for k in 4:
		var a := 0.35 + k * PI / 2.0
		var d := Vector3(cos(a), sin(a), 0)
		var p := Vector3(cx, 16.2, cz + 4.0) + d * 6.0
		g.put("box", p, B.C("#f2efe6"), 0, Vector3(1.6, 11.0, 0.12), "plain", 0.0, a - PI / 2.0)
		g.put("box", p, B.C("#3a2e28"), 0, Vector3(0.2, 12.0, 0.2), "plain", 0.0, a - PI / 2.0)
	g.box(1.8, 2.4, 0.3, cx, 0, cz + 5.0, B.C("#2f2a26"))
	B.add_col(cx - 5, cx + 5, cz - 5, cz + 5)
	B.label("De Gooyer", Vector3(cx, 30, cz), 56, B.C("#23302b"), B.C("#fffaf1"), 14, true)
