import {Drawer} from './drawer.js';

export class TextDrawer extends Drawer {
  constructor(data, params) {
    super(params);
    this.x = data.x;
    this.y = data.y;
    this.text = data.text;
  }

  _draw = (context) => {
    context.fillText(this.text, this.x, this.y + 20);
  }
}