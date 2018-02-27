var GameState = function(){
  var playerShip,
    input = {
      'up': 38,
      'down': 40,
      'left': 37,
      'right': 39
    },
    shipCoords = [
      [0, -10],
      [7, 8],
      [0, 2],
      [-7, 8]
    ];

  function newPlayerShip(xPos, yPos){
    playerShip = new Ship(xPos, yPos);
  }

  function keyDown(e){
    if(e.keyCode == input.up){
      playerShip.setAccelerating(true);
    }
  }

  function keyUp(e){
    if(e.keyCode == input.up){
      playerShip.setAccelerating(false);
    }
  }

  function update(){
    playerShip.update();
  }

  function getObjects(){
    return [playerShip];
  }

  return {
    update: update,
    keydown: keyDown,
    keyup: keyUp,
    newPlayerShip: newPlayerShip,
    getObjects: getObjects
  };
};