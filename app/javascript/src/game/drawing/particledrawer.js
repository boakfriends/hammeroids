export class ParticleDrawer {
  constructor(data, params) {
    this.params = params;
    this.data = data;
  }

  draw = (context) => {
    this.params.forEach((param) => context[param.key] = param.value);
    context.beginPath();
    context.arc(this.data.position.x, this.data.position.y, this.data.z * this.data.size, 0, Math.PI*2, true);
    context.closePath();
    context.fill();
  }
}