//https://math.hws.edu/graphicsbook/c5/s2.html
//https://discourse.threejs.org/t/trying-to-overlay-a-button-and-text-on-top-of-a-three-js-scene/390
var cube_geometry;
var cubeMaterialArray;

var wireFrameGeom; 
var wireMaterial;
var cubeWireframe;


var box;

class myCube {

  constructor() {
        /*
       6----7
      /|   /|
     2----3 |
     | |  | |
     | 4--|-5
     |/   |/
     0----1
  */

//      let cubeVertices = new Float32Array( [
//       // Data for the cubeGeom "position" attribute.
//       // Contains the x,y,z coordinates for the vertices.
//       -1, -1, 1,  // vertex number 0
//       1, -1,  1,  //1
//       -1,  1,  1, //2
//       1,  1,  1, //3
//       -1, -1, -1, //4
//       1, -1, -1, //5
//       -1,  1, -1, //6
//       1,  1, -1,  //7

// ] );

let cubeVertices = new Float32Array( [
  // Data for the cubeGeom "position" attribute.
  // Contains the x,y,z coordinates for the vertices.
  0, 0, 0,  // vertex number 0
  1, 0, 0,  //1
  0,  1, 0, //2
  1,  1,  0, //3
  0, 0, 1, //4
  1, 0, 1, //5
  0,  1,1, //6
  1,  1, 1,  //7

] );

  let cubeFaceIndexArray = [
        0, 3, 2,  // fron First triangle 
        0, 1, 3,  // FrontSecond Triangle 
        
        1, 7, 3,  // Right face.
        1, 5, 7,  // 
        
        5, 7, 6,  // Back face.
        4, 5, 6 ,  

        4, 2, 6,
        4, 0, 2,
        
      ];

      let nor = new Float32Array([
        // front
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        // right
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        // back
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        // left
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        // top
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        // bottom
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0
      ]);
    


        //cube_geometry = new THREE.Geometry();
      cube_geometry = new THREE.BufferGeometry();
        
      cube_geometry.setAttribute("position", new THREE.BufferAttribute(cubeVertices,3) );
      cube_geometry.addAttribute("normal", new THREE.BufferAttribute(nor, 3));   
      cube_geometry.setIndex(cubeFaceIndexArray,1);        
        

  
    }// end constructor

    makeInstance(color, x,y,z,sx,sy,sz){
      //makeInstance(cube_geometry,color, x) {
        
         let cubeMaterialArray =  [  // Array of materials, for use as the cube's material property.
           new THREE.MeshBasicMaterial( { color: "red", polygonOffset:true, polygonOffsetUnits: 1, polygonOffsetFactor: 1 } ),     // +x face
           new THREE.MeshBasicMaterial( { color: "cyan", polygonOffset:true, polygonOffsetUnits: 1, polygonOffsetFactor: 1 } ),    // -x face
           new THREE.MeshBasicMaterial( { color: "green", polygonOffset:true, polygonOffsetUnits: 1, polygonOffsetFactor: 1 } ),   // +y face
           new THREE.MeshBasicMaterial( { color: "magenta", polygonOffset:true, polygonOffsetUnits: 1, polygonOffsetFactor: 1 } ), // -y face
           new THREE.MeshBasicMaterial( { color: "yellow", polygonOffset:true, polygonOffsetUnits: 1, polygonOffsetFactor: 1 } ),  // +z face
           new THREE.MeshBasicMaterial( { color: "blue", polygonOffset:true, polygonOffsetUnits: 1, polygonOffsetFactor: 1 } )     // -z face
       ];
         
                          
         wireFrameGeom = new THREE.BoxGeometry(4,4,4);
         /* Create wireframe versions of the objects. */
         wireMaterial = new THREE.MeshBasicMaterial( {
          // wireframe material for showing black edges on objects
                                                   color: "Yellow",
                                                   wireframe: true,
                                                   wireframeLinewidth: 2
         
                                                  } );
         cubeWireframe = new THREE.Mesh(wireFrameGeom, cubeMaterialArray);  // working perfectly
         //cubeWireframe = new THREE.Mesh(wireFrameGeom,  wireMaterial);  // working perfectly
         //cubeWireframe = new THREE.Mesh(cube_geometry,  wireMaterial); // working perfectly

         //return cubeWireframe;

      /* To apply an array of materials to the pyramid, the vertices have
       * to be put into groups.  The groups are numbered 0,1,2,3,4,5 corresponding
       * to the array index of the material that is to be applied to that group.
       * 
      * The first parameter to addGroup() is the vertex number for the first
      * vertex in the group. The second is the number of vertices in
      * the group (this is three times the number of faces in the group).
      * The third parameter is the index into the material array.
      * (Note that the cube already comes with appropriate groups.)
      */
      cube_geometry.clearGroups();
      cube_geometry.addGroup(0,6,0);  // The two triangles that make up the base.
      cube_geometry.addGroup(6,6,1);  // Groups 1 to 4 contain one triagular face each.
      cube_geometry.addGroup(12,6,2);
      cube_geometry.addGroup(18,6,3);
      cube_geometry.addGroup(24,6,4);
      cube_geometry.addGroup(30,6,5);

      

      box = new THREE.Mesh(cube_geometry,cubeMaterialArray);
      //cubeWireframe = new THREE.Mesh(cube_geometry, cubeMaterialArray); // working perfectly
      
      box.scale.set( sx, sy, sz );
      //box.translate(x,y,z);

         
      
        
      //box.position.set(x, y, z); // SETTING THE POSITION OF THE MESH
      
      //box.add(cubeWireframe);  // Make the cube wireframe a child of cube,
                                      // so it will be transformed along with cube.
      return box;
      //return cubeWireframe;
     
    
       
      } // end function makeInstance

    

  } // end class