import {TextDrawer} from './drawing/textdrawer.js';

export class View {

  constructor(gameState, camera) {
    this.gameState = gameState;
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

  showFrameRate(framerate) {
    const params = {
      fillStyle: 'white',
      font: "10px Arial",
      textAlign: "left"
    };
    const drawer = new TextDrawer({
      x: this.camera.getBounds()[0].x + 20,
      y: this.camera.getBounds()[0].y + 10,
      text: `Framerate: ${framerate}`
    }, params);
    drawer.draw(this.context);
  }

  /*
  * Calls to this method update the rendering of the game.
  * gameState provides the state to render
  */

  update = () => {
    this.context.setTransform(1,0,0,1,0,0);
    this.drawBackgroundRectangle();
    this.camera.update(this.context);
    this.updateObjectsWithFunctions(this.gameState.spaceDust, (object) => object.getDrawer().draw(this.context));
    this.updateObjectsWithFunctions(this.gameState.getObjects(),(object) => object.getDrawer().draw(this.context));
    if(this.gameState.showDetail()) {
      this.showFrameRate(Math.round(this.gameState.frameRate, 2));
      this.updateObjectsWithFunctions(this.gameState.getObjects(), (object) => object.getDetail().draw(this.context));
    }
  }
}