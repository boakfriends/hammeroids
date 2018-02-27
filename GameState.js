var GameState = function(){
	var colours = {
	  RED: 255,
	  GREEN: 255,
	  BLUE: 255
	};

	function getRgb(){
	  return 'rgb(' + colours.RED + ',' + colours.GREEN + ',' + colours.BLUE +  ')';
	}

	return {
	  colours: colours,
	  getRgb: getRgb
	};
};