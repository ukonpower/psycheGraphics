varying vec2 vUv;

uniform float time;
uniform vec2 resolution;
uniform float offset;
uniform float wave;

void main(void){
	vec3 c;

	float aspect = resolution.x / resolution.y;
	
	vec2 uv = vUv * 2.0 - 1.0;
	uv.x *= aspect;

	float res = 3.0;

	float len =  length(uv) * 10.0;

	c.x = floor( abs( sin( offset + time * 5.0 - len)) * res ) / res;
	c.y = floor( abs( sin( (offset * 0.3) + time * 5.0 - len)) * res ) / res;
	c.z = floor( abs( sin( (offset * 1.4) + time * 5.0 - len)) * res ) / res;


	gl_FragColor = vec4(c,1.0);
}