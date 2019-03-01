export class Creator {
  constructor(draw, coordsBox) {
    this._draw = draw;
    this._coordsBox = coordsBox;
    this._coords = [];
  }


  initialise = (addEventListener) => {
    addEventListener("mouseup", this.mouseUp);
    addEventListener("mousemove", this.mouseMove);
    this._draw.initialise();
  }

  mouseUp = (event) => {
    if(this._draw.inBounds(event)) {
      const lastCoord = this._draw.getMouseCoords(event);
      this._coords.push(lastCoord);
      this._draw.drawPath(this._coords);
      this.updateCoords();
    }
  }

  mouseMove = (event) => {
    this._draw.drawPathHelper(this._coords, event);
  }

  updateCoords = () => {
    this._coordsBox.innerText = Creator.xyToCoords(this._coords);
  }

  // Takes a list of coords as objects with x and y members and turns them to a list of lists of numbers
  static xyToCoords = (coords) => {
    const tempCoords = [];
    for(let i = 0; i< coords.length; i++) {
      let coord = coords[i];
      tempCoords.push([coord.x, coord.y]);
    }
    return JSON.stringify(tempCoords).replace(/],/g, "],\n");
  }

}