import {Physics} from '../physics/physics.js'
import {PathDrawer} from '../drawing/pathdrawer.js';
import {TextDrawer} from '../drawing/textdrawer.js';

export class Ship {
  constructor(x, y) {
    const friction = 0.98,
      speed = 0.1,
      turnRate = 0.2;
    this._coords = [
      [0, -10],
      [7, 8],
      [0, 2],
      [-7, 8]
    ];
    this._turning;
    this._accelerating = false;
    this._physics = new Physics(friction, turnRate, speed, x, y);
  }

  getDrawer = () => {
    const newCoords = [];
    for(let coord in this._coords) {
      newCoords.push(this._physics.getTransform(this._coords[coord][0], this._coords[coord][1]));
    }
    const params = [
      {'key': 'shadowColor', 'value': "white"},
      {'key': 'shadowOffsetX', 'value': 0},
      {'key': 'shadowOffsetY', 'value': 0},
      {'key': 'shadowBlur', 'value': 5},
      {'key': 'strokeStyle', 'value': 'rgb(255,255,255)'},
      {'key': 'lineWidth', 'value': 2}
    ]
    return new PathDrawer(newCoords, params);
  }

  getDetail = () => {
    return new TextDrawer(this._physics._position.x, this._physics._position.y, this._name);
  }

  getState = () => {
    return this._physics.getState();
  }

  setAccelerating = (accelerating) => {
    this._accelerating = accelerating;
  }

  setTurning = (turning) => {
    this._turning = turning;
  }

  setName = (name) => {
    this._name = name;
  }

  update = () => {
    if(this._accelerating) {
      this._physics.accel();
    }
    if(this._turning) {
      this._physics.turn(this._turning);
    }
    this._physics.update();
  }
}