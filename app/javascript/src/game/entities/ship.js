import {PathDrawer} from '../drawing/pathdrawer.js';
import {PhysicsHandler} from '../physics/physicshandler.js';
import {Vector} from '../physics/vector.js';
import { Bounds } from '../physics/bounds.js';
import { DetailDrawer } from '../drawing/detaildrawer.js';

export class Ship {
  constructor(x, y, angle, id) {
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
    this.health = 100;
    this.id = id;
  }

  getDrawer() {
    const params = {
      'shadowColor': "white",
      'shadowOffsetX': 0,
      'shadowOffsetY': 0,
      'shadowBlur': 5,
      'strokeStyle': `rgb(${this.health * 2.55},${this.health * 2.55},${this.health * 2.55})`,
      'lineWidth': 2
    }
    if(this.colliding) {
      params.strokeStyle = 'rgb(244, 66, 89)';
    }
    return new PathDrawer(this.path, params);
  }

  getDetail() {
    return new DetailDrawer(this);
  }

  getBoundingBox() {
    return Bounds.withPath(this.path);
  }

  getPosition() {
    return this.physics.position;
  }

  getState() {
    const state = this.physics.getState();
    state.health = this.health;
    return state;
  }

  setAccelerating(accelerating) {
    this.accelerating = accelerating;
  }

  setTurning(turning) {
    this.turning = turning;
  }

  setData(data) {
    this.health = data.health;
    this.physics.setState(data);
  }

  setName(name) {
    this.name = name;
  }

  update(delta) {
    this.path = this.physics.update(delta, this.shape);
    if(this.colliding) {
      this.health -= 10;
    }
    if(this.health <= 0) {
      this.dead = true;
    }
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

  get parentId() {
    return this.id;
  }
}