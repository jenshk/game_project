var Lettuce = function(background, settings){

	//settings
	var lettuceElement = null;

	// setting a id on every spawning lettuce
	this.id = settings.id;

	//this function checks if the div class "lettuce" has the id.
	this.create = function create(){
		if($('lettuce #' + this.id)){
			//for every new spawn, there is a new id number.
			settings.id++;
			this.id = settings.id;
		}

	//Points to the Score object for the script.js
	this.key = 'lettuce'

 	//this will assign a <div> the new spawned lettuce with it's ID to the background.
 	this.lettuce = $('<div/>').attr('id', this.id).addClass('lettuce')

	background.append(this.lettuce);

	// when you call 'new' something, 'this.' will call a member of an instance.
	// That way every item will have it's own bounding box
	this.boundingBox = $('<div/>').addClass('rect2');

	this.lettuce.append(this.boundingBox);

	//this converts the ID number to a string.
	lettuceElement = document.getElementById((this.id).toString());
    lettuceElement.style.left = '25px';

	//Math.random decides where the food will be spawned
	lettuceElement.style.left = Math.floor(Math.random() * (450-25)) + 25 + 'px';

	}


	function wall() {

			var lettuceElementRect = lettuceElement.getBoundingClientRect();

			var backgroundElm = background.get(0);
			var backgroundElmRect = backgroundElm.getBoundingClientRect();

			if(lettuceElementRect.left < backgroundElmRect.left ){
				lettuceElement.style.left = '0px';
			}

			if(lettuceElementRect.right > backgroundElmRect.right ){
				lettuceElement.style.left = backgroundElmRect.width - lettuceElementRect.width  + 'px';
			}

	}


	// this sets the movement of the lettuce
	this.move = function move(interactions) {
		if (this.stacked) {
			//create logic that follows the plate
				if(interactions.left) {
					this.lettuce.animate({left: '-=5'}, 1);
				}
				if(interactions.right) {
					this.lettuce.animate({left: '+=5'}, 1);
				}
		}
		//Set to automatic. (not controled by player)
		else if(!this.stacked) {
			//lettuce is moving to 5px per milliseconds down the screen.
			$(lettuceElement).animate({top: "+=5"},1);
		}

		wall();
	}

	// this function initialises the variable = lettuce and calls create() and removeSelf();

	this.create();
	this.removeSelf = function() {
	// Do removal logic
	 this.lettuce.remove();
	}

	this.render = function(interactions){
		//render function updates the movement into the Game Loop.
		this.move(interactions);
	}

}
