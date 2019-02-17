var Physics = function(friction, acceleration, startYPos, startXPos){
  var xMomentum = 0,
    yMomentum = 0,
    angularMomentum = 0,
    yPos = startYPos,
    xPos = startXPos,
    angle = 0;

  function accel(){
    var yMomentumAddition = -Math.cos(angle * Math.PI / 180),
      xMomentumAddition = -Math.cos((angle + 90) * Math.PI / 180);
    yMomentum = yMomentum + yMomentumAddition;
    xMomentum = xMomentum + xMomentumAddition;
  }

  function update(){
    yMomentum = yMomentum * friction;
    xMomentum = xMomentum * friction;
    yPos = yPos + yMomentum;
    xPos = xPos + xMomentum;
    angle = angularMomentum + angle % 360;
    angularMomentum = angularMomentum * friction;
  }

  function getState(){
    return {
      x: xPos,
      y: yPos,
      angle: angle
    };
  }

  function turn(momentumFunction){
    angularMomentum = momentumFunction(angularMomentum, acceleration);
  }

  function getTransform(x, y){
    var xPoint = x * Math.cos(angle * Math.PI / 180) - y * Math.sin(angle * Math.PI / 180) + xPos,
      yPoint = x * Math.sin(angle * Math.PI / 180) + y * Math.cos(angle * Math.PI / 180) + yPos;
    return {
      x: xPoint,
      y: yPoint
    };
  }

  return {
    update: update,
    accel: accel,
    turn: turn,
    getTransform: getTransform,
    getState: getState
  };

};