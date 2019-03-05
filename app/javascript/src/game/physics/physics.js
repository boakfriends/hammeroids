export class Physics {
  constructor(friction, turnRate, speed, x, y, angle = 0 , xMomentum = 0, yMomentum = 0) {
    this.friction = friction;
    this.turnRate = turnRate;
    this.speed = speed;
    this.momentum = new Momentum(xMomentum, yMomentum, 0);
    this.position = new Position(x, y, angle);
  }

  accel() {
    const xMomentumAddition = Physics.getCosOfDegrees(this.position.angle + 90),
      yMomentumAddition = Physics.getCosOfDegrees(this.position.angle);
    this.momentum.xMomentum += xMomentumAddition * this.speed;
    this.momentum.yMomentum += yMomentumAddition * this.speed;
  }

  update() {
    this.updateMomentum();
    this.updatePosition();
  }

  updateMomentum() {
    for (let key in this.momentum) {
      this.momentum[key] *= this.friction;
    }
  }

  updatePosition() {
    this.position.x += this.momentum.xMomentum;
    this.position.y += this.momentum.yMomentum;
    this.position.angle = (this.momentum.angularMomentum + this.position.angle) % 360;
  }

  turn(momentumFunction) {
    this.momentum.angularMomentum = momentumFunction(this.momentum.angularMomentum, this.turnRate);
  }

  getState() {
    return {"position": this.position, "momentum": this.momentum};
  }

  setState(data) {
    this.position = data.position;
    this.momentum = data.momentum;
  }

  getTransform(x, y) {
    const xPoint = x * Math.cos(this.position.angle * Math.PI / 180) - y * Math.sin(this.position.angle * Math.PI / 180) + this.position.x,
      yPoint = x * Math.sin(this.position.angle * Math.PI / 180) + y * Math.cos(this.position.angle * Math.PI / 180) + this.position.y;
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