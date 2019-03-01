export class App {

  constructor(fps, gameSpeed) {
    this.fps = fps;
    this.gameSpeed = gameSpeed;
  }

  run = (gameState, view) => {
    setInterval(gameState.update, 1000/this.gameSpeed);
    setInterval(view.update, 1000/this.fps);
  }
}