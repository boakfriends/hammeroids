export class App {
  constructor(gameState, view) {
    this.gameState = gameState;
    this.view = view;
    this.delta = 0;
    this.lastFrameTimeMs = 0;
    this.timeStep = 1000 / 60;
    this.rechargeTime = 100;
    this.lastFireTime = 0;
  }

  gameLoop = (timestamp) => {
    this.delta += timestamp - this.lastFrameTimeMs;
    this.lastFrameTimeMs = timestamp;

    while(this.delta >= this.timeStep) {
      this.gameState.update(this.delta / 10, timestamp);
      this.delta -= this.timeStep;
    }
    this.view.update();
    requestAnimationFrame(this.gameLoop);
  }

  run() {
    requestAnimationFrame(this.gameLoop);
  }
}