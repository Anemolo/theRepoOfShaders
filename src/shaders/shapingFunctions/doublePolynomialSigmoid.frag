// Name: Symmetric Double-Polynomial Sigmoids
// Source: http://www.flong.com/texts/code/shapers_poly/
// Type: Polynomial
// Desc: Generates Sigmoid patterns{1?} by joining a symmetric
//      pair of polynomials at the center of the unit square(2x)

// Notes: 
//      {1}: A Sigmoid patterns is an S-shaped curve
//      {2}: Threejs pow() does not accept negatives as base



#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#pragma loader: import getColor from './base.frag';
float doublePolynomialSigmoid(float x, int n){
    float y = 0.0;
    float exponent = float(n);
    if(mod(exponent,2.0) == 0.0){

        // even polynomia
        if(x<=0.5){
            y = pow(2.0 * x,exponent) / 2.0;
        } else {
            // {2}. When b is even => pow(-f,b) becomes pow(abs(-f),b)
            // No negative at the end because the answer will always be positive
             y = 1.0 - pow(abs(2.0 * x - 2.0),exponent)/ 2.0;
        }
    } else {
        // odd polynomial
        if(x<=0.5) {
            y = pow(2.0 * x,exponent) / 2.0;
        } else {
            // {2}. When b is odd => pow(-f,b) becomes -pow(abs(-f),b)
            y = 1.0 - (pow(abs(2.0 * x - 2.0),exponent) / 2.0);
        }
    }
    return y;
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    // animate
    float frecuency = 0.5;
    float max_param_n = 10.0;
    int n = int(max(1.0,abs(sin(u_time * frecuency )*max_param_n))); 
    float y = doublePolynomialSigmoid(st.x,n);

	gl_FragColor = getColor(st,y);
}
