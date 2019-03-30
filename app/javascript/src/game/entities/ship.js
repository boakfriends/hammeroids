import {PathDrawer} from '../drawing/pathdrawer.js';
import {TextDrawer} from '../drawing/textdrawer.js';
import {PhysicsHandler} from '../physics/physicshandler.js';
import {Vector} from '../physics/vector.js';

export class Ship {
  constructor(x, y, angle) {
    const friction = 0.98,
      speed = 1.2,
      turnRate = 0.2;
    this.shape = [
      new Vector(0, -10),
      new Vector(7, 8),
      new Vector(0, 2),
      new Vector(-7, 8)
    ];
    this.turning;
    this.accelerating = false;
    const mass = 10;
    this.physics = new PhysicsHandler(mass, -0.02, undefined, new Vector(x, y), angle);
    this.path = this.shape;
  }

  getDrawer() {
    const params = {
      'shadowColor': "white",
      'shadowOffsetX': 0,
      'shadowOffsetY': 0,
      'shadowBlur': 5,
      'strokeStyle': 'rgb(255,255,255)',
      'lineWidth': 2
    }
    return new PathDrawer(this.path, params);
  }

  getDetail() {
    const params = {
      'fillStyle': 'white',
      'font': "10px Arial",
      'textAlign': "center"
    }
    return new TextDrawer(this.getPosition(), this.name, params);
  }

  getPosition() {
    return this.physics.position;
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

  update(delta) {
    this.path = this.physics.update(delta, this.shape);
  }

  get path() {
    return this._path;
  }

  set path(path) {
    this._path = path;
  }

  get velocity() {
    return this.physics.velocity;
  }
}