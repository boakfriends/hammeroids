import {Camera} from './camera/camera.js';

export class View {

  constructor(gameState) {
    this.gameState = gameState;
    this._canvasElement = gameState.getCanvasElement();
    this._context = this._canvasElement.getContext('2d');
    this._gameWidth = this.gameState.getWidth();
    this._gameHeight = this.gameState.getHeight();
    this.updateGameCanvasSize();
    this._camera = new Camera(gameState);
  }

  drawBackgroundRectangle = (width, height) => {
    this._context.clearRect(0, 0, this._gameWidth, this._gameHeight);
    this._context.fillStyle = "rgb(0,0,0)";
    this._context.fillRect(0, 0, this._gameWidth, this._gameHeight);
  };

  updateObjectsWithFunctions = (objects, func) => {
    objects.forEach(func);
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
    this._context.setTransform(1,0,0,1,0,0);
    this.drawBackgroundRectangle();
    this._camera.update(this._context);
    this.updateObjectsWithFunctions(this.gameState._spaceDust, (object) => object.getDrawer().draw(this._context));
    this.updateObjectsWithFunctions(this.gameState.getObjects(),(object) => object.getDrawer().draw(this._context));
    if(this.gameState.showDetail()) {
      this.updateObjectsWithFunctions(this.gameState.getObjects(), (object) => object.getDetail().draw(this._context));
    }
  }
}