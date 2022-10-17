
var SCREEN_W, SCREEN_H;
SCREEN_W = window.innerWidth;
SCREEN_H = window.innerHeight;

console.log(SCREEN_W);
console.log(SCREEN_H);

//window.addEventListener( 'resize', onWindowResize, false );

//The stage constructor Create a threejs renderer:
// 1. Size it correctly
// 2. Set default background color
// 3. Append it to the page
var stage = new myStageFactory(); //factory arguments (position_X, position_Y, position_z, Length)
var myBox = new myCube(); 
var testBox;
var buildings;


//window.onload = initialize;  // Arranges for init() to be called after page is loaded.


/////////////////Hiding THREE.js functionality behind user defined functions////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

initialize();           // renderer or vitural GPU setttings called only once
                        // Lights, Camera, Camera Animation/controls 

create_scene();         // create geometry of 2D and 3D objects
myDisplay();            // myDisplay() will run 
myAnimate();

 
///////// function initialize() to initialize GPU related Settings////////////////////////////
///////////////////Also adds Lights,Camera, Texture to Scene ////////////////////////////////////////////////////////////////////////////////
function initialize() {
    
	stage.get_renderer();
	
	//stage.setCanvas(800,600); 
	stage.setCanvas(1600,768);  
    stage.setBgColor(0x000000,1.0);  // hexacode,alpha

	stage.setAmbientLight();

	stage.setPerspectiveCamera(40,2,20,10,100);  // angle;ex,ey,ez: equal on xz, high on y; lenght = 50 
    stage.setOrthoCamera("top-view");

	stage.setTexture(); // Paste an image on plane geometry

	
	}

///////// function create_scene() to create 2D or 3D objects ////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////	

function create_scene() {
     //OBJECTS
    //////////// Experiment No. 1-2  Shapes and Viewport //////////////////////////////////
	       
	object1 = new experiment_1("house_1");   // Draw house on 1st/left viewport
	console.log(object1)
	object2 = new experiment_2("bounded_Triangle_1");  // Draw Triangle on 2nd/right viewport
	console.log(object2)

	
	
	
    
}
///////// function myDisplay() to show on stage once ////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////	

//Code your logic here..
function myDisplay() {
	
	console.log(scene); // children 0: GridHelper: name=''
	                    // childern 1: Line: name='house_1'  
						// childern 2: GridHelper: name=''
						// childern 3: Mesh: name='bounded_Triangle_1'   

    stage.clear();      // erases previous content from GPU/Framebuffer
	                    // but scene graph still contains all objects

	
	////////////////////////// VIEWPORT -I///////////////////////////////
	stage.setViewport(0,0,512,768,0x0000ff);
	stage.setGrid(8,8,"white",0x000000,"grid1")
	stage.remove("bounded_Triangle_1");  // advantage of name property
	stage.add(object1);

	stage.show();   
	

	////////////////////////// VIEWPORT - II///////////////////////////////
	stage.setViewport(512, 0, 512, 768,0x04f3f2f);
	stage.setGrid(15,15,"white",0x4f4f00,"grid2");
	stage.remove("grid1")
	stage.remove("house_1");  // advantage of name property
	stage.add(object2)  //x=0,y=0,z =12 along with Bounding Box

	stage.show2("topview"); 

	
	////////////////////////// VIEWPORT - III///////////////////////////////
	stage.setViewport(2*512+30, 0, 512, 768,0x000000);	
	//for( var i = scene.children.length - 1; i >= 0; i--) { 
	//for( var i = scene.children.length - 5; i >= 0; i--) { 	
		//obj = scene.children[i];
		//scene.remove(obj); 
  // }
	testBox = myBox.makeInstance(0x44FF44,5,15,0,15,15,15);  // delx,dely,delz,sx,sy,sz
	scene.add(testBox);

	stage.show();  
	
	//buildings = [
		//myBox.makeInstance(cube_geometry, 0x44FF44,  0),
		//myBox.makeInstance(cube_geometry, 0x4444FF, -4),
		//myBox.makeInstance(cube_geometry, 0xFF4444,  4),
	  //];

	  //console.log(buildings[0]);
	
	
}


///////// function myAnimate() which calls myDisplay in an endless loop ////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////	


function myAnimate() {
		
	
	myDisplay();
	requestAnimationFrame(myAnimate);
    



}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}




