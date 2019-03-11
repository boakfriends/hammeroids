import {Ship} from './entities/ship.js';
import {Input} from './input/input.js';
import {Slug} from './entities/slug.js';
import {Sockets} from './sockets/sockets.js';
import {DustParticle} from './entities/dustparticle.js';

export class GameState {

  constructor(sockets) {
    this._canvasElement;
    this.gameWidth = 1024;
    this.gameHeight = 768;
    this.objects = [];
    this.networkObjects = [];
    this.playerShip;
    this.firing = false;
    this.firingDelay = 100;
    this.firingAllowed = true;
    this.input = new Input(this);
    this.sockets = sockets;
    this.isShowDetail = false;
    this._name;
    this.spaceDust = [];
    this.makeDust();
  }

  makeDust = () => {
    Array.from(Array(100).keys()).forEach(() => {
      this.spaceDust.push(new DustParticle());
    })
  }

  addListeners(addListener) {
    const events = ['keydown', 'keyup']
    for (let ev of events) {
      addListener(ev, this.input[ev], false);
    }
  }

  newPlayerShip() {
    this.playerShip = new Ship(this.gameWidth / 2, this.gameHeight / 2);
    this.playerShip.setName(this.name);
  };

  setHeight(height) {
    this.gameHeight = height;
  };

  setWidth(width) {
    this.gameWidth = width;
  };

  update = () => {
    this.getObjects().forEach((object) => object.update());
    this.updateFiring();
    this.updateNetworkState();
  };

  updateFiring() {
    if(this.firing && this.firingAllowed) {
      const shipState = this.playerShip.getState();
      const slug = new Slug(shipState.position);
      this.addObject(slug);
      this.sockets.fire(slug.getState());
      this.firingAllowed = false;
      setTimeout(() => this.firingAllowed = true, this.firingDelay);
    }
  }

  getWidth() {
    return this.gameWidth;
  };

  getHeight() {
    return this.gameHeight;
  };

  getObjects() {
    const gameObjects = [];
    this.objects.forEach((obj) => gameObjects.push(obj));
    if(this.playerShip) {
      gameObjects.push(this.playerShip);
    }
    this.networkObjects.forEach((obj) => gameObjects.push(obj));
    return gameObjects;
  };

  addObject(object) {
    this.objects.push(object);
  };

  removeObjects(predicate) {
    this.objects = this.objects.filter(function(obj) {return !predicate(obj)});
  };

  updateNetworkState() {
    this.sockets.updatePlayerShipState(this.playerShip.getState(), this.name);
    this.updateNetworkObjects();
  }

  updateNetworkObjects() {
    this.networkObjects = this.sockets.getNetworkObjects();
  }

  showDetail() {
    return this.isShowDetail;
  }

  get canvasElement() {
    this._canvasElement = this._canvasElement || document.getElementById('canvas');
    return this._canvasElement;
  }

  get name() {
    this._name = this._name || document.getElementById('name').innerText;
    return this._name;
  }


}