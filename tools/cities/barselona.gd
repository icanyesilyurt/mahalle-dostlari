extends RefCounted
## Barselona: La Rambla, Plaça de Catalunya, Gotik Mahalle ve Katedral, Plaça Reial, Boqueria,
## Kolomb Anıtı ve Rambla de Mar iskelesi, Barceloneta plajı, Ciutadella Parkı ve Cascada,
## Zafer Takı, Eixample (pahlı köşeler), Passeig de Gràcia: Casa Batlló, Casa Milà,
## Sagrada Família, Park Güell. Koordinatlar: x -240..260, z -515..310 (kuzey = -z, deniz güneyde).

const EIX := ["#eadbc2", "#f0e2c8", "#e6cfb0", "#dcc6a6", "#efe0cc", "#e4cba8", "#f3e6d0", "#e9d2b8"]
const GOT := ["#cdb999", "#d6c4a4", "#c4af8e", "#dccbab", "#d2bf9e"]
const BARC := ["#f2d9b8", "#e9c9a0", "#f4e3c6", "#dfe6e2", "#f0d2c2", "#e8ddb0"]
const ROOF := ["#b5643c", "#a8583a", "#c07048"]
const NAMES_V := ["Carrer de Balmes", "Carrer d'Aribau", "Carrer de Muntaner", "Rambla de Catalunya", "Carrer de Pau Claris", "Carrer de Roger de Llúria", "Carrer de Girona", "Carrer de Bailèn", "Carrer de Sicília", "Carrer de la Marina"]
const NAMES_H := ["Avinguda Diagonal", "Carrer de Còrsega", "Carrer del Rosselló", "Carrer de Provença", "Carrer de Mallorca", "Carrer de València", "Carrer d'Aragó", "Carrer del Consell de Cent", "Gran Via"]
const NAMES_GV := ["Carrer del Bisbe", "Carrer de Ferran", "Carrer d'Avinyó", "Via Laietana"]
const NAMES_GH := ["Carrer de la Portaferrissa", "Carrer del Pi", "Carrer dels Banys Nous", "Carrer de la Boqueria", "Carrer d'Escudellers", "Carrer Ample", "Carrer de la Mercè", "Carrer Nou de Sant Francesc", "Carrer del Vidre"]
const NAMES_RV := ["Carrer de la Riera Baixa", "Carrer del Carme", "Carrer de Joaquín Costa", "Carrer de l'Hospital", "Carrer de Sant Pau"]
const NAMES_RH := ["Carrer dels Tallers", "Carrer del Pintor Fortuny", "Carrer del Carme", "Carrer de l'Hospital", "Carrer de Sant Pau", "Carrer Nou de la Rambla", "Carrer de l'Arc del Teatre", "Carrer del Cid"]
const CATS := ["Mixa", "Gatet", "Lluna", "Canela", "Churro", "Pipa", "Nit", "Tigre", "Mel", "Sol", "Perla", "Coco", "Fideu", "Xocolata", "Bruna", "Nina", "Turró", "Paella"]
const DOGS := ["Toby", "Rufo", "Lola", "Bruno", "Pirata", "Núvol", "Trufa", "Rocky", "Chispa", "Pancho", "Neu", "Duna", "Pelut", "Gaudí"]

static func palm(B, x: float, z: float, s: float = 1.0) -> void:
	var g = B.g
	var h := 7.5 * s
	for k in 5:
		g.put("cyl8", Vector3(x, h * (k + 0.5) / 5.0, z), B.C("#8a6f4e").lerp(B.C("#a58a62"), float(k % 2)), 0, Vector3(0.26 * s, h / 5.0, 0.26 * s))
	for k in 8:
		var a: float = k * TAU / 8.0 + B.rng.randf() * 0.3
		var d := Vector3(sin(a), 0, cos(a))
		g.put("box", Vector3(x, h - 0.3, z) + d * 1.4 * s, B.C("#4f8a3c").lerp(B.C("#6aa04a"), B.rng.randf()), a, Vector3(0.55 * s, 0.07, 3.0 * s), "plain", 0.42)
	g.put("ico", Vector3(x, h, z), B.C("#5b7a3a"), 0, Vector3(0.45, 0.4, 0.45) * s)
	B.add_col(x - 0.3, x + 0.3, z - 0.3, z + 0.3, 6, false, 2)

## Eixample kavşaklarında pahlı köşe meydancıkları
static func chamfers(B, xs: Array, zs: Array) -> void:
	for x: float in xs:
		for z: float in zs:
			B.g.put("cyl8", Vector3(x, 0.014, z), B.C("#ddd3c2"), PI / 8.0, Vector3(7.6, 0.02, 7.6))

static func build(B) -> Dictionary:
	var g = B.g
	var stE := {"pal": EIX, "fmin": 4, "fmax": 6, "shop": 0.8, "wins": ["win_c", "win_a"], "cumba": 0.0, "stone": 0.5,
		"roof_kind": "flat", "roof": ROOF, "balcony": 0.9, "ornate": true}
	var stG := {"pal": GOT, "fmin": 3, "fmax": 5, "shop": 0.7, "wins": ["win_a", "win_b"], "cumba": 0.0, "stone": 0.9,
		"roof_kind": "flat", "roof": ROOF, "balcony": 0.6, "shutters": 0.5, "shutter_cols": ["#3f6b4a", "#5a7f8f", "#7a4a3a"]}
	var stB := {"pal": BARC, "fmin": 3, "fmax": 4, "shop": 0.6, "wins": ["win_b", "win_a"], "cumba": 0.0, "stone": 0.0,
		"roof_kind": "flat", "roof": ROOF, "balcony": 0.8, "shutters": 0.8, "shutter_cols": ["#3f6b4a", "#2f6f8f", "#4a7a5a"]}
	# --- zemin
	g.ground(-240, 260, -515, 188, 0.0, "cobble", 4.0)
	g.ground(-240, 260, 188, 235, 0.0, "slab", 6.0)
	g.ground(60, 258, 190, 222, 0.012, "plain", 1.0, B.C("#ead7a6"))
	g.flush(B.mroot.get_node("Zemin"), B.mroot, "ZeminBarselona", false)
	# --- deniz ve Rambla de Mar iskelesi
	B.water_h(-260, 280, 235, 330, [[-69.0, -55.0]], true, false)
	B.add_col(-69, -66, 235, 291, 14.0, false)
	B.add_col(-58, -55, 235, 291, 14.0, false)
	B.stone_bridge("Rambla de Mar", -62.0, 235.0, 292.0, 8.0, B.C("#9b7b55"), 4, B.C("#d8cfbd"))
	g.box(14, 0.6, 10, -62, -0.45, 296, B.C("#9b7b55"))
	g.ground(-69, -55, 291, 301, 0.16, "wood", 2.0)
	for e: float in [-1.0, 1.0]:
		g.box(0.45, 1.0, 10, -62 + e * 6.8, 0.0, 296, B.C("#d8cfbd"))
		B.add_col(-62 + e * 6.8 - 0.22, -62 + e * 6.8 + 0.22, 291, 301, 2.0, false)
	g.box(14, 1.0, 0.45, -62, 0.0, 300.8, B.C("#d8cfbd"))
	B.add_col(-69, -55, 300.6, 301.0, 2.0, false)
	B.road("Rambla de Mar", -69, -55, 291, 301)
	var walk := [[-66.0, -58.0, 235.0, 292.0], [-69.0, -55.0, 291.0, 301.0]]
	B.road("Passeig de Colom", -240, 40, 222, 235)
	B.road("Passeig Marítim", 40, 260, 222, 235)
	for k in 30:
		B.lamp(-230 + k * 16.5, 233.6)
	for k in 14:
		palm(B, -225 + k * 18.0, 226.0, B.rng.randf_range(0.9, 1.15))
	B.flush_chunk("Liman")

	# --- Plaça de Catalunya
	g.ground(-112, -15, -150, -95, 0.02, "slab", 7.0)
	B.squares.append([-112, -15, -150, -95])
	B.area("Plaça de Catalunya", -112, -15, -150, -95)
	B.road("Plaça de Catalunya", -112, -15, -150, -95)
	g.ground(-92, -36, -138, -106, 0.03, "grass", 5.0)
	for k in 8:
		var a := k * TAU / 8.0
		g.box(1.2, 0.04, 9.0, -64 + sin(a) * 6.0, 0.035, -122 + cos(a) * 6.0, B.C("#d8cdb8") if k % 2 == 0 else B.C("#b9a77f"), a)
	B.fountain_round(-80, -122, 4.5)
	B.fountain_round(-45, -122, 4.5)
	for k in 6:
		B.lamp(-105 + k * 18.0, -146.0)
		B.lamp(-105 + k * 18.0, -98.0)
	for k in 4:
		B.bench(-100 + k * 8.0, -101.5, PI)
		B.bench(-50 + k * 8.0, -101.5, PI)
	B.flush_chunk("Catalunya")

	# --- La Rambla
	g.ground(-71, -53, -95, 188, 0.014, "slab", 4.0)
	B.road("La Rambla", -76, -48, -95, 188)
	var rz := -88.0
	var ki := 0
	while rz < 180.0:
		B.tree(-73.5, rz, "plane", 1.1)
		B.tree(-50.5, rz, "plane", 1.1)
		if ki % 2 == 0:
			B.lamp(-70.0, rz + 5.0)
			B.lamp(-54.0, rz + 5.0)
		rz += 12.0
		ki += 1
	# çiçekçi ve gazete kulübeleri
	var kz := -70.0
	ki = 0
	while kz < 170.0:
		var kc: Color = B.C("#2f5a3a") if ki % 2 == 0 else B.C("#7a4a3a")
		g.box(3.0, 2.4, 2.0, -62.0, 0, kz, kc)
		g.put("hip", Vector3(-62.0, 2.4, kz), kc.darkened(0.2), 0, Vector3(3.6, 0.5, 2.6), "roof")
		if ki % 2 == 0:
			for f in 6:
				g.put("ico", Vector3(-63.2 + f * 0.48, 0.9, kz + 1.2), B.pick(["#e8505b", "#f2c230", "#f08bb0", "#ffffff", "#c86ee0"]), B.rng.randf(), Vector3(0.28, 0.24, 0.28))
		B.add_col(-63.6, -60.4, kz - 1.1, kz + 1.1, 3.0, false)
		kz += 40.0
		ki += 1
	# Joan Miró'nun yer mozaiği
	g.put("cyl", Vector3(-62, 0.03, 70), B.C("#f2efe6"), 0, Vector3(3.0, 0.02, 3.0))
	g.put("cyl", Vector3(-62.8, 0.04, 69.4), B.C("#c8282d"), 0, Vector3(1.0, 0.02, 1.0))
	g.put("cyl", Vector3(-61.2, 0.04, 70.8), B.C("#2f6fb0"), 0, Vector3(0.8, 0.02, 0.8))
	g.put("cyl", Vector3(-61.0, 0.04, 69.0), B.C("#f2c230"), 0, Vector3(0.6, 0.02, 0.6))
	B.flush_chunk("Rambla")

	# --- Raval (batı) ve Boqueria
	B.grid([-237.0, -195.0, -150.0, -112.0], [-150.0, -95.0], stG, NAMES_RV, NAMES_RH, [], 5.0, "RavalKuzey")
	B.grid([-237.0, -195.0, -150.0, -112.0, -78.0], [-95.0, -55.0, -15.0, 25.0, 65.0, 105.0, 145.0, 185.0], stG, NAMES_RV, NAMES_RH, [[-109.0, -81.0, 28.0, 62.0]], 5.0, "Raval")
	boqueria(B, -109.5, -80.5, 27.5, 62.5)
	# --- Barri Gòtic
	B.grid([-46.0, -15.0, 15.0, 45.0], [-95.0, -60.0, -25.0, 10.0, 45.0, 80.0, 115.0, 150.0, 185.0], stG, NAMES_GV, NAMES_GH,
		[[-12.0, 12.0, -57.0, 7.0], [-43.0, -18.0, 83.0, 112.0]], 4.0, "Gotic")
	catedral(B, 0.0, -10.0)
	g.ground(-13, 13, -58, -27, 0.02, "slab", 5.0)
	B.squares.append([-13, 13, -58, -27])
	B.road("Pla de la Seu", -13, 13, -58, -27)
	B.area("Barri Gòtic", -46, 45, -95, 185)
	plaza_reial(B, -44.0, -17.0, 82.0, 113.0)
	B.grid([-15.0, 15.0, 45.0], [-150.0, -95.0], stG, ["Via Laietana", "Carrer de la Tapineria"], ["Carrer de Fontanella", "Carrer Comtal"], [], 5.0, "Laietana")

	# --- El Born, Arc de Triomf ve Ciutadella
	B.grid([45.0, 88.0], [-95.0, -55.0, -15.0, 25.0, 65.0, 90.0], stG, ["Passeig del Born", "Carrer de Montcada"], ["Carrer de la Princesa", "Carrer dels Sombrerers", "Carrer de la Fusina", "Carrer del Rec", "Carrer del Comerç", "Carrer de la Ribera"], [], 5.0, "Born")
	B.grid([45.0, 88.0, 130.0, 148.0], [-150.0, -95.0], stE, ["Carrer de Trafalgar", "Carrer d'Ausiàs Marc", "Carrer d'Alí Bei"], ["Ronda de Sant Pere", "Carrer de Sant Pere"], [], 5.0, "SantPere")
	B.grid([202.0, 258.0], [-150.0, -95.0], stE, ["Carrer de Nàpols", "Carrer de Roger de Flor"], ["Carrer d'Almogàvers", "Carrer de Pujades"], [], 5.0, "Fort Pienc")
	g.ground(150, 200, -150, -92, 0.015, "slab", 5.0)
	B.squares.append([150, 200, -150, -92])
	B.road("Passeig de Lluís Companys", 150, 200, -150, -92)
	arc_triomf(B, 175.0, -125.0)
	for k in 5:
		palm(B, 155.0, -145.0 + k * 12.0)
		palm(B, 195.0, -145.0 + k * 12.0)
	B.flush_chunk("Companys")
	garden(B, 90, 258, -90, 85, "Parc de la Ciutadella", [[193.0, 237.0, -57.0, -27.0], [106.0, 164.0, 26.0, 74.0]])
	B.fountain_round(174, -2, 4.0)
	cascada(B, 215.0, -45.0)
	# göl ve kayıklar
	g.ground(110, 160, 30, 70, 0.04, "plain", 1.0, B.C("#5fa8c8"))
	B.add_col(110, 160, 30, 70, 1.0, false)
	for k in 3:
		g.box(1.4, 0.5, 3.2, 120 + k * 14.0, 0.05, 45 + k * 6.0, B.pick(["#c8423a", "#3b6aa8", "#f2c230"]), 0.3 * k)
	B.flush_chunk("Ciutadella")

	# --- Barceloneta ve plaj
	B.grid([60.0, 100.0, 140.0, 180.0, 220.0, 258.0], [95.0, 130.0, 165.0, 188.0], stB, ["Carrer de la Maquinista", "Carrer del Baluard", "Carrer de Sant Carles", "Carrer de l'Atlàntida", "Carrer d'Andrea Dòria", "Carrer de Pepe Rubianes"],
		["Carrer de la Sal", "Carrer del Mar", "Carrer de Sant Miquel", "Passeig de Joan de Borbó"], [], 4.0, "Barceloneta")
	for lx: float in [80.0, 160.0, 240.0]:
		B.laundry(lx, 133.0, 162.0, 6.4)
	B.area("Platja de la Barceloneta", 60, 258, 190, 222)
	var ux := 72.0
	ki = 0
	while ux < 250.0:
		if ki % 3 != 1:
			var uz := 200.0 + float(ki % 2) * 9.0
			g.put("cyl8", Vector3(ux, 1.2, uz), B.C("#e8e4dc"), 0, Vector3(0.05, 2.4, 0.05))
			g.put("cone", Vector3(ux, 2.4, uz), B.pick(["#e8505b", "#2f6fb0", "#f2c230", "#2f7d6d", "#f08b3a"]), B.rng.randf(), Vector3(1.6, 0.6, 1.6))
			g.box(1.0, 0.04, 1.9, ux + 1.4, 0.02, uz + 0.4, B.pick(["#e8505b", "#2f6fb0", "#f2c230", "#ffffff"]), 0.2)
			B.add_col(ux - 0.15, ux + 0.15, uz - 0.15, uz + 0.15, 2.4, false, 2)
		ux += 11.0
		ki += 1
	# chiringuito ve cankurtaran kulesi
	g.box(8, 3.0, 5, 120, 0, 214, B.C("#a7834f"))
	g.put("pyr", Vector3(120, 3.0, 214), B.C("#d8c27a"), 0, Vector3(10, 1.6, 7), "roof")
	B.add_col(116, 124, 211.5, 216.5, 3.0)
	B.label("Chiringuito", Vector3(120, 5.2, 211), 40, B.C("#fffaf1"), B.C("#a7834f"), 8, true)
	for px: float in [-1.0, 1.0]:
		for pz: float in [-1.0, 1.0]:
			g.box(0.15, 3.0, 0.15, 205 + px * 0.9, 0, 205 + pz * 0.9, B.C("#e8e4dc"))
	g.box(2.2, 1.2, 2.2, 205, 3.0, 205, B.C("#e8505b"))
	g.put("pyr", Vector3(205, 4.2, 205), B.C("#f2efe6"), 0, Vector3(2.6, 0.8, 2.6))
	B.add_col(203.8, 206.2, 203.8, 206.2, 4.0, false, 2)
	# Peix (Balık) heykeli kıyıda
	g.put("ball", Vector3(70, 7.0, 214), B.C("#c9a24a"), 0.4, Vector3(9.0, 3.0, 3.2), "gold")
	g.put("pyr", Vector3(61, 7.0, 214), B.C("#c9a24a"), 0.4, Vector3(3.0, 3.0, 3.0), "gold", 0.0, PI / 2.0)
	for e: float in [-1.0, 1.0]:
		g.box(0.4, 6.0, 0.4, 70 + e * 4.0, 0, 214, B.C("#8a7a5a"))
	B.add_col(65.5, 74.5, 213.5, 214.5, 3.0, false, 2)
	B.flush_chunk("Platja")
	# --- Kolomb Anıtı, Moll de la Fusta, Drassanes
	g.ground(-100, -25, 188, 222, 0.02, "slab", 6.0)
	B.squares.append([-100, -25, 188, 222])
	B.road("Plaça del Portal de la Pau", -100, -25, 188, 222)
	colom(B, -62.0, 205.0)
	for k in 5:
		palm(B, -18.0 + k * 16.0, 196.0)
		palm(B, -10.0 + k * 16.0, 214.0)
	B.road("Moll de la Fusta", -25, 60, 188, 222)
	g.wall_box(108, 11, 24, -165, 0, 206, B.stone(B.C("#c9b48f")), 0, "win_a", 6.0, 5.5, true)
	g.box(110, 1.2, 25, -165, 11, 206, B.C("#b5643c"))
	B.add_col(-219, -111, 194, 218)
	B.label("Drassanes", Vector3(-165, 14, 193.5), 60, B.C("#fffaf1"), B.C("#23302b"), 10, true)
	B.flush_chunk("Colom")

	# --- Eixample: ızgara, Passeig de Gràcia
	var zsE := [-515.0, -470.0, -425.0, -380.0, -335.0, -290.0, -245.0, -200.0, -150.0]
	var xsW := [-237.0, -192.0, -147.0, -102.0, -57.0]
	var xsE := [-23.0, 20.0, 65.0, 110.0, 155.0, 200.0, 258.0]
	B.grid(xsW, zsE, stE, NAMES_V, NAMES_H, [[-236.0, -103.0, -514.0, -426.0], [-99.0, -60.0, -377.0, -338.0]], 5.0, "EixampleBati")
	B.grid(xsE, zsE, stE, NAMES_V.slice(4), NAMES_H, [[-20.0, 17.0, -287.0, -248.0], [113.0, 197.0, -422.0, -338.0]], 5.0, "EixampleDogu")
	chamfers(B, xsW, zsE.slice(1, 8))
	chamfers(B, xsE, zsE.slice(1, 8))
	B.flush_chunk("Xamfra")
	g.ground(-55, -25, -515, -150, 0.016, "plain", 1.0, B.C("#d6cfc0"))
	B.road("Passeig de Gràcia", -55, -25, -515, -150)
	var pz := -505.0
	ki = 0
	while pz < -155.0:
		B.tree(-52.0, pz, "plane", 1.0)
		B.tree(-28.0, pz, "plane", 1.0)
		if ki % 2 == 0:
			B.lamp(-48.5, pz + 4.0)
			B.lamp(-31.5, pz + 4.0)
		pz += 11.0
		ki += 1
	for k in 4:
		B.bench(-40.0, -480.0 + k * 90.0, PI / 2.0)
	B.flush_chunk("PasseigGracia")
	casa_batllo(B, -20.5, -267.5)
	B.block(-3.0, 17.5, -287.5, -247.5, stE)
	B.block(-20.5, -3.5, -287.5, -280.0, stE)
	B.block(-20.5, -3.5, -255.0, -247.5, stE)
	casa_mila(B, -82.0, -59.5, -377.5, -337.5)
	B.block(-99.5, -84.0, -377.5, -337.5, stE)
	B.flush_chunk("Moderniste")
	# --- Sagrada Família
	g.ground(110, 200, -425, -335, 0.02, "slab", 6.0)
	B.squares.append([110, 200, -425, -335])
	B.area("Sagrada Família", 110, 200, -425, -335)
	sagrada(B, 155.0, -400.0)
	B.fountain_round(130, -352, 4.0)
	for k in 5:
		B.tree(115.0 + k * 18.0, -340.0, "plane", 0.9)
	for k in 4:
		B.bench(170.0 + k * 6.0, -352.0, PI)
	# --- Park Güell
	park_guell(B, -237.0, -102.0, -515.0, -425.0)

	# --- tekneler (golondrinas)
	B.boat("GolondrinaBati", -150, 262, PI / 2.0, "ferry")
	B.boat("GolondrinaDogu", 120, 270, PI / 2.0, "boat")
	B.big_label("Mar Mediterrània", Vector3(80, 8, 280), 90)
	return {
		"lands": [[-240, 260, -515, 235]],
		"mini_extra": [[-66, -58, 235, 292, "#9b7b55"], [-69, -55, 291, 301, "#9b7b55"], [60, 258, 190, 222, "#ead7a6"]],
		"water": [[-260, 280, 235, 330]],
		"walk_over": walk, "fishing": walk,
		"carts": [["Churros", "#c8823a"], ["Helados", "#3b6aa8"], ["Orxata", "#e2a33b"], ["Tapas", "#c8423a"]],
		"fishers": [[-62.0, 240.0, 288.0, 8.0, true]],
		"bounds": Rect2(-240, -515, 500, 825),
		"start": [-62.0, -88.0, 3.14],
		"fountains": [[-80, -122], [-45, -122], [-30, 97], [130, -352], [-170, -470], [215, -36], [174, -2]],
		"landmarks": [["La Rambla", -62, 40], ["Plaça de Catalunya", -64, -122], ["Katedral", 0, -10], ["Plaça Reial", -30, 97], ["Boqueria", -95, 45],
			["Kolomb Anıtı", -62, 205], ["Barceloneta", 160, 205], ["Ciutadella", 175, 0], ["Zafer Takı", 175, -125], ["Casa Batlló", -12, -267],
			["Casa Milà", -71, -357], ["Sagrada Família", 155, -400], ["Park Güell", -170, -470], ["Passeig de Gràcia", -40, -330]],
		"movers": [{"node": "GolondrinaBati", "path": [[-200, 262], [-90, 262]], "speed": 2.5, "float": true}, {"node": "GolondrinaDogu", "path": [[20, 270], [240, 270]], "speed": 2.0, "float": true}],
		"cat_names": CATS, "dog_names": DOGS,
		"fixed_animals": [[true, -60.0, -108.0, 0.0, "Plaça de Catalunya"], [false, -62.0, -40.0, 0.0, "La Rambla"], [true, -58.0, 55.0, 0.0, "Çiçekçi kulübesi"],
			[false, -70.0, 38.0, 0.0, "Boqueria önü"], [true, -25.0, 90.0, 0.0, "Plaça Reial"], [false, 0.0, -45.0, 0.0, "Katedral meydanı"],
			[true, -45.0, 200.0, 0.0, "Kolomb Anıtı"], [false, 150.0, 205.0, 0.0, "Barceloneta plajı"], [true, 112.0, 208.0, 0.0, "Chiringuito"],
			[false, 180.0, 0.0, 0.0, "Ciutadella Parkı"], [true, 200.0, -15.0, 0.0, "Cascada"], [false, 175.0, -105.0, 0.0, "Zafer Takı"],
			[true, 155.0, -360.0, 0.0, "Sagrada Família"], [false, -40.0, -310.0, 0.0, "Passeig de Gràcia"], [true, -33.0, -268.0, 0.0, "Casa Batlló önü"],
			[false, -170.0, -440.0, 0.0, "Park Güell"], [true, -145.0, -495.0, 0.0, "Mozaik bank"], [true, 20.0, 205.0, 0.0, "Moll de la Fusta"]],
	}

static func boqueria(B, x0: float, x1: float, z0: float, z1: float) -> void:
	var g = B.g
	var cz := (z0 + z1) / 2.0
	g.wall_box(x1 - x0, 7.0, z1 - z0, (x0 + x1) / 2.0, 0, cz, B.C("#d9cdb3"), 0, "shop", 4.0, 3.5, true)
	g.put("hip", Vector3((x0 + x1) / 2.0, 7.0, cz), B.C("#4a5a52"), 0, Vector3(x1 - x0 + 0.6, 2.4, z1 - z0 + 0.6), "roof")
	# vitray kemer ve tabela (Rambla'ya bakar)
	g.box(0.6, 9.5, 14, x1 + 0.3, 0, cz, B.C("#4a5a52"))
	for k in 7:
		g.box(0.7, 2.2, 1.7, x1 + 0.35, 6.4, cz - 5.1 + k * 1.7, B.pick(["#e8505b", "#f2c230", "#2f7d6d", "#2f6fb0", "#f08b3a"]))
	g.box(0.7, 4.8, 6.0, x1 + 0.35, 0, cz, B.C("#2b2b2b"))
	B.label("Mercat de la Boqueria", Vector3(x1 + 0.9, 9.0, cz), 52, B.C("#fffaf1"), B.C("#4a5a52"), 8, true)
	# meyve tezgahları
	for e: float in [-1.0, 1.0]:
		g.box(1.2, 0.9, 3.2, x1 + 1.4, 0, cz + e * 5.0, B.C("#7b5a3c"))
		for f in 8:
			g.put("ball", Vector3(x1 + 1.1 + (f % 2) * 0.55, 1.05, cz + e * 5.0 - 1.3 + int(f / 2) * 0.85), B.pick(["#e8505b", "#f2c230", "#5fa83a", "#f08b3a", "#8a3a6a"]), 0, Vector3(0.24, 0.22, 0.24))
		B.add_col(x1 + 0.8, x1 + 2.0, cz + e * 5.0 - 1.6, cz + e * 5.0 + 1.6, 1.2, false, 2)
	B.add_col(x0, x1 + 0.6, z0, z1)
	B.flush_chunk("Boqueria")

static func catedral(B, cx: float, cz: float) -> void:
	var g = B.g
	var S: Color = B.stone(B.C("#b9a684"))
	var D: Color = B.stone(B.C("#a8956f"))
	# gövde: cephe kuzeye (Pla de la Seu) bakar
	g.wall_box(24, 20, 32, cx, 0, cz, S, 0, "win_a", 4.0, 6.0, true)
	g.box(22, 4.0, 30, cx, 20, cz, D)
	# ana kule ve cephe kuleleri
	g.box(9, 10, 9, cx, 24, cz - 10, S)
	g.put("cone8", Vector3(cx, 41, cz - 10), D, PI / 8.0, Vector3(5.2, 14, 5.2))
	g.put("cyl8", Vector3(cx, 49, cz - 10), B.C("#d4a93c"), 0, Vector3(0.12, 2.4, 0.12), "gold")
	for e: float in [-1.0, 1.0]:
		g.put("cyl8", Vector3(cx + e * 10.5, 15, cz - 15.6), S, PI / 8.0, Vector3(2.0, 30, 2.0), "stonewall")
		g.put("cone8", Vector3(cx + e * 10.5, 35, cz - 15.6), D, PI / 8.0, Vector3(2.2, 10, 2.2))
	# sivri uçlar
	for k in 7:
		for e2: float in [-1.0, 1.0]:
			g.put("cone8", Vector3(cx + e2 * 11.5, 25.5, cz - 13 + k * 4.4), D, 0, Vector3(0.5, 3.0, 0.5))
	# gül pencere ve gotik kapı
	g.put("cyl", Vector3(cx, 13.5, cz - 16.05), B.C("#3b4a6a"), 0, Vector3(3.0, 0.1, 3.0), "plain", PI / 2.0)
	g.put("cyl", Vector3(cx, 13.5, cz - 16.1), B.C("#c8423a"), 0, Vector3(1.4, 0.1, 1.4), "plain", PI / 2.0)
	g.box(5.0, 8.0, 0.4, cx, 0, cz - 16.1, B.C("#3a3430"))
	g.put("pyr", Vector3(cx, 8.0, cz - 16.1), D, 0, Vector3(6.4, 4.0, 0.6))
	g.box(26, 0.6, 4.0, cx, 0, cz - 17.5, D)
	B.add_col(cx - 12, cx + 12, cz - 16, cz + 16)
	B.label("Catedral de Barcelona", Vector3(cx, 54, cz - 10), 80, B.C("#23302b"), B.C("#fffaf1"), 22, true)
	B.flush_chunk("Catedral")

static func plaza_reial(B, x0: float, x1: float, z0: float, z1: float) -> void:
	var g = B.g
	var cx := (x0 + x1) / 2.0; var cz := (z0 + z1) / 2.0
	g.ground(x0, x1, z0, z1, 0.02, "slab", 4.0)
	B.squares.append([x0, x1, z0, z1])
	B.area("Plaça Reial", x0, x1, z0, z1)
	B.road("Plaça Reial", x0, x1, z0, z1)
	B.fountain_round(cx, cz, 3.0)
	for e: float in [-1.0, 1.0]:
		for f: float in [-1.0, 1.0]:
			palm(B, cx + e * 8.0, cz + f * 9.0, 1.1)
	# Gaudí'nin fenerleri
	for e3: float in [-1.0, 1.0]:
		var lx := cx + e3 * 5.0
		g.put("cyl8", Vector3(lx, 2.0, cz), B.C("#3d3d3d"), 0, Vector3(0.12, 4.0, 0.12))
		for k in 6:
			var a := k * TAU / 6.0
			g.box(0.3, 0.4, 0.3, lx + cos(a) * 0.8, 3.6, cz + sin(a) * 0.8, B.C("#fff1c8"), 0.0, "glow")
		g.put("cone8", Vector3(lx, 4.6, cz), B.C("#c8423a"), 0, Vector3(0.6, 1.0, 0.6))
		B.add_col(lx - 0.2, lx + 0.2, cz - 0.2, cz + 0.2, 3.0, false, 2)
	B.cafe_row(x0 + 2.0, z0 + 3.0, 4, 3.0, 0.0)
	B.cafe_row(x1 - 11.0, z1 - 3.0, 4, 3.0, 0.0)
	B.flush_chunk("PlacaReial")

static func colom(B, cx: float, cz: float) -> void:
	var g = B.g
	var S: Color = B.stone(B.C("#cbb796"))
	g.put("cyl", Vector3(cx, 0.4, cz), B.C("#bfb39c"), 0, Vector3(9.0, 0.8, 9.0))
	g.put("cyl8", Vector3(cx, 4.0, cz), S, PI / 8.0, Vector3(4.2, 6.4, 4.2), "stonewall")
	for k in 8:
		var a := k * TAU / 8.0 + PI / 8.0
		g.put("ball", Vector3(cx + cos(a) * 6.5, 1.5, cz + sin(a) * 6.5), B.C("#4a4038"), a, Vector3(0.8, 0.7, 1.5))
	g.put("cyl", Vector3(cx, 22, cz), B.C("#6f6a5f"), 0, Vector3(1.4, 30, 1.4))
	for k in 6:
		g.put("cyl", Vector3(cx, 8 + k * 5.0, cz), B.C("#c9a24a"), 0, Vector3(1.5, 0.4, 1.5), "gold")
	g.put("cyl", Vector3(cx, 37.5, cz), B.C("#c9a24a"), 0, Vector3(2.2, 1.0, 2.2), "gold")
	g.put("ball", Vector3(cx, 39.0, cz), B.C("#c9a24a"), 0, Vector3(1.8, 1.0, 1.8), "gold")
	# heykel ve denizi gösteren kol
	g.put("cyl8", Vector3(cx, 41.0, cz), B.C("#3f4a44"), 0, Vector3(0.6, 3.0, 0.6))
	g.put("ball", Vector3(cx, 43.0, cz), B.C("#3f4a44"), 0, Vector3(0.45, 0.5, 0.45))
	g.box(0.3, 0.3, 2.2, cx, 42.0, cz + 1.0, B.C("#3f4a44"))
	B.add_col(cx - 9, cx + 9, cz - 9, cz + 9, 1.0, false)
	B.label("Mirador de Colom", Vector3(cx, 47, cz), 70, B.C("#23302b"), B.C("#fffaf1"), 20, true)
	B.flush_chunk("ColomAnit")

static func arc_triomf(B, cx: float, cz: float) -> void:
	var g = B.g
	var R: Color = B.C("#b8583a")
	for e: float in [-1.0, 1.0]:
		g.box(4.5, 22, 6, cx + e * 7.5, 0, cz, R)
		B.add_col(cx + e * 7.5 - 2.25, cx + e * 7.5 + 2.25, cz - 3, cz + 3)
		g.put("cyl8", Vector3(cx + e * 7.5, 24.5, cz), R.lightened(0.1), PI / 8.0, Vector3(1.6, 5.0, 1.6))
		g.put("ball", Vector3(cx + e * 7.5, 27.5, cz), B.C("#c9a24a"), 0, Vector3(1.0, 1.0, 1.0), "gold")
	g.box(19.5, 6, 6, cx, 16, cz, R)
	g.put("cyl", Vector3(cx, 16, cz), R.darkened(0.1), 0, Vector3(5.3, 6.1, 5.3), "plain", PI / 2.0)
	g.box(19.5, 1.0, 6.4, cx, 22, cz, B.C("#d9cdb3"))
	g.box(14, 2.4, 0.3, cx, 18.5, cz - 3.1, B.C("#d9cdb3"))
	B.label("Arc de Triomf", Vector3(cx, 32, cz), 60, B.C("#23302b"), B.C("#fffaf1"), 18, true)

static func cascada(B, cx: float, cz: float) -> void:
	var g = B.g
	var S: Color = B.stone(B.C("#d9cdb3"))
	g.box(36, 12, 8, cx, 0, cz - 4, S)
	for k in 6:
		g.put("cyl8", Vector3(cx - 15 + k * 6.0, 9, cz), S, 0, Vector3(0.8, 18, 0.8))
	g.box(36, 2.0, 9, cx, 18, cz - 3.5, S)
	g.box(16, 4, 7, cx, 20, cz - 4, S)
	g.box(8, 2.4, 3.0, cx, 24, cz - 4, B.C("#c9a24a"))
	for k in 4:
		g.put("ball", Vector3(cx - 3.0 + k * 2.0, 27.2, cz - 4), B.C("#c9a24a"), 0, Vector3(0.6, 0.9, 1.3), "gold")
	# şelale ve havuz
	g.box(10, 9, 0.6, cx, 2.0, cz + 0.4, B.C("#9fd6ef"))
	g.box(30, 0.8, 14, cx, 0, cz + 7, B.C("#cbbf9f"))
	g.box(29, 0.05, 13, cx, 0.75, cz + 7, B.C("#5fc4e8"))
	B.add_col(cx - 18, cx + 18, cz - 8, cz + 14, 1.0)
	B.label("Cascada", Vector3(cx, 31, cz - 4), 60, B.C("#23302b"), B.C("#fffaf1"), 18, true)

static func casa_batllo(B, x0: float, cz: float) -> void:
	var g = B.g
	var w := 17.0
	var x1 := x0 + w
	var col: Color = B.C("#bcd3cc")
	g.wall_box(w, 21, 17, (x0 + x1) / 2.0, 0, cz, col, 0, "win_b", 3.4, 4.2, true)
	# mozaik pullar
	for k in 90:
		var my: float = B.rng.randf_range(4.0, 20.0)
		var mz: float = B.rng.randf_range(cz - 8.2, cz + 8.2)
		g.box(0.06, 0.35, 0.35, x0 - 0.03, my, mz, B.pick(["#4f8fc0", "#7cc0b0", "#e8a0b0", "#f2c230", "#3f6fa0", "#a8d0e0"]), B.rng.randf())
	# kemik sütunlar ve maske balkonlar
	for k in 4:
		g.put("cyl8", Vector3(x0 - 0.4, 2.2, cz - 6 + k * 4.0), B.C("#efe6d4"), 0, Vector3(0.35, 4.4, 0.35))
	for f in 4:
		for k in 3:
			g.put("dome", Vector3(x0 - 0.3, 7.0 + f * 3.4, cz - 5 + k * 5.0), B.C("#e9e2d2"), 0, Vector3(0.9, -0.7, 0.6))
	g.box(0.4, 3.6, 16.0, x0 - 0.2, 0, cz, B.C("#cbb796"))
	# ejderha sırtı çatı
	for k in 12:
		g.put("ico", Vector3(x0 + 2.0, 21.6, cz - 7.5 + k * 1.36), B.C("#3f8f6a").lerp(B.C("#e8a0b0"), float(k) / 11.0), 0, Vector3(1.2, 1.4, 0.9))
	g.put("cyl8", Vector3(x0 + 2.0, 23.5, cz - 6.8), B.C("#efe6d4"), 0, Vector3(0.4, 4.0, 0.4))
	g.put("ball", Vector3(x0 + 2.0, 25.8, cz - 6.8), B.C("#d4a93c"), 0, Vector3(0.6, 0.6, 0.6), "gold")
	B.add_col(x0 - 0.6, x1, cz - 8.5, cz + 8.5)
	B.label("Casa Batlló", Vector3(x0 - 1.0, 27, cz), 56, B.C("#23302b"), B.C("#fffaf1"), 16, true)

static func casa_mila(B, x0: float, x1: float, z0: float, z1: float) -> void:
	var g = B.g
	var cx := (x0 + x1) / 2.0; var cz := (z0 + z1) / 2.0
	var rx := (x1 - x0) / 2.0; var rz := (z1 - z0) / 2.0
	var S: Color = B.C("#e9dfcc")
	for f in 6:
		var y := f * 3.4
		g.put("cyl", Vector3(cx, y + 1.5, cz), B.C("#3e3a36"), 0, Vector3(rx - 0.4, 3.0, rz - 0.4))
		var wob := sin(f * 1.7) * 0.5
		g.put("cyl", Vector3(cx + wob, y + 3.0, cz), S, 0.3 * f, Vector3(rx + 0.3, 0.9, rz + 0.3))
	g.put("dome", Vector3(cx, 20.4, cz), S, 0, Vector3(rx, 2.2, rz))
	# çatıdaki savaşçı bacalar
	for k in 6:
		var a := k * TAU / 6.0
		var px := cx + cos(a) * rx * 0.5; var pz := cz + sin(a) * rz * 0.5
		g.put("cyl8", Vector3(px, 23.5, pz), B.C("#f2ede2"), 0, Vector3(0.6, 3.0, 0.6))
		g.put("ico", Vector3(px, 25.4, pz), B.C("#e2dccd"), a, Vector3(0.8, 0.9, 0.8))
	B.add_col(x0, x1, z0, z1)
	B.label("Casa Milà", Vector3(cx, 29, cz), 60, B.C("#23302b"), B.C("#fffaf1"), 18, true)

static func sagrada(B, cx: float, cz: float) -> void:
	var g = B.g
	var S: Color = B.stone(B.C("#c9b48f"))
	var D: Color = B.stone(B.C("#b5a07c"))
	g.wall_box(48, 22, 26, cx, 0, cz, S, 0, "win_a", 4.0, 7.0, true)
	g.box(46, 3, 24, cx, 22, cz, D)
	# Doğuş cephesi: 4 çan kulesi (+z, meydana bakar)
	for i in 4:
		var tx := cx - 15.0 + i * 10.0
		var th := 46.0 if i == 1 or i == 2 else 40.0
		g.put("cyl8", Vector3(tx, th / 2.0, cz + 11.5), S, 0, Vector3(2.4, th, 2.4), "stonewall")
		for k in 5:
			g.box(0.5, 1.0, 0.2, tx, 8 + k * 6.5, cz + 13.9, B.C("#4a4038"))
		g.put("cone8", Vector3(tx, th + 6, cz + 11.5), D, 0, Vector3(2.4, 12, 2.4))
		g.put("ball", Vector3(tx, th + 12.6, cz + 11.5), B.pick(["#e8505b", "#f2c230", "#5fa83a"]), 0, Vector3(1.0, 1.0, 1.0))
	# cephe kapısı ve ağaç oyması tepe
	g.box(14, 14, 1.0, cx, 0, cz + 13.4, D)
	g.box(4.0, 8.0, 0.6, cx, 0, cz + 13.95, B.C("#3a3430"))
	g.put("cone8", Vector3(cx, 19.5, cz + 13.4), B.C("#5f8f45"), 0, Vector3(3.2, 7, 1.2))
	# orta kuleler (İsa ve Meryem) ve havari kuleleri
	g.put("cyl8", Vector3(cx, 32, cz - 2), S, 0, Vector3(4.5, 64, 4.5), "stonewall")
	g.put("cone8", Vector3(cx, 72, cz - 2), D, 0, Vector3(4.5, 16, 4.5))
	g.put("cyl8", Vector3(cx, 82, cz - 2), B.C("#f2efe6"), 0, Vector3(0.4, 4.0, 0.4))
	g.box(3.0, 0.5, 0.5, cx, 82, cz - 2, B.C("#f2efe6"))
	for e: float in [-1.0, 1.0]:
		g.put("cyl8", Vector3(cx + e * 9.0, 27, cz - 6), S, 0, Vector3(3.0, 54, 3.0), "stonewall")
		g.put("cone8", Vector3(cx + e * 9.0, 60, cz - 6), D, 0, Vector3(3.0, 12, 3.0))
		g.put("ball", Vector3(cx + e * 9.0, 66.5, cz - 6), B.C("#f2c230"), 0, Vector3(1.1, 1.1, 1.1))
		g.put("cyl8", Vector3(cx + e * 21.0, 20, cz - 8), S, 0, Vector3(2.2, 40, 2.2), "stonewall")
		g.put("cone8", Vector3(cx + e * 21.0, 45, cz - 8), D, 0, Vector3(2.2, 10, 2.2))
	# inşaat vinci: hâlâ yapılıyor
	g.box(1.6, 74, 1.6, cx + 30.0, 0, cz - 10.0, B.C("#f2c230"))
	g.box(36, 1.2, 1.2, cx + 22.0, 74, cz - 10.0, B.C("#f2c230"))
	g.box(3.0, 2.0, 2.0, cx + 34.0, 72, cz - 10.0, B.C("#3d3d3d"))
	g.box(0.06, 18, 0.06, cx + 10.0, 56, cz - 10.0, B.C("#2b2b2b"))
	B.add_col(cx - 24, cx + 24, cz - 13, cz + 14)
	B.add_col(cx + 29, cx + 31, cz - 11, cz - 9, 14.0, false)
	B.label("Sagrada Família", Vector3(cx, 92, cz), 110, B.C("#23302b"), B.C("#fffaf1"), 28, true)
	B.flush_chunk("Sagrada")

static func park_guell(B, x0: float, x1: float, z0: float, z1: float) -> void:
	var g = B.g
	g.ground(x0, x1, z0, z1, 0.03, "grass", 5.0)
	B.parks.append([x0, x1, z0, z1])
	B.area("Park Güell", x0, x1, z0, z1)
	B.road("Park Güell", x0 + 30, x1 - 30, z0 + 20, z1 - 10)
	var cx := (x0 + x1) / 2.0
	# Hipostil salon ve üstünde dalgalı mozaik bank
	var tz := z0 + 40.0
	g.ground(cx - 36, cx + 36, tz - 16, tz + 16, 0.05, "plain", 1.0, B.C("#e6dcc4"))
	for k in 60:
		var t := float(k) / 59.0
		var bx := cx - 34.0 + t * 68.0
		var bz := tz - 14.0 + sin(t * TAU * 3.0) * 1.6
		g.box(1.25, 0.9, 0.9, bx, 0, bz, B.pick(["#f2f2ee", "#4f8fc0", "#f2c230", "#e8505b", "#5fa83a", "#7cc0b0", "#f08b3a"]), cos(t * TAU * 3.0) * 0.5)
		if k % 3 == 0:
			B.add_col(bx - 0.7, bx + 0.7, bz - 0.6, bz + 0.6, 1.0, false, 2)
	# zencefilli kurabiye evleri (giriş)
	for e: float in [-1.0, 1.0]:
		var hx := cx + e * 20.0
		var hz := z1 - 14.0
		g.box(7, 6, 7, hx, 0, hz, B.C("#c89a6a"))
		g.put("dome", Vector3(hx, 6, hz), B.C("#f2efe6"), 0, Vector3(4.2, 3.0, 4.2))
		for k in 10:
			var a := k * TAU / 10.0
			g.put("ico", Vector3(hx + cos(a) * 2.8, 7.2, hz + sin(a) * 2.8), B.pick(["#e8505b", "#4f8fc0", "#f2c230", "#5fa83a"]), a, Vector3(0.5, 0.5, 0.5))
		g.put("cyl8", Vector3(hx, 10.5, hz), B.C("#f2efe6"), 0, Vector3(0.5, 2.6, 0.5))
		g.put("ball", Vector3(hx, 12.0, hz), B.C("#4f8fc0"), 0, Vector3(0.7, 0.7, 0.7))
		B.add_col(hx - 3.5, hx + 3.5, hz - 3.5, hz + 3.5, 8.0)
	# ejder merdiveni ve mozaik semender
	var sz := z1 - 30.0
	g.ground(cx - 6, cx + 6, sz - 6, sz + 8, 0.06, "slab", 3.0)
	g.put("ball", Vector3(cx, 0.9, sz), B.C("#5fa83a"), 0.2, Vector3(1.2, 0.8, 2.6))
	g.put("ball", Vector3(cx, 1.2, sz + 2.4), B.C("#f2c230"), 0, Vector3(0.8, 0.7, 0.9))
	g.put("cone8", Vector3(cx, 0.8, sz - 3.2), B.C("#4f8fc0"), 0, Vector3(0.6, 2.0, 0.6), "plain", -PI / 2.0)
	for k in 14:
		g.box(0.25, 0.25, 0.25, cx + B.rng.randf_range(-0.9, 0.9), 1.6, sz + B.rng.randf_range(-2.0, 2.0), B.pick(["#e8505b", "#4f8fc0", "#f2c230", "#f08b3a"]), B.rng.randf())
	B.add_col(cx - 1.4, cx + 1.4, sz - 3.6, sz + 3.2, 2.0, false)
	B.label("El Drac", Vector3(cx, 4.0, sz), 34, B.C("#fffaf1"), B.C("#2f7d6d"), 8, true)
	B.fountain_round(cx, z1 - 45.0, 3.5)
	# akdeniz çamları ve palmiyeler
	for k in 26:
		var px: float = B.rng.randf_range(x0 + 6, x1 - 6)
		var pz: float = B.rng.randf_range(z0 + 6, z1 - 6)
		if absf(pz - tz) < 18.0 and absf(px - cx) < 38.0:
			continue
		if absf(px - cx) < 26.0 and pz > z1 - 50.0:
			continue
		if k % 3 == 0:
			palm(B, px, pz)
		else:
			B.tree(px, pz, "cypress" if k % 3 == 1 else "plane", B.rng.randf_range(0.9, 1.2))
	for k in 4:
		B.bench(cx - 30.0 + k * 20.0, z1 - 60.0, 0.0)
	B.label("Park Güell", Vector3(cx, 14, z1 - 8.0), 70, B.C("#23302b"), B.C("#fffaf1"), 18, true)
	B.flush_chunk("ParkGuell")

## Park: çim, çapraz yollar, ağaçlar ve banklar; avoid dikdörtgenlerine ağaç dikmez
static func garden(B, x0: float, x1: float, z0: float, z1: float, name: String, avoid: Array) -> void:
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
			var ok: bool = absf(x - cx) > 7.0 and absf(z - cz) > 7.0 and B.rng.randf() < 0.75
			for r in avoid:
				if x > r[0] - 3 and x < r[1] + 3 and z > r[2] - 3 and z < r[3] + 3:
					ok = false
			if ok:
				if B.rng.randf() < 0.3:
					palm(B, x + B.rng.randf_range(-1.5, 1.5), z + B.rng.randf_range(-1.5, 1.5))
				else:
					B.tree(x + B.rng.randf_range(-1.5, 1.5), z + B.rng.randf_range(-1.5, 1.5), "plane", B.rng.randf_range(0.85, 1.15))
			z += 12.0
		x += 12.0
	for k in 4:
		B.bench(cx + 4.2, z0 + 8.0 + k * (z1 - z0 - 16.0) / 3.0, -PI / 2.0)
		B.bench(cx - 4.2, z0 + 8.0 + k * (z1 - z0 - 16.0) / 3.0, PI / 2.0)
