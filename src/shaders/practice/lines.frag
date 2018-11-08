#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

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
float coolSquares(float nLines, float x, float y){
    float yLine = step(0.5,sin(y * PI * nLines + u_time) / 2. + 0.5);
    float xLine = step(0.5,sin(x * PI * nLines + u_time) / 2. + 0.5);
    return min(yLine,xLine);
}
float withThreshold(float nLines,float x, float y, float xT, float yT){
    // Calculate both lines;
    float yLine = step(0.5,sin(y * PI * nLines + u_time) / 2. + 0.5);
    float xLine = step(0.5,sin(x * PI * nLines + u_time) / 2. + 0.5);
    // return x current position is less than the threshold
    // return X
    if(y < yT || x < xT){
        return xLine;
    }
    return yLine;
}
float mapSteps(float maxOutput, float maxSteps, float oneStep, float curStep){
    return (maxOutput / maxSteps) * (curStep / oneStep);
}
float ripples(float maxLines, float x, float y, float verticalOffset, float horizontalOffset) {

    float ripples = 4.;
    // This is what creates the circle looks
    // Ammount horizontal ripples in screen oddNumber-1
    // even numbers work, but need +PI/2 inside de sinFunction to look decent 
    float horizontalRipples = ripples;
    horizontalOffset = -PI/2. + horizontalOffset;
    // Uses x instead of why so every x position follows the curve
    float xDisplacement = sin(x * PI * horizontalRipples + horizontalOffset) / 2. + 0.5;
    
    // Vertical ripplex  in screen. Odd numbers work but you have to remove PI/2
    float verticalRipples = ripples;
    verticalOffset = -PI/2. + verticalOffset;
    // TODO: multiplied values are really low should double check
    float yDisplacement = sin(y * PI * verticalRipples + verticalOffset) / 2. + 0.5;
    // Even thought y is a normalized value, at the top y = 1, and at the bottom
    // y = 0. This doesn't loop and looks kinda odd. 
    // yDisplacement = y * xDisplacement; // kinda odd looking
    // To make it a continous loop from 1 to 0, y is made into a sine wave
    // And with a frecuency of 2 t
    // Also, to acomplish the same goal we can do this. Which may be a better way
    // but needs refining to look as good
    // yDisplacement = abs((y - 0.5) * xDisplacement)* 2.;
    //
    // Try different operators to get different cool effects
    float displacedPixel = (xDisplacement*max(xDisplacement,yDisplacement)+yDisplacement*max(xDisplacement,yDisplacement))/2.;

    // displacedPixel = (xDisplacement*yDisplacement+yDisplacement*xDisplacement)/2.;
    // displacedPixel = (xDisplacement*xDisplacement+yDisplacement*yDisplacement)/2.;
    // displacedPixel = (max(xDisplacement,yDisplacement)+max(xDisplacement,yDisplacement))/2.;
    // displacedPixel = (xDisplacement+yDisplacement)/2.;

    // Just makes 120 frames = 2PI and 0 frames 0PI 
    float timeMappedTo2PI = mapSteps(PI * 2., 120., 0.05, u_time);
    float color = sin(displacedPixel * PI * maxLines + timeMappedTo2PI) / 2. + 0.5;
    // Step makes values > 0.5 white and values < 0.5 black. Thus making it sharper  
    float purifiedColor = step(0.5,color);
    // To see how values behave. Return displacement variables
    return purifiedColor;
}
void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec2 mouse_st = u_mouse/u_resolution;

    float nLines = 30.;
    vec2 threshold = vec2(0.5,0.5);
    float otherLine = sign(sin(st.y * PI + PI/2.)) / 2. + 0.5;
    // Transform normalized number to angle. multiply by nLines to get frecuency
    // normalize sin value.
    // values above 0.5 are 1. below 0.5 are 0
    vec2 toMouse = (mouse_st - 0.5); 
    float x_movement = PI * 3. * toMouse.x;
    float y_movement = PI * 3. * toMouse.y;

    // disable Mouse
    x_movement = 0.;
    y_movement = 0.;

    float displacement = sin(st.x * PI + x_movement) / 2. + 0.5;
    float newVal = (sin(st.y * PI * 2. + PI/2.) / 2. + 0.5) * displacement ;
    // when cos = 0, lines = 0; Resulting
    // Top part has more lines because 
    float cosDisplacement = (sin(st.y * PI * 2. + y_movement + PI/2.)/2. + 0.5);
    float nLineDisplacement = nLines * cosDisplacement;
    float yLine = step(0.5,sin(newVal * PI * nLineDisplacement + u_time) / 2. + 0.5);

    float xLine = step(0.5,sin(st.x * PI * nLines + u_time) / 2. + 0.5);
    // if(cosDisplacement == 0. || cosDisplacement == 1. || cosDisplacement > 0.49 && cosDisplacement < 0.51
    // || st.x > 0.499 && st.x < 0.501) {
    //     yLine = (yLine - 1.) * -1.;
    //     cosDisplacement = (cosDisplacement - 1.) * -1.;
    // }
    gl_FragColor = vec4(vec3(cosDisplacement),1.);
    gl_FragColor = vec4(vec3(yLine),1.);    
    // gl_FragColor = vec4(vec3(newVal),1.);    
    gl_FragColor = vec4(vec3(ripples(nLines,st.x,st.y,0.,0.)),1.);
}