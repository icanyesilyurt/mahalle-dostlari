extends SceneTree
func _init():
	var m = load("res://scenes/main.tscn").instantiate()
	root.add_child(m)
	await process_frame
	await process_frame
	for it in m._city_items():
		print("ITEM ", it.id, " | ", it.sub, " | ", it.price, " | ", it.enabled)
	print("met istanbul ", m._met_in("istanbul"), " paris ", m._met_in("paris"))
	m._unlock_city("roma")
	print("unlocked ", m.D.unlocked, " pts ", m.D.pts)
	quit()
