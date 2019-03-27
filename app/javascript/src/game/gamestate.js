import {Ship} from './entities/ship.js';
import {Input} from './input/input.js';
import {Slug} from './entities/slug.js';
import {Sockets} from './sockets/sockets.js';
import {DustParticle} from './entities/dustparticle.js';
import {FrameRate} from'./gamestate/framerate.js';
import {PlayerController} from './controller/playercontroller.js';
import {Vector} from './physics/vector.js';

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
    this.playerController = new PlayerController(this);
    this.input = new Input(this, this.playerController);
    this.sockets = sockets;
    this.isShowDetail = false;
    this._name;
    this.spaceDust = [];
    this.makeDust();
    this.lastFireTime = 0;
    this.rechargeTime = 100;
    this._frameRate = new FrameRate();
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

  update = (delta, timestamp) => {
    this._frameRate.update(timestamp);
    this.playerController.update();
    this.getObjects().forEach((object) => object.update(delta));
    this.updateFiring(timestamp);
    this.updateNetworkState();
  };

  updateFiring(timestamp) {
    if(this.firing && timestamp - this.lastFireTime > this.rechargeTime) {
      const shipState = this.playerShip.getState().position;
      const slug = new Slug(shipState, this.playerShip.physics.angle);
      this.addObject(slug);
      this.sockets.fire(slug.getState());
      this.lastFireTime = timestamp;
    }
  }

  get width() {
    return this.gameWidth;
  };

  get height() {
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
  
  get frameRate() {
    return this._frameRate.frameRate;
  }

  get centrePoint() {
    return new Vector(this.width / 2, this.height / 2);
  }


}