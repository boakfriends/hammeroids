import { Delta } from '../../app/javascript/src/game/camera/delta.js';

const assert = require('assert');

describe('Delta', function() {
  describe('#constructor', function() {
    it('Should create a delta object with ship position and camera position that correctly returns x and y delta', function() {
      // Given
      const shipPosition = {
          x: 12,
          y: 22
        },
        camera = {
          x: 2,
          y: 2
        };
      const delta = new Delta(shipPosition, camera);

      // Then
      assert.equal(delta.x, 1);
      assert.equal(delta.y, 2);
    });
  });
});