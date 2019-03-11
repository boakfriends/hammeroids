import {Model} from '../../app/javascript/src/game/model/model.js';

const assert = require('assert');

describe('Model', function() {
  describe('#addGameObject', function() {
    it('Should add a game object to the array of game objects', function() {
      // Given
      const model = new Model();

      // When
      model.addGameObject({id: 1});

      // Then
      assert(model.gameObjects.length == 1);
    });

    it('Should not add the same game object twice', function() {
      // Given
      const model = new Model();
      const objectToAdd = {};
      model.addGameObject(objectToAdd);
      
      // When
      model.addGameObject(objectToAdd);

      // Then
      assert(model.gameObjects.length == 1);
    });

  });

  describe('#removeGameObject', function() {
    it('Should remove a game object that already exists', function() {
      // Given
      const model = new Model();
      const objectToAdd = {};
      model.addGameObject(objectToAdd);
      
      // When
      model.removeGameObject(objectToAdd);

      // Then
      assert(model.gameObjects.length == 0);
    });
  })
});