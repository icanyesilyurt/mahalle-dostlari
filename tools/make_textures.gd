extends SceneTree
## Harita dokularını üretir: godot --headless --script res://tools/make_textures.gd
## Pencere modüllerinde alfa=1 olan pikseller dokudan, alfa=0 olanlar duvar renginden gelir.

var rng := RandomNumberGenerator.new()

func rect(img: Image, x0: int, y0: int, x1: int, y1: int, c: Color) -> void:
	var r := Rect2i(x0, y0, x1 - x0, y1 - y0).intersection(Rect2i(Vector2i.ZERO, img.get_size()))
	if r.size.x > 0 and r.size.y > 0:
		img.fill_rect(r, c)

func circle(img: Image, cx: float, cy: float, rad: float, c: Color) -> void:
	for y in range(int(cy - rad), int(cy + rad) + 1):
		for x in range(int(cx - rad), int(cx + rad) + 1):
			if x >= 0 and y >= 0 and x < img.get_width() and y < img.get_height() and Vector2(x - cx, y - cy).length() <= rad:
				img.set_pixel(x, y, c)

func glass(img: Image, x0: int, y0: int, x1: int, y1: int) -> void:
	for y in range(y0, y1):
		var k := float(y - y0) / float(max(1, y1 - y0))
		var c := Color("#2c4256").lerp(Color("#5d7f98"), 0.35 + 0.4 * k)
		rect(img, x0, y, x1, y + 1, c)
	# yansıma çizgisi
	for i in range(0, (x1 - x0) / 2):
		var yy := y0 + 4 + i
		if yy < y1 - 2:
			rect(img, x0 + 4 + i, yy, x0 + 7 + i, yy + 1, Color(0.85, 0.92, 1.0, 1.0).lerp(Color("#5d7f98"), 0.5))

func window_frame(img: Image, x0: int, y0: int, x1: int, y1: int, frame: Color) -> void:
	rect(img, x0, y0, x1, y1, frame)
	glass(img, x0 + 5, y0 + 5, x1 - 5, y1 - 5)
	rect(img, (x0 + x1) / 2 - 2, y0 + 5, (x0 + x1) / 2 + 2, y1 - 5, frame)
	rect(img, x0 + 5, y0 + int((y1 - y0) * 0.38), x1 - 5, y0 + int((y1 - y0) * 0.38) + 4, frame)

func save(img: Image, name: String) -> void:
	img.save_png("res://map/tex/%s.png" % name)

func _init() -> void:
	rng.seed = 7
	DirAccess.make_dir_recursive_absolute("res://map/tex")
	var clear := Color(0, 0, 0, 0)
	var white := Color("#f5efe4")
	var stone := Color("#d9cdb8")

	# win_a: klasik pencere, taş söve
	var a := Image.create(128, 128, false, Image.FORMAT_RGBA8); a.fill(clear)
	rect(a, 34, 14, 94, 20, stone)
	window_frame(a, 38, 20, 90, 100, white)
	rect(a, 30, 100, 98, 108, stone)
	save(a, "win_a")

	# win_b: yeşil panjurlu pencere
	var b := Image.create(128, 128, false, Image.FORMAT_RGBA8); b.fill(clear)
	window_frame(b, 44, 20, 84, 100, white)
	for sx in [[22, 42], [86, 106]]:
		rect(b, sx[0], 20, sx[1], 100, Color("#3d6b55"))
		for y in range(24, 98, 6):
			rect(b, sx[0] + 2, y, sx[1] - 2, y + 2, Color("#2f5644"))
	rect(b, 20, 100, 108, 106, stone)
	save(b, "win_b")

	# win_c: kemerli pencere + ferforje balkon
	var c := Image.create(128, 128, false, Image.FORMAT_RGBA8); c.fill(clear)
	circle(c, 64, 40, 28, white)
	rect(c, 36, 40, 92, 104, white)
	circle(c, 64, 40, 23, Color("#3a5268"))
	glass(c, 41, 40, 87, 99)
	rect(c, 62, 18, 66, 99, white)
	rect(c, 24, 98, 104, 104, Color("#2b2b2b"))
	rect(c, 24, 120, 104, 124, Color("#2b2b2b"))
	for x in range(26, 104, 8):
		rect(c, x, 104, x + 2, 122, Color("#2b2b2b"))
	save(c, "win_c")

	# shop: dükkan vitrini, yarı açık kepenk, tabela
	var s := Image.create(256, 128, false, Image.FORMAT_RGBA8); s.fill(clear)
	rect(s, 14, 8, 242, 34, Color("#f3e9d2"))
	for i in 7:
		rect(s, 40 + i * 26, 16, 54 + i * 26, 26, Color("#5a4636"))
	rect(s, 14, 34, 242, 128, Color("#37302a"))
	for y in range(36, 60, 4):
		rect(s, 16, y, 240, y + 3, Color("#9aa1a5"))
	glass(s, 20, 60, 160, 124)
	rect(s, 88, 60, 92, 124, Color("#37302a"))
	rect(s, 172, 60, 236, 128, Color("#6d4b33"))
	rect(s, 178, 66, 230, 92, Color("#3a5268"))
	circle(s, 222, 100, 3, Color("#d9b45a"))
	save(s, "shop")

	# door: kemerli ahşap kapı ve yan pencere
	var d := Image.create(128, 128, false, Image.FORMAT_RGBA8); d.fill(clear)
	circle(d, 64, 46, 26, stone)
	rect(d, 38, 46, 90, 128, stone)
	circle(d, 64, 46, 21, Color("#6d4b33"))
	rect(d, 43, 46, 85, 128, Color("#6d4b33"))
	rect(d, 62, 30, 66, 128, Color("#4f3524"))
	for y in [60, 92]:
		rect(d, 47, y, 59, y + 22, Color("#5b3e2b")); rect(d, 69, y, 81, y + 22, Color("#5b3e2b"))
	circle(d, 74, 88, 2.5, Color("#d9b45a"))
	save(d, "door")

	# kaldırım taşı (arnavut kaldırımı)
	var cb := Image.create(256, 256, false, Image.FORMAT_RGB8); cb.fill(Color("#7f7466"))
	for y in range(0, 256, 16):
		var off := 0 if (y / 16) % 2 == 0 else 8
		for x in range(-16, 272, 16):
			var col := Color("#a99c86").lerp(Color("#c3b59b"), rng.randf()).darkened(rng.randf() * 0.12)
			rect(cb, x + off + 1, y + 1, x + off + 15, y + 15, col)
			rect(cb, x + off + 2, y + 2, x + off + 13, y + 5, col.lightened(0.06))
	save(cb, "cobble")

	# meydan taşı (büyük plaka)
	var sl := Image.create(256, 256, false, Image.FORMAT_RGB8); sl.fill(Color("#a99f90"))
	for y in range(0, 256, 64):
		for x in range(0, 256, 64):
			var col2 := Color("#d8cfbf").lerp(Color("#cbbfab"), rng.randf())
			rect(sl, x + 2, y + 2, x + 62, y + 62, col2)
			for k in 30:
				var px := x + 2 + rng.randi_range(0, 59); var py := y + 2 + rng.randi_range(0, 59)
				rect(sl, px, py, px + 2, py + 2, col2.darkened(0.05))
	save(sl, "slab")

	# çim
	var gr := Image.create(256, 256, false, Image.FORMAT_RGB8)
	for y in 256:
		for x in 256:
			var n := sin(x * 0.11) * cos(y * 0.13) * 0.5 + 0.5
			var g := Color("#5f8f3f").lerp(Color("#7aa64b"), n * 0.6 + rng.randf() * 0.4)
			gr.set_pixel(x, y, g)
	save(gr, "grass")

	# ahşap tahta (köprü yaya yolu, iskele)
	var wd := Image.create(128, 128, false, Image.FORMAT_RGB8); wd.fill(Color("#5b4632"))
	for y in range(0, 128, 16):
		var cw := Color("#8a6a4a").lerp(Color("#9c7a55"), rng.randf())
		rect(wd, 0, y + 1, 128, y + 15, cw)
		for k in 6:
			var gy := y + 3 + rng.randi_range(0, 10)
			rect(wd, rng.randi_range(0, 100), gy, rng.randi_range(100, 128), gy + 1, cw.darkened(0.12))
	save(wd, "wood")

	# taş duvar (rıhtım, sur)
	var st := Image.create(128, 128, false, Image.FORMAT_RGB8); st.fill(Color("#8d8473"))
	for y in range(0, 128, 32):
		var off2 := 0 if (y / 32) % 2 == 0 else 24
		for x in range(-48, 176, 48):
			rect(st, x + off2 + 2, y + 2, x + off2 + 46, y + 30, Color("#c4b8a0").lerp(Color("#b0a48c"), rng.randf()))
	save(st, "stone")
	print("dokular hazir")
	quit()
