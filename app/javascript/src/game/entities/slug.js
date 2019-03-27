import {PathDrawer} from '../drawing/pathdrawer.js';
import {PhysicsHandler} from '../physics/physicshandler.js';
import {Vector} from '../physics/vector.js';
import {DetailDrawer} from '../drawing/detaildrawer.js';
import { Bounds } from '../physics/bounds.js';

export class Slug {
  constructor(position, angle, parentId) {
    if(!(position instanceof Vector)) {
      position = new Vector(position.x, position.y);
    }
    const momentumVector = new Vector(0, -11).rotate(angle, {x:0, y:0});
    const mass = 0.1;
    this.physics = new PhysicsHandler(mass, 0, momentumVector, position, angle);
    this.shape = [new Vector(0,4),new Vector(0,-4)];
    this._path = this.getPath(this.shape, position, angle);
    this.alive = true;
    this._parentId = parentId;
  }

  static fromPlayerShip(position, angle, parentId) {
    return new Slug(position.add(new Vector(0, -20).rotate(angle, {x:0, y:0})), angle, parentId);
  }

  getPath(shape, position, angle) {
    const path = [];
    for(let vector of shape) {
      path.push(vector.rotate(angle, {x:0, y:0}).add(position));
    }
    return path;
  }

  getDrawer() {
    const params = {
      'strokeStyle': 'rgb(255,255,255)',
      'lineWidth': 4
    }
    return new PathDrawer(this.path, params);
  }

  getBoundingBox() {
    return Bounds.withPath(this.path);
  }

  getDetail() {
    return new DetailDrawer(this);
  }

  update(delta) {
    this.path = this.physics.update(delta, this.shape);
    if(this.colliding) {
      this.dead = true;
    }
  }

  getState() {
    return this.physics.getState();
  }

  setState(state) {
    this.physics.setState(state);
  }

  get path() {
    return this._path;
  }

  set path(path) {
    this._path = path;
  }

  get parentId() {
    return this._parentId;
  }
}