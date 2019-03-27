import {Drawer} from './drawer.js';

export class PathDrawer extends Drawer {
  constructor(path, params) {
    super(params);
    this.path = path;
  }

  _draw = (context) => {
    context.beginPath();
    for(let i = 0; i < this.path.length; i++) {
      if(i === 0) {
        context.moveTo(this.path[i].x, this.path[i].y);
      } else {
        context.lineTo(this.path[i].x, this.path[i].y);
      }
    }
    context.closePath();
    context.stroke();
  }
}