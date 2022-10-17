//global variables
var scene,renderer, camera, topCamera;
var cameraControls_3D,cameraControls_ortho;

var light, directionalLight;

var loader, texture;
var material_plane, geometry_plane,mesh_plane;

var canvas;

//const newLocal = new THREE.WebGLRenderer();
class myStageFactory {
	constructor() {
        renderer = new THREE.WebGLRenderer({antialias: true, preserveDrawingBuffer: true});
       
        renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setClearAlpha(0);
		renderer.setPixelRatio(devicePixelRatio || 1 );

		renderer.outputEncoding = THREE.sRGBEncoding; // related to texture loading
		
		scene = new THREE.Scene();

		}// end constructor

	get_renderer()
	{
		//var container = document.getElementById('container');
        //container.appendChild( renderer.domElement );
        //document.body.appendChild(renderer.domElement);
		(document.getElementById('container') || document.body).appendChild(renderer.domElement);

		canvas = renderer.domElement;

		//renderer.domElement refers to the <canvas> element where the scene will be rendered.
        //It is either generated automatically by the renderer, or is the canvas that you pass
		// to the renderer via parameters object that the THREE.WebGLRenderer function accepts.
		//So the above line just appends this <canvas> as a child of the body in your html page.
	    
	
	}


	setGrid(size,divisions,colorLinesCenter,colorLinesGrid,ID){
		// GRID HELPER
		//var size = 8;
		//var divisions = 8;
		//var colorLinesCenter = 0x00ffff;
		//var colorLinesGrid = new THREE.Color('lime');
		var helper = new THREE.GridHelper(size, divisions, colorLinesCenter, colorLinesGrid);
		scene.add(helper);
		helper.name = ID;
	}

   	setCanvas(w, h) {

		//renderer.setSize(window.innerWidth, window.innerHeight);
		var canvasRatio = w / h;
		renderer.setSize(w,h);
		renderer.setPixelRatio(window.devicePixelRatio);
		
	}

	setBgColor(hexacode,transparency){

		renderer.setClearColor(hexacode, transparency);
		
	}

	setAmbientLight(){
		const color = 0x040404 ;
		const intensity = 1;
		light = new THREE.AmbientLight(color, intensity);
		scene.add(light);			
	  };


	setPerspectiveCamera(angle,pox,poy,poz,len) {
		
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

		camera = new THREE.PerspectiveCamera(angle, width/height, 0.1, 1000);

		camera.position.set(pox, poy,poz).setLength(len);
		//camera.position.set(0,0,5).setLength(50);
		camera.lookAt(0, 0, -100);

		cameraControls_3D = new THREE.OrbitControls(camera, renderer.domElement);
		
		return camera;
		
	}


	setOrthoCamera(view_type) {
		topCamera = new THREE.OrthographicCamera(-50,50,-50,50,-1,1000);
		

		topCamera.position.set(0.5,15,-10 ); // object is at +z or near origin so sit at -z
		topCamera.up.set(0, 1, 0);
		topCamera.lookAt(new THREE.Vector3(0, 0, -100));

		cameraControls_ortho = new THREE.OrbitControls(topCamera, renderer.domElement);

		
		return topCamera;
	}

    
    setTexture(){

		const planeSize = 20;
		////// Load texture from folder
		loader = new THREE.TextureLoader();
    	loader.crossOrigin = "Anonymous"
	
		// Load texture from url
		const url_flower = "images/flower1.jpg";
		const url_cat = "images/cat.jpg";
    	texture = loader.load(url_cat)   // Load an image file into a custom material
    
	
		material_plane = new THREE.MeshBasicMaterial({ side:THREE.DoubleSide,//color: "white" });  
	                                               map:texture});

		console.log(texture)

	   
		// create a plane geometry for the image with a width of 10
		// and a height that preserves the image's aspect ratio
		geometry_plane = new THREE.PlaneGeometry(planeSize, planeSize*.75);

		// combine our image geometry and material into a mesh
		mesh_plane = new THREE.Mesh(geometry_plane, material_plane);

		// set the position of the image mesh in the x,y,z dimensions
		mesh_plane.position.set(30,50,5)

		// add the image to the scene
		scene.add(mesh_plane);     		
	}
	
	setViewport(left, bottom, width, height,hex_color) {
        renderer.setClearColor(hex_color, 1)
		renderer.setScissorTest(true);
		renderer.setScissor(left, bottom, width, height);
		renderer.setViewport(left,bottom,width,height);        
		
	}

	clear(){
		renderer.clear();
		renderer.clearDepth();
	}

	remove(name){
		var obj = scene.getObjectByName(name);
		scene.remove(obj);
	}

	setFgColor(hexacode,transparency){

		const material = new THREE.LineBasicMaterial( { color: 0x000000 } );
		
	}
	add(e)
	{
        
		e.add();
		//scene.add(e.add());
		 //console.log(e.add())
	     //console.log(scene)

    }
		
	show() {

		//renderer.setRenderTarget(renderTarget);
        //renderer.clear();
		renderer.render(scene,camera);

		//renderer.setRenderTarget(null);
		

	}

	show2(view_type) {

        //renderer.setRenderTarget(renderTarget);
        //renderer.clear();
		renderer.render(scene,topCamera);

		//renderer.setRenderTarget(null);
		
	} 
	show3(c,obj) {

        //renderer.setRenderTarget(renderTarget);
        //renderer.clear();

		renderer.render(c,topCamera);

		//renderer.setRenderTarget(null);
		
	} 





    displayTriangle (texture) {
		// create a geometry with one triangular face that has
		// the berries image mapped onto this face
		var triGeom = new THREE.Geometry();
		triGeom.vertices.push(new THREE.Vector3(0,0,0));
		triGeom.vertices.push(new THREE.Vector3(4,0,0));
		triGeom.vertices.push(new THREE.Vector3(2,3,0));
		triGeom.faces.push(new THREE.Face3(0,1,2));
	
		// add a 3-element array of THREE.Vector2 objects
		// representing texture coordinates for the three
		// vertices of the face
		var uvs = [];
		uvs.push([new THREE.Vector2(0,1),
				  new THREE.Vector2(0.5,1),
				  new THREE.Vector2(0.25,0.25)]);
		// assign the faceVertexUvs property to an array 
		// containing the uvs array inside
		triGeom.faceVertexUvs = [uvs];
		// by default, Three.js flips images upside-down, so
		// you may want to set the flipY property to false
		texture.flipY = false;
	
		var triMat = new THREE.MeshBasicMaterial({color: 0xffffff,
												  map: texture});
		var triMesh = new THREE.Mesh(triGeom, triMat);
		scene.add(triMesh);
		TW.render();    // render the scene
	}





}
