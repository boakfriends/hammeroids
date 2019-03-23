import {Ship} from '../app/javascript/src/game/entities/ship';
import {GameState} from '../app/javascript/src/game/gamestate';

const assert = require('assert');
const sinon = require('sinon');

describe('GameState', function() {

  describe('#newPlayerShip', function() {
    it('Should return player ship in the list of game objects when a new player ship is added', function() {
      // Given
      const gameState = new GameState(mockCanvas());
      global.document = {
        getElementById: function() {
          return {
            innerText: 'name'
          }
        }
      }

      // When
      gameState.newPlayerShip();
      const objects = gameState.getObjects();

      // Then
      assert.equal(objects.length, 1);
      assert(objects[0] instanceof Ship);
      assert.equal(objects[0].name, 'name');
    })
  });

  describe('#getHeight #getWidth', function() {
    it('Should return the height and width of the gamespace when it is set', function() {
      // Given
      const gameState = new GameState(mockCanvas());
      const height = Math.ceil(Math.random() * 500);
      const width = Math.ceil(Math.random() * 500);

      // When
      gameState.setHeight(height);
      gameState.setWidth(width);

      // Then
      assert.equal(gameState.height, height);
      assert.equal(gameState.width, width);
    })
  });

  describe('#getObjects #addObject', function() {
    it('Should return an empty list of game objects if none set', function() {
      // Given
      const gameState = new GameState(mockCanvas());

      // When
      const objects = gameState.getObjects();

      // Then
      assert.equal(objects.length, 0);
    })

    it('Should return a single object when a single object is added to game state', function() {
      // Given
      const gameState = new GameState(mockCanvas());

      // When
      gameState.addObject({});
      
      // Then
      assert.equal(gameState.getObjects().length, 1);
    })
  });

  describe('#removeObjects', function() {
    it('Should remove objects from gameState based on a predicate', function() {
      // Given
      const gameState = new GameState(mockCanvas());
      const obj = {id: 1};

      // When
      gameState.addObject(obj);
      gameState.removeObjects((obj) => obj.id === 1);

      // THen
      assert.equal(gameState.getObjects().length, 0);
    });

    it('Should leave objects that don\'t match the predicate', function() {
      // Given
      const gameState = new GameState(mockCanvas());
      const obj = {id: 1};
      const obj2 = {id: 2};

      // When
      gameState.addObject(obj);
      gameState.removeObjects((obj) => obj.id === 2);

      // Then
      assert.equal(gameState.getObjects().length, 1);
    })
  })
});

function mockCanvas() {

  return {
    getContext: sinon.spy(),
    getBoundingClientRect: sinon.spy()
  }
}