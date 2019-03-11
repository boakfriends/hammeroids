import {Delta} from './delta.js';

export class Camera {
  constructor(gameState) {
    this.model = gameState.model;
    this.playAreaDimensions = gameState.playAreaDimensions;
    this.x = this.playAreaDimensions.widthMid;
    this.y = this.playAreaDimensions.heightMid;
  }

  update(context) {
    const shipPosition = this.model.playerShip.getState().position;
    this.delta = new Delta(shipPosition, this);
    this.updateSpaceDust();
    this.x += this.delta.x;
    this.y += this.delta.y;
    const translateX = this.playAreaDimensions.widthMid - this.x;
    const translateY = this.playAreaDimensions.heightMid - this.y;
    context.translate(translateX, translateY);
  }

  updateSpaceDust() {
    this.model.spaceDust.forEach((dust) => dust.update(this.getBounds(), this.delta));
  }

  getBounds() {
    return [
      {
        x: this.x - this.playAreaDimensions.widthMid,
        y: this.y - this.playAreaDimensions.heightMid
      },
      {
        x: this.x + this.playAreaDimensions.widthMid,
        y: this.y + this.playAreaDimensions.heightMid
      }
    ]
  }

}