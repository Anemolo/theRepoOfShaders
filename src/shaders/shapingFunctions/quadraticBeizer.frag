// Name: Quadratic Beizer
// Source: http://www.flong.com/texts/code/shapers_bez/
// Type: Beizer
// Desc: 2nd-order quad bezier curve. With single spline control point [a,b]
//      Really good animations at https://en.wikipedia.org/wiki/B%C3%A9zier_curve#Quadratic_curves
// Notes: 
//      a - 2nd-order beizer: A quadratic = 2nd order polimodial,
//          Function in which the highest degree is second deggre (pow(x,2) + 2x + x)            
//      b - Inverse operation: Reverses the effect of another operation
//          Beizer curves are defined so x and y are both functions of t.
//          To obtain y as a function of x. We need to solve t
//          using successive approximation
//      c - Succesive aproximation: Close is good enought. A formula that
//          is not exact but close enough.
//          Good Explination: https://www.youtube.com/watch?v=kN4-jGiNCyk
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#pragma loader: import getColor from './base.frag';
float quadraticBeizer(float x, float a, float b){
  // adapted from BEZMATH.PS (1993)
  // by Don Lancaster, SYNERGETICS Inc. 
  // http://www.tinaja.com/text/bezmath.html
    float elipson = 0.00001;
    float min_param = 0.0;
    float max_param = 1.0;
    a = min(max_param,max(min_param,a));
    b = min(max_param,max(min_param,b));
    if(a == 0.5){
        a+=elipson;
    }
    // solve t from x(an inverse operation using succesive aproximation)
    float om2a = 1. - 2.*a;
    // t = time. In relation to x and spline x???
    float t = (sqrt(a*a + om2a*x) - a)/om2a;
    float y = (1. - 2. * b)*(t*t)+ (2.*b)*t;
    return y;
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;

    // animate
    float frecuency = 0.5;
    float max_param = 1.;
    float min_param = 0.;
    float a = (sin(u_time)/2.+0.5) * (max_param - min_param) + min_param;
    float b = (cos(u_time)/2.+0.5) * (max_param - min_param) + min_param;

    float y = quadraticBeizer(st.x,a,b);

	gl_FragColor = getColor(st,y);
}
