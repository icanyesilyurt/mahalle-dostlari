extends SceneTree
func _init() -> void:
	var base: FontFile = load("res://assets/fonts/Baloo2.ttf")
	var fv := FontVariation.new()
	fv.base_font = base
	var ts := TextServerManager.get_primary_interface()
	fv.variation_opentype = {ts.name_to_tag("wght"): 800}
	print(ResourceSaver.save(fv, "res://assets/fonts/ui_font.tres"))
	quit()
