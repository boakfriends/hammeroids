var Game = function(canvasElement){
  var game = this,
    gameState = new GameState(),
    GAME_WIDTH = 200,
    GAME_HEIGHT = 200,
    SHIP_LINE_WIDTH = 2,
    START_COORDS_X = GAME_WIDTH / 2,
    START_COORDS_Y = GAME_HEIGHT / 2;
  
  game.update = function(){
    updateState();
    draw();
  };

  function updateState(){
    
  }

  function draw(){
    context = getContext();
    drawRect(context);
    drawShip(context);
  }

  function drawRect(context){
    context.fillStyle = "rgb(0,0,0)";
    context.fillRect(0, 0, 200, 200);
  }

  function drawShip(context){
    var shipCoords = [
      [0, -10],
      [7, 8],
      [0, 2],
      [-7, 8]
    ];
    
    context.strokeStyle = gameState.getRgb();
    context.lineWidth = SHIP_LINE_WIDTH;
    context.beginPath();
    context.moveTo(START_COORDS_X + shipCoords[0][0],START_COORDS_Y + shipCoords[0][1]);
    for(var i = 1; i < shipCoords.length; i++){
      var x = START_COORDS_X + shipCoords[i][0];
      var y = START_COORDS_Y + shipCoords[i][1];
      context.lineTo(x, y);
    }
    context.closePath();
    context.stroke();
  }

  game.keyDown = function(e){
    if(e.keyCode == 38){
      // Key up
      for(var p in gameState.colours){
        if(gameState.colours.hasOwnProperty(p)){
          gameState.colours[p] = Math.round(Math.random() * 255);
        }
      }
    }

    if(e.keyCode == 40){
      // Key down
    }

    if(e.keyCode == 37){
      // Arrow left
    }

    if(e.keyCode == 39){
      // Arrow right
    }
  };

  function getContext(){
    return canvasElement.getContext("2d");
  }

  function initialise(){
    canvasElement.width = GAME_WIDTH;
    canvasElement.height = GAME_HEIGHT;
  }

  initialise();

  return {
    update: game.update,
    keyDown: game.keyDown
  };
};