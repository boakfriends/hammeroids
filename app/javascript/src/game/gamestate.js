import {Ship} from './entities/ship.js';
import {Input} from './input/input.js';
import {Slug} from './entities/slug.js';
import {Sockets} from './sockets/sockets.js';

export class GameState {

  constructor(canvas, sockets, name) {
    this._canvasElement = canvas;
    this._gameWidth = 1024;
    this._gameHeight = 768;
    this._objects = [];
    this._playerShip;
    this._firing = false;
    this._firingDelay = 100;
    this._firingAllowed = true;
    this._input = new Input(this);
    this._sockets = sockets;
    this._showDetail = false;
    this._name = name;
  }

  addListeners = (addListener) => {
    const events = ['keydown', 'keyup']
    for (let ev of events) {
      addListener(ev, this._input[ev], false);
    }
  }

  newPlayerShip = () => {
    this._playerShip = new Ship(this._gameWidth / 2, this._gameHeight / 2);
    this._playerShip.setName(this._name);
  };

  setHeight = (height) => {
    this._gameHeight = height;
  };

  setWidth = (width) => {
    this._gameWidth = width;
  };

  update = () => {
    this.getObjects().forEach((object) => object.update());
    this.updateFiring();
    this.updateNetworkState();
  };

  updateFiring = () => {
    if(this._firing && this._firingAllowed) {
      const shipState = this._playerShip.getState();
      this.addObject(new Slug(shipState.x, shipState.y, shipState.angle));
      this._firingAllowed = false;
      setTimeout(() => this._firingAllowed = true, this._firingDelay);
    }
  }

  getCanvasElement = () => {
    return this._canvasElement;
  };

  getWidth = () => {
    return this._gameWidth;
  };

  getHeight = () => {
    return this._gameHeight;
  };

  getObjects = () => {
    const gameObjects = [];
    this._objects.forEach((obj) => gameObjects.push(obj));
    if(this._playerShip) {
      gameObjects.push(this._playerShip);
    }
    return gameObjects;
  };

  addObject = (object) => {
    this._objects.push(object);
  };

  removeObjects = (predicate) => {
    this._objects = this._objects.filter(function(obj) {return !predicate(obj)});
  };

  updateNetworkState = () => {
    this._sockets.updatePlayerShipState(this._playerShip.getState());
    this.updateNetworkObjects();
  }

  updateNetworkObjects = () => {
    this._sockets.getNetworkObjects();
  }

  showDetail = () => {
    return this._showDetail;
  }


}