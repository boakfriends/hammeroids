var Draw = function(canvas){
	var context = canvas.getContext("2d");

	function drawBox(){
		var rect = canvas.getBoundingClientRect();
		context.fillStyle = "rgb(0,0,0)";
		context.fillRect(0,0, rect.width, rect.height);
	}
	
	function drawLine(coords){
		drawBox();
		context.beginPath();
		for(var i = 0; i < coords.length; i++){
			if(i === 0){
				context.moveTo(coords[i].x, coords[i].y);
			} else {
				context.lineTo(coords[i].x, coords[i].y);
			}
		}
		context.lineWidth = 5;
		context.strokeStyle = "#FF0000";
		context.stroke();
	}

	function getMouseCoords(ev){
		var rect = canvas.getBoundingClientRect();
		return{
			x: ev.clientX - rect.left,
			y: ev.clientY - rect.top
		};
	}

	function inBounds(event){
		var rect = canvas.getBoundingClientRect();
		return event.clientX < (rect.width + rect.left) && event.clientY < (rect.height + rect.top) && event.clientX > rect.left && event.clientY > rect.top;
	}

	function initialise(){
		drawBox();
	}

	function drawFaintLine(coords, event){
		drawBox();
		drawLine(coords);
		var lastCoord = coords[coords.length - 1];
		context.beginPath();
		context.moveTo(lastCoord.x, lastCoord.y);
		var mouseCoords = getMouseCoords(event);
		context.lineTo(mouseCoords.x, mouseCoords.y);
		context.lineWidth = 3;
		context.strokeStyle = "#F00000";
		context.stroke();
	}

	return {
		getMouseCoords: getMouseCoords,
		inBounds: inBounds,
		initialise: initialise,
		drawFaintLine: drawFaintLine,
		drawLine: drawLine
	};
};