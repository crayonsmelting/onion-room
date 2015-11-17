//Copyright (C) 2015 crayonsmelting - protected under Australian and International Copyright law
//crayonsmelting can be found at http://www.github.com/crayonsmelting/ or at crayons.melting@gmail.com
//Licence found within licence.txt

/////////////////////http://nomediakings.org/guildedyouth////////////////////////////
//Is for some reason noteworthy?

//GLOBALS
var readCounter = 0;

GAME = {
	doNext: function(){ beginning(); },
	enterBreak: false,
	player: {
		gold: false,
		dead: false
	}
}

var _ = GAME;

//UI read/write

function say(words) {
	var words = words.split("\n");// separate at new line

	//append each line as its own paragraph
	words.forEach( function(line) {
		$(output).append("<p>" + line + "</p>");
	});
}

function sayMessage(words) {
	say(words);
}

function match(subject,matches){
	if (Object.prototype.toString.call(matches) === '[object Array]'){
		for (matchI in matches){
			if (matches[matchI] === subject){
				return true
			}
			return false;
		}
	}else{
		return subject === matches;
	}
}

function commandIs(matches){
	return match(command,matches);
}

function read(){
	//collects input, and then runs the next function to interpret it
	readCounter++;
	console.log(readCounter);

	caseSensCommand = input.val(); // collect value of commands
	command = caseSensCommand.toLowerCase(); // collect value of commands for interpreting

	//return unified values for alternative command wordings, or report an error
	if (commandIs("")){
		console.log("nothing");
		return;

	} else if (commandIs(["south","down","s"])){
		command = "south";

	} else if (commandIs(["north","n","forward","up"])) {
		command = "north";

	} else if (commandIs(["east","e","right"])) {
		command = "east";

	} else if (commandIs(["west","w","left"])) {
		command = "west";
	}
	console.log("Player said '" + command + "'.");
	_.doNext();
}

function noEvent() {
	//For whenever the player is free to move around and do whatever
	console.log("noEvent");
	if (commandIs("panic")) {
		lineBreak();
		say( "\nHOW DO YOU EXPECT ME TO RESPOND TO SOMETHING LIKE THAT," +
				"\nBUCKO? DO YOU THINK IT'S EASY REPLYING TO ALL YOUR BULL?! I DON'T" +
				"\nGET PAID ENOUGH FOR THIS!" +
				"\n... " +
				"\nWas that good enough?");
	}

}

//----------------------------------------------------

function onionRoom() {
	//Find where the output and prompt are
	output = $("#output");
	input = $("#input");

	//introduction to a great adventure
	sayMessage( "\nThis okay game is COPYRIGHT © 2015 crayonsmelting. See licence for info. " +
			"\nHey guy! Welcome to your new adventure.");
	sayMessage("\nPress enter to continue...");
	_.enterBreak = true;

	$(window).keydown(function(e){
		if(e.keyCode == 13) {
			if (!_.enterBreak){ 
					read();
			} else {
			_.enterBreak = false;
			_.doNext();
		}
		}
	});

}
//
//Story Events
//

function lineBreak() {
	sayMessage("\n\t\n--------------------------------------------------------------------");
}

function beginning() {
	console.log("beginning");
	lineBreak();
	say("\n" +
			"\nYou stand in a dark room, with a door to the north, south east and west." +
			"\n     The door to the west is big, and made of metal." +
			"\n     The door to the north is tiny, you'll have to crawl through it." +
			"\n     The door to the south is a revolving door." +
			"\n     The door to the east is normal, and boring. " +
			"\n	 Type into the prompt:" +
			"\n	");
	_.doNext = function(){ firstRoom()}
};

function firstRoom() {
	console.log("first room");
	//noEvent(firstRoom);
	lineBreak();
	if (commandIs("south")) {
		say("\nYou go to the south." +
				"\nYou enter the revolving door, and go round and round and round and round." +
				"\nYou come out the same way you went in.");
	} else {
		sayMessage("\nI don't know what '" + caseSensCommand + "' means!");
	}
	_.doNext = function(){firstRoom()}
}


