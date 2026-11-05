extends CanvasLayer
## Ekran arayüzü: üst bilgi, sokak adı, eylem kartı, Mahalle Defteri, mağaza, joystick.

signal action(id)
signal buy(id)
signal newday_pressed

const INK := Color("#23302b")
const PAPER := Color("#fffaf1")
const DIM := Color("#5f6d66")
const ACCENT := Color("#d9573a")
const STREET := Color("#1d5aa6")

var font: Font
var root: Control
var pills: HBoxContainer
var lbl_food: Label
var lbl_water: Label
var lbl_pts: Label
var lbl_treat: Label
var place_panel: PanelContainer
var place_lbl: Label
var place_t := 0.0
var toast_panel: PanelContainer
var toast_lbl: Label
var toast_t := 0.0
var act_panel: PanelContainer
var act_name: Label
var act_info: Label
var act_grid: GridContainer
var act_sig := ""
var top_btns: HBoxContainer
var book_panel: PanelContainer
var book_list: VBoxContainer
var book_sub: Label
var shop_panel: PanelContainer
var shop_list: VBoxContainer
var hint: Label
var joy: Control
var joy_on := false
var joy_o := Vector2.ZERO
var joy_v := Vector2.ZERO

func _box(bg: Color, border: Color = INK, r: int = 18, bw: int = 3) -> StyleBoxFlat:
	var s := StyleBoxFlat.new()
	s.bg_color = bg
	s.border_color = border
	s.set_border_width_all(bw)
	s.set_corner_radius_all(r)
	s.content_margin_left = 16
	s.content_margin_right = 16
	s.content_margin_top = 8
	s.content_margin_bottom = 8
	return s

func _label(text: String, size: int, col: Color = INK) -> Label:
	var l := Label.new()
	l.text = text
	l.add_theme_font_override("font", font)
	l.add_theme_font_size_override("font_size", size)
	l.add_theme_color_override("font_color", col)
	return l

func _button(text: String, bg: Color, fg: Color = INK, size: int = 26) -> Button:
	var b := Button.new()
	b.text = text
	b.focus_mode = Control.FOCUS_NONE
	b.add_theme_font_override("font", font)
	b.add_theme_font_size_override("font_size", size)
	for st in ["font_color", "font_hover_color", "font_pressed_color", "font_focus_color", "font_hover_pressed_color"]:
		b.add_theme_color_override(st, fg)
	b.add_theme_color_override("font_disabled_color", Color(fg, 0.45))
	b.add_theme_stylebox_override("normal", _box(bg, INK, 16))
	b.add_theme_stylebox_override("hover", _box(bg.lightened(0.08), INK, 16))
	b.add_theme_stylebox_override("pressed", _box(bg.darkened(0.12), INK, 16))
	b.add_theme_stylebox_override("disabled", _box(Color(bg, 0.45), Color(INK, 0.35), 16))
	return b

func _pill(text: String) -> Label:
	var p := PanelContainer.new()
	p.add_theme_stylebox_override("panel", _box(PAPER, INK, 26))
	p.mouse_filter = Control.MOUSE_FILTER_IGNORE
	var l := _label(text, 24)
	p.add_child(l)
	pills.add_child(p)
	return l

func _sheet(title_text: String) -> Array:
	var panel := PanelContainer.new()
	panel.add_theme_stylebox_override("panel", _box(PAPER, INK, 24))
	var bv := VBoxContainer.new()
	bv.add_theme_constant_override("separation", 10)
	panel.add_child(bv)
	var top := HBoxContainer.new()
	bv.add_child(top)
	var title := _label(title_text, 38, ACCENT)
	title.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	top.add_child(title)
	var close := _button("Kapat", PAPER, INK, 22)
	close.pressed.connect(func(): panel.visible = false)
	top.add_child(close)
	var sub := _label("", 21, DIM)
	sub.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	bv.add_child(sub)
	var sc := ScrollContainer.new()
	sc.size_flags_vertical = Control.SIZE_EXPAND_FILL
	sc.horizontal_scroll_mode = ScrollContainer.SCROLL_MODE_DISABLED
	bv.add_child(sc)
	var list := VBoxContainer.new()
	list.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	list.add_theme_constant_override("separation", 8)
	sc.add_child(list)
	panel.visible = false
	root.add_child(panel)
	return [panel, sub, list, bv]

func _ready() -> void:
	font = load("res://assets/fonts/ui_font.tres")
	root = Control.new()
	root.set_anchors_preset(Control.PRESET_FULL_RECT)
	root.mouse_filter = Control.MOUSE_FILTER_IGNORE
	add_child(root)

	joy = Control.new()
	joy.set_anchors_preset(Control.PRESET_FULL_RECT)
	joy.mouse_filter = Control.MOUSE_FILTER_IGNORE
	joy.draw.connect(_draw_joy)
	root.add_child(joy)

	pills = HBoxContainer.new()
	pills.add_theme_constant_override("separation", 8)
	pills.position = Vector2(18, 14)
	pills.mouse_filter = Control.MOUSE_FILTER_IGNORE
	root.add_child(pills)
	lbl_food = _pill("Mama 10")
	lbl_water = _pill("Su 6/6")
	lbl_pts = _pill("Puan 0")
	lbl_treat = _pill("Ödül 0")

	place_panel = PanelContainer.new()
	place_panel.add_theme_stylebox_override("panel", _box(STREET, Color.WHITE, 8, 4))
	place_panel.mouse_filter = Control.MOUSE_FILTER_IGNORE
	place_lbl = _label("", 26, Color.WHITE)
	place_panel.add_child(place_lbl)
	place_panel.modulate.a = 0.0
	root.add_child(place_panel)

	toast_panel = PanelContainer.new()
	toast_panel.add_theme_stylebox_override("panel", _box(INK, INK, 14))
	toast_panel.mouse_filter = Control.MOUSE_FILTER_IGNORE
	toast_lbl = _label("", 26, PAPER)
	toast_panel.add_child(toast_lbl)
	toast_panel.modulate.a = 0.0
	root.add_child(toast_panel)

	top_btns = HBoxContainer.new()
	top_btns.add_theme_constant_override("separation", 8)
	root.add_child(top_btns)
	var shop_btn := _button("Mağaza", PAPER, INK, 24)
	var book_btn := _button("Defter", PAPER, INK, 24)
	top_btns.add_child(shop_btn)
	top_btns.add_child(book_btn)

	act_panel = PanelContainer.new()
	act_panel.add_theme_stylebox_override("panel", _box(PAPER, INK, 22))
	act_panel.custom_minimum_size = Vector2(540, 0)
	var v := VBoxContainer.new()
	v.add_theme_constant_override("separation", 6)
	act_panel.add_child(v)
	act_name = _label("", 32)
	act_info = _label("", 21, DIM)
	act_info.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	v.add_child(act_name)
	v.add_child(act_info)
	act_grid = GridContainer.new()
	act_grid.columns = 2
	act_grid.add_theme_constant_override("h_separation", 10)
	act_grid.add_theme_constant_override("v_separation", 10)
	v.add_child(act_grid)
	act_panel.visible = false
	root.add_child(act_panel)

	hint = _label("", 21, PAPER)
	hint.add_theme_color_override("font_outline_color", INK)
	hint.add_theme_constant_override("outline_size", 8)
	hint.mouse_filter = Control.MOUSE_FILTER_IGNORE
	root.add_child(hint)

	var b := _sheet("Mahalle Defteri")
	book_panel = b[0]; book_sub = b[1]; book_list = b[2]
	var nd := _button("Yeni gün başlat (test)", Color("#e9e4d6"), INK, 20)
	nd.pressed.connect(func():
		newday_pressed.emit()
		book_panel.visible = false)
	(b[3] as VBoxContainer).add_child(nd)
	var s := _sheet("Mağaza")
	shop_panel = s[0]; shop_list = s[2]
	(s[1] as Label).text = "Puanlarınla al. Planlanan: gerçek sürümdeki satışların net gelirinin %35'i sokak hayvanlarına mama olarak bağışlanacak."
	book_btn.pressed.connect(func():
		shop_panel.visible = false
		book_panel.visible = not book_panel.visible)
	shop_btn.pressed.connect(func():
		book_panel.visible = false
		shop_panel.visible = not shop_panel.visible)

func is_sheet_open() -> bool:
	return book_panel.visible or shop_panel.visible

func set_book(entries: Array, met: int, total: int) -> void:
	for c in book_list.get_children():
		c.queue_free()
	book_sub.text = "%d dosttan %d tanesiyle tanıştın" % [total, met]
	for e in entries:
		var p := PanelContainer.new()
		p.add_theme_stylebox_override("panel", _box(Color.WHITE, Color(INK, 0.18), 14, 2))
		var row := HBoxContainer.new()
		row.add_theme_constant_override("separation", 14)
		p.add_child(row)
		var sw := ColorRect.new()
		sw.custom_minimum_size = Vector2(54, 54)
		sw.color = e.color if e.known else Color(INK, 0.15)
		row.add_child(sw)
		var col := VBoxContainer.new()
		col.add_theme_constant_override("separation", 2)
		col.size_flags_horizontal = Control.SIZE_EXPAND_FILL
		row.add_child(col)
		col.add_child(_label(e.title, 26, INK if e.known else DIM))
		var sub := _label(e.sub, 19, DIM)
		sub.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
		col.add_child(sub)
		if e.known:
			col.add_child(_label(e.level, 17, ACCENT))
		book_list.add_child(p)

func set_shop(items: Array) -> void:
	for c in shop_list.get_children():
		c.queue_free()
	for it in items:
		var p := PanelContainer.new()
		p.add_theme_stylebox_override("panel", _box(Color.WHITE, Color(INK, 0.18), 14, 2))
		var row := HBoxContainer.new()
		row.add_theme_constant_override("separation", 12)
		p.add_child(row)
		var col := VBoxContainer.new()
		col.size_flags_horizontal = Control.SIZE_EXPAND_FILL
		row.add_child(col)
		col.add_child(_label(it.title, 26))
		var sub := _label(it.sub, 19, DIM)
		sub.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
		col.add_child(sub)
		var bt := _button(it.price, Color("#f6c445"), INK, 22)
		bt.disabled = not it.enabled
		var iid: String = it.id
		bt.pressed.connect(func(): buy.emit(iid))
		row.add_child(bt)
		shop_list.add_child(p)

func set_stats(food: int, water: int, pts: int, treats: int) -> void:
	lbl_food.text = "Mama %d" % food
	lbl_water.text = "Su %d/6" % water
	lbl_pts.text = "Puan %d" % pts
	lbl_treat.text = "Ödül %d" % treats

func show_place(t: String) -> void:
	place_lbl.text = t
	place_t = 2.8

func toast(t: String, sec: float = 2.2) -> void:
	toast_lbl.text = t
	toast_t = sec

## actions: [{id, label, enabled, color}]
func show_actions(title: String, info: String, actions: Array) -> void:
	act_panel.visible = true
	act_name.text = title
	act_info.text = info
	var sig := ""
	for a in actions:
		sig += "%s|%s|%s;" % [a.id, a.label, a.enabled]
	if sig == act_sig:
		return
	act_sig = sig
	for c in act_grid.get_children():
		c.queue_free()
	for a in actions:
		var b := _button(a.label, a.color, INK, 24)
		b.disabled = not a.enabled
		b.size_flags_horizontal = Control.SIZE_EXPAND_FILL
		b.custom_minimum_size = Vector2(0, 62)
		var aid: String = a.id
		b.pressed.connect(func(): action.emit(aid))
		act_grid.add_child(b)

func hide_actions() -> void:
	act_panel.visible = false
	act_sig = ""

func set_hint(t: String) -> void:
	hint.text = t

func set_joy(on: bool, o: Vector2, v: Vector2) -> void:
	joy_on = on
	joy_o = o
	joy_v = v
	joy.queue_redraw()

func _draw_joy() -> void:
	if not joy_on:
		return
	joy.draw_circle(joy_o, 90.0, Color(1, 1, 1, 0.22))
	joy.draw_arc(joy_o, 90.0, 0.0, TAU, 48, Color(INK, 0.45), 4.0)
	joy.draw_circle(joy_o + joy_v * 72.0, 38.0, Color(1, 1, 1, 0.8))

func over_ui(pos: Vector2) -> bool:
	for c in [act_panel, top_btns, book_panel, shop_panel]:
		if (c as Control).visible and (c as Control).get_global_rect().has_point(pos):
			return true
	return false

func _process(delta: float) -> void:
	var vs := root.get_viewport_rect().size
	place_panel.position = Vector2((vs.x - place_panel.size.x) / 2.0, 16)
	toast_panel.position = Vector2((vs.x - toast_panel.size.x) / 2.0, vs.y * 0.22)
	act_panel.position = Vector2((vs.x - act_panel.size.x) / 2.0, vs.y - act_panel.size.y - 16)
	top_btns.position = Vector2(vs.x - top_btns.size.x - 18, 14)
	hint.position = Vector2(20, vs.y - hint.size.y - 14)
	hint.visible = not act_panel.visible
	for p in [book_panel, shop_panel]:
		(p as Control).size = Vector2(minf(660.0, vs.x - 40.0), vs.y - 50.0)
		(p as Control).position = (vs - (p as Control).size) / 2.0
	if place_t > 0.0:
		place_t -= delta
		place_panel.modulate.a = clampf(place_t * 2.0, 0.0, 1.0)
	else:
		place_panel.modulate.a = 0.0
	if toast_t > 0.0:
		toast_t -= delta
		toast_panel.modulate.a = clampf(toast_t * 3.0, 0.0, 1.0)
	else:
		toast_panel.modulate.a = 0.0
