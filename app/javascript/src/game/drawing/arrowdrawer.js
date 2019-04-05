import {Drawer} from './drawer.js';
import {PathDrawer} from './pathdrawer.js';
import {TextDrawer} from './textdrawer.js';
import {Vector} from '../physics/vector.js';

const ARROW_OFFSET = 20,
  ARROW_COLOUR = 'rgb(255, 135, 71)';

export class ArrowDrawer extends Drawer {
  constructor(position, bounds, number) {
    super({fillStyle: 'blue'});
    this.bounds = bounds;
    this.path = [
      new Vector(-2, 10),
      new Vector(0, -10),
      new Vector(2, 10),
      new Vector(-2, 10)
    ];
    this.position = Vector.fromString(position);
    this.number = number;
  }

  static withPositions(positions, bounds) {
    const arrowPositions = {};
    for(let position of positions) {
      const newPosition = bounds.withinBoundsOffset(position, ARROW_OFFSET);
      if(arrowPositions[newPosition]) {
        arrowPositions[newPosition] = arrowPositions[newPosition] + 1;
      } else {
        arrowPositions[newPosition] = 1;
      }
    }
    return Object.keys(arrowPositions).map(newPosition => new ArrowDrawer(newPosition, bounds, arrowPositions[newPosition]));
  }

  _draw = (context) => {
    const centre = this.bounds.centrePoint();
    const vectorToArrow = this.position.subtract(centre);
    const angle = vectorToArrow.angle() + (90 * Math.PI / 180);
    const newPath = [];
    for (let vector of this.path) {
      newPath.push(vector
        .rotate(angle, {x: 0, y: 0})
        .add(this.position));
    }
    const pathDrawer = new PathDrawer(newPath, {strokeStyle: ARROW_COLOUR});
    pathDrawer.draw(context);
    if(this.number > 1) {
      new TextDrawer(this.position, this.number, {
        'fillStyle': ARROW_COLOUR,
        'font': "10px Arial",
        'textAlign': "center"
      }).draw(context);
    }
  }
}