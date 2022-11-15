import {Ship} from './entities/ship.js';
import {Input} from './input/input.js';
import {Slug} from './entities/slug.js';
import {Sockets} from './sockets/sockets.js';
import {DustParticle} from './entities/dustparticle.js';
import {FrameRate} from'./gamestate/framerate.js';
import {PlayerController} from './controller/playercontroller.js';
import {Vector} from './physics/vector.js';
import {Collision} from './gamestate/collision/collision.js';

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
    this.playerShip = new Ship(Math.random() * 1000, Math.random() * 1000);
    this.playerShip.setName(this.name);
    this.addObject(this.playerShip);
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
    this.checkCollision();
    this.removeDeadObjects();
  };

  removeDeadObjects() {
    this.removeObjects(obj => obj.dead);
  }

  updateFiring(timestamp) {
    if(this.firing && timestamp - this.lastFireTime > this.rechargeTime && !this.playerShip.dead) {
      const shipState = this.playerShip.getState().position;
      const slug = Slug.fromPlayerShip(shipState, this.playerShip.physics.angle, this.sockets.id);
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
    this.networkObjects.forEach((obj) => gameObjects.push(obj));
    return gameObjects;
  };

  addObject(object) {
    this.objects.push(object);
  };

  removeObjects(predicate) {
    this.objects = this.objects.filter(obj => !predicate(obj));
  };

  updateNetworkState() {
    if(!this.playerShip.dead) {
      this.sockets.updatePlayerShipState(this.playerShip, this.name);
    }
    this.updateNetworkObjects();
  }

  updateNetworkObjects() {
    this.networkObjects = this.sockets.getNetworkObjects();
  }

  checkCollision() {
    const collision = new Collision(this.getObjects());
    collision.doCollision(this.objects);
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