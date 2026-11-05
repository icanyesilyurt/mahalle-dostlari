shader_type spatial;
// Köpek postu: ana renk + desen (benek, sırt eyeri, yüz maskesi). Koordinatlar model boyutuna göre 0..1.
uniform vec4 base : source_color = vec4(0.8, 0.6, 0.4, 1.0);
uniform vec4 mark : source_color = vec4(0.1, 0.1, 0.1, 1.0);
uniform vec3 box_pos = vec3(-0.0054, -0.0244, 0.0);
uniform vec3 box_size = vec3(0.0107, 0.0395, 0.031);
uniform float spots = 0.0;    // 0..1 benek yoğunluğu
uniform float saddle = 0.0;   // sırt eyeri (Alman kurdu, beagle)
uniform float mask = 0.0;     // koyu yüz (kangal, pug)
varying vec3 n;
float hash(vec3 p) { return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
void vertex() { n = (VERTEX - box_pos) / box_size; }
void fragment() {
	vec3 c = base.rgb;
	float m = 0.0;
	if (saddle > 0.0) m = max(m, smoothstep(0.58, 0.66, n.z) * smoothstep(0.3, 0.38, n.y) * smoothstep(0.95, 0.85, n.y) * saddle);
	if (mask > 0.0) m = max(m, smoothstep(0.24, 0.14, n.y) * mask);
	if (spots > 0.0) {
		vec3 q = n * vec3(10.0, 22.0, 14.0);
		vec3 cell = floor(q);
		vec3 f = fract(q) - 0.5;
		float h = hash(cell);
		float r = 0.18 + 0.14 * hash(cell + 7.0);
		m = max(m, step(1.0 - spots, h) * smoothstep(r, r - 0.05, length(f)));
	}
	ALBEDO = mix(c, mark.rgb, m);
	ROUGHNESS = 0.9;
}
