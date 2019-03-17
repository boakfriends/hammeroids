import {FrameRate} from '../../app/javascript/src/game/gamestate/framerate.js'

const assert = require('assert');

describe('FrameRate', function() {
  describe('#update', function() {
    it('Should not update the frameRate until 1 second has passed', function() {
      // Given
      const frameRate = new FrameRate();

      // When
      frameRate.update(1000);

      // Then
      assert.equal(frameRate.frameRate, 0);

      frameRate.update(1001);
      assert.equal(frameRate.frameRate, 0);

    });

    it('Should update the frameRate after 1 second based on the number of frames (updates)', function() {
      // Given
      const frameRate = new FrameRate();

      // When
      frameRate.update(1000);

      // Then
      assert.equal(frameRate.frameRate, 0);

      frameRate.update(1001);
      frameRate.update(1002);
      frameRate.update(1003);
      frameRate.update(1004);
      frameRate.update(1005);
      assert.equal(frameRate.frameRate, 0);

      frameRate.update(2001);
      assert.equal(frameRate.frameRate, 6);
      frameRate.update(2002);
      frameRate.update(2003);
      frameRate.update(2004);
      frameRate.update(2005);
      frameRate.update(2006);

      frameRate.update(3006);
      assert.equal(frameRate.frameRate, 10.5);
    });
  });
});