// Name: Logistic Sigmoid
// Source: http://www.flong.com/texts/code/shapers_exp/
// Type: Exponential
// Desc: Elegant sigmoidal function, beleived to be the best
//      represntation of the growth of organic population, and other
//      natural phenomena. Also used for weighting signal-response
//      functions in neural networks.
//      The logistic Sigmoid has very natural rates of change, but
//      is expensive to calculate due use of many exp functions
//      Parameter (a) regulates the slope of the sigmoid.
//      When (a = 0), Logistic function becomes identity function(y=x) 

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#pragma loader: import getColor from './base.frag';
float logisticSigmoid(float x, float a){
  // n.b.: this Logistic Sigmoid has been normalized.
    float epsilon = 0.00001;
    float min_param_a = 0.0 + epsilon;
    float max_param_a = 1.0 - epsilon;
    a = min(max_param_a,max(min_param_a,a));
    a = 1.0 / (1.0 - a) - 1.0; 

    float A = 1.0 / (1.0 + exp(0.0 - ((x - 0.5) * a * 2.0)));
    float B = 1.0 / (1.0 + exp(a));
    float C = 1.0 / (1.0 + exp(0.0 - a));
    float y = (A - B) / (C - B);
    return y;
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;

    // animate
    float frecuency = 0.5;
    float max_param_n = 1.0;
    float min_param_n = 0.0;
    float n = max(min_param_n,abs(sin(u_time * frecuency )*max_param_n));

    float y = logisticSigmoid(st.x,0.8);

	gl_FragColor = getColor(st,y);
}
