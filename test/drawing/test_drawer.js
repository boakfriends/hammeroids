import {Drawer} from '../../app/javascript/src/game/drawing/drawer.js';

const assert = require('assert');
const sinon = require('sinon');

describe('Drawer', function() {
  describe('#draw', function() {
    it('Should add params to the context', function() {
      // Given
      const params = {
        'fillStyle': 'white',
        'font': 'bodacious'
      }
      const drawer = new Drawer(params);
      const contextSpy = {save: sinon.spy(), restore: sinon.spy()};
      
      // When
      drawer.draw(contextSpy);

      // Then
      assert.equal(contextSpy.fillStyle, params.fillStyle);
      assert.equal(contextSpy.font, params.font);
    });

    it('Should call the _draw method if one exists', function() {
      // Given
      const drawer = new Drawer({});
      drawer._draw = sinon.spy();
      const contextSpy = {save: sinon.spy(), restore: sinon.spy()};
      
      // When
      drawer.draw(contextSpy);

      // Then
      assert(drawer._draw.called);
    });
  })
})