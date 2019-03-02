import {View} from '../app/javascript/src/game/view';

const assert = require('assert');
const sinon = require('sinon');

describe('View', function() {
  describe('#update', function() {
    it('Should change the canvas size based on that provided by the gamestate', function() {
      // Given
      const width = Math.ceil(Math.random() * 500);
      const height = Math.ceil(Math.random() * 500);
      const canvasSpy = getMockCanvas();
      const gameState = getMockGameState(canvasSpy, width, height);
      const view = new View(gameState);

      // When
      view.update();

      // Then
      assert.equal(canvasSpy.width, width);
      assert.equal(canvasSpy.height, height);
    });

    it('Should create a black rectangle the same size as the game canvas', function() {
      // Given
      const width = Math.ceil(Math.random() * 500);
      const height = Math.ceil(Math.random() * 500);
      const canvasSpy = getMockCanvas();
      const gameState = getMockGameState(canvasSpy, width, height);
      const view = new View(gameState);

      // When
      view.update();

      // Then
      assert.equal(canvasSpy.getContext().fillStyle, 'rgb(0,0,0)');
      assert(canvasSpy.getContext().fillRect.calledWith(0,0,width,height));
    });

    it('Should draw any objects it receives from the game state', function() {
      // Given
      const canvasSpy = getMockCanvas();
      const objects = [];
      const drawer = {draw: sinon.spy()};
      objects.push({getDrawer: function() {return drawer;}});
      const gameState = getMockWithObjects(canvasSpy, objects);
      const view = new View(gameState);

      // When 
      view.update();

      // Then
      assert(drawer.draw.called);
    })
  })
});

function getMockCanvas() {
  const context = {fillRect: sinon.spy(), clearRect: sinon.spy()};
  return {
    getContext: function() {
      return context;
    }
  }
}

function getMockWithObjects(canvasSpy, objects) {
  const gameState = getMockGameState(canvasSpy);
  gameState.getObjects = function() {
    return objects;
  };
  return gameState;
}

function getMockGameState(canvasSpy, width = 100, height = 200) {
  return {
    getCanvasElement: function() {return canvasSpy;},
    getWidth: function() {return width;},
    getHeight: function() {return height},
    getObjects: function() {return []},
    showDetail: function() {return false}
  };
}