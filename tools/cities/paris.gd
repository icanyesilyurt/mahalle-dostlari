extends RefCounted
## Paris: Seine ve Cité adası, Louvre, Tuileries, Concorde, Champs-Élysées, Zafer Takı,
## Montmartre/Sacré-Cœur, Eyfel ve Champ de Mars, Latin Mahallesi, Lüksemburg Bahçesi.
## Koordinatlar İstanbul ile aynı ölçekte: x -240..260, z -515..310 (kuzey = -z).

const HAUSS := ["#efe6d2", "#e8dcc4", "#f2ead8", "#e4d6bc", "#ece2cc", "#f0e4cc", "#e2d4bb"]
const SLATE := ["#6f7c86", "#7d8a94", "#66727c", "#74808a"]
const NAMES_V := ["Rue de Rivoli", "Rue Saint-Honoré", "Rue du Bac", "Rue de la Paix", "Rue Montorgueil", "Rue Cler", "Rue Mouffetard", "Rue Lepic", "Rue des Martyrs", "Rue de Seine", "Rue Bonaparte", "Rue de Buci"]
const NAMES_H := ["Boulevard Haussmann", "Rue de Provence", "Rue La Fayette", "Rue de Châteaudun", "Rue Lamarck", "Rue des Abbesses", "Boulevard Saint-Germain", "Rue Jacob", "Rue de Rennes", "Rue Monge", "Rue Soufflot", "Rue Vavin"]
const CATS := ["Minou", "Chouchou", "Biscotte", "Praline", "Mistigri", "Caramel", "Noisette", "Pompon", "Réglisse", "Fifi", "Choupette", "Gribouille", "Tartine", "Croissant", "Madeleine", "Filou", "Macaron", "Crêpe"]
const DOGS := ["Médor", "Rex", "Bijou", "Pépite", "Loulou", "Gaston", "Brioche", "Baguette", "Oscar", "Hugo", "Plume", "Toby", "Vanille", "Cachou"]

static func build(B) -> Dictionary:
	var g = B.g
	var st := {"pal": HAUSS, "fmin": 4, "fmax": 6, "shop": 0.75, "wins": ["win_c", "win_a"], "cumba": 0.0, "stone": 0.85,
		"roof_kind": "mansard", "roof": SLATE, "balcony": 0.85, "ornate": true}
	# --- zemin
	g.ground(-240, 260, -515, -42, 0.0, "cobble", 4.0)
	g.ground(-240, 260, 22, 310, 0.0, "cobble", 4.0)
	g.ground(-95, 95, -26, 6, 0.0, "cobble", 4.0)
	g.ground(-240, 260, -50, -42, 0.012, "slab", 6.0)
	g.ground(-240, 260, 22, 30, 0.012, "slab", 6.0)
	g.flush(B.mroot.get_node("Zemin"), B.mroot, "ZeminParis", false)
	B.road("Quai du Louvre", -240, 260, -50, -42)
	B.road("Quai Voltaire", -240, 260, 22, 30)
	# --- Seine: iki kol ve Cité adası
	var bridges := [[-170.0, "Pont des Arts", 8.0], [-70.0, "Pont Neuf", 10.0], [50.0, "Pont Notre-Dame", 10.0], [180.0, "Pont Alexandre III", 14.0]]
	B.water_h(-260, -95, -42, 22, [[-174.0, -166.0]])
	B.water_h(95, 280, -42, 22, [[173.0, 187.0]])
	B.water_h(-95, 95, -42, -26, [[-75.0, -65.0], [45.0, 55.0]], true, false)
	B.water_h(-95, 95, 6, 22, [[-75.0, -65.0], [45.0, 55.0]], false, true)
	# adanın uç duvarları
	g.box(0.8, 1.6, 32, -95, -1.0, -10, B.stone(B.C("#c9bda6")))
	g.box(0.8, 1.6, 32, 95, -1.0, -10, B.stone(B.C("#c9bda6")))
	var walk := []
	var fishing := []
	for b in bridges:
		var x: float = b[0]; var w: float = b[2]
		var col: Color = B.C("#d6cbb4")
		if b[1] == "Pont Alexandre III":
			col = B.C("#e2d8c2")
		if absf(x) < 95.0:
			B.stone_bridge(b[1], x, -42, -26, w, col, 1)
			B.stone_bridge(b[1], x, 6, 22, w, col, 1)
			walk.append([x - w / 2.0, x + w / 2.0, -42, -26]); walk.append([x - w / 2.0, x + w / 2.0, 6, 22])
			fishing.append([x - w / 2.0, x + w / 2.0, -42, -26])
		else:
			B.stone_bridge(b[1], x, -42, 22, w, col, 3)
			walk.append([x - w / 2.0, x + w / 2.0, -42, 22])
			fishing.append([x - w / 2.0, x + w / 2.0, -38, 18])
		if b[1] == "Pont Alexandre III":
			for e: float in [-1.0, 1.0]:
				for zz: float in [-42.0, 22.0]:
					g.box(1.6, 9.0, 1.6, x + e * 8.0, 0, zz, B.C("#e2d8c2"))
					g.put("ball", Vector3(x + e * 8.0, 9.8, zz), B.C("#d4a93c"), 0, Vector3(1.0, 1.0, 1.0), "gold")
		if b[1] == "Pont des Arts":
			for k in 12:
				g.box(0.3, 0.3, 0.12, x + 3.4, 0.6, -38 + k * 5.0, B.pick(["#d4a93c", "#c8423a", "#3b6aa8"]))
	B.flush_chunk("Seine")
	# kitapçı kulübeleri (bouquinistes) kıyıda
	var bq := -230.0
	while bq < 250.0:
		if absf(bq - (-170)) > 10 and absf(bq - (-70)) > 10 and absf(bq - 50) > 10 and absf(bq - 180) > 12:
			g.box(2.4, 1.1, 0.8, bq, 0.4, -43.2, B.C("#2f5a3a"))
			g.put("hip", Vector3(bq, 1.5, -43.2), B.C("#2f5a3a"), 0, Vector3(2.5, 0.25, 0.9))
		bq += 9.0
	for k in 30:
		B.lamp(-230 + k * 16.5, -48.6)
		B.lamp(-230 + k * 16.5, 28.6)
	for k in 10:
		B.tree(-225 + k * 50, 26.0, "plane", 0.9)
	B.flush_chunk("Rihtim")

	# --- Cité adası: Notre-Dame
	notre_dame(B, 22.0, -10.0)
	g.ground(-40, -6, -24, 4, 0.02, "slab", 6.0)
	B.squares.append([-40, -6, -24, 4])
	B.area("Île de la Cité", -95, 95, -26, 6)
	B.road("Parvis Notre-Dame", -40, -6, -24, 4)
	B.block(-93, -76, -24, 4, st)
	B.block(-64, -44, -24, 4, st)
	B.block(70, 93, -24, 4, st)
	for k in 5:
		B.tree(54 + k * 3.5, 2.0, "plane", 0.8)
	B.flush_chunk("Cite")

	# --- Louvre ve piramit
	louvre(B, -215, -75, -150, -58)
	# --- Tuileries
	B.park(-70, 60, -150, -58, "Jardin des Tuileries", "plane", 11.0)
	B.fountain_round(-5, -104, 7.0)
	for k in 6:
		B.flower_bed(-55 + k * 20.0, -66.0, 6.0, 2.0)
	# --- Concorde
	g.ground(65, 165, -150, -58, 0.02, "slab", 7.0)
	B.squares.append([65, 165, -150, -58])
	B.area("Place de la Concorde", 65, 165, -150, -58)
	B.road("Place de la Concorde", 65, 165, -150, -58)
	B.obelisk(115, -104, 20.0, B.C("#c9a38a"))
	B.fountain_round(92, -104, 6.0)
	B.fountain_round(138, -104, 6.0)
	for k in 8:
		B.lamp(72 + k * 12.5, -64.0)
		B.lamp(72 + k * 12.5, -144.0)
	B.flush_chunk("Concorde")
	B.grid([170.0, 215.0, 258.0], [-145.0, -100.0, -52.0], st, ["Rue Royale", "Rue Boissy"], ["Avenue Gabriel", "Rue du Faubourg"], [], 5.0, "Madeleine")

	# --- Kuzey mahalleleri (Haussmann ızgarası)
	var zsN := [-150.0, -195.0, -240.0, -285.0, -330.0, -375.0, -425.0]
	B.grid([-237.0, -195.0, -150.0, -105.0, -60.0, -15.0, 30.0, 95.0], zsN, st, NAMES_V, NAMES_H, [], 5.0, "ParisKuzeyBati")
	B.grid([137.0, 175.0, 215.0, 258.0], zsN, st, NAMES_V.slice(4), NAMES_H.slice(2), [], 5.0, "ParisKuzeyDogu")
	# --- Champs-Élysées
	g.ground(92, 137, -440, -150, 0.012, "slab", 5.0)
	B.road("Avenue des Champs-Élysées", 92, 137, -440, -150)
	var cz := -158.0
	while cz > -436.0:
		B.tree(99.0, cz, "plane", 1.05)
		B.tree(130.0, cz, "plane", 1.05)
		if int(absf(cz)) % 3 == 0:
			B.lamp(103.5, cz + 5.0); B.lamp(125.5, cz + 5.0)
		cz -= 11.0
	for k in 5:
		B.cafe_row(94.6, -170.0 - k * 55.0, 3, 0.0, 3.0)
		B.cafe_row(134.4, -190.0 - k * 55.0, 3, 0.0, 3.0)
	B.flush_chunk("ChampsElysees")
	# --- Zafer Takı (Étoile)
	g.ground(55, 175, -505, -440, 0.02, "slab", 7.0)
	B.squares.append([55, 175, -505, -440])
	B.area("Place Charles de Gaulle", 55, 175, -505, -440)
	B.road("Place Charles de Gaulle", 55, 175, -505, -440)
	arc_triomphe(B, 115.0, -472.0)
	for k in 10:
		var a := k * TAU / 10.0
		B.lamp(115 + cos(a) * 26.0, -472 + sin(a) * 26.0)
	B.flush_chunk("Etoile")
	# --- Montmartre ve Sacré-Cœur
	sacre_coeur(B, -150.0, -470.0)
	B.grid([-70.0, -20.0, 30.0, 55.0], [-430.0, -470.0, -505.0], st, ["Rue Norvins", "Rue Lepic", "Rue Caulaincourt"], ["Place du Tertre", "Rue des Saules", "Rue Cortot"], [], 5.0, "Montmartre")
	g.ground(175, 258, -505, -430, 0.0, "cobble", 4.0)
	B.grid([175.0, 215.0, 258.0], [-430.0, -470.0, -505.0], st, ["Avenue de Wagram", "Avenue Hoche"], ["Avenue Mac-Mahon", "Rue de Tilsitt"], [], 5.0, "EtoileDogu")
	# ressamlar meydanı (Place du Tertre)
	for k in 6:
		g.box(0.08, 1.5, 0.08, -60.0 + k * 3.0, 0, -452.0, B.C("#5a3f2c"))
		g.box(0.9, 0.7, 0.05, -60.0 + k * 3.0, 1.1, -451.9, B.pick(["#e2a33b", "#3b6aa8", "#c8423a", "#5f8f45", "#f2efe9"]))
	B.flush_chunk("Tertre")

	# --- Güney yaka: Champ de Mars ve Eyfel
	B.park(-235, -78, 32, 300, "Champ de Mars", "plane", 12.0)
	eiffel(B, -156.0, 80.0)
	# --- Latin Mahallesi ve Saint-Germain
	var stS := st.duplicate()
	stS.pal = ["#efe6d2", "#e8dcc4", "#f2ead8", "#e6d3b5", "#f0dcc0", "#e9d9c0"]
	B.grid([-70.0, -25.0, 20.0, 65.0, 110.0, 140.0], [32.0, 77.0, 122.0, 167.0, 212.0, 257.0, 302.0], stS, NAMES_V.slice(6), NAMES_H.slice(6), [], 5.0, "QuartierLatin")
	B.grid([140.0, 200.0, 258.0], [32.0, 77.0, 122.0, 167.0, 190.0], stS, ["Rue de Vaugirard", "Rue d'Assas"], ["Rue de Fleurus", "Rue Guynemer"], [], 5.0, "SaintGermain")
	B.park(142, 258, 192, 302, "Jardin du Luxembourg", "plane", 11.0)
	B.fountain_round(200, 247, 8.0)
	g.wall_box(40, 13, 14, 200, 0, 290, B.stone(B.C("#e6dcc6")), 0, "win_c", 3.0, 4.3, true)
	g.box(42, 2.6, 14.6, 200, 13, 290, B.C("#6f7c86"))
	B.add_col(180, 220, 283, 297)
	B.label("Palais du Luxembourg", Vector3(200, 17, 283), 60, B.C("#fffaf1"), B.C("#23302b"), 10, true)
	B.flush_chunk("Luxembourg")
	# --- Paris sokak eşyaları: Morris kolonları, metro girişleri, Wallace çeşmeleri
	var spots := [[-190.0, -150.0], [-60.0, -195.0], [30.0, -285.0], [137.0, -240.0], [-25.0, 77.0], [65.0, 167.0], [110.0, 122.0], [-150.0, -330.0]]
	for i in spots.size():
		var p: Array = spots[i]
		var px: float = p[0] + 3.4; var pz: float = p[1] + 3.4
		if i % 2 == 0:
			g.put("cyl", Vector3(px, 1.5, pz), B.C("#2f5a3a"), 0, Vector3(0.7, 3.0, 0.7))
			g.put("cyl", Vector3(px, 1.7, pz), B.C("#efe6d2"), 0, Vector3(0.72, 1.8, 0.72))
			g.put("dome", Vector3(px, 3.0, pz), B.C("#2f5a3a"), 0, Vector3(0.85, 0.6, 0.85))
		else:
			g.put("cyl8", Vector3(px, 1.4, pz), B.C("#2f5a3a"), 0, Vector3(0.1, 2.8, 0.1))
			B.label("MÉTRO", Vector3(px, 3.0, pz), 44, B.C("#f6e7b8"), B.C("#2f5a3a"), 10, true)
			B.add_col(px - 0.2, px + 0.2, pz - 0.2, pz + 0.2, 3.0, false)
	B.flush_chunk("SokakEsyasi")
	# --- tekneler (bateaux-mouches)
	B.boat("BateauOuest", -230, -10, PI / 2.0, "ferry")
	B.boat("BateauEst", 210, -10, PI / 2.0, "ferry")
	B.big_label("Seine", Vector3(-130, 8, -10), 90)
	return {
		"lands": [[-240, 260, -515, -42], [-240, 260, 22, 310], [-95, 95, -26, 6]],
		"mini_extra": [[-174, -166, -42, 22, "#c9bda6"], [-75, -65, -42, 6, "#c9bda6"], [45, 55, -42, 6, "#c9bda6"], [173, 187, -42, 22, "#c9bda6"]],
		"water": [[-260, -95, -42, 22], [95, 280, -42, 22], [-95, 95, -42, -26], [-95, 95, 6, 22]],
		"walk_over": walk, "fishing": fishing,
		"carts": [["Crêpe", "#c8423a"], ["Glace", "#3b6aa8"], ["Baguette", "#c8823a"], ["Café", "#2f7d6d"]],
		"fishers": [[-170.0, -40.0, -28.0, 8.0, true], [-170.0, 8.0, 20.0, 8.0, true], [-70.0, -40.0, -28.0, 10.0, true], [50.0, 8.0, 20.0, 10.0, true], [180.0, -40.0, 20.0, 14.0, true]],
		"bounds": Rect2(-240, -515, 500, 825),
		"start": [-120.0, -46.0, 0.6],
		"fountains": [[-5, -104], [92, -104], [138, -104], [200, 247], [-150, -320], [30, 120]],
		"landmarks": [["Eyfel Kulesi", -156, 80], ["Louvre", -145, -100], ["Notre-Dame", 22, -10], ["Tuileries", -5, -104], ["Concorde", 115, -104],
			["Champs-Élysées", 115, -300], ["Zafer Takı", 115, -472], ["Sacré-Cœur", -150, -470], ["Montmartre", -20, -450], ["Lüksemburg", 200, 247], ["Latin Mahallesi", 40, 150]],
		"movers": [{"node": "BateauOuest", "path": [[-232, -8], [-182, -8]], "speed": 2.5, "float": true}, {"node": "BateauEst", "path": [[195, -8], [268, -8]], "speed": 2.5, "float": true}],
		"cat_names": CATS, "dog_names": DOGS,
		"fixed_animals": [[true, -130.0, -62.0, 0.0, "Louvre avlusu"], [false, -5.0, -88.0, 0.0, "Tuileries"], [true, 20.0, -64.0, 0.0, "Tuileries çiçekleri"],
			[false, 115.0, -88.0, 0.0, "Concorde"], [true, -25.0, -14.0, 0.0, "Notre-Dame önü"], [false, -70.0, -34.0, 0.0, "Pont Neuf"],
			[true, -170.0, -10.0, 0.0, "Pont des Arts"], [false, -156.0, 120.0, 0.0, "Eyfel'in dibinde"], [true, -150.0, 160.0, 0.0, "Champ de Mars"],
			[false, 115.0, -300.0, 0.0, "Champs-Élysées"], [true, 96.0, -220.0, 0.0, "Kafe terası"], [false, 115.0, -450.0, 0.0, "Zafer Takı"],
			[true, -150.0, -432.0, 0.0, "Sacré-Cœur merdivenleri"], [true, -50.0, -455.0, 0.0, "Ressamlar Meydanı"], [false, 200.0, 225.0, 0.0, "Lüksemburg Bahçesi"],
			[true, 180.0, 210.0, 0.0, "Lüksemburg banklarında"], [false, 40.0, 125.0, 0.0, "Latin Mahallesi"], [true, -100.0, 27.0, 0.0, "Kitapçıların yanında"]],
	}

static func notre_dame(B, cx: float, cz: float) -> void:
	var g = B.g
	var S: Color = B.stone(B.C("#d9cdb3"))
	# nef
	g.wall_box(40, 15, 13, cx + 6, 0, cz, S, 0, "win_c", 3.4, 7.5, true)
	g.put("hip", Vector3(cx + 6, 15, cz), B.C("#5d6a72"), 0, Vector3(41, 7.0, 13.5), "roof")
	# apsis
	g.put("cyl8", Vector3(cx + 26, 7, cz), S, 0, Vector3(6.5, 14, 6.5), "stonewall")
	g.put("cone8", Vector3(cx + 26, 14, cz), B.C("#5d6a72"), 0, Vector3(6.8, 5.5, 6.8))
	# batı cephesi ve kuleler
	var fx := cx - 18.0
	g.wall_box(8, 22, 20, fx, 0, cz, S, 0, "win_c", 3.0, 5.5, true)
	for e: float in [-1.0, 1.0]:
		g.wall_box(7, 11, 7, fx, 22, cz + e * 6.5, S, 0, "win_c", 3.4, 11.0, true)
		g.box(7.6, 0.6, 7.6, fx, 33, cz + e * 6.5, B.C("#cfc3a8"))
		for k in 5:
			g.box(0.5, 1.2, 0.5, fx - 3.5 + k * 1.75, 33.6, cz + e * 6.5 + 3.5, B.C("#cfc3a8"))
	# üç kapı ve gül pencere
	for k in 3:
		var pz := cz - 6.0 + k * 6.0
		g.box(0.3, 6.5 if k == 1 else 5.5, 3.2, fx - 4.1, 0, pz, B.C("#3a3430"))
		g.put("cyl", Vector3(fx - 4.15, 6.5 if k == 1 else 5.5, pz), B.C("#3a3430"), 0, Vector3(1.6, 0.3, 1.6), "plain", 0.0, PI / 2.0)
	g.put("cyl", Vector3(fx - 4.1, 14.5, cz), B.C("#3b4f8a"), 0, Vector3(3.6, 0.3, 3.6), "plain", 0.0, PI / 2.0)
	g.put("cyl", Vector3(fx - 4.2, 14.5, cz), B.C("#8a3b6a"), 0, Vector3(1.8, 0.3, 1.8), "plain", 0.0, PI / 2.0)
	g.box(0.4, 1.0, 20, fx - 4.2, 10.0, cz, B.C("#cfc3a8"))
	# sivri kule ve uçan payandalar
	g.put("cone8", Vector3(cx + 10, 21.5, cz), B.C("#5d6a72"), 0, Vector3(1.2, 16.0, 1.2))
	for k in 6:
		var bx := cx - 8 + k * 6.0
		for e2: float in [-1.0, 1.0]:
			g.box(1.0, 9.0, 1.0, bx, 0, cz + e2 * 10.0, S)
			g.put("box", Vector3(bx, 11.0, cz + e2 * 8.0), S, 0, Vector3(0.6, 0.6, 5.0), "plain", e2 * 0.6, 0.0)
	B.add_col(cx - 23, cx + 33, cz - 11, cz + 11)
	B.label("Notre-Dame", Vector3(cx, 42, cz), 90, B.C("#23302b"), B.C("#fffaf1"), 24, true)

static func louvre(B, x0: float, x1: float, z0: float, z1: float) -> void:
	var g = B.g
	var S: Color = B.stone(B.C("#e8dcc4"))
	var d := 18.0
	var wings := [[x0, x1, z0, z0 + d], [x0, x0 + d, z0 + d, z1 - 6], [x1 - d, x1, z0 + d, z1 - 6]]
	for wgs in wings:
		var w: float = wgs[1] - wgs[0]; var dd: float = wgs[3] - wgs[2]
		var cx: float = (wgs[0] + wgs[1]) / 2.0; var cz: float = (wgs[2] + wgs[3]) / 2.0
		g.wall_box(w, 14, dd, cx, 0, cz, S, 0, "win_c", 3.2, 4.6, true)
		g.box(w + 0.4, 0.6, dd + 0.4, cx, 14, cz, B.C("#d8ccb2"))
		g.box(w - 0.4, 3.0, dd - 1.2, cx, 14.6, cz, B.C("#6f7c86"))
		g.put("hip", Vector3(cx, 17.6, cz), B.C("#6f7c86"), 0 if w > dd else PI / 2, Vector3(maxf(w, dd) - 1.0, 1.4, minf(w, dd) - 2.0), "roof")
		B.add_col(wgs[0], wgs[1], wgs[2], wgs[3])
	# köşe pavyonları
	for p: Vector2 in [Vector2(x0 + 9, z0 + 9), Vector2(x1 - 9, z0 + 9)]:
		g.put("pyr", Vector3(p.x, 17.6, p.y), B.C("#5d6a72"), 0, Vector3(16, 7, 16), "roof")
	var px := (x0 + x1) / 2.0; var pz := (z0 + d + z1) / 2.0
	g.ground(x0 + d, x1 - d, z0 + d, z1, 0.02, "slab", 6.0)
	B.squares.append([x0 + d, x1 - d, z0 + d, z1])
	B.area("Louvre", x0, x1, z0, z1)
	B.road("Cour Napoléon", x0 + d, x1 - d, z0 + d, z1)
	# cam piramit ve havuzlar
	var glass: Color = B.C("#9cc7d8")
	g.put("pyr", Vector3(px, 0.0, pz), glass, PI / 4.0, Vector3(22, 15, 22), "plain")
	for e: Vector2 in [Vector2(-1, 0), Vector2(1, 0), Vector2(0, 1)]:
		g.put("pyr", Vector3(px + e.x * 22.0, 0.0, pz + e.y * 20.0), glass, PI / 4.0, Vector3(4, 3, 4), "plain")
		g.box(12, 0.5, 8, px + e.x * 26.0, 0, pz + e.y * 26.0 + (0.0 if e.y == 0 else 2.0), B.C("#d8d2c4"))
		g.box(11, 0.05, 7, px + e.x * 26.0, 0.48, pz + e.y * 26.0 + (0.0 if e.y == 0 else 2.0), B.C("#7cc6ea"))
	B.add_col(px - 11.5, px + 11.5, pz - 11.5, pz + 11.5)
	B.label("Louvre", Vector3(px, 19, pz), 90, B.C("#23302b"), B.C("#fffaf1"), 24, true)
	B.flush_chunk("Louvre")

static func arc_triomphe(B, cx: float, cz: float) -> void:
	var g = B.g
	var S: Color = B.stone(B.C("#e6dcc6"))
	for e: float in [-1.0, 1.0]:
		g.box(7.5, 18, 11, cx + e * 7.25, 0, cz, S)
		g.box(4.0, 6.0, 0.3, cx + e * 7.25, 4.0, cz - 5.65, B.C("#d8ccb2"))
		g.box(4.0, 6.0, 0.3, cx + e * 7.25, 4.0, cz + 5.65, B.C("#d8ccb2"))
	g.box(22, 7, 11, cx, 18, cz, S)
	g.box(22.6, 0.8, 11.6, cx, 22.5, cz, B.C("#d8ccb2"))
	g.box(22.4, 1.2, 11.4, cx, 25, cz, B.C("#d8ccb2"))
	g.put("cyl", Vector3(cx, 14.6, cz), S, 0, Vector3(3.5, 11, 3.5), "stonewall", PI / 2.0, 0.0)
	for e: float in [-1.0, 1.0]:
		B.add_col(cx + e * 7.25 - 3.75, cx + e * 7.25 + 3.75, cz - 5.5, cz + 5.5)
	g.put("cyl8", Vector3(cx, 0.25, cz), B.C("#d4a93c"), 0, Vector3(1.0, 0.5, 1.0))
	g.box(1.2, 1.4, 0.1, cx + 0.6, 26.2, cz, B.C("#3b6aa8"))
	B.label("Arc de Triomphe", Vector3(cx, 32, cz), 90, B.C("#23302b"), B.C("#fffaf1"), 24, true)

static func sacre_coeur(B, cx: float, cz: float) -> void:
	var g = B.g
	var W: Color = B.stone(B.C("#f2efe6"))
	g.box(70, 3.0, 50, cx, 0, cz - 5, B.stone(B.C("#d8d2c4")))
	for k in 6:
		g.box(30 - k * 2.0, 0.5 + k * 0.5, 2.0, cx, 0, cz + 21 + (5 - k) * 2.0, B.C("#d8d2c4"))
	B.add_col(cx - 35, cx + 35, cz - 30, cz + 32)
	g.wall_box(26, 16, 30, cx, 3, cz - 6, W, 0, "win_c", 3.4, 5.3, true)
	g.put("cyl", Vector3(cx, 22, cz - 6), W, 0, Vector3(6.5, 6.0, 6.5), "stonewall")
	B.dome(cx, 25, cz - 6, 7.0, 1.3, 0.0, B.C("#f6f3ec"))
	for p: Vector2 in [Vector2(-9, 5), Vector2(9, 5), Vector2(-9, -17), Vector2(9, -17)]:
		g.put("cyl", Vector3(cx + p.x, 20, cz + p.y), W, 0, Vector3(3.0, 4.0, 3.0), "stonewall")
		B.dome(cx + p.x, 22, cz + p.y, 3.2, 1.3, 0.0, B.C("#f6f3ec"))
	g.wall_box(7, 30, 7, cx, 3, cz - 24, W, 0, "win_c", 3.4, 10.0, true)
	B.dome(cx, 33, cz - 24, 3.6, 1.2, 0.0, B.C("#f6f3ec"))
	for k in 3:
		g.box(3.0, 6.0, 1.0, cx - 6 + k * 6, 3, cz + 9.4, B.C("#3a3430"))
	B.label("Sacré-Cœur", Vector3(cx, 46, cz), 90, B.C("#23302b"), B.C("#fffaf1"), 24, true)
	B.area("Montmartre", -237, -70, -515, -430)
	B.flush_chunk("SacreCoeur")

static func eiffel(B, cx: float, cz: float) -> void:
	var g = B.g
	var M: Color = B.C("#7a6650")
	var D: Color = B.C("#5f4f3e")
	# dört ayak (içe eğik)
	for sx: float in [-1.0, 1.0]:
		for sz: float in [-1.0, 1.0]:
			var a := atan(8.0 / 22.0)
			g.put("box", Vector3(cx + sx * 9.0, 11.0, cz + sz * 9.0), M, 0, Vector3(2.6, 24.5, 2.6), "plain", -sz * a, sx * a)
			g.put("box", Vector3(cx + sx * 4.7, 32.0, cz + sz * 4.7), M, 0, Vector3(1.6, 21.0, 1.6), "plain", -sz * 0.17, sx * 0.17)
			B.add_col(cx + sx * 12.0 - 2.0, cx + sx * 12.0 + 2.0, cz + sz * 12.0 - 2.0, cz + sz * 12.0 + 2.0)
			g.box(4.0, 1.2, 4.0, cx + sx * 12.5, 0, cz + sz * 12.5, B.C("#9a8a72"))
	# kemerler: ayaklar arası
	for e: float in [-1.0, 1.0]:
		g.put("cyl", Vector3(cx, 13.0, cz + e * 10.5), D, 0, Vector3(9.0, 1.0, 9.0), "plain", PI / 2.0, 0.0)
		g.put("cyl", Vector3(cx + e * 10.5, 13.0, cz), D, 0, Vector3(9.0, 1.0, 9.0), "plain", 0.0, PI / 2.0)
	# birinci ve ikinci kat
	g.box(22, 2.4, 22, cx, 20.5, cz, D)
	g.box(23, 0.8, 23, cx, 23.0, cz, M)
	g.box(11, 1.6, 11, cx, 41.5, cz, D)
	g.box(11.6, 0.6, 11.6, cx, 43.1, cz, M)
	# üst gövde: sivrilen kafes
	g.put("pyr", Vector3(cx, 43.6, cz), M, PI / 4.0, Vector3(9.0, 30.0, 9.0))
	for k in 6:
		var yy := 46.0 + k * 4.2
		var ww := 6.6 - k * 0.9
		g.box(ww, 0.35, ww, cx, yy, cz, D)
	g.box(2.6, 3.0, 2.6, cx, 70.0, cz, D)
	g.put("cyl8", Vector3(cx, 77.0, cz), M, 0, Vector3(0.25, 11.0, 0.25))
	# çapraz kafes çizgileri (ayaklar üzerinde)
	for sx2: float in [-1.0, 1.0]:
		for k2 in 4:
			g.put("box", Vector3(cx + sx2 * (10.5 - k2 * 1.6), 4.0 + k2 * 4.5, cz), D, 0, Vector3(0.25, 0.25, 18.0 - k2 * 3.0))
			g.put("box", Vector3(cx, 4.0 + k2 * 4.5, cz + sx2 * (10.5 - k2 * 1.6)), D, 0, Vector3(18.0 - k2 * 3.0, 0.25, 0.25))
	B.label("Tour Eiffel", Vector3(cx, 86, cz), 110, B.C("#23302b"), B.C("#fffaf1"), 26, true)
	B.flush_chunk("Eiffel")
