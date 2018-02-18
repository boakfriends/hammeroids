var App = function(canvasElement){
    var app = this;
    app.update = function(){
      alert('Test update');
    };
  (function(){
  })();
};
window.onload = function(){
  var app = new App(document.getElementById('canvas'));
  app.update();
};
