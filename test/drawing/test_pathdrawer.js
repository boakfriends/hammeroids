import {PathDrawer} from '../../app/javascript/src/game/drawing/pathdrawer.js';

const assert = require('assert');
const sinon = require('sinon');

describe('PathDrawer', function() {
  describe('#draw', function() {
    it('Should draw a line', function() {
      // Given
      const style = '',
        width = 2,
        coords = [[2,2], [1,1], [0,0]];
      const pathDrawer = new PathDrawer(style, width, coords);
      const contextSpy = {beginPath: sinon.spy(), moveTo: sinon.spy(), lineTo: sinon.spy(), closePath: sinon.spy(), stroke: sinon.spy()}
      
      // When
      pathDrawer.draw(contextSpy);

      // Then
      assert(contextSpy.beginPath.calledOnce);
      assert.equal(contextSpy.strokeStyle, style);
      assert(contextSpy.moveTo.calledOnce);
      assert.equal(contextSpy.lineTo.callCount, 2);
      assert(contextSpy.closePath.calledOnce);
      assert(contextSpy.stroke.calledOnce);
    })
  })
})