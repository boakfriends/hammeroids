import { Camera } from '../../app/javascript/src/game/camera/camera.js';
import { Vector } from '../../app/javascript/src/game/physics/vector.js';

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
      assert(camera.position.x, 320);
      assert(camera.position.y, 240);
    });
  });

  describe('#update', function() {
    it('Should update the camera position based on the position of the player ship', function() {
      // Given
      const gameStateMock = mockGameState(640, 480, 10, 10);
      const contextMock = mockContext();
      const camera = new Camera(gameStateMock);

      // When
      assert.equal(camera.position.x, 320);
      assert.equal(camera.position.y, 240);
      camera.update(contextMock);

      // Then
      assert(contextMock.translate.called);
      assert.equal(camera.position.x, 289);
      assert.equal(camera.position.y, 217);
      assert(gameStateMock.spaceDust[0].update.called);
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
      assert.equal(camera.getBounds().topLeft.x, -31);
      assert.equal(camera.getBounds().topLeft.y, -23);
      assert.equal(camera.getBounds().bottomRight.x, 609);
      assert.equal(camera.getBounds().bottomRight.y, 457);
    });
  });
});

// Helper function for creating mock gamestate
const mockGameState = function(gameWidth, gameHeight, x, y, dustParticle = {update: sinon.spy()}) {
  return {
    playerShip: {
      getPosition: function() {
        return {
          x: x,
          y: y
        };
      }
    },
    centrePoint: new Vector(gameWidth / 2,gameHeight / 2),
    gameWidth: gameWidth,
    gameHeight: gameHeight,
    spaceDust: [dustParticle]
  };
}

// Helper function for creating mock context
const mockContext = function() {
  return {
    translate: sinon.spy()
  }
}