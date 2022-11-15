import {TextDrawer} from './textdrawer.js';
import {BoxDrawer} from './boxdrawer.js';

export class DetailDrawer {
  constructor(object) {
    this.object = object;
  }

  draw(context) {
    const position = this.object.getPosition ? this.object.getPosition() : undefined;
    const name = this.object.name;
    if(name && position) {
      new TextDrawer(position, name, {
        'fillStyle': 'white',
        'font': "10px Arial",
        'textAlign': "center"
      }).draw(context);
    }
    const box = this.object.getBoundingBox();
    if(box) {
      new BoxDrawer(box, {
        'strokeStyle': 'rgb(66, 244, 200)'
      }).draw(context);
    }
  }
}