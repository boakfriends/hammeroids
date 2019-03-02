export class Input {
  constructor(gameState) {
    this._gameState = gameState;
    this._functionMapDown = {
      38: () => this._gameState._playerShip.setAccelerating(true),
      37: () => this._gameState._playerShip.setTurning((momentum, acceleration) => momentum - acceleration),
      39: () => this._gameState._playerShip.setTurning((momentum, acceleration) => momentum + acceleration),
      18: () => this._gameState._firing = true,
      90: () => this._gameState._showDetail = true
    };
    this._functionMapUp = {
      38: () => this._gameState._playerShip.setAccelerating(false),
      37: () => this._gameState._playerShip.setTurning(undefined),
      39: () => this._gameState._playerShip.setTurning(undefined),
      18: () => this._gameState._firing = false,
      90: () => this._gameState._showDetail = false
    };
  }

  runFunction = (e, functionMap) => {
    const func = functionMap[e.keyCode];
    if(func) {
      func();
      e.preventDefault();
    }
  }

  keydown = (e) => {
    this.runFunction(e, this._functionMapDown);
  }

  keyup = (e) => {
    this.runFunction(e, this._functionMapUp); 
  }
}