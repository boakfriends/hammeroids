export class Input {
  constructor(gameState) {
    this.gameState = gameState;
    this.functionMapDown = {
      38: () => gameState.model.playerShip.setAccelerating(true),
      37: () => gameState.model.playerShip.setTurning((momentum, acceleration) => momentum - acceleration),
      39: () => gameState.model.playerShip.setTurning((momentum, acceleration) => momentum + acceleration),
      18: () => this.gameState.firing = true,
      90: () => this.gameState.isShowDetail = true
    };
    this.functionMapUp = {
      38: () => gameState.model.playerShip.setAccelerating(false),
      37: () => gameState.model.playerShip.setTurning(undefined),
      39: () => gameState.model.playerShip.setTurning(undefined),
      18: () => this.gameState.firing = false,
      90: () => this.gameState.isShowDetail = false
    };
  }

  runFunction(e, functionMap) {
    const func = functionMap[e.keyCode];
    if(func) {
      func();
      e.preventDefault();
    }
  }

  keydown = (e) => {
    this.runFunction(e, this.functionMapDown);
  }

  keyup = (e) => {
    this.runFunction(e, this.functionMapUp); 
  }
}