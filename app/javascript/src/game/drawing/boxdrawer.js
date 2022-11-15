import { Drawer } from './drawer.js';

export class BoxDrawer extends Drawer {
  constructor(box, params={'strokeStyle':'rgb(60,40,40)'}) {
    super(params);
    this.box = box;
  }

  _draw = (context) => {
    context.rect(this.box.topLeft.x, this.box.topLeft.y, this.box.width, this.box.height);
    context.stroke();
  }
}