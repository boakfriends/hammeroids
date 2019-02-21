export class Input {
  constructor(gameState) {
    this._gameState = gameState;
    this._functionMapDown = {
      38: () => this._gameState._playerShip.setAccelerating(true),
      37: () => this._gameState._playerShip.setTurning((momentum, acceleration) => momentum - acceleration),
      39: () => this._gameState._playerShip.setTurning((momentum, acceleration) => momentum + acceleration),
      32: () => this._gameState._firing = true
    };
    this._functionMapUp = {
      38: () => this._gameState._playerShip.setAccelerating(false),
      37: () => this._gameState._playerShip.setTurning(undefined),
      39: () => this._gameState._playerShip.setTurning(undefined),
      32: () => this._gameState._firing = false
    };
  }

  keydown = (e) => {
    this._functionMapDown[e.keyCode]();
    e.preventDefault();
  }

  keyup = (e) => {
    this._functionMapUp[e.keyCode]();
    e.preventDefault();
  }
}