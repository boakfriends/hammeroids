var scheme   = "ws://";
var uri      = scheme + window.document.location.host;
var ws       = new WebSocket(uri);

ws.onopen = function (event) {
  ws.send("Hi, I'm a new player");
};

ws.onmessage = function(event) {
  console.log('Message received');
  var data = JSON.parse(event.data);
  $('div#players').empty();
  if (data.type === 'playerList') {
    data.data.forEach(function(element) {
      $('div#players').append('<div>' + element + '</div>');
    });
  }
};