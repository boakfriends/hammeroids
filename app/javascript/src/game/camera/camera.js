import {Vector} from '../physics/vector.js';

export class Camera {
  constructor(gameState) {
    this.gameState = gameState;
    this.position = new Vector(gameState.centrePoint.x, gameState.centrePoint.y);
  }

  update(context) {
    const shipPosition = this.gameState.playerShip.getPosition();
    this.delta = new Vector(shipPosition.x, shipPosition.y).subtract(this.position).scale(0.1);
    this.updateSpaceDust();
    this.position = this.position.add(this.delta);
    const translateVector = this.gameState.centrePoint.subtract(this.position);
    context.translate(translateVector.x, translateVector.y);
  }

  updateSpaceDust() {
    this.gameState.spaceDust.forEach((dust) => dust.update(this.getBounds(), this.delta));
  }

  getBounds() {
    return [
      this.position.subtract(this.gameState.centrePoint),
      this.position.add(this.gameState.centrePoint)
    ]
  }

}