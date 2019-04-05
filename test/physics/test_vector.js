import {Vector} from '../../app/javascript/src/game/physics/vector.js';

const assert = require('assert');
const EPSILON = 0.001;

describe('Vector', function() {
  describe('#add', function() {
    it('Should add two positive vectors together to produce a new vector with the sum of both', function() {
      // Given
      const vector = new Vector(2, 1);
      const vectorB = new Vector(2, 1)

      // When 
      const newVector = vector.add(vectorB);

      // Then
      assert.equal(newVector.x, 4);
      assert.equal(newVector.y, 2);
    });

    it('Should add two vectors together, positive and negative, to produce a new vector with the sum of both', function() {
      // Given
      const vector = new Vector(2, 1);
      const vectorB = new Vector(-4, -3)

      // When 
      const newVector = vector.add(vectorB);

      // Then
      assert.equal(newVector.x, -2);
      assert.equal(newVector.y, -2);
    });
  });

  describe('#subtract', function() {
    it('Should subtract two vectors to produce a new vector, the difference of both', function() {
      // Given
      const vector = new Vector(2, 1);
      const vectorB = new Vector(4, 3)

      // When 
      const newVector = vector.subtract(vectorB);

      // Then
      assert.equal(newVector.x, -2);
      assert.equal(newVector.y, -2);
    });

    it('Should subtract two vectors, positive and negative, to produce a new vector, the difference of both', function() {
      // Given
      const vector = new Vector(2, 1);
      const vectorB = new Vector(-4, -5)

      // When 
      const newVector = vector.subtract(vectorB);

      // Then
      assert.equal(newVector.x, 6);
      assert.equal(newVector.y, 6);
    });
  });

  describe('#multiply', function() {
    it('Should multiply two vectors together to produce a new vecotr, the product of both', function() {
      // Given
      const vector = new Vector(2, 3);
      const vectorB = new Vector(4, 7)

      // When 
      const newVector = vector.multiply(vectorB);

      // Then
      assert.equal(newVector.x, 8);
      assert.equal(newVector.y, 21);
    });

    it('Should multiply two vectors together, positive and negative, to produce a new vecotr, the product of both', function() {
      // Given
      const vector = new Vector(2, 3);
      const vectorB = new Vector(-2, -1)

      // When 
      const newVector = vector.multiply(vectorB);

      // Then
      assert.equal(newVector.x, -4);
      assert.equal(newVector.y, -3);
    });
  });

  describe('#dotProduct', function() {
    it('Should return the dot product of two vectors as a scalar', function() {
      // Given
      const vector = new Vector(2, 3);
      const vectorB = new Vector(3, 4)

      // When 
      const dotProduct = vector.dotProduct(vectorB);

      // Then
      assert.equal(dotProduct, 18);
    });

    it('Should return the dot product of two vectors, positive and negative, as a scalar', function() {
      // Given
      const vector = new Vector(2, 3);
      const vectorB = new Vector(-5, -3)

      // When 
      const dotProduct = vector.dotProduct(vectorB);

      // Then
      assert.equal(dotProduct, -19);
    });
  })

  describe('#crossProduct', function() {
    it('Should return the cross product of two vectors as a scalar (because z axis is always 0)', function() {
      // Given
      const vector = new Vector(2, 3);
      const vectorB = new Vector(3, 4)

      // When 
      const crossProduct = vector.crossProduct(vectorB);

      // Then
      assert.equal(crossProduct, -1);
    });

    it('Should return the cross product of two vectors, positive and negative, as a scalar (because z axis is always 0)', function() {
      // Given
      const vector = new Vector(2, 3);
      const vectorB = new Vector(-5, -3)

      // When 
      const crossProduct = vector.crossProduct(vectorB);

      // Then
      assert.equal(crossProduct, 9);
    });
  });

  describe('#rotate', function() {
    it('Should rotate a vector by a given angle (in radians) about the given vector', function() {
      // Given
      const vector = new Vector(2, 3);
      const vectorB = new Vector(0, 0)
      const degrees = 90;
      const radians = degrees * Math.PI / 180;

      // When 
      const newVector = vector.rotate(radians, vectorB);

      // Then
      assert(Math.abs(newVector.x - -3) < EPSILON);
      assert(Math.abs(newVector.y - 2) < EPSILON);
    });

    it('Should rotate a vector by a given negative angle (in radians) about the given vector', function() {
      // Given
      const vector = new Vector(2, 3);
      const vectorB = new Vector(0, 0)
      const degrees = -90;
      const radians = degrees * Math.PI / 180;

      // When 
      const newVector = vector.rotate(radians, vectorB);

      // Then
      assert(Math.abs(newVector.x - 3) < EPSILON);
      assert(Math.abs(newVector.y - -2) < EPSILON);
    });

    it('Should rotate a vector by a given angle (in radians) about the given negative vector', function() {
      // Given
      const vector = new Vector(2, 3);
      const vectorB = new Vector(-2, -2)
      const degrees = 90;
      const radians = degrees * Math.PI / 180;

      // When 
      const newVector = vector.rotate(radians, vectorB);

      // Then
      const xExpected = -7;
      assert(Math.abs(newVector.x - xExpected) < EPSILON, `Expected was ${xExpected}, actual was ${newVector.x}`);
      const yExpected = 2;
      assert(Math.abs(newVector.y - yExpected) < EPSILON, `Expected was ${yExpected}, actual was ${newVector.y}`);
    });

    it('Should rotate a vector by a given negative angle (in radians) about the given negative vector', function() {
      // Given
      const vector = new Vector(5, 3);
      const vectorB = new Vector(-2, -2)
      const degrees = -90;
      const radians = degrees * Math.PI / 180;

      // When 
      const newVector = vector.rotate(radians, vectorB);

      // Then
      const xExpected = 3;
      assert(Math.abs(newVector.x - xExpected) < EPSILON, `Expected was ${xExpected}, actual was ${newVector.x}`);
      const yExpected = -9;
      assert(Math.abs(newVector.y - yExpected) < EPSILON, `Expected was ${yExpected}, actual was ${newVector.y}`);
    });
  });

  describe('#angle', function() {
    it('Should return the angle of the vector', function() {
      // Given
      const vector = new Vector(5, 5);

      // When 
      const angle = vector.angle();

      // Then
      assert.equal(angle * 180 / Math.PI, 45);
    });
  })
});