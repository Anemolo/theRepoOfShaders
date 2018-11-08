// Name: Double exponential Seat
// Source: http://www.flong.com/texts/code/shapers_exp/
// Type: Exponential
// Desc: Seat-shaped created by combining two exponential functions
//      Has nicer derivatives than its cubic counterpart(Double-cubic seat)
//      And more continuous control, all at the expense of CPU cycles
//      Parameter (a): 0 <= a <= 1 Controls tilt of slope
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#pragma loader: import getColor from './base.frag';
float doubleExponentialSeat(float x, float a){
    float epsilon = 0.00001;
    float min_param_a = 0.0 + epsilon;
    float max_param_a = 1.0 - epsilon;
    a = min(max_param_a,max(min_param_a,a));

    float y = 0.0;
    if(x <= 0.5){
        // First exponential Function
        y = pow(2.0 * x,1.0 - a) / 2.0;
    } else {
        // Second Exponential Function
        y = 1.0 - pow(2.0 * (1.0 - x), 1.0 - a) / 2.0;
    }
    return y;
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;

    // animate
    float frecuency = 0.5;
    float max_param_n = 1.0;
    float min_param_n = 0.0;
    float n = max(min_param_n,abs(sin(u_time * frecuency )*max_param_n));

    float y = doubleExponentialSeat(st.x,n);

	gl_FragColor = getColor(st,y);
}
