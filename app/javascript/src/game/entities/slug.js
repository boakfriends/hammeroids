import {Physics} from '../physics/physics.js'
import {PathDrawer} from '../drawing/pathdrawer.js';

export class Slug {
  constructor(position) {
    const SLUG_SPEED = 6,
      xMomentum = Physics.getCosOfDegrees(position.angle + 90),
      yMomentum = Physics.getCosOfDegrees(position.angle);
    this._physics = new Physics(1, 3, 1, position.x, position.y, position.angle, xMomentum * SLUG_SPEED, yMomentum * SLUG_SPEED);
    this._slugCoords = [[0,4],[0,-4]];
  }

  getDrawer = () => {
    const newCoords = [];
    for(let coord in this._slugCoords) {
      newCoords.push(this._physics.getTransform(this._slugCoords[coord][0], this._slugCoords[coord][1]));
    }
    return new PathDrawer('rgb(255,255,255)', 4, newCoords);
  }

  getDetail = () => {
    return {draw: () => {}}
  }

  update = () => {
    this._physics.update();
  }

  getState = () => {
    return this._physics.getState();
  }

  setState = (state) => {
    this._physics.setState(state);
  }
}