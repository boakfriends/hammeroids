import {Ship} from './entities/ship.js';
import {Input} from './input/input.js';
import {Slug} from './entities/slug.js';

export class GameState {

  constructor(sockets, model) {
    this._canvasElement;
    this._name;
    this.gameWidth = 1024;
    this.gameHeight = 768;
    this.firing = false;
    this.firingDelay = 100;
    this.firingAllowed = true;
    this.sockets = sockets;
    this.isShowDetail = false;
    this.model = model;
    this.input = new Input(this);
  }

  addListeners(addListener) {
    const events = ['keydown', 'keyup']
    for (let ev of events) {
      addListener(ev, this.input[ev], false);
    }
  }

  newPlayerShip() {
    this.model.playerShip = new Ship(this.gameWidth / 2, this.gameHeight / 2);
    this.model.playerShip.setName(this.name)
  };

  setHeight(height) {
    this.gameHeight = height;
  };

  setWidth(width) {
    this.gameWidth = width;
  };

  update = () => {
    this.model.gameObjects.forEach((object) => object.update());
    this.updateFiring();
    this.sockets.updatePlayerShipState(this.model.playerShip.getState(), this.name);
  };

  updateFiring() {
    if(this.firing && this.firingAllowed) {
      const shipState = this.model.playerShip.getState();
      const slug = new Slug(shipState.position, this.model);
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

  get playAreaDimensions() {
    return {
      width: this.gameWidth,
      height: this.gameHeight,
      widthMid: this.gameWidth / 2,
      heightMid: this.gameHeight / 2
    }
  }


}