import {Ship} from '../app/javascript/src/game/entities/ship';
import {GameState} from '../app/javascript/src/game/gamestate';
import {Model} from '../app/javascript/src/game/model/model.js';

const assert = require('assert');
const sinon = require('sinon');

describe('GameState', function() {

  describe('#newPlayerShip', function() {
    it('Should return player ship in the list of game objects when a new player ship is added', function() {
      // Given
      const gameState = new GameState(mockCanvas(), new Model());
      global.document = {
        getElementById: function() {
          return {
            innerText: 'name'
          }
        }
      }

      // When
      gameState.newPlayerShip();
      const objects = gameState.model.gameObjects;

      // Then
      assert.equal(objects.length, 1);
      assert(objects[0] instanceof Ship);
      assert.equal(objects[0].name, 'name');
    })
  });

  describe('#getHeight #getWidth', function() {
    it('Should return the height and width of the gamespace when it is set', function() {
      // Given
      const gameState = new GameState(mockCanvas(), new Model());
      const height = Math.ceil(Math.random() * 500);
      const width = Math.ceil(Math.random() * 500);

      // When
      gameState.setHeight(height);
      gameState.setWidth(width);

      // Then
      assert.equal(gameState.getHeight(), height);
      assert.equal(gameState.getWidth(), width);
    })
  });
});

function mockCanvas() {

  return {
    getContext: sinon.spy(),
    getBoundingClientRect: sinon.spy()
  }
}