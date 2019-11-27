import * as THREE from 'three';
import * as ORE from 'ore-three-ts';

import Tweakpane from 'tweakpane';

import vert from './shaders/fullSize.vs';
import frag from './shaders/glsl.fs';

export class GLSL extends THREE.Mesh{
	
	private PARAMS;

	private pane: Tweakpane;
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

		this.initPane();
		
	}

	public initPane(){
	
		this.PARAMS = {
			offset: Math.PI,
			wave: 0,
		}
		
		this.pane = new Tweakpane();
		this.pane.addInput( this.PARAMS, 'offset',{
			min: 0,
			max: Math.PI * 2
		});

		this.pane.addInput( this.PARAMS, 'wave',{
			min: 0,
			max: 1.0
		});
		
	}

	public update( time: number ){

		this.uniforms.time.value = time;

		let key = Object.keys( this.PARAMS );

		for( let i = 0; i < key.length; i++ ){

			this.uniforms[key[i]] = { value: this.PARAMS[key[i]] };
			
		}

	}

	public resize( args: ORE.ResizeArgs ){

		this.uniforms.resolution.value.copy( args.windowPixelSize );
		
	}
	
}