import {TextDrawer} from '../drawing/textdrawer.js';
import {Vector} from '../physics/vector.js';

export class GameDetails {
  constructor(gameState) {
    this.framerate = this.showFrameRate(Math.round(gameState.frameRate, 2));
    this.velocity = gameState.playerShip.velocity.toFixed(2);
  }

  draw(context, camera) {
    this.framerate(camera).draw(context);
  }

  showFrameRate(framerate) {
    return (camera) => {
      const params = {
        fillStyle: 'white',
        font: "10px Arial",
        textAlign: "left"
      };
      const drawer = new TextDrawer(
        new Vector(20, 10).add(camera.getBounds().topLeft),
        `Framerate: ${framerate}\nVelocity: ${this.velocity}`,
        params
      );
      return drawer;
    }
  }

}