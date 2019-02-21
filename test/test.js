import {App} from '../app/javascript/src/game/app.js';

const sinon = require('sinon');

describe('Main App', function() {

  describe('#run', function() {

    beforeEach(function() {
      this.clock = sinon.useFakeTimers();
    });

    afterEach(function() {
      this.clock.restore();
    });

    it('should update the gameState on an fps and gamespeed', function() {

      // Given
      const fps = 60,
        gameSpeed = 25,

        gameStateSpy = sinon.spy(),
        gameState = {update: gameStateSpy},

        viewSpy = sinon.spy(),
        view = {update: viewSpy},

        app = new App(fps, gameSpeed);

      // When
      app.run(gameState, view);

      // Then
      sinon.assert.notCalled(gameStateSpy);

      this.clock.tick(1000/fps);
      sinon.assert.calledOnce(viewSpy);

      this.clock.tick(1000/gameSpeed);
      sinon.assert.calledOnce(gameStateSpy);
    })
  })
})