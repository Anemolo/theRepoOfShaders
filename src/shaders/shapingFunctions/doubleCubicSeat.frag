// Name: Double-Cubic Seat
// Source: http://www.flong.com/texts/code/shapers_poly/
// Type: Polynomial
// Desc: Looks like a seat. Formed by 3rd order polynomial cubic curves
//      which meet at a horizontal inflection poit at cords (a,b)

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#pragma loader: import getColor from './base.frag';
float doubleCubicSeat(float x, float a, float b){
    float epsilon = 0.00001;
    float min_param_a = 0.0 + epsilon;
    float max_param_a = 1.0 - epsilon;
    float min_param_b = 0.0;
    float max_param_b = 1.0;
    a = min(max_param_a,max(min_param_a,a));
    b = min(max_param_b,max(min_param_b,b));

    float y = 0.0;
    if(x <= a){
        y = b - b*pow(1.0 - x/a, 3.0);
    } else {
        y = b + (1.0 - b)*pow((x - a)/(1.0 - a),3.0)
    }
    return y;
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;

    float y = doubleCubicSeat(st.x,0.5,0.5);

	gl_FragColor = getColor(st,y);
}
