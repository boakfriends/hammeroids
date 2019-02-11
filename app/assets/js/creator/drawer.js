var Draw = function(canvas){
	var context = canvas.getContext("2d"),
		rect = canvas.getBoundingClientRect(),
		GRID_SIZE = 10; //size of grid in px

	function drawGrid(){
		// draw vertical lines
		for(var i = 0; i < rect.width; i += GRID_SIZE){
			drawSingleLine({x:i,y:0}, {x:i,y:rect.height});
		}
		// Horizontal Lines
		for(var i = 0; i < rect.height; i += GRID_SIZE){
			drawSingleLine({x:0,y:i}, {x:rect.width,y:i});
		}
	}

	function drawBox(){
		context.fillStyle = "rgb(0,0,0)";
		context.fillRect(0,0, rect.width, rect.height);
		drawGrid();
	}

	function drawSingleLine(start, end){
		context.beginPath();
		context.moveTo(start.x, start.y);
		context.lineTo(end.x, end.y);
		context.lineWidth = 1;
		context.strokeStyle = "#42e5f4";
		context.stroke();
	}
	
	function drawLine(coords){
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
		var tempX = ev.clientX - rect.left,
			tempY = ev.clientY - rect.top;

		return {
			x: Math.round(tempX/GRID_SIZE)*GRID_SIZE,
			y: Math.round(tempY/GRID_SIZE)*GRID_SIZE
		};
	}

	function inBounds(event){
		var rect = canvas.getBoundingClientRect();
		return event.clientX < (rect.width + rect.left) && event.clientY < (rect.height + rect.top) && event.clientX > rect.left && event.clientY > rect.top;
	}

	function initialise(){
		drawBox();
	}

	function drawHelpPoint(event){
		context.fillStyle = "#42e5f4";
		var coords = getMouseCoords(event);
		context.fillRect(coords.x - 2.5, coords.y - 2.5, 5,5);
	}

	function drawHelpLine(coords, event){
		var lastCoord = coords[coords.length - 1];
		context.beginPath();
		context.moveTo(lastCoord.x, lastCoord.y);
		var mouseCoords = getMouseCoords(event);
		context.lineTo(mouseCoords.x, mouseCoords.y);
		context.lineWidth = 3;
		context.strokeStyle = "#E00000";
		context.stroke();
	}

	function drawPathHelper(coords, event){
		drawBox();
		if(coords.length > 1){
			drawLine(coords);
		}
		if(inBounds(event)){
			if(coords.length > 0){
				drawHelpLine(coords, event);
			}
			drawHelpPoint(event);
		}
	}

	return {
		getMouseCoords: getMouseCoords,
		inBounds: inBounds,
		initialise: initialise,
		drawPathHelper: drawPathHelper,
		drawLine: drawLine
	};
};