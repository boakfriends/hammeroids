export class Draw {
  constructor(canvas) {
    this._context = canvas.getContext('2d');
    this._rect = canvas.getBoundingClientRect();
    this.GRID_SIZE = 10;
  }

  getMouseCoords = (ev) => {
    const tempX = ev.clientX - this._rect.left,
      tempY = ev.clientY - this._rect.top;

    return {
      x: Math.round(tempX/this.GRID_SIZE)*this.GRID_SIZE,
      y: Math.round(tempY/this.GRID_SIZE)*this.GRID_SIZE
    };
  }

  inBounds = (event) => {
    return event.clientX < (this._rect.width + this._rect.left) && event.clientY < (this._rect.height + this._rect.top) && event.clientX > this._rect.left && event.clientY > this._rect.top;
  }

  drawSingleLine = (start, end) => {
    this._context.beginPath();
    this._context.moveTo(start.x, start.y);
    this._context.lineTo(end.x, end.y);
    this._context.lineWidth = 1;
    this._context.strokeStyle = "#42e5f4";
    this._context.stroke();
  }

  drawGrid = () => {
    // draw vertical lines
    for(let i = 0; i < this._rect.width; i += this.GRID_SIZE) {
      this.drawSingleLine({x:i,y:0}, {x:i,y:this._rect.height});
    }
    // Horizontal Lines
    for(let i = 0; i < this._rect.height; i += this.GRID_SIZE) {
      this.drawSingleLine({x:0,y:i}, {x:this._rect.width,y:i});
    }
  }

  drawBox = () => {
    this._context.fillStyle = "rgb(0,0,0)";
    this._context.fillRect(0,0, this._rect.width, this._rect.height);
    this.drawGrid();
  }

  initialise = () => {
    this.drawBox();
  }

  drawHelpLine = (coords, event) => {
    const lastCoord = coords[coords.length - 1];
    this._context.beginPath();
    this._context.moveTo(lastCoord.x, lastCoord.y);
    const mouseCoords = this.getMouseCoords(event);
    this._context.lineTo(mouseCoords.x, mouseCoords.y);
    this._context.lineWidth = 3;
    this._context.strokeStyle = "#E00000";
    this._context.stroke();
  }

  drawPathHelper = (coords, event) => {
    this.drawBox();
    if(coords.length > 1) {
      this.drawPath(coords);
    }
    if(this.inBounds(event)) {
      if(coords.length > 0) {
        this.drawHelpLine(coords, event);
      }
      this.drawHelpPoint(event);
    }
  }

  drawHelpPoint = (event) => {
    this._context.fillStyle = "#42e5f4";
    const coords = this.getMouseCoords(event);
    this._context.fillRect(coords.x - 2.5, coords.y - 2.5, 5,5);
  }

  drawPath = (coords) => {
    this._context.beginPath();
    for(let i = 0; i < coords.length; i++) {
      if(i === 0) {
        this._context.moveTo(coords[i].x, coords[i].y);
      } else {
        this._context.lineTo(coords[i].x, coords[i].y);
      }
    }
    this._context.lineWidth = 5;
    this._context.strokeStyle = "#FF0000";
    this._context.stroke();
  }
}