/**
* Application.
* Main application is run from here.
*
* Author: Jason Porter
*
**/

const GameState = require('./game/gamestate').GameState;
const View = require('./game/view').View;
const App = require('./game/app').App;
const Ship = require('./game/entities/ship').Ship;

document.addEventListener("DOMContentLoaded",function() {
  const canvasElement = document.getElementById('canvas')
  const gameState = new GameState(canvasElement);
  gameState.newPlayerShip();
  gameState.addListeners(window.addEventListener);
  const view = new View(gameState);
  let app = new App(60,100);
  app.run(gameState, view);
});
