var GameState = function(){
  var playerShip,
  sockets = new Sockets(),
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
    if(e.keyCode == input.left){
      playerShip.setTurning("left");
    }
    if(e.keyCode == input.right){
      playerShip.setTurning("right");
    }
  }

  function keyUp(e){
    if(e.keyCode == input.up){
      playerShip.setAccelerating(false);
    }
    if(e.keyCode == input.left || e.keyCode == input.right){
      playerShip.setTurning(undefined);
    }
  }

  function update(){
    playerShip.update();
    updateNetworkState();
  }

  function updateNetworkState(){
    sockets.updatePlayerShipState(playerShip.getShipState());
    updateNetworkObjects();
  }

  function updateNetworkObjects(){
    sockets.getNetworkObjects();
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
