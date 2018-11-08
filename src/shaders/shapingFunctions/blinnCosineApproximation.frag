// Name: Blinn-Wyvill Approximation to the raised inverted Cosine
// Source: http://www.flong.com/texts/code/shapers_poly/
// Type: Polynomial
// Desc: Cos() and sin() can be expensive if millions of operations 
// 		per second are needed. This cos approximation differs by less
// 		than 0.1% within range [0...1] and is efficient to compute

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#pragma loader: import getColor from './base.frag';
float blinnCosineApproximation(float x){
	float x2 = x*x;
	float x4 = x2 * x2;
	float x6 = x2 * x4;

	float fa = (4.0/9.0);
	float fb = (17.0/9.0);
	float fc = (22.0/9.0);

    float y = fa*x6 - fb*x4 + fc*x2;
	return y;
}
void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;

    float y = blinnCosineApproximation(st.x);

	gl_FragColor = getColor(st,y);
}
