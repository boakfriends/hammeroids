import {Physics} from '../physics/physics.js'
import {PathDrawer} from '../drawing/pathdrawer.js';
import {TextDrawer} from '../drawing/textdrawer.js';

export class Ship {
  constructor(x, y) {
    const friction = 0.98,
      speed = 0.1,
      turnRate = 0.2;
    this.coords = [
      [0, -10],
      [7, 8],
      [0, 2],
      [-7, 8]
    ];
    this.strokeStyle = 'rgb(255,255,255)'
    this.lineWidth = 2; 
    this.turning;
    this.accelerating = false;
    this.physics = new Physics(friction, turnRate, speed, x, y);
  }

  getDrawer() {
    const newCoords = [];
    for(let coord in this.coords) {
      newCoords.push(this.physics.getTransform(this.coords[coord][0], this.coords[coord][1]));
    }
    const xy = {x: this.physics.position.x, y: this.physics.position.y};
    return new PathDrawer(this.strokeStyle, this.lineWidth, newCoords);
  }

  getDetail() {
    return new TextDrawer(this.physics.position.x, this.physics.position.y, this.name);
  }

  getState() {
    return this.physics.getState();
  }

  setAccelerating(accelerating) {
    this.accelerating = accelerating;
  }

  setTurning(turning) {
    this.turning = turning;
  }

  setData(data) {
    this.physics.setState(data);
  }

  setName(name) {
    this.name = name;
  }

  update() {
    if(this.accelerating) {
      this.physics.accel();
    }
    if(this.turning) {
      this.physics.turn(this.turning);
    }
    this.physics.update();
  }
}