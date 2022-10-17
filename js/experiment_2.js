var mesh;

class experiment_2 {
	constructor(name) {


		//Creates an one-sided polygonal geometry from one or more path shapes.

		// make the shape
		var tri = new THREE.Shape();
		tri.moveTo(0, 10);      // x1,y1
		tri.lineTo(10, -10);   //  0+x2,y1-10
		tri.lineTo(-10, -10);  //  x2-10,y1-10-10

		// geometry
		var geometry = new THREE.ShapeGeometry(tri);
		// meh
		mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({ side: THREE.DoubleSide }));
		
		
		mesh.add(new THREE.BoxHelper(mesh,0x000000));
		//mesh.position.set(0, 0,12);
		mesh.name = name

 

	}


	add() {

        
        scene.add(mesh);
		// add the mesh to the scene
		//return mesh;

	}

}







