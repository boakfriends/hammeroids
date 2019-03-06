import {Drawer} from './drawer.js';

export class PathDrawer extends Drawer {
  constructor(coords, params) {
    super(params);
    this.coords = coords;
  }

  _draw = (context) => {
    context.beginPath();
    for(let i = 0; i < this.coords.length; i++) {
      if(i === 0) {
        context.moveTo(this.coords[i].x, this.coords[i].y);
      } else {
        context.lineTo(this.coords[i].x, this.coords[i].y);
      }
    }
    context.closePath();
    context.stroke();
  }
}