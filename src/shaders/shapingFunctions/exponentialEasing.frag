// Name: Exponential Ease-in and Ease-out
// Source: http://www.flong.com/texts/code/shapers_exp/
// Type: Exponential
// Desc: Parameter (a) permits change from ease-in (a >= 0.5)
//      and ease-out (a < 0.5)
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#pragma loader: import getColor from './base.frag';
float exponentialEasing(float x, float a){
    float epsilon = 0.00001;
    float min_param_a = 0.0 + epsilon;
    float max_param_a = 1.0 - epsilon;
    a = min(max_param_a,max(min_param_a,a));

    float y = 0.0;
    if(a < 0.5){
        // Emphasis
        // transforms a < 0.5 into a<= a < 1
        a = 2.0 * a;
        y = pow(x,a)
        
    } else {
        // de-emphasis
        // transforms 0.5 <= a <= 1 into 0 <= a <= 1
        a = 2.0 * ( a - 0.5);
        y = pow(x, 1.0 / (1.0 - a))
    }
    return y;
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;

    float y = exponentialEasing(st.x,0.2);

	gl_FragColor = getColor(st,y);
}
