var Ship = function(startXPos, startYPos){
  var isAccelerating,
    shipCoords = [
      [0, -10],
      [7, 8],
      [0, 2],
      [-7, 8]
    ],
    xPos = startXPos,
    yPos = startYPos,
    shipLineWidth = 2;

  function getShipState(){
    return 'Ship isAccelerating: ' + isAccelerating;
  }

  function update(){
    console.log(getShipState());
  }

  function getCoords(){
    var coordArray = [];
    for(var coord in shipCoords){
      coordArray.push({
        x: shipCoords[coord][0] + xPos,
        y: shipCoords[coord][1] + yPos
      });
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

  return {
    setAccelerating: setAccelerating,
    update: update,
    getCoords: getCoords,
    getColour: getColour,
    getLineWidth: getLineWidth
  };
};