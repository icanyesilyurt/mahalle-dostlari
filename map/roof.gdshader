shader_type spatial;
render_mode cull_disabled;
varying vec3 wpos;
vec3 to_lin(vec3 c) { return mix(pow((c + vec3(0.055)) / 1.055, vec3(2.4)), c / 12.92, lessThan(c, vec3(0.04045))); }
void vertex() { wpos = (MODEL_MATRIX * vec4(VERTEX, 1.0)).xyz; }
void fragment() {
	vec3 c = to_lin(COLOR.rgb);
	float row = fract(wpos.y * 3.2);
	float along = fract((wpos.x + wpos.z) * 1.7 + floor(wpos.y * 3.2) * 0.5);
	float s = 0.78 + 0.22 * smoothstep(0.0, 0.4, row);
	s *= 0.9 + 0.1 * step(0.12, along);
	ALBEDO = c * s;
	ROUGHNESS = 0.75;
}
