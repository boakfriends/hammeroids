export class Input {
  constructor(gameState) {
    this.gameState = gameState;
    this.functionMapDown = {
      38: () => this.gameState.playerShip.setAccelerating(true),
      37: () => this.gameState.playerShip.setTurning((momentum, acceleration) => momentum - acceleration),
      39: () => this.gameState.playerShip.setTurning((momentum, acceleration) => momentum + acceleration),
      18: () => this.gameState.firing = true,
      90: () => this.gameState.isShowDetail = true,
      81: () => this.gameState.spawningAsteroid = true
    };
    this.functionMapUp = {
      38: () => this.gameState.playerShip.setAccelerating(false),
      37: () => this.gameState.playerShip.setTurning(undefined),
      39: () => this.gameState.playerShip.setTurning(undefined),
      18: () => this.gameState.firing = false,
      90: () => this.gameState.isShowDetail = false,
      81: () => this.gameState.spawningAsteroid = false
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