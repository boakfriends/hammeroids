export class TextDrawer {
  constructor(x, y, text = "playerShip") {
    this.x = x;
    this.y = y;
    this.text = text;
  }

  draw = (context) => {
    context.fillStyle = 'white';
    context.font = "10px Arial";
    context.textAlign = "center";
    context.fillText(this.text, this.x, this.y + 20);
  }
}