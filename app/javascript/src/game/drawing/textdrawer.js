import {Drawer} from './drawer.js';

export class TextDrawer extends Drawer {
  constructor(position, text, params) {
    super(params);
    this.position = position;
    this.text = text;
  }

  _draw = (context) => {
    context.fillText(this.text, this.position.x, this.position.y + 20);
  }
}