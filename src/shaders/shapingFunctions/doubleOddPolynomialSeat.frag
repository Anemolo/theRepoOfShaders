// Name: Double-Odd-Polynomial Seat
// Source: http://www.flong.com/texts/code/shapers_poly/
// Type: Polynomial
// Desc: A version of the Double-Cubic Seat function that can
//      use any odd integer exponent. Parameter (n) controls the 
//      flatness or breadth of the plateau region in the
//      vicinity of the point (a,b)

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#pragma loader: import getColor from './base.frag';
float doubleOddPolynomialSeat(float x, float a, float b, int n){
    float epsilon = 0.00001;
    float min_param_a = 0.0 + epsilon;
    float max_param_a = 1.0 - epsilon;
    float min_param_b = 0.0;
    float max_param_b = 1.0;
    a = min(max_param_a,max(min_param_a,a));
    b = min(max_param_b,max(min_param_b,b));

    // Pow exponent needs to be a float.
    float p = float(2*n + 1);
    float y = 0.0;
    if(x <= a){
        y = b - b*pow(1.0 - x/a, p);
    } else {
        y = b + (1.0 - b)*pow((x - a)/(1.0 - a),p)
    }
    return y;
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    // Animate
    float frecuency = 0.5;
    float max_param_n = 15.0;
    int n = int(max(1.0,abs(sin(u_time * frecuency )*max_param_n))); 
    float y = doubleOddPolynomialSeat(st.x,0.5,0.5,n);

	gl_FragColor = getColor(st,y);
}
