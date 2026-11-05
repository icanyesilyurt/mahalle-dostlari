shader_type spatial;
render_mode cull_disabled;
uniform vec3 deep : source_color = vec3(0.09, 0.33, 0.47);
uniform vec3 shallow : source_color = vec3(0.22, 0.55, 0.64);
varying vec3 wpos;
void vertex() {
	vec3 w = (MODEL_MATRIX * vec4(VERTEX, 1.0)).xyz;
	float t = TIME;
	VERTEX.y += 0.07 * sin(w.x * 0.35 + t * 1.3) + 0.05 * sin(w.z * 0.5 - t * 1.1) + 0.025 * sin((w.x + w.z) * 1.3 + t * 2.0);
	wpos = w;
}
void fragment() {
	float t = TIME;
	vec2 p = wpos.xz;
	float a = p.x * 0.9 + t * 1.2;
	float b = p.y * 0.7 - t * 0.9;
	float n = sin(a) * sin(b) + 0.5 * sin(p.x * 2.3 - p.y * 1.9 + t * 2.1);
	vec3 col = mix(deep, shallow, 0.45 + 0.2 * n);
	float sparkle = pow(max(0.0, sin(p.x * 3.7 + t * 2.6) * sin(p.y * 3.1 - t * 2.2)), 18.0);
	ALBEDO = col + vec3(sparkle * 0.35);
	ROUGHNESS = 0.12;
	SPECULAR = 0.55;
	vec3 nrm = normalize(vec3(-0.12 * cos(a) * sin(b), 1.0, -0.12 * sin(a) * cos(b)));
	NORMAL = normalize((VIEW_MATRIX * vec4(nrm, 0.0)).xyz);
}
