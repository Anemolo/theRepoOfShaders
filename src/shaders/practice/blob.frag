#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#define PI 3.14159265359

float rand (float x) {
    return fract(sin(x)*100000.0);
}
float map(float value, float min1, float max1, float min2, float max2){
    float perc = (value - min1) / (max1 - min1);

    // Do the same operation backwards with min2 and max2
    float val = perc * (max2 - min2) + min2;
    return val;
}
void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec2 center = u_resolution / 2.;
    float radius = 50.0;
    float dist = distance(gl_FragCoord.xy,center);
    float max_variation = 5.0;


    float angle = atan(gl_FragCoord.xy[1] - center[1],gl_FragCoord.xy[0] - center[0]);
    float pangle = angle;
    // pangle -PI <= pangle <= PI
    // Rate to which the frecuency changes
    float frc = 3.;
    float s = sin(pangle * ((cos(pangle * frc) + 2. ) ) + u_time) / 2. + 0.5; 
    float variation = s * max_variation;
    if(dist < radius) {
        gl_FragColor = vec4(vec3(.0),1.0);
    }else if(dist < radius + variation){
        gl_FragColor = vec4(0.0,0.0,0.0,1.0);

    } else {
        gl_FragColor = vec4(vec3(1.0),1.0);
    }
    // gl_FragColor = vec4(vec3( (cos(angle) )),0.0)
}