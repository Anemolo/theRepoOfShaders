#pragma loader: import {plot} from '/plot.glsl';

vec4 getColor(vec2 st,float y){
    vec3 color = vec3(y);

    float pct = plot(st,y);

    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

    return vec4(color,1.0);
}