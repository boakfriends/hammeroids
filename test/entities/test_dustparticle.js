import {DustParticle} from '../../app/javascript/src/game/entities/dustparticle.js';

const assert = require('assert');

describe('DustParticle', function() {
  describe('#update', function() {
    it('Should update the position of the dustparticle', function() {
      // Given
      const delta = {
          x: 10,
          y: 10
        },
        bounds = [
          {
            x: 0,
            y: 0
          },
          {
            x: 140,
            y: 140
          }
        ];
      const dust = new DustParticle();

      // When
      dust.update(bounds, delta);

      // Then
      assert(dust.x > 0);
      assert(dust.x < 140);
      assert(dust.y > 0);
      assert(dust.y < 140);
    });
  });
});