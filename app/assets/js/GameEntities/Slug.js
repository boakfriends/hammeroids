var Slug = function (xPos, yPos, angle){
	var SLUG_SPEED = 15,
		xMomentum = Physics.getCosOfDegrees(angle + 90),
		yMomentum = Physics.getCosOfDegrees(angle),
		physics = new Physics(1, 3, xPos, yPos, angle, xMomentum * SLUG_SPEED, yMomentum * SLUG_SPEED),
		slugCoords = [[0,4],[0,-4]],
		slugLineWidth = 4;

	function getCoords(){
		var coordArray = [];
		for(var coord in slugCoords){
	      coordArray.push(physics.getTransform(slugCoords[coord][0], slugCoords[coord][1]));
	    }
	    return coordArray;
	}

	function getColour(){
		return 'rgb(200,200,200)';
	}

	function getLineWidth(){
		return slugLineWidth;
	}

	function update(){
		physics.update();
	}

	return{
		getCoords: getCoords,
		getColour: getColour,
		getLineWidth: getLineWidth,
		update: update
	};
};