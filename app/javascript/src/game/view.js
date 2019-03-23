import {TextDrawer} from './drawing/textdrawer.js';
import {Vector} from './physics/Vector';

export class View {

  constructor(gameState, camera) {
    this.gameState = gameState;
    this.canvasElement = gameState.canvasElement;
    this.context = this.canvasElement.getContext('2d');
    this.updateGameCanvasSize();
    this.camera = camera;
    this.gameState = gameState;
  }

  drawBackgroundRectangle(width, height) {
    this.context.clearRect(0, 0, this.gameState.width, this.gameState.height);
    this.context.fillStyle = "rgb(0,0,0)";
    this.context.fillRect(0, 0, this.gameState.width, this.gameState.height);
  };

  updateObjectsWithFunctions = (objects, func) => {
    objects.forEach(func);
  };

  // TODO delete this
  updateGameCanvasSize() {
    this.canvasElement.width = this.gameState.width;
    this.canvasElement.height = this.gameState.height;
  }

  showFrameRate(framerate) {
    const params = {
      fillStyle: 'white',
      font: "10px Arial",
      textAlign: "left"
    };
    const drawer = new TextDrawer(
      new Vector(20, 10).add(this.camera.getBounds()[0]),
      `Framerate: ${framerate}`,
      params
    );
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