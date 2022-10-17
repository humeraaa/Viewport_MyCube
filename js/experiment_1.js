// Creates a house via Shape.js  and Creates a Triangle via Three.Shape

var h_original;
class experiment_1 {
  constructor(name) {

    const houseCoordinates = [
      {
        x: 0,
        y: 0
      },
      {
        x: 1,
        y: 0
      },
      {
        x: 1,
        y: 1
      },
      {
        x: 0.5,
        y: 1.5
      },

      {
        x: 0,
        y: 1
      },

      {
        x: 0,
        y: 0
      }
    ]

     // Shape.js is wrapper on Vector2 for e.g.  new THREE.Vector2( cordinates[i].x,cordinates[i].y)
     const t = new Shape();
     h_original = t.drawShape(houseCoordinates,0x000000);
     h_original.name = name;    

  }

  add() {
    scene.add(h_original);
    //return h_original;
  }




}