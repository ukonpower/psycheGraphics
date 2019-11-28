import * as ORE from 'ore-three-ts'
import * as THREE from 'three';

import { GLSL } from './GLSL';

export default class MainScene extends ORE.BaseScene{

	private renderer: THREE.WebGLRenderer;
	private glsl: GLSL;

	constructor(){

		super();

		this.name = "MainScene";
	
	}

	onBind( gProps: ORE.GlobalProperties ){

		super.onBind( gProps );

		this.renderer = this.gProps.renderer;
		
		this.camera.position.set( 0, 1.5, 3 );
		this.camera.lookAt( 0, 0, 0 );
		
		this.glsl = new GLSL();
		this.scene.add( this.glsl );

		dispatchEvent( new Event( 'resize' ) );

	}

	public animate( deltaTime: number ){

		this.glsl.update( this.time );
		
		this.renderer.render( this.scene, this.camera );
	
	}

	public onResize( args: ORE.ResizeArgs ) {
		
		super.onResize( args );

		this.glsl.resize( args );
	
	}

}