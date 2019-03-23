export class PlayerController {
  constructor(gameState) {
    this.gameState = gameState;
    this.input = gameState.input;
  }

  update() {
    this.gameState.playerShip.physics.accelerating = this.accelerating;
    this.gameState.playerShip.physics.turning = this.turning;
  }
}