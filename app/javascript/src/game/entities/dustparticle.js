import {ParticleDrawer} from '../drawing/particledrawer.js';

export class DustParticle {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.z = Math.random() * 1 + 0.3;
    this.size = 1.2;
    this.opacity = Math.random() * 0.8 + 0.1;
  }

  update(bounds, delta) {
    if(this.x == 0 || this.y == 0) {
      this.x = Math.random() * (bounds[1].x - bounds[0].x) + bounds[0].x;
      this.y = Math.random() * (bounds[1].y - bounds[0].y) + bounds[0].y;
    }
    this.x -= (this.z - 1) * delta.x;
    this.y -= (this.z - 1) * delta.y;
    this.x = this.x < bounds[0].x ? bounds[1].x : this.x
    this.x = this.x > bounds[1].x ? bounds[0].x : this.x
    this.y = this.y > bounds[1].y ? bounds[0].y : this.y
    this.y = this.y < bounds[0].y ? bounds[1].y : this.y
  }

  getDrawer = () => {
    return new ParticleDrawer(this, [
      {'key': 'fillStyle', 'value': 'rgba(226,219,226,' + this.opacity +')'}
    ]);
  }
}