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
			delta: 0.005,
			zoom: 10.0,
			posX: -0.91,
			posY: 0.0,
		}
		
		this.pane = new Tweakpane();

		this.pane.addInput( this.PARAMS, 'delta',{
			min: 0,
			max: 0.05,
			step: 0.001
		});

		this.pane.addInput( this.PARAMS, 'zoom',{
			min: 1,
			max: 100,
			step: 0.01
		});


		this.pane.addInput( this.PARAMS, 'posX',{
			min: -1.0,
			max: -0.8,
			step: 0.01
		});


		this.pane.addInput( this.PARAMS, 'posY',{
			min: -1,
			max: 1,
			step: 0.01
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