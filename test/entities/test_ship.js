import {Ship} from '../../app/javascript/src/game/entities/ship.js';
import {Physics} from '../../app/javascript/src/game/physics/physics.js';
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
      assert.equal(ship.getState().position.x, x);
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
      ship.update(0);

      // Then
      assert.equal(ship.getState().position.x, x + Physics.getCosOfDegrees(90));
    });
  });

  describe('#setTurning', function() {
    it('Should turn when turning', function() {
      // Given
      const x = 10,
        y = 20,
        ship = new Ship(x, y);

      // When
      ship.setTurning((angularMomentum, turnRate) => angularMomentum + turnRate);
      ship.update(1);

      // Then
      assert.equal(ship.getState().position.angle, ship.physics.turnRate * ship.physics.friction);
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