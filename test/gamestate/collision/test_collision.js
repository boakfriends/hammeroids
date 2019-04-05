import {Collision} from '../../../app/javascript/src/game/gamestate/collision/collision.js';

const assert = require('assert');

describe('Collision', function() {
  describe('#doCollision', function() {
    it('Should not mark a single object as colliding', function() {
      // Given
      const objects = [
        mockObject({"x": -4377.218384920145, "y": 4207.012366394598}, {"x": -4370.8422175487085, "y": 4211.843979960626}, 1)
      ];
      const collision = new Collision(objects);
      
      // When
      collision.doCollision();
      
      // Then
      assert(!objects[0].colliding);
    });

    it('Should mark two colliding objects as colliding', function() {
      // Given
      const objects = [
        mockObject({"x": 0, "y": 0}, {"x": 10, "y": 10}, 1),
        mockObject({"x": 2, "y": 2}, {"x": 8, "y": 8}, 2)
      ];
      const collision = new Collision(objects);
      
      // When
      collision.doCollision();
      
      // Then
      assert(objects[0].colliding);
      assert(objects[1].colliding);
    });

    it('Should mark three overlapping objects as colliding', function() {
      // Given
      const objects = [
        mockObject({"x": 0, "y": 0}, {"x": 10, "y": 10}, 1),
        mockObject({"x": 2, "y": 2}, {"x": 8, "y": 8}, 2),
        mockObject({"x": 3, "y": 3}, {"x": 9, "y": 9}, 3)
      ];
      const collision = new Collision(objects);
      
      // When
      collision.doCollision();
      
      // Then
      assert(objects[0].colliding);
      assert(objects[1].colliding);
      assert(objects[2].colliding);
    });

    it('Should two overlapping objects as colliding, and one not overlapping should not be touched', function() {
      // Given
      const objects = [
        mockObject({"x": 0, "y": 0}, {"x": 5, "y": 5}, 1),
        mockObject({"x": 3, "y": -10}, {"x": 9, "y": -8}, 3),
        mockObject({"x": 2, "y": 2}, {"x": 8, "y": 8}, 2)
      ];
      const collision = new Collision(objects);
      
      // When
      collision.doCollision();
      
      // Then
      assert(objects[0].colliding);
      assert(!objects[1].colliding);
      assert(objects[2].colliding);
    });    
  })
});

function mockObject(topLeft, bottomRight, id) {
  return {
    parentId: id,
    getBoundingBox: function() {
      return {
        topLeft: topLeft,
        bottomRight: bottomRight
      }
    }
  }
}