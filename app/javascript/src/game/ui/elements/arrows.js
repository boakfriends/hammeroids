import {Ship} from '../../entities/ship.js';
import {ArrowDrawer} from '../../drawing/arrowdrawer.js';

export class Arrows {
  constructor(objects, camera) {
    this.objects = objects;
    this.camera = camera;
  }

  draw(context) {
    this.getArrows(this.objects)(this.camera).draw(context);
  }

  getArrows(objects) {
    const ships = [];
    for(let obj of objects) {
      if(obj instanceof Ship) {
        ships.push(obj);
      }
    }
    return (camera) => {
      const shipPositions = [];
      for(let ship of ships) {
        if(!camera.getBounds().inBounds(ship.getPosition())) {
          shipPositions.push(ship.getPosition());
        }
      }
      const drawer = {
        draw: (context) => {
          const arrowDrawers = ArrowDrawer.withPositions(shipPositions, camera.getBounds());
          for(let arrowDrawer of arrowDrawers) {
            arrowDrawer.draw(context);
          }
        }
      }
      return drawer;
    }
  }
}