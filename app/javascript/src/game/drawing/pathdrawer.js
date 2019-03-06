export class PathDrawer {
  constructor(strokeStyle, lineWidth, coords, xy, name = 'playerShip') {
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
    this.coords = coords;
  }

  draw(context) {
    context.strokeStyle = this.strokeStyle;
    context.lineWidth = this.lineWidth;
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