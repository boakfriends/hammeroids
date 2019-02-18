var Creator = function(draw){
  var coords = [];

  function mouseUp(event){
    if(draw.inBounds(event)){
      var lastCoord = draw.getMouseCoords(event);
      coords.push(lastCoord);
      draw.drawLine(coords);
      updateCoords();
    }
  }

  function mouseMove(event){
    draw.drawPathHelper(coords, event);
  }

  function initialise(){
    window.addEventListener("mouseup", mouseUp);
    window.addEventListener("mousemove", mouseMove);
    draw.initialise();
  }

  // Takes a list of coords as objects with x and y members and turns them to a list of lists of numbers
  function xyToCoords(){
    var tempCoords = [];
    for(var i = 0; i< coords.length; i++){
      var coord = coords[i];
      tempCoords.push([coord.x, coord.y]);
    }
    return JSON.stringify(tempCoords).replace(/],/g, "],\n");
  }

  function updateCoords(){
    var coordsElement = document.getElementById("coords");
    coordsElement.innerText = xyToCoords();
  }

  return {
    initialise: initialise
  };
};

window.onload = function(){
  var draw = new Draw(document.getElementById("canvas"));
  var creator = new Creator(draw);
  creator.initialise();
};