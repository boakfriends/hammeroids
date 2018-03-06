var Sockets = function(){
	var scheme = "ws://",
		uri = scheme + window.document.location.host,
		ws = new WebSocket(uri),
		networkObjects = [];

	function updatePlayerShipState(playerShipState){
		ws.send(JSON.stringify(playerShipState));
	}

	function getNetworkObjects(){
		return networkObjects;
	}

	ws.onmessage = function(event){
		var data = JSON.parse(event.data);

	}

	return {
		updatePlayerShipState: updatePlayerShipState,
		getNetworkObjects: getNetworkObjects
	};
}