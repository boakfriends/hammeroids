import {Physics} from '../physics/physics.js'
import {PathDrawer} from '../drawing/pathdrawer.js';

export class Slug {
  constructor(position) {
    const SLUG_SPEED = 7,
      xMomentum = Physics.getCosOfDegrees(position.angle + 90),
      yMomentum = Physics.getCosOfDegrees(position.angle);
    this.physics = new Physics(1, 3, 1, position.x, position.y, position.angle, xMomentum * SLUG_SPEED, yMomentum * SLUG_SPEED);
    this.slugCoords = [[0,4],[0,-4]];
  }

  getDrawer() {
    const newCoords = [];
    for(let coord in this.slugCoords) {
      newCoords.push(this.physics.getTransform(this.slugCoords[coord][0], this.slugCoords[coord][1]));
    }
    const params = {
      'strokeStyle': 'rgb(255,255,255)',
      'lineWidth': 4
    }
    return new PathDrawer(newCoords, params);
  }

  getDetail() {
    return {draw: () => {}}
  }

  update(delta) {
    this.physics.update(delta);
  }

  getState() {
    return this.physics.getState();
  }

  setState(state) {
    this.physics.setState(state);
  }
}