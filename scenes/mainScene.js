var camera, scene, renderer;
var demoPlaying = true;
var analyser;
var sound;
var scenestate;
var sceneQtoCube;
var sceneLoading;
var sceneCubeInCube;

var programInfo;

init();
animate();

function init() {
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 300 );
	camera.position.z = 90;
	var listener = new THREE.AudioListener();
	camera.add( listener );
	sound = new THREE.Audio( listener );

	var audioLoader = new THREE.AudioLoader();

	audioLoader.load( 'assets/Shuffle.wav', function( buffer ) {
		sound.setBuffer( buffer );
		sound.setLoop(false);
		sound.setVolume(0.9);
		sound.play();
	});

	sound.loop = false;
	//audioLoader.setLoop(false);

 
	scene = new THREE.Scene(); 
	//scene.fog = new THREE.FogExp2( 0xefd1b5, 0.0025 );

	analyser = new THREE.AudioAnalyser( sound, 32 );
	renderer = new THREE.WebGLRenderer( { alpha: false, antialias: true} );
	renderer.setSize( 1223, (window.innerHeight / 1.5) );
	//renderer.setColor( 0x000000, 0);



	var elem = document.body.appendChild( renderer.domElement );
	elem.setAttribute('class', 'canvas')
	makeLoadingScene();
	scenestate = 'loading';

	//makeRayScenes();
}

function stopAllIllyShit () {
	sceneQtoCube.destroy()


}

function makeQScenes () {
	sceneQtoCube = new SceneQtoCube(scene, analyser, camera, sceneQtoCubeClose);
}

function makeCubeInCube() {
	sceneCubeInCube = new SceneCubeInCube(scene, analyser, camera, cubeInCubeClose);
}
function cubeInCubeClose() {
	console.log('cubeInCubeClose');
	scenestate = 'none';
	//sound.pause();


	var screenText = document.getElementById('screentextHTML');
	screenText.hidden = false;
	screenText.style.textAlign = 'left';
	screenText.innerHTML = 'Code: Pinillya, <br> Music: Proinsias, <br>  Thanks to: Zochwar, Joovie, martin <3';
}

function sceneQtoCubeClose () {
	console.log('sceneQtoCubeClose');
	scenestate = 'cubeInCube';
	makeCubeInCube();
}

function makeLoadingScene () {
	sceneLoading = new SceneLoading(scene, analyser, camera, loadingClose);
}

function loadingClose () {
	makeQScenes();
	scenestate = 'qToCube';

	var screenText = document.getElementById('screentextHTML');
	screenText.hidden = true;
}

function animate() {
	requestAnimationFrame( animate );
	if (demoPlaying) {
		if (scenestate === 'loading' && sceneLoading) {
			sceneLoading.animate();
		}

		if (scenestate === 'qToCube' && sceneQtoCube) {
			sceneQtoCube.animate();
		}

		if (scenestate === 'cubeInCube' && sceneCubeInCube) {
			sceneCubeInCube.animate();
		}


		if (scenestate === 'rayScene' && rayScene) {
			rayScene.animate();
		}
	}
	renderer.render( scene, camera);
}

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;

    if (keyCode == 83) {
    	if (demoPlaying) {
    		sound.pause();
    		demoPlaying = false;
    	} else {
    		sound.play();
    		demoPlaying = true;
    	}
    }
};









function makeRayScenes () {
	this.rayScene = new RayScene(renderer, camera); //(scene, analyser, camera, loadingClose);
}


