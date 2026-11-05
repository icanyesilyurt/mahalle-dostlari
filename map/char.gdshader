shader_type spatial;
// Kenney karakter paleti: seçilen hücreleri (tişört, pantolon, saç) istenen renge boyar.
uniform sampler2D tex : source_color, filter_nearest;
uniform vec2 cell_a = vec2(-1.0);
uniform vec4 col_a : source_color = vec4(1.0);
uniform vec2 cell_b = vec2(-1.0);
uniform vec4 col_b : source_color = vec4(1.0);
uniform vec2 cell_c = vec2(-1.0);
uniform vec4 col_c : source_color = vec4(1.0);
float lum(vec3 c) { return dot(c, vec3(0.3, 0.59, 0.11)); }
void fragment() {
	vec4 t = texture(tex, UV);
	vec2 cell = floor(UV * vec2(16.0, 4.0));
	vec3 c = t.rgb;
	float shade = clamp(0.7 + lum(t.rgb) * 0.6, 0.6, 1.15);
	if (all(equal(cell, cell_a))) c = col_a.rgb * shade;
	else if (all(equal(cell, cell_b))) c = col_b.rgb * shade;
	else if (all(equal(cell, cell_c))) c = col_c.rgb * shade;
	ALBEDO = c;
	ROUGHNESS = 0.85;
}
