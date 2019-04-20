class SceneCubeInCube {
	constructor (scene, analyser, camera, closeCallback) {
		this.closeCallback = closeCallback;
		this.timer = 0;
		this.scene = scene;
		this.analyser = analyser;
		this.state = 'stage1';
		this.fontSize = 6;
		this.frequencyMultplier = 0;
		this.stares = [];
	
		this.cubeArray = [];
		this.cubeGroup = new THREE.Group();

		this.makeCubes();
	}

	destroy () {
		var numberOfCubes = 10;
		for (var i = 0; i < numberOfCubes; i++) {
			for (var j = 0; j < numberOfCubes; j++) {
				for (var k = 0; k < 10; k++) {
					if (this.cubeArray[i][j][k]) {
						this.cubeArray[i][j][k].destroy();
						this.cubeArray[i][j][k] = null;
					}

				}
			}
		}


		this.closeCallback();
	}

	makeCubes () {
		var numberOfCubes = 10;
		for (var i = 0; i < numberOfCubes; i++) {
			this.cubeArray[i] = [];
			for (var j = 0; j < numberOfCubes; j++) {
				this.cubeArray[i][j] = [];
				for (var k = 0; k < 10; k++) {
					var origoBuffer = numberOfCubes/2;
					this.cubeArray[i][j][k] = new Cube(this.cubeGroup);

					this.cubeArray[i][j][k].setX(i*3 - origoBuffer*3);
					this.cubeArray[i][j][k].setY(j*3 - origoBuffer*3);
					this.cubeArray[i][j][k].setZ(k*3 + 30);
				}
			}
		}

		scene.add( this.cubeGroup );
	}

	animateIndividualCubes (cube, sinMovement, xNum, yNum, zNum) {
		var cubePos = cube.getPosition();
		if (xNum % 2) {
			cubePos.z += sinMovement;
		} else {
			cubePos.z += -sinMovement;
		}

		if (yNum % 2) {
			cubePos.x += sinMovement;
		} else {
			cubePos.x += -sinMovement;
		}

		if (zNum % 2) {
			cubePos.y += sinMovement;
		} else {
			cubePos.y += -sinMovement;
		}
	}

	animate (scene) {
		this.timer += 0.1;

		if (this.timer > 0) {
			this.state =  'stage2'
		}

		if (this.timer > 10) {
			this.state =  'stage3'
		}

		if (this.timer > 30) {
			this.state =  'stage4'
		}

		if (this.timer > 80) {
			this.state =  'stage5'
		}


		if (this.state === 'stage5') {
			this.state =  'stage5'
			this.destroy();
		}

		if (this.state ===  'stage2') {
			this.cubeGroup.rotation.z += this.analyser.getAverageFrequency() * 0.0001;
		}

		if (this.state ===  'stage3') {
			this.cubeGroup.rotation.z += this.analyser.getAverageFrequency() * 0.0001;
			this.cubeGroup.rotation.y += this.analyser.getAverageFrequency() * 0.00001;
		}

		if  (this.state ===  'stage4') {
			this.cubeGroup.rotation.z += this.analyser.getAverageFrequency() * 0.0001;
			this.cubeGroup.rotation.y += this.analyser.getAverageFrequency() * 0.00001;

			var sinPos = Math.sin( this.timer )
			if (sinPos) {

				var sinMovement = ( (this.analyser.getAverageFrequency() * 0.1) * (sinPos * 0.02)) ;
				var numberOfCubes = 10;

				for (var i = 0; i < numberOfCubes; i++) {
					for (var j = 0; j < numberOfCubes; j++) {
						for (var k = 0; k < numberOfCubes; k++) {
							if (this.cubeArray[i][j][k]) {
								this.animateIndividualCubes(this.cubeArray[i][j][k], sinMovement, i, j, k);
							}
							
						}
					}
				}

			}
		}

	}
}