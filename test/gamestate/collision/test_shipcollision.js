import {ShipCollision} from '../../../app/javascript/src/game/gamestate/collision/shipcollision.js';
import {Ship} from '../../../app/javascript/src/game/entities/ship.js';

const assert = require('assert');

describe('ShipCollision', function() {
  describe('#doCollision', function() {
    it('Should do collision for ships - physics should be given force impulse when two ships collide', function() {
      // Given
      const ship1 = new Ship(10, 0, 0, 1);
      const ship2 = new Ship(20, 0, 0, 1);
      
      // When
      // set ship1 & ship2 momentum
      // do collision with ships

      // Then
      // Ships should have different momentum
    })
  })
});