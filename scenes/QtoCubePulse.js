class SceneQtoCube {
	constructor (scene, analyser, camera, closeCallback) {
		this.closeCallback = closeCallback;
		this.timer = 0;
		this.scene = scene;
		this.analyser = analyser;
		this.state = 'stage1';
		this.fontSize = 6;
		this.frequencyMultplier = 0;

		this.stares = [];

		this.cubeQGroupPos = [
				// Squarepart
				new THREE.Vector3( 0, 0, 0 ),
				new THREE.Vector3( 1, 0, 0 ),
				new THREE.Vector3( 2, 0, 0 ),
				new THREE.Vector3( 3, 0, 0 ),
				new THREE.Vector3( 4, 0, 0 ),
				new THREE.Vector3( 5, 0, 0 ),
				new THREE.Vector3( 6, 0, 0 ),
				new THREE.Vector3( 6, 1, 0 ),
				new THREE.Vector3( 6, 2, 0 ),
				new THREE.Vector3( 6, 3, 0 ),
				new THREE.Vector3( 6, 4, 0 ),
				new THREE.Vector3( 6, 5, 0 ),
				new THREE.Vector3( 6, 6, 0 ),
				new THREE.Vector3( 5, 6, 0 ),
				new THREE.Vector3( 4, 6, 0 ),
				new THREE.Vector3( 3, 6, 0 ),
				new THREE.Vector3( 2, 6, 0 ),
				new THREE.Vector3( 1, 6, 0 ),
				new THREE.Vector3( 0, 6, 0 ),
				new THREE.Vector3( 0, 5, 0 ),
				new THREE.Vector3( 0, 4, 0 ),
				new THREE.Vector3( 0, 3, 0 ),
				new THREE.Vector3( 0, 2, 0 ),
				new THREE.Vector3( 0, 1, 0 ),

				//Tale
				new THREE.Vector3( 4, 2, 0 ),
				new THREE.Vector3( 4.5, 1.5, 0 ),
				new THREE.Vector3( 5, 1, 0 ),
				new THREE.Vector3( 5.5, 0.5, 0 ),
				new THREE.Vector3( 6.5, -0.5, 0 ),
				new THREE.Vector3( 7, -1, 0 ),

				//b line
				new THREE.Vector3( 8, 0, 0 ),
				new THREE.Vector3( 8, 1, 0 ),
				new THREE.Vector3( 8, 2, 0 ),
				new THREE.Vector3( 8, 3, 0 ),
				new THREE.Vector3( 8, 4, 0 ),
				new THREE.Vector3( 8, 5, 0 ),
				new THREE.Vector3( 8, 6, 0 ),

				//b bump
				new THREE.Vector3( 9, 0, 0 ),
				new THREE.Vector3( 10, 0, 0 ),
				new THREE.Vector3( 10, 1, 0 ),
				new THREE.Vector3( 10, 2, 0 ),
				new THREE.Vector3( 10, 3, 0 ),
				new THREE.Vector3( 9, 3, 0 )
			]

		this.cubeGroup = new THREE.Group();
		this.cubeArray = [];	

		this.makeQCubes();
		this.makeStare(new THREE.Vector3( 0, 0, 0 ));

		this.stares[0].cube1.setVisability(false);
		this.stares[0].cube2.setVisability(false);
	}

	destroy () {
		if (this.stares) {
			for (var i = this.stares.length - 1; i >= 0; i--) {
				if (this.stares[i]) {
					this.stares[i].cube1.destroy();
					this.stares[i].cube2.destroy();
					this.stares[i] = null;
				}
			}
		}
		this.closeCallback();
	}

	makeQCubes () {
		for (var i = this.cubeQGroupPos.length - 1; i >= 0; i--) {
			this.cubeArray[i] = new Cube(scene);
			this.cubeArray[i].setZ(60);
		}
	}

	destroyQCubes () {
		if (this.cubeArray) {
			for (var i = this.cubeArray.length - 1; i >= 0; i--) {
				if (this.cubeArray[i]) {
					this.cubeArray[i].destroy();
					this.cubeArray[i] = null;
				}
			}
		}		
	}

	makeStare (position, size = 1) {
		this.stares.push(
			{
				cube1: new Cube(scene),
				cube2: new Cube(scene),
				size: size
			}
		)

		this.stares[this.stares.length-1].cube1.setPosition(position);
		this.stares[this.stares.length-1].cube2.setPosition(position);
		this.stares[this.stares.length-1].cube1.setSize(size);
		this.stares[this.stares.length-1].cube2.setSize(size);
	}

	makeMoreStars () {
		var x = Math.floor(-60 + Math.random() * Math.floor(120));
		var y = Math.floor(-30 + Math.random() * Math.floor(60));
		var size = Math.random() * Math.floor(1);
		
		var newPosition = new THREE.Vector3( x, y, 0 );
	
		this.makeStare ( newPosition , size);
	}

	spinCubeStar (cubestarObj) {
		cubestarObj.cube1.cube.rotation.z += 0.1;
		cubestarObj.cube2.cube.rotation.z += 0.1;
	}

	animate (scene) {
		this.timer += 0.1;

		if (this.timer > 20) {
			this.state =  'stage2'
		}

		if (this.timer > 30) {
			this.state =  'stage3'
		}

		if (this.timer > 40 && this.state === 'stage3') {
			this.state =  'stage4'

			if (this.stares.length && this.stares[0].cube1) {
				this.stares[0].cube1.setVisability(true);
				this.stares[0].cube2.setVisability(true);
			}
		}

		if (this.timer > 60) {
			this.state =  'stage5'
		}


		if (this.timer > 140) {
			this.state =  'stage6'
		}

		if (this.timer > 150) {
			this.state =  'stage8'
		}

		// Intro text and logo n stuff
		if (this.state ===  'stage1' || this.state ===  'stage2') {
			for (var i = this.cubeQGroupPos.length - 1; i >= 0; i--) {
				var pos = new THREE.Vector3( 0, 0, 60 );

				if (this.state ===  'stage1') {
					pos = this.cubeQGroupPos[i];
				} else if (this.state === 'stage2') {
					pos = new THREE.Vector3( 0, 0, 60 );
				}

				var cubePos = this.cubeArray[i].getPosition();
				var x = Math.abs(pos.x - cubePos.x);
				var y = Math.abs(pos.y - cubePos.y);
				var z = Math.abs(pos.z - cubePos.z);
				var distanceToTarget = Math.max(x, y, z);
				if (distanceToTarget > 0.2) {
					this.cubeArray[i].animatePosition(pos, 0.1); 
				}
			}
		} 

		// On to the star cubes!!!!
		else if (this.state ===  'stage2' && this.state ===  'stage3' || this.state ===  'stage4' || this.state ===  'stage5' | this.state ===  'stage6') {
			var size = this.analyser.getAverageFrequency() * this.frequencyMultplier;
			for (var i = this.stares.length - 1; i >= 0; i--) {
				var cube1 = this.stares[i].cube1;
				var cube2 = this.stares[i].cube2;

				cube1.setHeight(size * this.stares[i].size);
				cube2.setWidth(size * this.stares[i].size);
			}

			this.destroyQCubes();
		}

		if (this.state ===  'stage4') {
			if (this.frequencyMultplier < 0.8 && this.analyser.getAverageFrequency() !== 0) {
				this.frequencyMultplier += 0.001;
			}

			for (var i = this.stares.length - 1; i >= 0; i--) {
				this.spinCubeStar(this.stares[i]);
			}
		}

		// more cube stars are added mooo
		if (this.state ===  'stage5') {
			if (this.frequencyMultplier < 0.8 && this.analyser.getAverageFrequency() !== 0) {
				this.frequencyMultplier += 0.001;
			}

			for (var i = this.stares.length - 1; i >= 0; i--) {
				this.spinCubeStar(this.stares[i]);
			}

			if (this.timer%20 > 0.099 && this.timer%20 < 0.199) {
				this.makeMoreStars();
				this.makeMoreStars();
			}
		}

		if (this.state ===  'stage6') {
			if (this.frequencyMultplier > 0) {
				this.frequencyMultplier -= 0.01;
			}

			for (var i = this.stares.length - 1; i >= 0; i--) {
				this.spinCubeStar(this.stares[i]);
			}
		}

		// crazy bubemaking
		if (this.state ===  'stage7') {
			if (this.frequencyMultplier < 0.8 && this.analyser.getAverageFrequency() !== 0) {
				this.frequencyMultplier += 0.001;
			}

			for (var i = this.stares.length - 1; i >= 0; i--) {
				this.spinCubeStar(this.stares[i]);
			}

			console.log(this.timer%10);
			if (this.timer%10 > 5.59 && this.timer%10 < 5.69) {
				this.makeMoreStars();
			}
		}

		if (this.state ===  'stage8') {
			this.destroy();
		}

	}
}