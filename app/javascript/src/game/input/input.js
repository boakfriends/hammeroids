export class Input {
  constructor(gameState, playerController) {
    this.gameState = gameState;
    this.playerController = playerController;
    this.functionMapDown = {
      38: () => this.playerController.accelerating = true,
      37: () => this.playerController.turning = 'left',
      39: () => this.playerController.turning = 'right',
      18: () => this.gameState.firing = true,
      90: () => this.gameState.isShowDetail = true
    };
    this.functionMapUp = {
      38: () => this.playerController.accelerating = false,
      37: () => this.playerController.turning = undefined,
      39: () => this.playerController.turning = undefined,
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