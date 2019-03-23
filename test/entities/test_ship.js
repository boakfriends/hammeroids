import {Ship} from '../../app/javascript/src/game/entities/ship.js';
import {PathDrawer} from '../../app/javascript/src/game/drawing/pathdrawer.js';

const assert = require('assert');


describe('Ship', function() {
  describe('#constructor', function() {
    it('Should create a new ship', function() {
      // Given
      const x = 10,
        y = 20,
        ship = new Ship(x, y);

      // Then
      assert.equal(ship.getPosition().x, x);
      assert.equal(ship.getState().angle, 0);
    });
  });

  describe('#setAccelerating', function() {
    it('Should accelerate if accelerating', function() {
      // Given
      const x = 10,
        y = 20,
        ship = new Ship(x, y);

      // When
      ship.setAccelerating(true);
      ship.update(1);

      // Then
      assert.equal(ship.accelerating, true);
    });
  });

  describe('#setTurning', function() {
    it('Should turn when turning', function() {
      // Given
      const x = 10,
        y = 20,
        ship = new Ship(x, y);

      // When
      ship.setTurning('left');
      ship.update(1);

      // Then
      assert.equal(ship.turning, 'left');
    });
  });
  
  describe('#getDrawer', function() {
    it('Should return a pathDrawer', function() {
      // Given
      const x = 10,
        y = 20,
        ship = new Ship(x, y);

      // When
      const drawer = ship.getDrawer();

      // Then
      assert(drawer instanceof PathDrawer);
    });
  });
})