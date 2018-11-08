// Name: Double-Cubic Seat With linear blend
// Source: http://www.flong.com/texts/code/shapers_poly/
// Type: Polynomial
// Desc: This modified version of Double-Cubic Seat uses only a 
//      single variable(a) to control inflection point and the 
//      second parameter(b) to blend this curve with the
//      identity function(y=x){1} which tilts the slope of the 
//      curve's plateau in the vicitnity of the inflection point.

// Notes:
//       {1}: An identity function is a function that always 
//           returns the value used as argument

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#pragma loader: import getColor from './base.frag';
float doubleCubicSeatLinearBlend(float x, float a, float b){
    float epsilon = 0.00001;
    float min_param_a = 0.0 + epsilon;
    float max_param_a = 1.0 - epsilon;
    float min_param_b = 0.0;
    float max_param_b = 1.0;
    a = min(max_param_a,max(min_param_a,a));
    b = min(max_param_b,max(min_param_b,b));
    b = 1.0 - b;

    float y = 0.0;
    if(x <= a){
        y = b*x + (1.0-b)*a*(1.0 - pow(1.0 - x/a, 3.0));
    } else {
        y = b*x + (1.0 - b)*(a + (1.0 - a) * pow((x - a)/(1.0 - a),3.0));
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
     
    float y = doubleCubicSeatLinearBlend(st.x,0.5,n);

	gl_FragColor = getColor(st,y);
}
