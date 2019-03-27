import {PathDrawer} from '../drawing/pathdrawer.js';
import {PhysicsHandler} from '../physics/physicshandler.js';
import {Vector} from '../physics/vector.js';

export class Slug {
  constructor(position, angle) {
    if(!(position instanceof Vector)) {
      position = new Vector(position.x, position.y);
    }
    const momentumVector = new Vector(0, -11).rotate(angle, {x:0, y:0});
    const mass = 0.1;
    this.physics = new PhysicsHandler(mass, 0, momentumVector, position, angle);
    this.shape = [new Vector(0,4),new Vector(0,-4)];
    this._path = this.getPath(this.shape, position, angle);
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

  getDetail() {
    return {draw: () => {}}
  }

  update(delta) {
    this.path = this.physics.update(delta, this.shape);
  }

  getState() {
    return {
      state: this.physics.getState(),
      timeStamp: Date.now()
    };
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
}