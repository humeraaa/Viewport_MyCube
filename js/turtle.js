// import * as THREE from "./three.js";
class Turtle {
  constructor(CP, CD) {
    //CURRENT POINT
    this.CP = CP;
    //CURRENT ANGLE
    this.CD = CD;
    //CURRENT PATHS
    this.path = new THREE.Path();
    this.path.moveTo(this.CP.x, this.CP.y);
    this.points = this.path.getPoints();
    this.geometry = new THREE.BufferGeometry().setFromPoints(this.points);
    this.material = new THREE.LineBasicMaterial({ color: 0xffffff });
    this.line = new THREE.Line(this.geometry, this.material);
  }

  //TURNING TO A SPECIFIC ANGLE
  turnTo(angle) {
    this.CD = angle;
  }
  //MOVING TO A SPECIFIC ANGLE WRT CURRENT ANGLE
  turn(angle) {
    this.CD += angle;
    console.log(angle)
  }
  //MOVING FORWARD TO A DISTANCE 
  forward(dist, isVisible) {
    var radPerDeg = 0.017453393;
    var x = this.CP.x + dist * Math.cos(radPerDeg * this.CD);
    var y = this.CP.y + dist * Math.sin(radPerDeg * this.CD);
    if (isVisible) this.path.lineTo(x, y);
    else this.path.moveTo(x, y);
    this.CP = new THREE.Vector2(x, y);
    console.log(this.CP)
  }
  //DRAWING ALL THE MOVEMENTS
  drawTurtle() {
    //CURRENT PATHS
    this.path.moveTo(this.CP.x, this.CP.y);
    this.points = this.path.getPoints();
    this.geometry = this.geometry.setFromPoints(this.points);
    // this.material = new THREE.LineBasicMaterial({ color: 0xffffff });
    this.line = new THREE.Line(this.geometry, this.material);
    // return this.line;
    return this.line;
  }
}