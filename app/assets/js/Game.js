var Game = function(canvasElement){
  var game = this,
    gameState = new GameState(),
    GAME_WIDTH = 800,
    GAME_HEIGHT = 600;
  
  game.update = function(){
    updateState();
    draw();
  };

  function updateState(){
    gameState.update();
  }

  function draw(){
    context = getContext();
    drawRect(context);
    drawObjects(context);
  }

  function drawRect(context){
    context.fillStyle = "rgb(0,0,0)";
    context.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  }

  function drawObject(object){
    return function(context){
      var coords = object.getCoords(),
        i;
      context.strokeStyle = object.getColour();
      context.lineWidth = object.getLineWidth();
      context.beginPath();
      for(i = 0; i < coords.length; i++){
        if(i === 0){
          context.moveTo(coords[i].x, coords[i].y);
        } else {
          context.lineTo(coords[i].x, coords[i].y);  
        }
      }
      context.closePath();
      context.stroke();
    };
  }

  function drawObjects(context){
    var objects = gameState.getObjects();
    for(var object in objects){
      drawObject(objects[object])(context);
    }
  }

  function getContext(){
    return canvasElement.getContext("2d");
  }

  function initialise(){
    canvasElement.width = GAME_WIDTH;
    canvasElement.height = GAME_HEIGHT;
    var events = ['keydown', 'keyup'];
    for(var ev in events){
      window.addEventListener(events[ev], gameState[events[ev]], false);
    }
    gameState.newPlayerShip(GAME_WIDTH / 2, GAME_HEIGHT / 2);
  }

  initialise();

  return {
    update: game.update
  };
};