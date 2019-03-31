import {DustParticle} from '../../app/javascript/src/game/entities/dustparticle.js';
import { Vector } from '../../app/javascript/src/game/physics/vector.js';

const assert = require('assert');

describe('DustParticle', function() {
  describe('#update', function() {
    it('Should update the position of the dustparticle', function() {
      // Given
      const delta = new Vector(10, 10),
        bounds = [
          new Vector(0, 0),
          new Vector(140, 140)
        ];
      const dust = new DustParticle();

      // When
      dust.update(bounds, delta);

      // Then
      const errorMessage = `Dust position was ${dust.position.toString()}`;
      assert(dust.position.x >= 0, errorMessage);
      assert(dust.position.x <= 140, errorMessage);
      assert(dust.position.y >= 0, errorMessage);
      assert(dust.position.y <= 140, errorMessage);
    });
  });
});