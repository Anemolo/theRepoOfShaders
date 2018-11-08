// Name: Cubic Beizer
// Source: http://www.flong.com/texts/code/shapers_bez/
// Type: Beizer
// Desc: Extremely flexible curve. Uses 2 spline control points [a,b][c,d].
//      having 2 control points allows it to produce sigmoids, seat-shaped funcs
//      ease-ins and ease-outs
// Notes: 
//      a - 2nd-order beizer: A quadratic = 2nd order polimodial,
//          Function in which the highest degree is second deggre (pow(x,2) + 2x + x)            
//      b - Inverse operation:  Reverses the effect of another operation
//          Beizer curves are defined so x and y are both functions of t.
//          In order to obtain y as a function of x. We need to solve t
//          by inverse operation
//      c - Succesive aproximation: Close is good enought. A formula that
//          is not exact but close enough.
//          Good Explination: https://www.youtube.com/watch?v=kN4-jGiNCyk
//          Method Used: Newton-rapelson https://en.wikipedia.org/wiki/Newton%27s_method
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

// helper funcs
float slopeFromT(float t, float a, float b, float c){
    float dtdx = 1.0/(3.0 * a * t * t + 2.0 * b * t + c);
    return dtdx;
}

float xFromT(float t, float a, float b, float c, float d){
    float x = a * (t * t * t) + b*(t * t) + c * t + d;
    return x;
}
float yFromT(float t, float e, float f, float g, float h){
    float y = e*(t * t * t) + f*(t * t) + g * t + h;
    return y; 
}

#pragma loader: import getColor from './base.frag';
float cubicBezier(float x, float a, float b, float c, float d){
    // initial pos
    float y0a = 0.0;
    float x0a = 0.0;
    // 1st influence
    float y1a = b;
    float x1a = a;
    // 2nd influence
    float y2a = d;
    float x2a = c;
    // Final Pos
    float y3a = 1.0;
    float x3a = 1.0;

    float A =     x3a - 3.0*x2a + 3.0*x1a - x0a;
    float B = 3.0*x2a - 6.0*x1a + 3.0*x0a;
    float C = 3.0*x1a - 3.0*x0a;
    float D =     x0a;

    float E =     y3a - 3.0*y2a + 3.0*y1a - y0a;
    float F = 3.0*y2a - 6.0*y1a + 3.0*y0a;
    float G = 3.0*y1a - 3.0*y0a;
    float H =     y0a;

    // Solve for t given x (using Newton-rapelson succesive approximation), 
    // then solve y given t
    // Asume t = x on first guess
    float currentt = x;
    const int nRefinementIterations = 5;
    for (int i =0 ; i < nRefinementIterations;i++){
        float currentx = xFromT(currentt,A,B,C,D);
        float currentslope = slopeFromT(currentt,A,B,C);
        currentt -= (currentx - x)*(currentslope);
        currentt = clamp(currentt,0.,1.);
    }
    // Solve y using t
    float y = yFromT(currentt,E,F,G,H);
    return y;
}
float plat(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) -
          smoothstep( pct, pct+0.02, st.y);
}
// main
vec4 getPoint(float i){
    // i =
    vec4 pointA = vec4(0.253,0.720,0.750,0.250);
    vec4 pointB = vec4(0.480,0.073,0.750,0.250);
    vec4 pointC = vec4(0.033,0.973,0.250,0.750);
    vec4 pointD = vec4(0.767,0.160,0.250,0.750);
    if(i < 1.0){
        return pointA + (i*(pointB - pointA));
    } else if(i < 2.0){
        return pointB + ((i-1.0)*(pointC - pointB));
    }  else if(i < 3.0){
        return pointC + ((i-2.0)*(pointD - pointC));
    }  else if(i < 4.0){
        return pointD + ((i-3.0)*(pointA - pointD));
    } 
    return vec4(0.);
}
vec3 drawLine( ){
    vec3 color = vec3(0.);
    return color;
}
void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;

    // animate
    float frecuency = 0.5;
    float max_param = 1.;
    float min_param = 0.;
    float a = (sin(u_time*0.1)/2.+0.5) * 4.;
    a = 0.;
    vec4 p = getPoint(a);
    float y = cubicBezier(st.x,p[0],p[1],p[2],p[3]);
    

    vec3 color = vec3(y);
//  Seems to be right be its on the wrong side
// fixed somehow by changing p[0] to p[2] in the step part of mix
//  works with p[2]= x but not with p[3] = y for some strange reasong
// maybe bc mix y based on the % of x traveled between start and finish
// mix y values
// returns 1 or -1 
    float redy = (step(p[2],st.x) * 2. - 1.)  * mix(p[3],1.,  max(0.,(st.x - p[2]) / (1. - p[2])));
    float pct1 = plat(st,redy);
    // pct1 = plat(st,st.y);

    color = (1.0-pct1)*color+pct1*vec3(1.0,0.0,0.0);

    float redy2 = (step(st.x,p[0]) * 2. - 1.) * mix(p[1],0., (st.x - p[0]) / (0. - p[0]));
    float pct2 = plat(st,redy2);
    // pct2 = plat(st,st.y);

    color = (1.0-pct2)*color+pct2*vec3(1.0,0.0,0.0);

    // Line Between
    float redy3 = (step(st.x,max(p[2],p[0])) * step(min(p[0],p[2]),st.x) * 2. - 1.) * mix(p[3],p[1],  (st.x - p[2]) / (p[0] - p[2]));
    float pct3 = plat(st,redy3);
    // pct3 = plat(st,st.y);

    color = (1.0-pct3)*color+pct3*vec3(1.0,0.0,0.0);


    // Green Line
    float pct = plat(st,y);

    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(color,1.0);
    // return 

	// gl_FragColor = getColor(st,y);
}
