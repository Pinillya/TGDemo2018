class SceneLoading {
	constructor (scene, analyser, camera, closeCallback) {
		this.closeCallback = closeCallback;
		this.timer = 0;
		this.scene = scene;
		this.analyser = analyser;
		this.state = 'stage1';
		this.fontSize = 6;
		this.frequencyMultplier = 0;
		this.cubeGroup = new THREE.Group();
		this.cubeArray = [];

		this.TGCollection = [];

		this.cubeDelay = 2;

		this.makeCubes();
		//this.makeTGStar(0);

		//this.makeTGStar(1);
		//this.makeTGStar(2);
	}

	destroy () {
		this.closeCallback();
		this.destroyQCubes();
	}

	makeCubes () {
		for (var i = 10 - 1; i >= 0; i--) {
			this.cubeArray[i] = new Cube(scene);

			this.cubeArray[i].setPosition(new THREE.Vector3( 120, 0, 0 ))
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

	animate (scene) {
		this.timer += 0.1;
		

		if (this.timer > 20) {
			this.state =  'stage2'
		}

		if (this.timer > 70) {
			this.destroy();
		}

		// Intro text and logo n stuff
		if (this.state ===  'stage1' || this.state ===  'stage2') {
			for (var i = this.cubeArray.length - 1; i >= 0; i--) {

				if (this.timer > this.cubeDelay * i) {
					var pos = new THREE.Vector3( i * 2 - 10, 0, 0 );

					if (this.state === 'stage2' && this.timer > this.cubeDelay * i + 40) {
						pos = new THREE.Vector3( i * 2 - 200, 0, 0 );
					}

					if (this.cubeArray[i]) {
						var cubePos = this.cubeArray[i].getPosition();
						var x = Math.abs(pos.x - cubePos.x);
						var y = Math.abs(pos.y - cubePos.y);
						var z = Math.abs(pos.z - cubePos.z);
						var distanceToTarget = Math.max(x, y, z);
						if (distanceToTarget > 0.5) {
							this.cubeArray[i].animatePosition(pos, 1.5); 
						}
					}

				}

			}
		}

		if (this.TGCollection && this.TGCollection.length) {

			for (var i = this.TGCollection.length - 1; i >= 0; i--) {
				var csPosition = this.TGCollection[i].centerStar.getPosition();

				for (var j = this.TGCollection[i].starArms.length - 1; j >= 0; j--) {
					for (var k = this.TGCollection[i].starArms[j].array.length - 1; k >= 0; k--) {

						this.TGCollection[i].starArms[j].array[k].setY(csPosition.y + ((Math.sin((this.timer * Math.pow(k, 0.2))*0.5 )))) //(THREE.Math.clamp(Math.pow(k, 0.2), 0, 5)) ))));
					}				
				}
			}

		}
	}



	makeTGStar (num) {
		this.TGCollection.push({});
		var randPos = new THREE.Vector3( Math.floor(-80 + Math.random() * 80) , Math.floor(-60 + Math.random() * 60), 0 )
		this.TGCollection[num].centerStar = new Cube(this.scene);
		this.TGCollection[num].centerStar.setSize(4);
		this.TGCollection[num].centerStar.setSubDiv(3);

		this.TGCollection[num].group = new THREE.Group();
		this.TGCollection[num].group.add(this.TGCollection[num].centerStar.cube);

		//this.TGCollection[num].centerStar.setPosition(THREE.Vector3(0,0,0));

		var csPosition = this.TGCollection[num].centerStar.getPosition();
		
		this.TGCollection[num].starArms = [];
		for (var j = 0; j < 7; j++) {
			this.TGCollection[num].starArms[j] = [];
			this.TGCollection[num].starArms[j].array = [];
			this.TGCollection[num].starArms[j].localGropup = new THREE.Group();
			
			for (var i = 0; i < 10; i++) {
				if (this.TGCollection[num].starArms[j]) {

					this.TGCollection[num].starArms[j].array[i] = new Cube(this.TGCollection[num].starArms[j].localGropup);
					this.TGCollection[num].starArms[j].array[i].setSubDiv(Math.sin(i) * 2 );
					this.TGCollection[num].starArms[j].array[i].setPosition(new THREE.Vector3( csPosition.x + ((i * 2) + 4), (csPosition.y + 1) + (Math.sin(i/2) * 1), csPosition.z));
					if (i % 3 === 0) {
						this.TGCollection[num].starArms[j].array[i].setSize(2);
					} else {
						this.TGCollection[num].starArms[j].array[i].setSize(0.5);
					}

					//this.TGCollection[num].group.add(this.TGCollection[num].starArms[j].array[i].cube);
				}
			}

			scene.add (this.TGCollection[num].starArms[j].localGropup);
			this.TGCollection[num].group.add(this.TGCollection[num].starArms[j].localGropup);
			this.TGCollection[num].starArms[j].localGropup.rotation.z += Math.floor(j );//0 + Math.random() * j );
		}

		scene.add(this.TGCollection[num].group);
		this.TGCollection[num].group.position.x += randPos.x;
		this.TGCollection[num].group.position.y += randPos.y;
		
	}
}



