import {TextDrawer} from '../../app/javascript/src/game/drawing/textdrawer.js';

const assert = require('assert');
const sinon = require('sinon');

describe('TextDrawer', function() {
  describe('#draw', function() {
    it('Should draw the given text', function() {
      // Given
      const text = "Hello World",
        style = 'white',
        params = {'strokeStyle': style},
        x = 10,
        y = 10,
        textDrawer = new TextDrawer({'x': x, 'y': y}, text, params);
      const contextSpy = {fillText: sinon.spy()}

      // When
      textDrawer.draw(contextSpy);

      // Then
      assert.equal(contextSpy.strokeStyle, style);
      assert(contextSpy.fillText.calledWith(text, x, y + 20));
    });
  });
});