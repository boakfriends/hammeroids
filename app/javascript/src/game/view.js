export class View {

  constructor(gameState) {
    this.gameState = gameState;
    this._canvasElement = gameState.getCanvasElement();
    this._context = this._canvasElement.getContext('2d');
    this._gameWidth = this.gameState.getWidth();
    this._gameHeight = this.gameState.getHeight();
    this.updateGameCanvasSize();
  }

  drawBackgroundRectangle = (width, height) => {
    this._context.clearRect(0, 0, this._gameWidth, this._gameHeight);
    this._context.fillStyle = "rgb(0,0,0)";
    this._context.fillRect(0, 0, this._gameWidth, this._gameHeight);
  };

  drawObject = (object) => {
    object.getDrawer().draw(this._context);
  };

  drawGameObjects = () => {
    const objects = this.gameState.getObjects();
    objects.forEach((object) => {
      this.drawObject(object);
    })
  };

  updateGameCanvasSize = () => {
    this._canvasElement.width = this._gameWidth;
    this._canvasElement.height = this._gameHeight;
  }

  /*
  * Calls to this method update the rendering of the game.
  * gameState provides the state to render
  */

  update = () => {
    this.drawBackgroundRectangle();
    this.drawGameObjects();
  }
}