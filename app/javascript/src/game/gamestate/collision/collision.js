import {Interval} from './interval.js'

let showCollisions = true;

export class Collision {
  constructor(objects) {
    this.objects = objects;
  }

  doCollision() {
    this.objects.forEach(obj => obj.colliding = false);
    const xIntervals = getCollidingCandidateGroups(this.objects, 'x');
    let colliding = [];
    for(let interval of xIntervals) {
      const y = getCollidingCandidateGroups(interval.objects, "y");
      if(y.length > 0) {
        colliding = colliding.concat(y);
      }
    }
    colliding.forEach(c => decideCollision(c.objects));
  }

}

function decideCollision(objects) {
  for(let obj of objects) {
    for(let other of objects) {
      if(obj.parentId != other.parentId) {
        obj.colliding = true;
        other.colliding = true;
      }
    }
  }
}

function getCollidingCandidateGroups(objects, axis) {
  const intervals = [];
  objects.forEach(obj => Interval.addToArray(intervals, axis, obj));
  intervals.sort((x1, x2) => x1.point - x2.point);
  const candidates = [];
  const activeIntervals = [];
  for(let interval of intervals) {
    if(interval.type == 'b') {
      activeIntervals.push(interval);
    } else {
      activeIntervals.splice(activeIntervals.indexOf(interval.start), 1);
      if(activeIntervals.length > 0) {
        activeIntervals[0].add(interval.object);
      }
    }
  }
  return intervals.filter(interval => interval.hasOverlap());
}