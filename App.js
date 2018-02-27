window.onload = function(){
  var game = new Game(document.getElementById('canvas')),
    fps = 5;
  setInterval(game.update, 1000/fps);

};
