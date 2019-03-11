export class View {

  constructor(gameState, camera) {
    this.gameState = gameState;
    this.model = gameState.model;
    this.canvasElement = gameState.canvasElement;
    this.context = this.canvasElement.getContext('2d');
    this.gameWidth = this.gameState.getWidth();
    this.gameHeight = this.gameState.getHeight();
    this.updateGameCanvasSize();
    this.camera = camera;
  }

  drawBackgroundRectangle(width, height) {
    this.context.clearRect(0, 0, this.gameWidth, this.gameHeight);
    this.context.fillStyle = "rgb(0,0,0)";
    this.context.fillRect(0, 0, this.gameWidth, this.gameHeight);
  };

  updateObjectsWithFunctions = (objects, func) => {
    objects.forEach(func);
  };

  updateGameCanvasSize() {
    this.canvasElement.width = this.gameWidth;
    this.canvasElement.height = this.gameHeight;
  }

  /*
  * Calls to this method update the rendering of the game.
  * gameState provides the state to render
  */

  update = () => {
    this.context.setTransform(1,0,0,1,0,0);
    this.drawBackgroundRectangle();
    this.camera.update(this.context);
    this.updateObjectsWithFunctions(this.model.drawableObjects, (object) => object.getDrawer().draw(this.context));
    if(this.gameState.showDetail()) {
      this.updateObjectsWithFunctions(this.model.drawableObjects, (object) => object.getDetail().draw(this.context));
    }
  }
}