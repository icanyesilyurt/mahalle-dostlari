extends RefCounted
## Londra: Thames (doğu-batı), Parlamento ve Big Ben, Westminster Köprüsü, London Eye, Westminster Abbey,
## Parliament Square, Whitehall, Trafalgar Meydanı, Buckingham Sarayı, St James's ve Hyde Park,
## Piccadilly Circus, Oxford Street, St Paul's, Tower of London, Tower Bridge, South Bank. x -240..260, z -515..310.

const STUCCO := ["#f2ede2", "#ece4d4", "#f4efe6", "#e8e0cf"]
const BRICKS := ["#9a4b35", "#a5543a", "#8f4a38", "#b5725a", "#7e4636", "#a86a4f"]
const SLATE := ["#5d6a72", "#6a747a", "#545e66"]
const NAMES_V := ["Whitehall", "Regent Street", "Bond Street", "Baker Street", "Charing Cross Road", "Drury Lane", "Fleet Street", "Abbey Road", "Portobello Road", "Carnaby Street", "Savile Row", "Shaftesbury Avenue"]
const NAMES_H := ["Oxford Street", "Piccadilly", "The Strand", "Pall Mall", "King's Road", "Downing Street", "Bayswater Road", "Marylebone Road", "Southwark Street", "Borough High Street", "Cannon Street", "Long Acre"]
const CATS := ["Whiskers", "Biscuit", "Earl Grey", "Muffin", "Crumpet", "Pudding", "Ginger", "Toffee", "Bramble", "Smudge", "Oliver", "Poppy", "Marmalade", "Pickles", "Scone", "Mittens"]
const DOGS := ["Buddy", "Winston", "Charlie", "Rosie", "Barney", "Teddy", "Monty", "Alfie", "Bentley", "Rufus", "Daisy", "Archie", "Bertie", "Pip"]

static func build(B) -> Dictionary:
	var g = B.g
	var st := {"pal": STUCCO, "fmin": 3, "fmax": 5, "shop": 0.5, "wins": ["win_a", "win_b", "win_c"], "cumba": 0.0, "brick": 0.7, "roof": SLATE, "roof_h": 1.1,
		"balcony": 0.15, "ornate": true}
	g.ground(-240, 260, -515, -42, 0.0, "cobble", 4.0)
	g.ground(-240, 260, 25, 310, 0.0, "cobble", 4.0)
	g.ground(-240, 260, -50, -42, 0.012, "slab", 6.0)
	g.ground(-240, 260, 25, 34, 0.012, "slab", 6.0)
	g.flush(B.mroot.get_node("Zemin"), B.mroot, "ZeminLondra", false)
	B.road("Victoria Embankment", -240, 260, -50, -42)
	B.road("Queen's Walk", -240, 260, 25, 34)
	var bridges := [[-150.0, "Westminster Bridge", 12.0], [-30.0, "Waterloo Bridge", 10.0], [80.0, "London Bridge", 10.0]]
	var gaps := []
	var walk := []
	for b in bridges:
		gaps.append([b[0] - b[2] / 2.0, b[0] + b[2] / 2.0])
	gaps.append([194.0, 206.0])
	B.water_h(-260, 280, -42, 25, gaps)
	for b in bridges:
		var col: Color = B.C("#7f9a7a") if b[1] == "Westminster Bridge" else B.C("#cfc6b6")
		B.stone_bridge(b[1], b[0], -42, 25, b[2], col, 5, B.C("#5f7a5a") if b[1] == "Westminster Bridge" else B.C("#d8cfbd"))
		walk.append([b[0] - b[2] / 2.0, b[0] + b[2] / 2.0, -42, 25])
	tower_bridge(B, 200.0)
	walk.append([194, 206, -42, 25])
	for k in 30:
		B.lamp(-230 + k * 16.5, -48.4)
		B.lamp(-230 + k * 16.5, 32.6)
	for k in 12:
		B.tree(-225 + k * 40, 30.5, "plane", 0.9)
	B.flush_chunk("Thames")

	parliament(B, -235.0, -140.0, -98.0, -52.0)
	# Westminster Abbey
	abbey(B, -205.0, -170.0)
	# Parliament Square
	B.park(-170, -122, -150, -108, "Parliament Square", "plane", 12.0)
	# Whitehall ve Trafalgar
	g.ground(-122, -100, -330, -50, 0.012, "slab", 5.0)
	B.road("Whitehall", -122, -100, -330, -50)
	trafalgar(B, -150.0, -70.0, -345.0, -290.0)
	# Buckingham ve parklar
	B.park(-235, -122, -282, -158, "St James's Park", "plane", 11.0)
	g.box(50, 0.05, 10, -180, 0.06, -220, B.C("#6fb7d6"))
	B.add_col(-205, -155, -225, -215, 1.0, false)
	buckingham(B, -200.0, -310.0)
	B.park(-235, -60, -515, -385, "Hyde Park", "plane", 12.0)
	g.box(70, 0.05, 12, -150, 0.06, -450, B.C("#6fb7d6"))
	B.add_col(-185, -115, -456, -444, 1.0, false)
	B.label("The Serpentine", Vector3(-150, 4, -450), 60, B.C("#1f3a5a"), B.C("#fffaf1"), 12, true)
	B.flush_chunk("Parks")
	# Şehir ızgarası: West End ve The City
	var skips := [[-152, -68, -347, -288], [60, 100, -180, -100], [170, 245, -140, -55], [-75, -25, -325, -275]]
	B.grid([-100.0, -60.0, -20.0, 20.0, 60.0, 100.0, 140.0, 180.0, 220.0, 258.0], [-385.0, -345.0, -305.0, -265.0, -225.0, -185.0, -145.0, -100.0, -55.0], st, NAMES_V, NAMES_H, skips, 5.0, "WestEnd")
	B.grid([-60.0, -20.0, 20.0, 60.0, 100.0, 140.0, 180.0, 220.0, 258.0], [-510.0, -470.0, -430.0, -390.0], st, NAMES_V.slice(3), NAMES_H.slice(4), [], 5.0, "Marylebone")
	# Piccadilly Circus
	piccadilly(B, -50.0, -300.0)
	st_pauls(B, 80.0, -140.0)
	tower_of_london(B, 207.0, -97.0)
	# Güney yaka
	london_eye(B, -100.0, 40.0)
	var stS := st.duplicate()
	stS.brick = 0.85
	B.grid([-240.0, -195.0, -150.0], [60.0, 105.0, 150.0, 195.0, 240.0, 285.0, 308.0], stS, ["Lambeth Road", "Kennington Lane", "Vauxhall Walk"], NAMES_H.slice(8), [], 5.0, "Lambeth")
	B.grid([-60.0, -20.0, 20.0, 60.0, 100.0, 140.0, 180.0, 220.0, 258.0], [60.0, 105.0, 150.0, 195.0, 240.0, 285.0, 308.0], stS, NAMES_V.slice(6), NAMES_H.slice(8), [[20, 100, 36, 100]], 5.0, "Southwark")
	g.ground(-150, -60, 36, 100, 0.02, "slab", 6.0)
	B.squares.append([-150, -60, 36, 100])
	B.road("South Bank", -150, -60, 36, 100)
	tate_globe(B)
	B.grid([-150.0, -105.0, -60.0], [105.0, 150.0, 195.0, 240.0, 285.0, 308.0], stS, ["Belvedere Road", "Cornwall Road"], ["Stamford Street", "The Cut"], [], 5.0, "Waterloo")
	# kırmızı telefon kulübeleri ve posta kutuları
	var spots := [[-100.0, -225.0], [-20.0, -265.0], [60.0, -345.0], [140.0, -185.0], [-60.0, 105.0], [100.0, 150.0], [220.0, -225.0], [-100.0, -385.0], [20.0, -470.0], [180.0, 240.0]]
	for i in spots.size():
		var p: Array = spots[i]
		var px: float = p[0] + 3.3; var pz: float = p[1] + 3.3
		if i % 2 == 0:
			g.box(1.0, 2.6, 1.0, px, 0, pz, B.C("#c8282d"))
			g.put("hip", Vector3(px, 2.6, pz), B.C("#c8282d"), 0, Vector3(1.1, 0.3, 1.1))
			g.box(0.8, 1.6, 1.02, px, 0.6, pz, B.C("#2c3a46"))
			B.add_col(px - 0.5, px + 0.5, pz - 0.5, pz + 0.5, 3.0, false)
		else:
			g.put("cyl8", Vector3(px, 0.7, pz), B.C("#c8282d"), 0, Vector3(0.32, 1.4, 0.32))
			g.put("dome", Vector3(px, 1.4, pz), B.C("#c8282d"), 0, Vector3(0.34, 0.2, 0.34))
	B.flush_chunk("SokakEsyasi")
	# kırmızı otobüsler ve tekne
	bus(B, "Otobus1", -111.0, -100.0)
	bus(B, "Otobus2", 0.0, -367.5, PI / 2.0)
	B.boat("Tekne", -200, -8, PI / 2.0, "ferry")
	B.big_label("Thames", Vector3(-60, 8, -8), 90)
	return {
		"lands": [[-240, 260, -515, -42], [-240, 260, 25, 310]],
		"mini_extra": [[-156, -144, -42, 25, "#9aa58a"], [-35, -25, -42, 25, "#c9bda6"], [75, 85, -42, 25, "#c9bda6"], [194, 206, -42, 25, "#7a8a9a"]],
		"water": [[-260, 280, -42, 25]],
		"walk_over": walk, "fishing": walk,
		"carts": [["Fish & Chips", "#1f3a5a"], ["Tea", "#2f7d6d"], ["Ice Cream", "#c8423a"], ["Pies", "#8a5a3a"]],
		"fishers": [[-150.0, -40.0, 23.0, 12.0, true], [-30.0, -40.0, 23.0, 10.0, true], [80.0, -40.0, 23.0, 10.0, true]],
		"bounds": Rect2(-240, -515, 500, 825),
		"start": [-120.0, -46.0, -1.2],
		"fountains": [[-125, -318], [-95, -318], [-200, -295], [-150, -300], [80, -110], [-100, 70]],
		"landmarks": [["Big Ben", -137, -65], ["Parlamento", -185, -75], ["Westminster Abbey", -205, -170], ["London Eye", -100, 40], ["Trafalgar", -110, -318],
			["Buckingham", -200, -310], ["Hyde Park", -150, -450], ["Piccadilly", -50, -300], ["St Paul's", 80, -140], ["Tower of London", 207, -97],
			["Tower Bridge", 200, -8], ["South Bank", -105, 70]],
		"movers": [{"node": "Otobus1", "path": [[-111, -60], [-111, -320]], "speed": 5.0}, {"node": "Otobus2", "path": [[-95, -367.5], [250, -367.5]], "speed": 5.0},
			{"node": "Tekne", "path": [[-235, -8], [-160, -8]], "speed": 2.4, "float": true}],
		"cat_names": CATS, "dog_names": DOGS,
		"fixed_animals": [[false, -150.0, -55.0, 0.0, "Westminster Köprüsü"], [true, -130.0, -110.0, 0.0, "Big Ben'in dibinde"], [false, -146.0, -130.0, 0.0, "Parliament Square"],
			[true, -110.0, -300.0, 0.0, "Trafalgar aslanlarında"], [false, -125.0, -330.0, 0.0, "Trafalgar çeşmesi"], [true, -180.0, -240.0, 0.0, "St James's Park"],
			[false, -200.0, -282.0, 0.0, "Buckingham önü"], [false, -150.0, -420.0, 0.0, "Hyde Park"], [true, -110.0, -470.0, 0.0, "Serpentine kıyısı"],
			[true, -50.0, -290.0, 0.0, "Piccadilly Circus"], [false, 80.0, -100.0, 0.0, "St Paul's merdivenleri"], [true, 207.0, -60.0, 0.0, "Tower of London"],
			[true, -100.0, 60.0, 0.0, "London Eye kuyruğu"], [false, -80.0, 30.0, 0.0, "South Bank"], [true, 60.0, 60.0, 0.0, "Tate Modern"],
			[false, 120.0, 200.0, 0.0, "Borough"], [true, -200.0, 150.0, 0.0, "Lambeth"]],
		"extra_npcs": [[-140.0, -40.0, -140.0, 20.0], [-158.0, 20.0, -158.0, -40.0], [-140.0, -318.0, -80.0, -318.0], [-60.0, -300.0, -30.0, -300.0], [-140.0, 30.0, -40.0, 30.0], [-40.0, 29.0, 150.0, 29.0]],
	}

static func parliament(B, x0: float, x1: float, z0: float, z1: float) -> void:
	var g = B.g
	var S: Color = B.stone(B.C("#d8c39a"))
	g.wall_box(x1 - x0, 18, z1 - z0, (x0 + x1) / 2.0, 0, (z0 + z1) / 2.0, S, 0, "win_c", 2.6, 4.5, true)
	g.put("hip", Vector3((x0 + x1) / 2.0, 18, (z0 + z1) / 2.0), B.C("#5d6a72"), 0, Vector3(x1 - x0, 4.5, z1 - z0), "roof")
	for k in int((x1 - x0) / 5.0):
		g.put("cone8", Vector3(x0 + 2.5 + k * 5.0, 18.0, z1 - 0.5), B.C("#c9b48a"), 0, Vector3(0.6, 3.5, 0.6))
	# Victoria Kulesi (batı ucu)
	g.wall_box(14, 46, 14, x0 + 8, 0, z0 + 10, S, 0, "win_c", 3.4, 7.6, true)
	for e: Vector2 in [Vector2(-1, -1), Vector2(1, -1), Vector2(-1, 1), Vector2(1, 1)]:
		g.put("cone8", Vector3(x0 + 8 + e.x * 6.5, 46.0, z0 + 10 + e.y * 6.5), B.C("#c9b48a"), 0, Vector3(0.8, 5.0, 0.8))
	g.put("pyr", Vector3(x0 + 8, 46, z0 + 10), B.C("#5d6a72"), 0, Vector3(12, 5, 12))
	# Big Ben (Elizabeth Kulesi), doğu ucu
	var bx := x1 + 4.0; var bz := z1 - 8.0
	g.wall_box(9, 40, 9, bx, 0, bz, S, 0, "win_c", 3.0, 6.6, true)
	g.box(10, 8, 10, bx, 40, bz, B.C("#cbb68e"))
	for f in 4:
		var a := f * PI / 2.0
		var fx := bx + sin(a) * 5.06; var fz := bz + cos(a) * 5.06
		g.put("cyl", Vector3(fx, 44, fz), B.C("#f4efe0"), a, Vector3(3.2, 0.12, 3.2), "plain", PI / 2.0, 0.0)
		g.put("box", Vector3(fx + sin(a) * 0.08, 44.6, fz + cos(a) * 0.08), B.C("#2b2b2b"), a, Vector3(0.2, 2.2, 0.06))
		g.put("box", Vector3(fx + sin(a) * 0.09 + cos(a) * 0.6, 44, fz + cos(a) * 0.09 - sin(a) * 0.6), B.C("#2b2b2b"), a, Vector3(1.6, 0.18, 0.06))
	g.box(8, 6, 8, bx, 48, bz, B.C("#d8c39a"))
	g.put("pyr", Vector3(bx, 54, bz), B.C("#3f4a52"), 0, Vector3(9, 14, 9))
	g.put("cyl8", Vector3(bx, 69, bz), B.C("#d4a93c"), 0, Vector3(0.2, 3.0, 0.2), "gold")
	B.add_col(x0, x1, z0, z1)
	B.add_col(bx - 4.5, bx + 4.5, bz - 4.5, bz + 4.5)
	B.area("Houses of Parliament", x0, x1, z0, z1)
	B.label("Big Ben", Vector3(bx, 76, bz), 100, B.C("#23302b"), B.C("#fffaf1"), 26, true)
	B.flush_chunk("Parliament")

static func abbey(B, cx: float, cz: float) -> void:
	var g = B.g
	var S: Color = B.stone(B.C("#d9cdb3"))
	g.wall_box(14, 18, 50, cx, 0, cz, S, 0, "win_c", 3.4, 6.0, true)
	g.put("hip", Vector3(cx, 18, cz), B.C("#5d6a72"), PI / 2.0, Vector3(50, 6, 14), "roof")
	g.wall_box(28, 14, 10, cx, 0, cz - 8, S, 0, "win_c", 3.4, 7.0, true)
	for e: float in [-1.0, 1.0]:
		g.wall_box(7, 34, 7, cx + e * 4.5, 0, cz + 25, S, 0, "win_c", 3.4, 8.5, true)
		for k in 4:
			g.put("cone8", Vector3(cx + e * 4.5 + (k % 2 - 0.5) * 6.0, 34, cz + 25 + (int(k / 2) - 0.5) * 6.0), B.C("#cfc3a8"), 0, Vector3(0.5, 3.0, 0.5))
	g.put("cyl", Vector3(cx, 22, cz + 28.6), B.C("#3b4f8a"), 0, Vector3(3.0, 0.2, 3.0), "plain", PI / 2.0, 0.0)
	B.add_col(cx - 14, cx + 14, cz - 25, cz + 29)
	B.area("Westminster Abbey", cx - 14, cx + 14, cz - 25, cz + 29)
	B.label("Westminster Abbey", Vector3(cx, 44, cz), 80, B.C("#23302b"), B.C("#fffaf1"), 22, true)
	B.flush_chunk("Abbey")

static func trafalgar(B, x0: float, x1: float, z0: float, z1: float) -> void:
	var g = B.g
	g.ground(x0, x1, z0, z1, 0.02, "slab", 7.0)
	B.squares.append([x0, x1, z0, z1])
	B.road("Trafalgar Square", x0, x1, z0, z1)
	B.area("Trafalgar Square", x0, x1, z0, z1)
	var cx := (x0 + x1) / 2.0; var cz := (z0 + z1) / 2.0
	# Nelson sütunu ve aslanlar
	g.box(8, 4, 8, cx, 0, cz + 5, B.C("#cfc6b6"))
	g.put("cyl8", Vector3(cx, 4.0 + 17.0, cz + 5), B.C("#d8cfbd"), 0, Vector3(1.4, 34.0, 1.4))
	g.box(3.2, 2.0, 3.2, cx, 38, cz + 5, B.C("#c9b48a"))
	g.put("cyl8", Vector3(cx, 41.2, cz + 5), B.C("#4f5a5a"), 0, Vector3(0.6, 2.4, 0.6))
	g.put("ball", Vector3(cx, 42.8, cz + 5), B.C("#4f5a5a"), 0, Vector3(0.5, 0.5, 0.5))
	for e: Vector2 in [Vector2(-1, -1), Vector2(1, -1), Vector2(-1, 1), Vector2(1, 1)]:
		var lx := cx + e.x * 5.5; var lz := cz + 5 + e.y * 5.5
		g.box(3.0, 1.4, 1.6, lx, 0, lz, B.C("#cfc6b6"))
		g.box(1.2, 1.0, 2.6, lx, 1.4, lz, B.C("#3a3a38"))
		g.put("ball", Vector3(lx, 2.6, lz + e.y * 0.9), B.C("#3a3a38"), 0, Vector3(0.6, 0.65, 0.6))
	B.add_col(cx - 7, cx + 7, cz - 2, cz + 12)
	B.fountain_round(cx - 15, cz - 3, 5.0)
	B.fountain_round(cx + 15, cz - 3, 5.0)
	# Ulusal Galeri (kuzey)
	var S: Color = B.stone(B.C("#e6dcc6"))
	g.wall_box(70, 14, 14, cx, 0, z0 - 9, S, 0, "win_c", 3.4, 7.0, true)
	for k in 8:
		g.put("cyl8", Vector3(cx - 10 + k * 2.8, 6.0, z0 - 1.6), B.C("#efe8da"), 0, Vector3(0.6, 12.0, 0.6))
	g.put("pyr", Vector3(cx, 14, z0 - 2.2), B.C("#e6dcc6"), 0, Vector3(24, 3.5, 3.0))
	g.put("cyl", Vector3(cx, 17, z0 - 9), B.C("#8e9ba0"), 0, Vector3(4, 2, 4))
	B.dome(cx, 19, z0 - 9, 4.0, 1.0, 0.0, B.C("#8e9ba0"))
	B.add_col(cx - 35, cx + 35, z0 - 16, z0 - 2)
	B.label("Trafalgar Square", Vector3(cx, 48, cz + 5), 90, B.C("#23302b"), B.C("#fffaf1"), 24, true)
	B.flush_chunk("Trafalgar")

static func buckingham(B, cx: float, cz: float) -> void:
	var g = B.g
	var S: Color = B.stone(B.C("#ece6da"))
	g.wall_box(64, 18, 16, cx, 0, cz - 12, S, 0, "win_c", 3.0, 6.0, true)
	g.box(65, 1.4, 17, cx, 18, cz - 12, B.C("#ddd5c6"))
	for k in 6:
		g.put("cyl8", Vector3(cx - 7.5 + k * 3.0, 9.0, cz - 3.6), B.C("#f4efe6"), 0, Vector3(0.6, 12.0, 0.6))
	g.box(1.2, 1.6, 0.1, cx, 20.2, cz - 12, B.C("#c8282d"))
	B.add_col(cx - 32, cx + 32, cz - 20, cz - 4)
	# demir parmaklık ve kapı
	for k in 40:
		g.box(0.08, 2.6, 0.08, cx - 32 + k * 1.64, 0, cz + 8, B.C("#1f1f1f"))
	g.box(66, 0.1, 0.1, cx, 2.5, cz + 8, B.C("#d4a93c"))
	B.add_col(cx - 33, cx - 4, cz + 7.8, cz + 8.2, 3.0, false)
	B.add_col(cx + 4, cx + 33, cz + 7.8, cz + 8.2, 3.0, false)
	# muhafızlar
	for e: float in [-1.0, 1.0]:
		g.box(1.4, 2.4, 1.4, cx + e * 3.2, 0, cz + 6.5, B.C("#2b2b2b"))
		g.put("cyl8", Vector3(cx + e * 6.0, 0.8, cz + 6.0), B.C("#c8282d"), 0, Vector3(0.28, 1.6, 0.28))
		g.put("cyl8", Vector3(cx + e * 6.0, 1.9, cz + 6.0), B.C("#1a1a1a"), 0, Vector3(0.3, 0.7, 0.3))
	# Victoria anıtı
	g.put("cyl", Vector3(cx, 0.6, cz + 20), B.C("#e6dcc6"), 0, Vector3(8, 1.2, 8))
	g.box(3, 8, 3, cx, 1.2, cz + 20, B.C("#f2ede2"))
	g.put("box", Vector3(cx, 10.4, cz + 20), B.C("#d4a93c"), 0, Vector3(1.2, 2.4, 1.2), "gold")
	B.add_col(cx - 6, cx + 6, cz + 14, cz + 26)
	g.ground(cx - 35, cx + 35, cz + 9, cz + 28, 0.02, "slab", 6.0)
	B.squares.append([cx - 35, cx + 35, cz + 9, cz + 28])
	B.area("Buckingham Palace", cx - 35, cx + 35, cz - 22, cz + 28)
	B.label("Buckingham Palace", Vector3(cx, 28, cz - 12), 80, B.C("#23302b"), B.C("#fffaf1"), 22, true)
	B.flush_chunk("Buckingham")

static func piccadilly(B, cx: float, cz: float) -> void:
	var g = B.g
	g.ground(cx - 25, cx + 25, cz - 25, cz + 25, 0.02, "slab", 6.0)
	B.squares.append([cx - 25, cx + 25, cz - 25, cz + 25])
	B.road("Piccadilly Circus", cx - 25, cx + 25, cz - 25, cz + 25)
	g.put("cyl", Vector3(cx, 0.6, cz), B.C("#d8cfbd"), 0, Vector3(3.0, 1.2, 3.0))
	g.put("cyl8", Vector3(cx, 2.4, cz), B.C("#4f6b55"), 0, Vector3(0.6, 2.4, 0.6))
	g.put("ball", Vector3(cx, 4.0, cz), B.C("#4f6b55"), 0, Vector3(0.5, 0.7, 0.5))
	B.add_col(cx - 3, cx + 3, cz - 3, cz + 3)
	# ışıklı reklam panoları (köşe binası)
	g.wall_box(22, 16, 14, cx + 14, 0, cz - 18, B.C("#e8e0cf"), 0, "win_c", 3.0, 5.3, true)
	var ad := ["#e0483a", "#3b6aa8", "#f2c230", "#2f7d6d", "#d98aa0", "#9a5ac8"]
	for k in 6:
		g.box(3.4, 3.4, 0.2, cx + 5 + (k % 3) * 3.6, 6.0 + int(k / 3) * 3.6, cz - 10.9, B.C(ad[k]), 0.0, "glow")
	B.add_col(cx + 3, cx + 25, cz - 25, cz - 11)
	B.label("Piccadilly Circus", Vector3(cx, 14, cz), 70, B.C("#23302b"), B.C("#fffaf1"), 20, true)
	B.flush_chunk("Piccadilly")

static func st_pauls(B, cx: float, cz: float) -> void:
	var g = B.g
	var S: Color = B.stone(B.C("#e2dccd"))
	g.wall_box(24, 18, 60, cx, 0, cz, S, 0, "win_c", 3.4, 6.0, true)
	g.wall_box(56, 16, 18, cx, 0, cz, S, 0, "win_c", 3.4, 5.3, true)
	g.put("cyl", Vector3(cx, 22, cz), S, 0, Vector3(11, 8, 11), "stonewall")
	for k in 16:
		var a := k * TAU / 16.0
		g.put("cyl8", Vector3(cx + cos(a) * 11.6, 22, cz + sin(a) * 11.6), B.C("#efe8da"), 0, Vector3(0.45, 8.0, 0.45))
	B.dome(cx, 26, cz, 10.5, 1.15, 0.0, B.C("#8e9ba0"))
	g.put("cyl8", Vector3(cx, 40, cz), B.C("#e2dccd"), 0, Vector3(1.6, 4.0, 1.6))
	g.put("ball", Vector3(cx, 43, cz), B.C("#d4a93c"), 0, Vector3(1.0, 1.0, 1.0), "gold")
	for e: float in [-1.0, 1.0]:
		g.wall_box(6, 12, 6, cx + e * 8.0, 18, cz + 26, S, 0, "win_c", 3.0, 6.0, true)
		B.dome(cx + e * 8.0, 30, cz + 26, 2.6, 1.4, 0.0, B.C("#8e9ba0"))
	for k in 6:
		g.put("cyl8", Vector3(cx - 7.5 + k * 3.0, 6.0, cz + 31.0), B.C("#efe8da"), 0, Vector3(0.7, 12.0, 0.7))
	B.add_col(cx - 28, cx + 28, cz - 9, cz + 9)
	B.add_col(cx - 12, cx + 12, cz - 30, cz + 32)
	B.area("St Paul's Cathedral", cx - 28, cx + 28, cz - 30, cz + 40)
	B.label("St Paul's", Vector3(cx, 52, cz), 90, B.C("#23302b"), B.C("#fffaf1"), 24, true)
	B.flush_chunk("StPauls")

static func tower_of_london(B, cx: float, cz: float) -> void:
	var g = B.g
	var S: Color = B.stone(B.C("#cfc3a4"))
	# dış sur
	# sur kapıları: içinden geçen sokakların hizasında 6 m aralık
	var gx := [cx - 27.0, cx + 13.0]
	var gz := [cz - 3.0]
	for e: float in [-1.0, 1.0]:
		var a := cx - 35.0
		for gp: float in gx + [cx + 35.0 + 3.0]:
			var b := gp - 3.0
			if b > a:
				g.box(b - a, 7, 3, (a + b) / 2.0, 0, cz + e * 38, S)
				B.add_col(a, b, cz + e * 38 - 1.5, cz + e * 38 + 1.5)
				for k in int((b - a) / 3.0):
					g.box(1.0, 1.0, 3.2, a + 1.5 + k * 3.0, 7.0, cz + e * 38, S)
			a = gp + 3.0
		var c := cz - 38.0
		for gp2: float in gz + [cz + 38.0 + 3.0]:
			var d := gp2 - 3.0
			if d > c:
				g.box(3, 7, d - c, cx + e * 35, 0, (c + d) / 2.0, S)
				B.add_col(cx + e * 35 - 1.5, cx + e * 35 + 1.5, c, d)
			c = gp2 + 3.0
		for gp3: float in gx:
			g.box(7.4, 1.4, 3.4, gp3, 5.6, cz + e * 38, S.darkened(0.1))
		for gp4: float in gz:
			g.box(3.4, 1.4, 7.4, cx + e * 35, 5.6, gp4, S.darkened(0.1))
	for e2: Vector2 in [Vector2(-1, -1), Vector2(1, -1), Vector2(-1, 1), Vector2(1, 1)]:
		g.put("cyl", Vector3(cx + e2.x * 35, 5, cz + e2.y * 38), S, 0, Vector3(4, 10, 4), "stonewall")
	# Beyaz Kule
	var W: Color = B.stone(B.C("#ece6da"))
	g.wall_box(24, 22, 20, cx, 0, cz - 6, W, 0, "win_c", 3.4, 7.3, true)
	for e3: Vector2 in [Vector2(-1, -1), Vector2(1, -1), Vector2(-1, 1)]:
		g.box(4, 6, 4, cx + e3.x * 11, 22, cz - 6 + e3.y * 9, W)
		B.dome(cx + e3.x * 11, 28, cz - 6 + e3.y * 9, 2.2, 1.1, 0.0, B.C("#5d6a72"))
	g.put("cyl", Vector3(cx + 11, 14, cz + 3), W, 0, Vector3(2.6, 28, 2.6), "stonewall")
	B.dome(cx + 11, 28, cz + 3, 2.8, 1.2, 0.0, B.C("#5d6a72"))
	B.add_col(cx - 12, cx + 14, cz - 16, cz + 6)
	g.ground(cx - 33, cx + 33, cz - 36, cz + 36, 0.03, "grass", 5.0)
	B.parks.append([cx - 33, cx + 33, cz - 36, cz + 36])
	B.area("Tower of London", cx - 36, cx + 36, cz - 39, cz + 39)
	# girişte bir aralık
	B.label("Tower of London", Vector3(cx, 36, cz - 6), 80, B.C("#23302b"), B.C("#fffaf1"), 22, true)
	B.flush_chunk("Tower")

static func tower_bridge(B, x: float) -> void:
	var g = B.g
	var S: Color = B.stone(B.C("#d8cdb8"))
	var blue: Color = B.C("#5f8fb8")
	g.box(12, 0.8, 67, x, -0.55, -8.5, B.C("#8a8f94"))
	g.ground(x - 6, x + 6, -42, 25, 0.16, "slab", 4.0)
	B.road("Tower Bridge", x - 6, x + 6, -42, 25)
	for e: float in [-1.0, 1.0]:
		g.box(0.4, 1.1, 67, x + e * 5.8, 0, -8.5, blue)
		B.add_col(x + e * 5.8 - 0.25, x + e * 5.8 + 0.25, -42, 25, 2.0, false)
	for tz: float in [-28.0, 11.0]:
		g.box(15, 1.5, 11, x, -2.5, tz, S)
		for e2: float in [-1.0, 1.0]:
			g.wall_box(4, 34, 9, x + e2 * 8.5, -1.0, tz, S, 0, "win_c", 2.0, 6.0, true)
			g.put("pyr", Vector3(x + e2 * 8.5, 33, tz), B.C("#5d6a72"), 0, Vector3(5, 6, 10))
			for c: Vector2 in [Vector2(-1, -1), Vector2(1, -1), Vector2(-1, 1), Vector2(1, 1)]:
				g.put("cone8", Vector3(x + e2 * 8.5 + c.x * 1.8, 33, tz + c.y * 4.3), B.C("#5d6a72"), 0, Vector3(0.6, 4.0, 0.6))
	# üst yaya geçitleri ve asma kablolar
	for e3: float in [-1.0, 1.0]:
		g.box(4, 3.0, 28, x + e3 * 8.5, 26, -8.5, blue)
	for side: float in [-1.0, 1.0]:
		for k in 8:
			g.put("box", Vector3(x + side * 5.8, 10.0 + k * 1.6, -32.0 - k * 1.2 if false else -36.0 + k * 1.2), blue, 0, Vector3(0.3, 0.3, 1.6))
	B.label("Tower Bridge", Vector3(x, 46, -8.5), 90, B.C("#23302b"), B.C("#fffaf1"), 24, true)

static func london_eye(B, cx: float, cz: float) -> void:
	var g = B.g
	var r := 24.0
	var hy := r + 4.0
	var white: Color = B.C("#f2f4f6")
	var n := 48
	for k in n:
		var a := k * TAU / n
		var a2 := (k + 1) * TAU / n
		var p1 := Vector2(cos(a) * r, sin(a) * r)
		var p2 := Vector2(cos(a2) * r, sin(a2) * r)
		var mid := (p1 + p2) / 2.0
		g.put("box", Vector3(cx + mid.x, hy + mid.y, cz), white, 0, Vector3(p1.distance_to(p2) + 0.1, 0.4, 0.4), "plain", 0.0, a + PI / 2.0 + PI / 2.0)
		if k % 3 == 0:
			g.put("box", Vector3(cx + cos(a) * r / 2.0, hy + sin(a) * r / 2.0, cz), B.C("#d8dde2"), 0, Vector3(r, 0.08, 0.08), "plain", 0.0, a)
		if k % 2 == 0:
			g.put("ball", Vector3(cx + cos(a) * (r + 1.0), hy + sin(a) * (r + 1.0), cz), B.C("#bfe3f5"), 0, Vector3(1.4, 0.9, 0.9))
	g.put("cyl8", Vector3(cx, hy, cz), white, 0, Vector3(1.2, 2.0, 1.2), "plain", PI / 2.0, 0.0)
	for e: float in [-1.0, 1.0]:
		g.put("box", Vector3(cx + e * 6.0, hy / 2.0, cz + 6.0), white, 0, Vector3(0.8, hy + 2.0, 0.8), "plain", -0.25, e * 0.2)
	B.add_col(cx - 9, cx - 5, cz + 4, cz + 10)
	B.add_col(cx + 5, cx + 9, cz + 4, cz + 10)
	B.label("London Eye", Vector3(cx, hy + r + 6, cz), 90, B.C("#23302b"), B.C("#fffaf1"), 24, true)
	B.flush_chunk("LondonEye")

static func tate_globe(B) -> void:
	var g = B.g
	g.wall_box(70, 20, 30, 60, 0, 70, B.C("#8a5a44"), 0, "win_c", 6.0, 10.0, true)
	g.box(10, 50, 10, 60, 0, 60, B.C("#7e5040"))
	g.box(10.4, 2.0, 10.4, 60, 50, 60, B.C("#bfe3f5"))
	B.add_col(25, 95, 55, 85)
	B.label("Tate Modern", Vector3(60, 56, 60), 80, B.C("#23302b"), B.C("#fffaf1"), 22, true)
	# Shakespeare's Globe (yuvarlak ahşap tiyatro)
	var gx := 130.0; var gz := 75.0
	g.put("cyl", Vector3(gx, 5, gz), B.C("#efe6d4"), 0, Vector3(12, 10, 12))
	for k in 16:
		var a := k * TAU / 16.0
		g.box(0.5, 10, 0.5, gx + cos(a) * 12.1, 0, gz + sin(a) * 12.1, B.C("#5a3f2c"))
	g.put("cone", Vector3(gx, 10, gz), B.C("#c9b07a"), 0, Vector3(13, 3, 13))
	B.add_col(gx - 12, gx + 12, gz - 12, gz + 12)
	B.label("Shakespeare's Globe", Vector3(gx, 18, gz), 60, B.C("#23302b"), B.C("#fffaf1"), 18, true)
	B.flush_chunk("Bankside")

static func bus(B, name: String, x: float, z: float, ry: float = 0.0) -> void:
	var g = B.g
	var n := Node3D.new()
	n.name = name
	B.mroot.get_node("Hareketli").add_child(n)
	n.position = Vector3(x, 0, z)
	n.rotation.y = ry
	var red: Color = B.C("#c8282d")
	g.box(2.5, 4.2, 10.5, 0, 0.4, 0, red)
	g.box(2.54, 0.9, 10.2, 0, 1.4, 0, B.C("#2c3a46"))
	g.box(2.54, 0.9, 10.2, 0, 3.0, 0, B.C("#2c3a46"))
	g.box(2.3, 0.4, 0.06, 0, 3.95, 5.26, B.C("#f2c230"))
	for e: float in [-1.0, 1.0]:
		for f: float in [-1.0, 1.0]:
			g.put("cyl8", Vector3(e * 1.2, 0.5, f * 3.6), B.C("#1f1f1f"), 0, Vector3(0.5, 0.3, 0.5), "plain", 0.0, PI / 2.0)
	g.flush(n, B.mroot)
