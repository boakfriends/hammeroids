var Creator = function(canvas){
	var coords = [],
		startLine;

	function getMouseCoords(ev){
		var rect = canvas.getBoundingClientRect();
		return{
			x: ev.clientX - rect.left,
			y: ev.clientY - rect.top
		};
	}

	function mouseUp(event){
		if(coords){
			var lastCoord = getMouseCoords(event);
			coords.push(lastCoord);
			drawLine();
			startLine = undefined;
		} else {
			coords = getMouseCoords(event);
		}
		updateCoords();
	}

	function initialise(){
		window.addEventListener("mouseup", mouseUp);
		
	}

	// Takes a list of coords as objects with x and y members and turns them to a list of lists of numbers
	function xyToCoords(){
		var tempCoords = [];
		for(var i = 0; i< coords.length; i++){
			var coord = coords[i];
			tempCoords.push([coord.x, coord.y]);
		}
		return JSON.stringify(tempCoords);
	}

	function updateCoords(){
		var coordsElement = document.getElementById("coords");
		coordsElement.innerText = xyToCoords();
	}

	function drawLine(){
		var context = canvas.getContext("2d");
		context.beginPath();
		for(var i = 0; i < coords.length; i++){
			if(i === 0){
				context.moveTo(coords[i].x, coords[i].y);
			} else {
				context.lineTo(coords[i].x, coords[i].y);
			}
		}
		context.stroke();
	}

	return {
		initialise: initialise
	};
};

window.onload = function(){
	var creator = new Creator(document.getElementById("canvas"));
	creator.initialise();
};