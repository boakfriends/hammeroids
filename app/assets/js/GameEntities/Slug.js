var Slug = function (xPos, yPos, angle, xMomentum, yMomentum){
	var physics = new Physics(1, 3, xPos, yPos, angle, xMomentum, yMomentum),
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
		physics.accel();
		physics.update();
	}

	return{
		getCoords: getCoords,
		getColour: getColour,
		getLineWidth: getLineWidth,
		update: update
	};
};