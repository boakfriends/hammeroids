import {DustParticle} from '../entities/dustparticle.js';

/**
* Model for the game world.
* Holds the game data.
**/
export class Model {
  constructor() {
    this._gameObjects = [];
    this.spaceDust = DustParticle.makeDust();
    this.networkObjects = {};
  }

  getId(object) {
    return JSON.stringify(object) + Date.now();
  }

  addGameObject(object) {
    object.id = object.id || this.getId(object);
    if(!this._gameObjects.includes(object)) {
      this._gameObjects.push(object);
    }
  }

  removeGameObject(object) {
    this._gameObjects = this._gameObjects.filter((obj) => obj.id != object.id);
  }

  set playerShip(playerShip) {
    this._playerShip = playerShip;
    this.addGameObject(this._playerShip);
  }

  get playerShip() {
    return this._playerShip;
  }

  get gameObjects() {
    return this._gameObjects;
  }

  get drawableObjects() {
    const objects = [];
    for(let id in this.networkObjects) {
      objects.push(this.networkObjects[id]);
    }
    return objects.concat(this._gameObjects.concat(this.spaceDust));
  }

}