// Name: Quadratic Through a given point
// Source: http://www.flong.com/texts/code/shapers_poly/
// Type: Polynomial
// Desc: Funtion creates a parabola(axis-align quadratic) 
//      which passes through a given point.

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#pragma loader: import getColor from './base.frag';
float quadraticThroughPoint(float x, float a, float b){

    float epsilon = 0.00001;
    float min_param_a = 0.0 + epsilon;
    float max_param_a = 1.0 - epsilon;
    float min_param_b = 0.0;
    float max_param_b = 1.0;
    a = min(max_param_a,max(min_param_a,a));
    b = min(max_param_b,max(min_param_b,b));

    float A = (1.0 - b) / (1.0 - a) - (b / a);
    float B = (A * (a * a)- b) / a;

    float y = A * (x * x) - B*(x);
    y = min(1.0,max(0.0,y));
    return y;
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;

    float y = quadraticThroughPoint(st.x,0.5,0.3);

	gl_FragColor = getColor(st,y);
}
