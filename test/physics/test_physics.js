import {Physics} from '../../app/javascript/src/game/physics/physics.js';

const assert = require('assert');

describe('Physics', function() {
  describe('#accel', function() {
    it('Should update x and y positions using friction and current momentum only when updating without accelerating,', function() {
      // Given
      const friction = Math.random();
      const acceleration = 4;
      const xMomentum = Math.ceil(Math.random() * 20) - 10;
      const yMomentum = Math.ceil(Math.random() * 20) - 10;
      const x = Math.ceil(Math.random() * 50);
      const y = Math.ceil(Math.random() * 50);
      const physics = new Physics(friction, acceleration, x, y, 0, xMomentum, yMomentum);
      
      // When
      physics.update();

      // Then
      assert.equal(physics.getState().x, xMomentum * friction + x);
      assert.equal(physics.getState().y, yMomentum * friction + y);
    });

    it('Should update x and y positions using acceleration, friction and current momentum when accelerating', function() {
      // Given
      const friction = Math.random();
      const acceleration = 4;
      const xMomentum = Math.ceil(Math.random() * 20) - 10;
      const yMomentum = Math.ceil(Math.random() * 20) - 10;
      const x = Math.ceil(Math.random() * 50);
      const y = Math.ceil(Math.random() * 50);
      const angle = 0;
      const physics = new Physics(friction, acceleration, x, y, angle, xMomentum, yMomentum);
      
      // When
      physics.accel();
      physics.update();

      // Then
      assert.equal(physics.getState().x, (xMomentum + Physics.getCosOfDegrees(angle + 90)) * friction + x, "x postition should be correct");
      assert.equal(physics.getState().y, (yMomentum + Physics.getCosOfDegrees(angle)) * friction + y, 'y position should be correct');
    });

    it('Shouldn\'t ever update the angle to be more than 360 when turning', function() {
      // Given
      const friction = Math.random();
      const acceleration = 4;
      const xMomentum = Math.ceil(Math.random() * 20) - 10;
      const yMomentum = Math.ceil(Math.random() * 20) - 10;
      const x = Math.ceil(Math.random() * 50);
      const y = Math.ceil(Math.random() * 50);
      const angle = 359;
      const physics = new Physics(friction, acceleration, x, y, angle, xMomentum, yMomentum);

      // When
      physics.turn((momentum, acceleration) => momentum + acceleration);
      physics.update();

      // Then
      assert(physics.getState().angle < 360, 'Angle should be less than 360 but was: ' + physics.getState().angle);
    });
  });

  describe('#getTransform', function() {
    it('Should provide the transform of x, y coords to the correct angle with angle of 0', function() {
      // Given
      const friction = Math.random();
      const acceleration = 4;
      const xMomentum = Math.ceil(Math.random() * 20) - 10;
      const yMomentum = Math.ceil(Math.random() * 20) - 10;
      const x = Math.ceil(Math.random() * 50);
      const y = Math.ceil(Math.random() * 50);
      const angle = 0;
      const physics = new Physics(friction, acceleration, x, y, angle, xMomentum, yMomentum);

      // When
      const coord = physics.getTransform(10, 10);

      // Then
      assert.equal(coord.x, 10 + x);
    });

    it('Should provide the transform of x, y coords to the correct angle with angle of 90', function() {
      // Given
      const friction = Math.random();
      const acceleration = 4;
      const xMomentum = Math.ceil(Math.random() * 20) - 10;
      const yMomentum = Math.ceil(Math.random() * 20) - 10;
      const x = 10;
      const y = Math.ceil(Math.random() * 50);
      const angle = 90;
      const physics = new Physics(friction, acceleration, x, y, angle, xMomentum, yMomentum);

      // When
      const coord = physics.getTransform(10, 10);

      // Then
      assert.equal(coord.x, 0);
    });
  });

});