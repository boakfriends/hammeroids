export class PathDrawer {
  constructor(strokeStyle, lineWidth, coords) {
    this._strokeStyle = strokeStyle;
    this._lineWidth = lineWidth;
    this._coords = coords;
  }

  draw = (context) => {
    context.strokeStyle = this._strokeStyle;
    context.lineWidth = this._lineWidth;
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