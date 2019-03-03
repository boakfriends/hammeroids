export class ParticleDrawer {
  constructor(data, params) {
    this._params = params;
    this._data = data;
  }

  draw = (context) => {
    this._params.forEach((param) => context[param.key] = param.value);
    context.beginPath();
    context.arc(this._data.x, this._data.y, this._data.z * this._data.size, 0, Math.PI*2, true);
    context.closePath();
    context.fill();
  }
}