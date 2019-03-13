import {Physics} from '../physics/physics.js'
import {PathDrawer} from '../drawing/pathdrawer.js';

export class Asteroid {
  constructor() {
    this.coords = [[-11,-26],
      [19,-26],
      [39,-6],
      [29,24],
      [-1,34],
      [-11,24],
      [-1,14],
      [-21,14],
      [-31,-16],
      [-11,-26]];
    const friction = 1,
      turnRate = 0,
      speed = 0;
    this.physics = new Physics(friction, turnRate, speed, Math.random() * 200 - 100, Math.random() * 200 - 100, Math.random() * 360, Math.random() * 10 - 5, Math.random() * 10 - 5);
  }

  getDrawer() {
    const newCoords = [];
    for(let coord of this.coords) {
      newCoords.push(this.physics.getTransform(coord[0], coord[1]));
    }
    const params = {
      strokeStyle: "#234323",
      lineWidth: 4
    }
    return new PathDrawer(newCoords, params);
  }

  update() {
    this.physics.update();
  }

  initialise() {
    this.physics.turn(function(angularMomentum, acceleration) {
      return (Math.random() * 10) - 5;
    });
  }

};