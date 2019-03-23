import { PathDrawer } from '../../app/javascript/src/game/drawing/pathdrawer.js';
import { Vector } from '../../app/javascript/src/game/physics/Vector';

const assert = require('assert');
const sinon = require('sinon');

describe('PathDrawer', function() {
  describe('#draw', function() {
    it('Should draw a line', function() {
      // Given
      const style = 'white',
        params = {'strokeStyle': style};

      const path = [
        new Vector(2,2),
        new Vector(1,1),
        new Vector(0,0)
      ];
      const pathDrawer = new PathDrawer(path, params);
      const contextSpy = {beginPath: sinon.spy(), moveTo: sinon.spy(), lineTo: sinon.spy(), closePath: sinon.spy(), stroke: sinon.spy()}
      
      // When
      pathDrawer.draw(contextSpy);

      // Then
      assert(contextSpy.beginPath.calledOnce);
      assert.equal(contextSpy.strokeStyle, 'white');
      assert(contextSpy.moveTo.calledOnce);
      assert.equal(contextSpy.lineTo.callCount, 2);
      assert(contextSpy.closePath.calledOnce);
      assert(contextSpy.stroke.calledOnce);
    })
  })
})