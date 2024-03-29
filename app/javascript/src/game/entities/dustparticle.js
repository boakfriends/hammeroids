import { ParticleDrawer } from '../drawing/particledrawer.js';
import { Vector } from '../physics/vector.js';

export class DustParticle {
  constructor() {
    this.position;
    this.z = Math.random() * 1 + 0.3;
    this.size = 1.2;
    this.opacity = Math.random() * 0.9 + 0.1;
  }

  update(bounds, delta) {
    if(!this.position) {
      this.position = bounds.vectorWithinBounds();
    }
    this.position = this.position.subtract(delta.scale(this.z - 1));
    this.position = bounds.wrapBounds(this.position);
  }

  getDrawer = () => {
    return new ParticleDrawer(this, {
      fillStyle: 'rgba(226,219,226,' + this.opacity +')'}
    );
  }
}