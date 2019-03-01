export class Physics {
  constructor(friction, turnRate, speed, x, y, angle = 0 , xMomentum = 0, yMomentum = 0) {
    this._friction = friction;
    this._turnRate = turnRate;
    this._speed = speed;
    this._momentum = new Momentum(xMomentum, yMomentum, 0);
    this._position = new Position(x, y, angle);
  }

  accel = () => {
    const xMomentumAddition = Physics.getCosOfDegrees(this._position.angle + 90),
      yMomentumAddition = Physics.getCosOfDegrees(this._position.angle);
    this._momentum.xMomentum += xMomentumAddition * this._speed;
    this._momentum.yMomentum += yMomentumAddition * this._speed;
  }

  update = () => {
    this.updateMomentum();
    this.updatePosition();
  }

  updateMomentum = () => {
    for (let key in this._momentum) {
      this._momentum[key] *= this._friction;
    }
  }

  updatePosition = () => {
    this._position.x += this._momentum.xMomentum;
    this._position.y += this._momentum.yMomentum;
    this._position.angle = (this._momentum.angularMomentum + this._position.angle) % 360;
  }

  turn = (momentumFunction) => {
    this._momentum.angularMomentum = momentumFunction(this._momentum.angularMomentum, this._turnRate);
  }

  getState = () => {
    return this._position;
  }

  getTransform = (x, y) => {
    const xPoint = x * Math.cos(this._position.angle * Math.PI / 180) - y * Math.sin(this._position.angle * Math.PI / 180) + this._position.x,
      yPoint = x * Math.sin(this._position.angle * Math.PI / 180) + y * Math.cos(this._position.angle * Math.PI / 180) + this._position.y;
    return {
      x: xPoint,
      y: yPoint
    };
  }

  static getCosOfDegrees(angle) {
    return -Math.cos(angle * Math.PI / 180);
  }
}

export class Position {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
  }
}

export class Momentum {
  constructor(xMomentum, yMomentum, angularMomentum) {
    this.xMomentum = xMomentum;
    this.yMomentum = yMomentum;
    this.angularMomentum = angularMomentum;
  }
}