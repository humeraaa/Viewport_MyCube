//import * as THREE from "/js/three.module.js";
//export
class Shape {
    constructor(){
        
    }
    drawShape(cordinates,hex_code){
        const points = [];
        for (let i = 0;i<cordinates.length; i++){
            points.push( new THREE.Vector2( cordinates[i].x,cordinates[i].y) );
            
        }
        


        const material = new THREE.LineBasicMaterial( { color: hex_code } );
        const geometry= new THREE.BufferGeometry().setFromPoints( points );
        const line = new THREE.Line( geometry, material );
        line.scale.set(10,10)
        return line
    }
     multiplyMatrices = (a, b) => {
        
        let x = a.length,
        z = a[0].length,
        y = b[0].length;
        
        let productRow = Array.apply(null, new Array(y)).map(Number.prototype.valueOf, 0);
        let product = new Array(x);
        for (let p = 0; p < x; p++) {
           product[p] = productRow.slice();
        }
        for (let i = 0; i < x; i++) {
           for (let j = 0; j < y; j++) {
              for (let k = 0; k < z; k++) {
                 product[i][j] += a[i][k] * b[k][j];
              }
           }
        }
        let point = {
           x : product[0][0],
           y : product[1][0],
        }
        return point;
     }

     rotateShape(cordinates,angle){
        let rotatedPoints = []
        for (let i = 0;i<cordinates.length;i++){
         let x = cordinates[i].x
         let y = cordinates[i].y

        let a = [
         [Math.cos(angle * (Math.PI / 180)), - Math.sin(angle * (Math.PI / 180))],
         [Math.sin(angle * (Math.PI / 180)),  Math.cos(angle * (Math.PI / 180))],
        
      ];
      console.log(a)
      
      let b = [
         [x],
         [y]
        
      ];
     
      let point = this.multiplyMatrices(a, b)
      rotatedPoints.push(point)

     }
       return rotatedPoints
     }

    reflectShape(cordinates,axis){
      let reflectedPoints = []
       if(axis == "x"){
        
         for (let i = 0;i<cordinates.length;i++){
             let x = cordinates[i].x
             let y = cordinates[i].y
 
            let a = [
             [1, 0],
             [0, -1],
            
          ];
          
          let b = [
             [x],
             [y]
            
          ];
         
          let point = this.multiplyMatrices(a, b)
          reflectedPoints.push(point)
 
         }
         
         
     }
     else if(axis == "y"){
      for (let i = 0;i<cordinates.length;i++){
         let x = cordinates[i].x
         let y = cordinates[i].y

        let a = [
         [-1, 0],
         [0, 1],
        
      ];
      
      let b = [
         [x],
         [y]
        
      ];
     
      let point = this.multiplyMatrices(a, b)
      reflectedPoints.push(point)

     }
     }
     return reflectedPoints
       }
        
}