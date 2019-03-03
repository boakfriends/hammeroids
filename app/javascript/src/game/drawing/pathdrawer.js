export class PathDrawer {
  constructor(coords, params) {
    this._coords = coords;
    this._params = params;
  }

  draw = (context) => {
    this._params.forEach((param) => context[param.key] = param.value);
    context.beginPath();
    for(let i = 0; i < this._coords.length; i++) {
      if(i === 0) {
        context.moveTo(this._coords[i].x, this._coords[i].y);
      } else {
        context.lineTo(this._coords[i].x, this._coords[i].y);
      }
    }
    context.closePath();
    context.stroke();
  }
}