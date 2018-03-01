window.onload = function(){
  var game = new Game(document.getElementById('canvas')),
    fps = 25;
  setInterval(game.update, 1000/fps);

};
