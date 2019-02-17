var Sockets = function(){
	var scheme = "ws://",
		uri = scheme + window.document.location.host + ':8080' + '/game',
		ws = new WebSocket("ws://localhost:8080/game"),
		networkObjects = [];

	function updatePlayerShipState(playerShipState){
		ws.send(JSON.stringify(playerShipState));
	}

	function getNetworkObjects(){
		return networkObjects;
	}

	ws.onmessage = function(event){
		var data = JSON.parse(event.data);
                console.log(data);

	};

	return {
		updatePlayerShipState: updatePlayerShipState,
		getNetworkObjects: getNetworkObjects
	};
};
