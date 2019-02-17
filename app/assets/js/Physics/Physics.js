var Physics = function(friction, acceleration, startXPos, startYPos, angle, xMomentum, yMomentum){
	var angularMomentum = 0,
		yPos = startYPos,
		xPos = startXPos;

	function accel(){
		var yMomentumAddition = Physics.getCosOfDegrees(angle),
			xMomentumAddition = Physics.getCosOfDegrees(angle + 90);
		yMomentum = yMomentum + yMomentumAddition;
		xMomentum = xMomentum + xMomentumAddition;
	}

	function update(){
		yMomentum = yMomentum * friction;
		xMomentum = xMomentum * friction;
		yPos = yPos + yMomentum;
		xPos = xPos + xMomentum;
		angle = angularMomentum + angle % 360;
		angularMomentum = angularMomentum * friction;
	}

	function getState(){
		return {
			x: xPos,
			y: yPos,
			angle: angle,
			xMom: xMomentum,
			yMom: yMomentum
		};
	}

	function turn(momentumFunction){
		angularMomentum = momentumFunction(angularMomentum, acceleration);
	}

	function getTransform(x, y){
		var xPoint = x * Math.cos(angle * Math.PI / 180) - y * Math.sin(angle * Math.PI / 180) + xPos,
			yPoint = x * Math.sin(angle * Math.PI / 180) + y * Math.cos(angle * Math.PI / 180) + yPos;
		return {
			x: xPoint,
			y: yPoint
		};
	}

	return {
		update: update,
		accel: accel,
		turn: turn,
		getTransform: getTransform,
		getState: getState
	};

};

Physics.getCosOfDegrees = function(angle){
	return -Math.cos(angle * Math.PI / 180);
};