shader_type spatial;
render_mode cull_disabled;
uniform sampler2D tex : source_color, filter_linear_mipmap_anisotropic, repeat_enable;
varying vec3 wpos;
varying vec3 wnrm;
vec3 to_lin(vec3 c) { return mix(pow((c + vec3(0.055)) / 1.055, vec3(2.4)), c / 12.92, lessThan(c, vec3(0.04045))); }
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
void vertex() {
	wpos = (MODEL_MATRIX * vec4(VERTEX, 1.0)).xyz;
	wnrm = normalize((MODEL_MATRIX * vec4(NORMAL, 0.0)).xyz);
}
// COLOR.a: 1 = sıva, 0.5 = ahşap kaplama (Osmanlı evi), 0.25 = tuğla (Galata, Karaköy)
void fragment() {
	vec4 t = texture(tex, UV);
	vec3 wall = to_lin(COLOR.rgb);
	float along = abs(wnrm.x) > abs(wnrm.z) ? wpos.z : wpos.x;
	float style = COLOR.a;
	if (style < 0.4) {
		float row = floor(wpos.y / 0.16);
		float bx = along / 0.34 + mod(row, 2.0) * 0.5;
		float col = floor(bx);
		vec2 f = vec2(fract(bx), fract(wpos.y / 0.16));
		float mortar = step(f.x, 0.06) + step(f.y, 0.1);
		wall *= 0.86 + 0.24 * hash(vec2(col, row));
		wall = mix(wall, vec3(0.62, 0.58, 0.52), clamp(mortar, 0.0, 1.0) * 0.75);
	} else if (style < 0.75) {
		float row = floor(wpos.y / 0.2);
		float f = fract(wpos.y / 0.2);
		wall *= 0.9 + 0.12 * hash(vec2(row, floor(along / 3.1)));
		wall *= mix(0.6, 1.0, smoothstep(0.0, 0.14, f));
		wall *= 1.0 - 0.05 * sin(along * 9.0 + row * 3.0);
	} else {
		float n = hash(floor(wpos.xz * 1.5) + floor(wpos.y * 1.5));
		wall *= 0.95 + 0.05 * n;
		// hafif yağmur izi ve yıpranma
		float streak = hash(vec2(floor(along * 2.0), 3.0));
		wall *= 1.0 - 0.06 * streak * smoothstep(0.6, 0.0, fract(wpos.y / 3.0));
	}
	wall *= mix(0.8, 1.0, smoothstep(0.0, 1.4, wpos.y));
	ALBEDO = mix(wall, t.rgb, t.a);
	ROUGHNESS = mix(0.95, 0.22, t.a);
}
