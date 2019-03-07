/**
* Application.
* Main application is run from here.
*
* Author: Jason Porter
*
**/

import {GameState} from'./game/gamestate';
import {View} from'./game/view';
import {App} from'./game/app';
import {Settings} from'./settings';
import {Ship} from'./game/entities/ship';
import {Sockets} from './game/sockets/sockets.js';

document.addEventListener("DOMContentLoaded",function() {
  const settings = new Settings()
  const canvasElement = document.getElementById('canvas')
  const sockets = new Sockets(settings.baseSocketUrl);
  const gameState = new GameState(canvasElement, sockets, document.getElementById('name').innerText);
  gameState.newPlayerShip();
  gameState.addListeners(window.addEventListener);
  const view = new View(gameState);
  let app = new App(60,100);
  app.run(gameState, view);
});
