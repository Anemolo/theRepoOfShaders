// Name: Double-exponential Sigmoid
// Source: http://www.flong.com/texts/code/shapers_exp/
// Type: Exponential
// Desc: Similar to the Double-Exponential Seat, combines two
//      exponential functions to form sigmoids. Has nice derivatives, 
//      continuous control, h owever, more expensive to compute
//      than its counterpart(Double-Polynomial Sigmoid).
//      Approximately, when (a) = 0.426, result approximates the
//      Raised Inverted Cosine
//      Parameter (a): 0 <= a <= 1 Controls tilt of slope

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#pragma loader: import getColor from './base.frag';
float doubleExponentialSigmoid(float x, float a){
    float epsilon = 0.00001;
    float min_param_a = 0.0 + epsilon;
    float max_param_a = 1.0 - epsilon;
    a = min(max_param_a,max(min_param_a,a));
    a = 1.0 - a; // for sensible results
    
    float y = 0.0;
    if(x <= 0.5){
        // First exponential Function
        y = pow(2.0 * x,1.0/a) / 2.0;
    } else {
        // Second Exponential Function
        y = 1.0 - pow(2.0 * (1.0 - x), 1.0/a) / 2.0;
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

    float y = doubleExponentialSigmoid(st.x,0.8);

	gl_FragColor = getColor(st,y);
}
