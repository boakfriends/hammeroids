export class Interval {
  constructor(object, type, point, beginning) {
    this._type = type;
    this._object = object;
    this._point = point;
    this._beginning = beginning;
    this._objects = [];
  }

  static addToArray(array, axis, object) {
    const box = object.getBoundingBox();
    const b = new Interval(object, 'b', box.topLeft[axis]);
    const e = new Interval(object, 'e', box.bottomRight[axis], b);
    array.push(b);
    array.push(e);
    return array;
  }

  get start() {
    return this._beginning;
  }

  /*
  * Adds an object that potentially collides with this one
  */
  add(obj) {
    this._objects.push(obj);
  }

  hasOverlap() {
    return this._objects.length > 0;
  }

  get point() {
    return this._point;
  }

  get object() {
    return this._object;
  }

  get objects() {
    const tempArray = [];
    tempArray.push(this.object);
    this._objects.forEach(obj => tempArray.push(obj));
    return tempArray;
  }

  get type() {
    return this._type;
  }
}