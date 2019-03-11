import { Camera } from '../../app/javascript/src/game/camera/camera.js';

const assert = require('assert');
const sinon = require('sinon');

describe('Camera', function() {

  describe('#constructor', function() {
    it('Should update the camera to focus on the centre of the play area', function() {
      // Given
      const gameStateMock = mockGameState(640, 480, 10, 10);

      // When
      const camera = new Camera(gameStateMock);

      // Then
      assert(camera.x, 320);
      assert(camera.y, 240);
    });
  });

  describe('#update', function() {
    it('Should update the camera position based on the position of the player ship', function() {
      // Given
      const gameStateMock = mockGameState(640, 480, 10, 10);
      const contextMock = mockContext();
      const camera = new Camera(gameStateMock);

      // When
      assert.equal(camera.x, 320);
      assert.equal(camera.y, 240);
      camera.update(contextMock);

      // Then
      assert(contextMock.translate.called);
      assert.equal(camera.x, 289);
      assert.equal(camera.y, 217);
      assert(gameStateMock.model.spaceDust[0].update.called);
    });
  });

  describe('#getBounds', function() {
    it('Should update the camera position based on the position of the player ship', function() {
      // Given
      const gameStateMock = mockGameState(640, 480, 10, 10);
      const contextMock = mockContext();
      const camera = new Camera(gameStateMock);

      // When
      camera.update(contextMock);

      // Then
      assert.equal(camera.getBounds()[0].x, -31);
      assert.equal(camera.getBounds()[0].y, -23);
      assert.equal(camera.getBounds()[1].x, 609);
      assert.equal(camera.getBounds()[1].y, 457);
    });
  });
});

// Helper function for creating mock gamestate
const mockGameState = function(gameWidth, gameHeight, x, y, dustParticle = {update: sinon.spy()}) {
  return {
    model: {
      playerShip: {
        getState: function() {
          return {
            position: {
              x: x,
              y: y
            }
          };
        }
      }, 
      spaceDust: [dustParticle],
    },
    playAreaDimensions: {
      gameWidth: gameWidth,
      gameHeight: gameHeight,
      widthMid: gameWidth / 2,
      heightMid: gameHeight / 2
    }
  };
}

// Helper function for creating mock context
const mockContext = function() {
  return {
    translate: sinon.spy()
  }
}