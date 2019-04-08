import {Vector} from '../../physics/vector.js';

// Coefficient of restitution
const e = 0.9;
const SHIP_MASS = 10;

export class ShipCollision {

  doCollision(ship1, ship2) {
    if(!ship1.impulseCollision && !ship2.impulseCollision) {
      ship1.impulseCollision = true;
      // Get line-of-action of collision (vector between two centre points)
      const lineOfAction = ship1.getBoundingBox().centrePoint().subtract(ship2.getBoundingBox().centrePoint());

      // Use rotation matrix to determine velocity components along line-of-action and normal to it

      const angle1 = ship1.physics.momentumVector.angle() - lineOfAction.angle(); // Angle of momentum vs line of action
      const v1 = ship1.physics.momentumVector;
      const v1Loa = v1.velocityLoa(angle1);
      const v1Normal = v1.velocityNormal(angle1);

      const angle2 = ship2.physics.momentumVector.angle() - lineOfAction.angle(); // Angle of momentum vs line of action
      const v2 = ship2.physics.momentumVector;
      const v2Loa = v2.velocityLoa(angle2);
      const v2Normal = v2.velocityNormal(angle2);

      // Compute the post collision velocities
      const v1LoaPost = ((SHIP_MASS - SHIP_MASS * e) / SHIP_MASS + SHIP_MASS) * v1Loa;
      const v2LoaPost = (((1 + e) * SHIP_MASS) / SHIP_MASS + SHIP_MASS) * v1Loa;

      // Rotate the post collision velocities back to coordinate system
      const v1x = v1LoaPost * Math.cos(angle1) - v1Normal * Math.sin(angle1);
      const v1y = v1LoaPost * Math.sin(angle1) + v1Normal * Math.cos(angle1);
      const v2x = v2LoaPost * Math.cos(angle2) - v2Normal * Math.sin(angle2);
      const v2y = v2LoaPost * Math.sin(angle2) + v2Normal * Math.cos(angle2);

      ship1.physics.momentumVector = new Vector(v1x, v1y);
      ship2.physics.momentumVector = new Vector(v2x, v2y);
    }
    ship1.impulseCollision = true;
    ship2.impulseCollision = true;
  }
}