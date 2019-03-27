/**
* Application.
* Main application is run from here.
*
* Author: Jason Porter
*
**/

import {GameState} from'./game/gamestate.js';
import {View} from'./game/view.js';
import {Settings} from'./settings';
import {Ship} from'./game/entities/ship.js';
import {Sockets} from './game/sockets/sockets.js';
import {Camera} from './game/camera/camera.js';
import {App} from './game/app.js';

document.addEventListener("DOMContentLoaded",function() {
  const settings = new Settings()
  const sockets = new Sockets(settings.baseSocketUrl);
  const gameState = new GameState(sockets);
  const camera = new Camera(gameState);
  const view = new View(gameState, camera);
  gameState.newPlayerShip();
  gameState.addListeners(window.addEventListener);
  const app = new App(gameState, view);
  app.run();
});
