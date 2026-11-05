shader_type spatial;
render_mode cull_disabled;
vec3 to_lin(vec3 c) { return mix(pow((c + vec3(0.055)) / 1.055, vec3(2.4)), c / 12.92, lessThan(c, vec3(0.04045))); }
void fragment() {
	ALBEDO = to_lin(COLOR.rgb);
	ROUGHNESS = 0.85;
	METALLIC = COLOR.a < 0.5 ? 0.6 : 0.0;
}
