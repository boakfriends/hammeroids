import {GameDetails} from './gamedetails.js';
import {Arrows} from './elements/arrows.js';

export class GameUi {
  constructor(gameState, camera) {
    this.gameState = gameState;
    this.camera = camera;
    this.arrows = new Arrows(gameState.getObjects(), camera);
  }

  draw(context) {
    this.arrows.draw(context);
  }

  drawDetails(context) {
    const gameDetails = new GameDetails(this.gameState);
    gameDetails.draw(context, this.camera);
    this.gameState.getObjects().forEach(obj => obj.getDetail().draw(context));
  }
}