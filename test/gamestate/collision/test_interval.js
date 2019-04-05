import {Interval} from '../../../app/javascript/src/game/gamestate/collision/interval.js';

const assert = require('assert');

describe('Interval', function() {

  describe('#addToArray', function() {
    const object = mockObject({x: 3, y: 5}, {x: 7, y: 10});
    it('Should add two intervals representing the beginning and end point of this interval\'s bounding box on the given axis', function() {
      // Given
      const xarr = [];
      const yarr = [];
      
      // When
      Interval.addToArray(xarr, 'x', object);
      Interval.addToArray(yarr, 'y', object);

      // Then
      assert.equal(xarr[0].type, 'b');
      assert.equal(xarr[1].type, 'e');
      assert.equal(xarr[0].point, 3);
      assert.equal(xarr[1].point, 7);
      assert.equal(xarr[1].start, xarr[0]);

      assert.equal(yarr[0].type, 'b');
      assert.equal(yarr[1].type, 'e');
      assert.equal(yarr[0].point, 5);
      assert.equal(yarr[1].point, 10);
      assert.equal(yarr[1].start, yarr[0]);
    });
  });

  describe('#point', function() {
    it('Should return the point value of the Interval', function() {
      // Given
      const interval = new Interval({}, 'b', 123);
      
      // When
      const point = interval.point;

      // Then
      assert.equal(point, 123);
    });
  });

  describe('#object', function() {
    it('Should return the object associated with this interval', function() {
      // Given
      const obj = {};
      const interval = new Interval(obj, 'b', 123);
      
      // When
      const actual = interval.object;

      // Then
      assert.equal(actual, obj);
    });
  });

  describe('#add', function() {
    it('Should add an overlapping object to this interval', function() {
      // Given
      const obj = {};
      const interval = new Interval(obj, 'b', 123);
      const newObj = {};
      
      // When
      interval.add(newObj);

      // Then
      assert(interval.objects.length > 1);
    });
  });

  describe('#hasOverlap', function() {
    it('Should return true if this interval has objects that overlap with it', function() {
      // Given
      const obj = {};
      const interval = new Interval(obj, 'b', 123);
      const newObj = {};
      
      // When
      interval.add(newObj);

      // Then
      assert(interval.hasOverlap());
    });
  });

  describe('#objects', function() {
    it('Should return all objects this object overlaps with, and it\'s own object', function() {
      // Given
      const obj = {};
      const interval = new Interval(obj, 'b', 123);
      const newObj = {};
      
      // When
      interval.add(newObj);

      // Then
      assert(interval.objects.indexOf(obj) > -1);
      assert(interval.objects.indexOf(newObj) > -1);
    });
  });
});

function mockObject(topLeft, bottomRight) {
  return {
    getBoundingBox: function() {
      return {
        topLeft,
        bottomRight
      }
    }
  }
}