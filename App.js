window.onload = function(){
  var game = new Game(document.getElementById('canvas')),
    fps = 5;
  window.addEventListener('keydown', game.keyDown, false);
  setInterval(game.update, 1000/fps);

};
