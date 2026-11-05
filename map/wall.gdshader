shader_type spatial;
render_mode cull_disabled;
uniform sampler2D tex : source_color, filter_linear_mipmap_anisotropic, repeat_enable;
varying vec3 wpos;
vec3 to_lin(vec3 c) { return mix(pow((c + vec3(0.055)) / 1.055, vec3(2.4)), c / 12.92, lessThan(c, vec3(0.04045))); }
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
void vertex() { wpos = (MODEL_MATRIX * vec4(VERTEX, 1.0)).xyz; }
void fragment() {
	vec4 t = texture(tex, UV);
	vec3 wall = to_lin(COLOR.rgb);
	float n = hash(floor(wpos.xz * 1.5) + floor(wpos.y * 1.5));
	wall *= 0.95 + 0.05 * n;
	wall *= mix(0.82, 1.0, smoothstep(0.0, 1.4, wpos.y));
	ALBEDO = mix(wall, t.rgb, t.a);
	ROUGHNESS = mix(0.95, 0.22, t.a);
}
