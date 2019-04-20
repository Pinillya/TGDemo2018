class Cube {
	constructor (group) {
		var geometry, material, mesh;
		this.group = group;

		geometry = new THREE.BoxGeometry( 1, 1, 1 );

		this.uniforms1 = {
			sound: { value: 1 }
		};

		var material = new THREE.ShaderMaterial( {
			uniforms: this.uniforms1,
			vertexShader: document.getElementById( 'vertexShader' ).textContent,
			fragmentShader: document.getElementById( 'fragment_shader').textContent
		} );

		mesh = new THREE.Mesh( geometry, material );

		this.group.add(mesh);
		this.cube = mesh;
	}

	setSize (size) {
		this.setHeight(size);
		this.setWidth(size);
		this.setDepth(size);
	}

	setHeight(height) {
		this.cube.scale.y = height;
	}
	setWidth(width) {
		this.cube.scale.x = width;
	}
	setDepth(depth) {
		this.cube.scale.x = depth;
	}

	setSubDiv (divisions) {
		var modifier = new THREE.SubdivisionModifier( divisions );
		modifier.modify(this.cube.geometry);
	}

	setVisability (isVisible) {
		this.cube.visability = isVisible;
	}

	getPosition() {
		return this.cube.position;
	}

	setPosition(pos, buffer=0) {
		this.setX(pos.x + buffer);
		this.setY(pos.y + buffer);
		this.setZ(pos.z + buffer);
	}

	setX(pos) {
		this.cube.position.x = pos;
	}
	setY(pos) {
		this.cube.position.y = pos;
	}
	setZ(pos) {
		this.cube.position.z = pos;
	}

	destroy () {
		//console.log(this.cube, this.group);
		if (this.cube && this.group) {
			this.cube.name = this.cube.uuid;
			var selectedObject = this.group.getObjectByName(this.cube.name);
    		this.group.remove( selectedObject );
		}
	}

	animatePosition (targetPos, speed) {
		if (this.getPosition().x < targetPos.x) {
			this.cube.position.x += speed; 
		} else if (this.getPosition().x > targetPos.x) {
			this.cube.position.x += -speed; 
		}

		if (this.getPosition().y < targetPos.y) {
			this.cube.position.y += speed; 
		}

		if (this.getPosition().y > targetPos.y) {
			this.cube.position.y += -speed; 
		}

		if (this.getPosition().z < targetPos.z) {
			this.cube.position.z += speed; 
		}

		if (this.getPosition().z > targetPos.z) {
			this.cube.position.z += -speed; 
		}
	}
}