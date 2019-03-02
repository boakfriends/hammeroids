import {TextDrawer} from '../../app/javascript/src/game/drawing/textdrawer.js';

const assert = require('assert');
const sinon = require('sinon');

describe('TextDrawer', function() {
  describe('#draw', function() {
    it('Should draw the given text', function() {
      // Given
      const text = "Hello World";
      const textDrawer = new TextDrawer(10, 10, text);
      const contextSpy = {fillText: sinon.spy()}

      // When
      textDrawer.draw(contextSpy);

      // Then
      assert(contextSpy.fillText.called);
    });
  });
});