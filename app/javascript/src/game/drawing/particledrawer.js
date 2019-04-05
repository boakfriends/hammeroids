import {Drawer} from './drawer.js';

export class ParticleDrawer extends Drawer {
  constructor(data, params) {
    super(params);
    this.data = data;
  }

  _draw = (context) => {
    context.beginPath();
    context.arc(this.data.position.x, this.data.position.y, this.data.z * this.data.size, 0, Math.PI*2, true);
    context.closePath();
    context.fill();
  }
}