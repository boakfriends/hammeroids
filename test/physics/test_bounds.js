import {Bounds} from '../../app/javascript/src/game/physics/bounds.js';
import {Vector} from '../../app/javascript/src/game/physics/vector.js';

const assert = require('assert');

describe('Bounds', function() {
  describe('#wrapBounds', function() {
    it('Should return a vector within the given bounds, by "wrapping" from one edge to another ', function() {
      // Given
      const topLeft = new Vector(0, 0);
      const bottomRight = new Vector(5, 5);
      const bounds = new Bounds(topLeft, bottomRight);

      // When
      const testVector = new Vector(10, 10);
      const newVector = bounds.wrapBounds(testVector);

      // Then
      assert(newVector.x <= bottomRight.x);
      assert(newVector.y <= bottomRight.y);
      assert(newVector.x >= topLeft.x);
      assert(newVector.y >= topLeft.y);
    });

    it('Should return the same vector object if it is in bounds', function() {
      // Given
      const topLeft = new Vector(0, 0);
      const bottomRight = new Vector(5, 5);
      const bounds = new Bounds(topLeft, bottomRight);

      // When
      const testVector = new Vector(3, 3);
      const newVector = bounds.wrapBounds(testVector);

      // Then
      assert(newVector == testVector);
    });
  });

  describe('#vectorWithinBounds', function() {
    it('Should return a new vector at a random position within the given bounds', function() {
      // Given
      const topLeft = new Vector(0, 0);
      const bottomRight = new Vector(5, 5);
      const bounds = new Bounds(topLeft, bottomRight);

      // When
      const newVector = bounds.vectorWithinBounds();

      // Then
      assert(newVector.x <= bottomRight.x);
      assert(newVector.y <= bottomRight.y);
      assert(newVector.x >= topLeft.x);
      assert(newVector.y >= topLeft.y);
    });
  });

  describe('#inBounds', function() {
    it('Should return true if the given vector is within the given bounds', function() {
      // Given
      const topLeft = new Vector(0, 0);
      const bottomRight = new Vector(5, 5);
      const bounds = new Bounds(topLeft, bottomRight);

      // When
      const testVector = new Vector(3, 3);

      // Then
      assert(bounds.inBounds(testVector));
    });
  });

  describe('#centrePoint', function() {
    it('Should return a vector representing the centre point of these bounds', function() {
      // Given
      const topLeft = new Vector(0, 0);
      const bottomRight = new Vector(5, 5);
      const bounds = new Bounds(topLeft, bottomRight);

      // When
      const testVector = bounds.centrePoint();

      // Then
      assert.equal(testVector.x, 2.5);
      assert.equal(testVector.y, 2.5);
    });
  })

  describe('#constructor', function() {
    it('Should contruct a bounding box which encapsulates the given path', function() {
      // Given
      const path = [
        new Vector(-10, -10),
        new Vector(-11,0),
        new Vector(-5, 0),
        new Vector(0, 0),
        new Vector(5,5)
      ];
      // When
      const box = Bounds.withPath(path);

      // Then
      assert.equal(box.topLeft.x, -11);
      assert.equal(box.topLeft.y, -10);
      assert.equal(box.bottomRight.x, 5);
      assert.equal(box.bottomRight.y, 5);
    });
  });
})