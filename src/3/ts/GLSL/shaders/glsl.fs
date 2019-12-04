varying vec2 vUv;

uniform float time;
uniform vec2 resolution;
uniform float offset;
uniform float delta;
uniform float zoom;

uniform float posX;
uniform float posY;

#define LOOP 100.0

int func( vec2 pos ){

    vec2 res = vec2( 0.0, 0.0 );
    int cnt = 0;
    
    for( float i = 0.0; i < LOOP; i+=1.0 ){

        cnt++;

        if( length( res ) > 2.0 ){ break; }
        
        res = vec2(res.x * res.x - res.y * res.y, 2.0 * res.x * res.y) + pos;
        
    }

    return cnt;

}

$rotate

void main(void){
	vec3 c;

	float aspect = resolution.x / resolution.y;
	
	vec2 uv = vUv * 2.0 - 1.0;
	uv.x *= aspect;

    vec2 pos1 = uv;// / zoom + vec2( -0.5 + posX, 0.0 + posY );

    for( int i = 0; i < 10; i++ ){
        
        pos1 *= rotate( 0.1 + time * 0.8 );
        pos1 += vec2( sin( time ) * 0.01 );
        pos1 = abs( pos1 );
        

    }

    vec2 pos2 = pos1 + vec2( delta / zoom, 0.0 );
    vec2 pos3 = pos1 + vec2( 0.000, delta / zoom );

    float c1 = float( func( pos1 ) ) / LOOP;
    float c2 = float( func( pos2 ) ) / LOOP;
    float c3 = float( func( pos3 ) ) / LOOP;


    c = vec3( c1 - c2, 0.0,  c1 - c3 ) * 10.0;
    gl_FragColor = vec4( c, 1.0);

}