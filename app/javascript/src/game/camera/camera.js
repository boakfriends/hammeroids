import {Delta} from './delta.js';

export class Camera {
  constructor(gameState) {
    this.gameState = gameState;
    this.x = this.gameState.gameWidth / 2;
    this.y = this.gameState.gameHeight / 2;
  }

  update(context) {
    const shipPosition = this.gameState.playerShip.getState().position;
    this.delta = new Delta(shipPosition, this);
    this.updateSpaceDust();
    this.x += this.delta.x;
    this.y += this.delta.y;
    const translateX = this.gameState.gameWidth / 2 - this.x;
    const translateY = this.gameState.gameHeight / 2 - this.y;
    context.translate(translateX, translateY);
  }

  updateSpaceDust() {
    this.gameState.spaceDust.forEach((dust) => dust.update(this.getBounds(), this.delta));
  }

  getBounds() {
    return [
      {
        x: this.x - this.gameState.gameWidth / 2,
        y: this.y - this.gameState.gameHeight / 2
      },
      {
        x: this.x + this.gameState.gameWidth / 2,
        y: this.y + this.gameState.gameHeight / 2
      }
    ]
  }

}