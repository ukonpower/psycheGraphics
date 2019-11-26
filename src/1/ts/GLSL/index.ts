import * as THREE from 'three';
import * as ORE from 'ore-three-ts';

import vert from './shaders/fullSize.vs';
import frag from './shaders/glsl.fs';

export class GLSL extends THREE.Mesh{

	private uniforms: ORE.Uniforms;

	constructor(){

		let uni = {
			time: {
				value: 0
			},
			texture: {
				value: null
			},
			resolution: {
				value: new THREE.Vector2()
			}
		}

		let geo = new THREE.PlaneBufferGeometry( 2, 2 );
		let mat = new THREE.ShaderMaterial({
			vertexShader: vert,
			fragmentShader: frag,
			uniforms: uni
		})
		
		super( geo, mat );

		this.uniforms = uni;
		
	}

	public update( time: number ){

		this.uniforms.time.value = time;
		
	}

	public resize( args: ORE.ResizeArgs ){

		this.uniforms.resolution.value.copy( args.windowPixelSize );
		
	}
	
}