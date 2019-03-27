import {Vector} from './vector.js';
/**
* A Physics handler. Handles physics for game objects
**/
export class PhysicsHandler {
  
  constructor(mass, dampening=0, momentumVector=new Vector(0,0), position=new Vector(0, 0), angle=0) {
    this.mass = mass;
    const x = 0;
    const y = 0;
    this.position = position;
    this.momentumVector = momentumVector;
    this.shipThrust = -20;
    
    //Angle
    this.theta = angle;
    // Angular velocity
    this.omega = 0;
    // Angular Acceleration
    this.alpha = 0;

    this.turnThrust = new Vector(0, 0.01);

    this.dampening = dampening;
  }

  update(delta, shape) {
    this.updateAngle(delta);
    this.momentumVector = this.getMomentumVector();
    this.position = this.position.add(this.momentumVector);
    return this.transformPath(shape);
  }

  transformPath(path) {
    const newPath = [];
    for(let vector of path) {
      newPath.push(this.applyTransform(vector).add(this.momentumVector));
    }
    return newPath;
  }

  applyTransform(vector) {
    return vector.add(this.position)
      .rotate(this.angle, this.position);
  }

  updateAngle(delta) {
    const tempTorque = this.torque + this.omega * -3;
    this.alpha = tempTorque / this.momentOfInertia;
    this.omega += this.alpha * delta;
    this.angle += this.omega * delta;
  }

  getMomentumVector() {
    let tempMomentumVector = this.momentumVector;
    if(this.accelerating) {
      const thrustVector = new Vector(0, this.shipThrust / this.momentOfInertia);
      tempMomentumVector = tempMomentumVector.add(thrustVector.rotate(this.angle, new Vector(0, 0)));
    }
    return tempMomentumVector.add(tempMomentumVector.scale(this.dampening));
  }

  set angle(angle) {
    this.theta = angle;
  }

  get angle() {
    return this.theta;
  }

  get momentOfInertia() {
    return this.mass * (5 * 5 + 10 * 10) / 12
  }

  get torque() {
    let tempForce = undefined;
    if(this.turning == 'left') {
      tempForce = new Vector(0, 0.2).rotate(this.theta + (90 * Math.PI / 180), new Vector(0, 0));
    } else if (this.turning == 'right') {
      tempForce = new Vector(0, -0.2).rotate(this.theta + (90 * Math.PI / 180), new Vector(0, 0));
    }
    return tempForce ? new Vector(0, 0).subtract(new Vector(0, 2).rotate(this.theta, {x:0,y:0})).crossProduct(tempForce) : 0;
  }

  getState() {
    return {
      position: this.position,
      angle: this.angle
    };
  }

  setState(state) {
    this.position = new Vector(state.position.x, state.position.y);
    this.angle = state.angle;
  }

}