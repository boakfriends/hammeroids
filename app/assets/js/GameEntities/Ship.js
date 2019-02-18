var Ship = function(startXPos, startYPos){
  var isAccelerating,
    shipCoords = [
      [0, -10],
      [7, 8],
      [0, 2],
      [-7, 8]
    ],
    shipLineWidth = 2,
    yAcceleration = 2,
    yMomentum = 0,
    friction = 0.9,
    turning, 
    physics = new Physics(friction, 3, startXPos, startYPos, 0, 0, 0);

  function getShipState(){
    return physics.getState();
  }

  function update(){
    if(isAccelerating){
      physics.accel();
    }
    if(turning){
      physics.turn(turning);
    }
    physics.update();
  }

  function getCoords(){
    var coordArray = [];
    for(var coord in shipCoords){
      coordArray.push(physics.getTransform(shipCoords[coord][0], shipCoords[coord][1]));
    }
    return coordArray;
  }

  function getColour(){
    return 'rgb(255,255,255)';
  }

  function getLineWidth(){
    return shipLineWidth;
  }

  function setAccelerating(accelerating){
    isAccelerating = accelerating;
  }

  function setTurning(turnDirection){
    if(turnDirection == "left"){
      turning = function(angularMomentum, accel){
        return angularMomentum -= accel;
      };
    } else if(turnDirection == "right"){
      turning = function(angularMomentum, accel){
        return angularMomentum += accel;
      };
    } else {
      turning = undefined;
    }
  }

  return {
    setAccelerating: setAccelerating,
    setTurning: setTurning,
    update: update,
    getCoords: getCoords,
    getShipState: getShipState,
    getColour: getColour,
    getLineWidth: getLineWidth
  };
};