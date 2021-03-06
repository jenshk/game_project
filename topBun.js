var TopBun = function(background, settings){

	//settings
	var topBunElement = null;
	// setting a id on every spawning chilliBomb
	this.id = settings.id;
	
	//this function checks if the div class "topBun" has the id.
	this.create = function create(){
		if($('topBun #' + this.id)){
			//for every new spawn, there is a new id number.
			settings.id++;
			this.id = settings.id;
		}

	//Points to the Score object for the script.js
	this.key = 'topBun'

	//this will assign a <div> the new spawned topBun with it's ID to the background.
	this.topBun = $('<div/>').attr('id', this.id).addClass('topBun')

 	//this will append the new spawned topBun with it's ID to the background.
	background.append(this.topBun);

	// when you call 'new' something, 'this.' will call a member of an instance. 
	// That way every item will have it's own bounding box
	this.boundingBox = $('<div/>').addClass('rect2');

	this.topBun.append(this.boundingBox);

	//this converts the ID number to a string.
	topBunElement = document.getElementById((this.id).toString()); 
    topBunElement.style.left = '25px';


	//Math.random decides where the food will be spawned
	topBunElement.style.left = Math.floor(Math.random() * (450-25)) + 25 + 'px';

		}

function wall() {

			var topBunElementRect = topBunElement.getBoundingClientRect();

			var backgroundElm = background.get(0);
			var backgroundElmRect = backgroundElm.getBoundingClientRect();

			if(topBunElementRect.left < backgroundElmRect.left ){
				topBunElement.style.left = '0px';
			}

			if(topBunElementRect.right > backgroundElmRect.right ){
				topBunElement.style.left = backgroundElmRect.width - topBunElementRect.width  + 'px';
			}

	}


	// this sets the movement of the topBun
	this.move = function move(interactions) {
		//Set to automatic. (not controled by player)
		if(!this.stacked) {
			//topBun is moving to 15px per milliseconds down the screen.
			$(topBunElement).animate({top: "+=12"},1);
		} 
		wall();
	}


	

	this.create();
	this.removeSelf = function() { 
	// Do removal logic 
	 this.topBun.remove();
	}


	this.render = function(interactions){
		//render function updates the movement into the Game Loop.
		this.move(interactions);
	}
	

}