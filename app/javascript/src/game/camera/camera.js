export class Camera {
  constructor(gameState) {
    this._gameState = gameState;
    this._cameraX = this._gameState._gameWidth / 2;
    this._cameraY = this._gameState._gameHeight / 2;
  }

  update = (context) => {
    const shipPosition = this._gameState._playerShip.getState();
    this.setDelta(shipPosition);
    this.updateSpaceDust();
    this._cameraX += this._delta.x;
    this._cameraY += this._delta.y;
    const translateX = this._gameState._gameWidth / 2 - this._cameraX;
    const translateY = this._gameState._gameHeight / 2 - this._cameraY;
    context.translate(translateX, translateY);
  }

  updateSpaceDust = () => {
    for(let i = 0; i < this._gameState._spaceDust.length; i++) {
      let dust = this._gameState._spaceDust[i];
      dust.x -= (dust.z - 1) * this._delta.x;
      dust.y -= (dust.z - 1) * this._delta.y;
      dust.update(this.getBounds());
    }
  }

  getBounds = () => {
    return [
      {
        x: this._cameraX - this._gameState._gameWidth / 2,
        y: this._cameraY - this._gameState._gameHeight / 2
      },
      {
        x: this._cameraX + this._gameState._gameWidth / 2,
        y: this._cameraY + this._gameState._gameHeight / 2
      }
    ]
  }

  setDelta = (shipPosition) => {
    this._delta = {
      x: (shipPosition.x - this._cameraX) / 10,
      y: (shipPosition.y - this._cameraY) / 10
    }
  }
}