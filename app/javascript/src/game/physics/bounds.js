import {Vector} from './vector.js';

export class Bounds {
  constructor(topLeft, bottomRight) {
    this._topLeft = topLeft;
    this._bottomRight = bottomRight;
  }

  /*
  * Should return a vector within the given bounds, by "wrapping" from one edge to another 
  */
  wrapBounds(vector) {
    let xTemp,yTemp;
    xTemp = vector.x < this.topLeft.x ? this.bottomRight.x : vector.x > this.bottomRight.x ? this.topLeft.x : vector.x;
    yTemp = vector.y > this.bottomRight.y ? this.topLeft.y : vector.y < this.topLeft.y ? this.bottomRight.y : vector.y;
    return (xTemp == vector.x && yTemp == vector.y) ? vector : new Vector(xTemp, yTemp);
  }

  /*
  * Should return a new vector at a random position within the given bounds
  */
  vectorWithinBounds() {
    const xTemp = Math.random() * (this.bottomRight.x - this.topLeft.x) + this.topLeft.x;
    const yTemp = Math.random() * (this.bottomRight.y - this.topLeft.y) + this.topLeft.y;
    return new Vector(xTemp, yTemp);
  }

  /*
  * Should return true if the given vector is within the given bounds
  */
  inBounds(vector) {
    return (vector.x > this.topLeft.x && vector.y > this.topLeft.y) && (vector.x < this.bottomRight.x && vector.y < this.bottomRight.y);
  }

  /*
  * Should return a Vector of the centre point of these bounds
  */
  centrePoint() {
    return new Vector(((this.bottomRight.x - this.topLeft.x) / 2) + this.topLeft.x, ((this.bottomRight.y - this.topLeft.y) / 2) + this.topLeft.y);
  }

  /*
  * Should return a vector within the given bounds offest by the given amount
  */
  withinBoundsOffset(vector, offset) {
    const x = vector.x - offset < this.topLeft.x ? this.topLeft.x + offset : vector.x + offset > this.bottomRight.x ? this.bottomRight.x - offset : vector.x;
    const y = vector.y - offset < this.topLeft.y ? this.topLeft.y + offset : vector.y + offset > this.bottomRight.y ? this.bottomRight.y - offset : vector.y;
    return new Vector(x, y);
  }

  /*
  * Returns a new instance of this class which encapsulates the given path
  */
  static withPath(path) {
    const {topLeft, bottomRight} = getBoxVectors(path);
    return new Bounds(topLeft, bottomRight);
  }

  get width() {
    return this.bottomRight.x - this.topLeft.x;
  }

  get height() {
    return this.bottomRight.y - this.topLeft.y;
  }

  get topLeft() {
    return this._topLeft;
  }

  get bottomRight() {
    return this._bottomRight;
  }

  toString() {
    return `{"topLeft": {"x": ${this.topLeft.x}, "y": ${this.topLeft.y}}, bottomRight: {"x": ${this.bottomRight.x}, "y": ${this.bottomRight.y}} }`;
  }
}

/*
* Returns an array of vectors, the first the topleft, the second the bottom right of a bounding box
*/
function getBoxVectors(path) {
  const boxVectors = [];
  let topLeftX,
    topLeftY,
    bottomRightX,
    bottomRightY;
  path.forEach(vector => {
    if(vector.x < topLeftX || !(topLeftX)) {
      topLeftX = vector.x;
    }
    if(vector.y < topLeftY || !topLeftY) {
      topLeftY = vector.y;
    }
    if(vector.x > bottomRightX || !bottomRightX) {
      bottomRightX = vector.x;
    }
    if(vector.y > bottomRightY || !bottomRightY) {
      bottomRightY = vector.y;
    }
  });
  return {
    topLeft: new Vector(topLeftX, topLeftY),
    bottomRight: new Vector(bottomRightX, bottomRightY)
  };
}
