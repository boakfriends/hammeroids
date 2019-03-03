export class Delta {
  constructor(shipPosition, {x, y}) {
    this.shipPosition = shipPosition
    this.camera = this.camera || {};
    this.camera.x = x;
    this.camera.y = y;
  }

  get x() {
    return (this.shipPosition.x - this.camera.x) / 10;
  }


  get y() {
    return (this.shipPosition.y - this.camera.y) / 10;
  }
}