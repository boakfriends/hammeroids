var GameState = function(){
  var playerShip,
    objects =[],
    sockets = new Sockets(),
    playerFiring,
    lastFired = 0,
    firingDelay = 200,
    input = {
      'up': 38,
      'down': 40,
      'left': 37,
      'right': 39,
      'fire': 32
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
    if(e.keyCode == input.fire){
      setFiring(true);
    }
  }

  function keyUp(e){
    if(e.keyCode == input.up){
      playerShip.setAccelerating(false);
    }
    if(e.keyCode == input.left || e.keyCode == input.right){
    	playerShip.setTurning(undefined);
    }
    if(e.keyCode == input.fire){
      setFiring(false);
    }
  }

  function setFiring(firing){
    playerFiring = firing;
  }

  function update(){
    playerShip.update();
    updateObjects();
    updateFiring();
    updateNetworkState();
  }

  function updateFiring(){
    if(playerFiring && firingAllowed()){
      var shipState = playerShip.getShipState();
      objects.push(new Slug(shipState.x, shipState.y, shipState.angle, shipState.xMom, shipState.yMom));
      lastFired = new Date().getTime();
    }
  }

  function firingAllowed(){
    return new Date().getTime() - lastFired > firingDelay;
  }

  function updateObjects(){
    for(var obj in objects){
      objects[obj].update();
    }
  }

  function updateNetworkState(){
    sockets.updatePlayerShipState(playerShip.getShipState());
    updateNetworkObjects();
  }

  function updateNetworkObjects(){
    sockets.getNetworkObjects();
  }

  function getObjects(){
    var objArr = [];
    objArr.push(playerShip);
    for(var obj in objects){
      objArr.push(objects[obj]);
    }
    return objArr;
  }

  return {
    update: update,
    keydown: keyDown,
    keyup: keyUp,
    newPlayerShip: newPlayerShip,
    getObjects: getObjects
  };
};