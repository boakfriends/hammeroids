export class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(vector) {
    return newVector(this, vector, (x1, x2) => x1 + x2);
  }

  subtract(vector) {
    return newVector(this, vector, (x1, x2) => x1 - x2);
  }

  multiply(vector) {
    return newVector(this, vector, (x1, x2) => x1 * x2);
  }

  dotProduct(vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  /**
  * Cross product will be scalar because we're working in 2 dimensions - we only need to return the z product (x and y will always be 0 because z is always 0)
  **/
  crossProduct(vector) {
    return this.x * vector.y - this.y * vector.x;
  }

  /**
  * Takes an angle and a vector. Rotates this vector around the given vector using the given angle.
  * Note: direction of rotation is CCW if a positive number
  **/
  rotate(angle, vector) {
    let xTemp = this.x - vector.x;
    let yTemp = this.y - vector.y;

    let x_prime = vector.x + (xTemp * Math.cos(angle) - yTemp * Math.sin(angle));
    let y_prime = vector.y + (xTemp * Math.sin(angle) + yTemp * Math.cos(angle));
    return new Vector(x_prime, y_prime);
  }

  scale(scale) {
    return new Vector(this.x * scale, this.y * scale);
  }

  toString() {
    return `{"x": ${this.x}, "y": ${this.y}}`;
  }

  angle() {
    return Math.atan2(this.y, this.x);
  }

  static fromString(string) {
    const coords = JSON.parse(string);
    return new Vector(coords.x, coords.y);
  }

}

const newVector = (v1, v2, func) => {
  return new Vector(func(v1.x, v2.x), func(v1.y, v2.y));
}