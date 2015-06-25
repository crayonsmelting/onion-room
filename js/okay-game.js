//Copyright (C) 2015 crayonsmelting - protected under Australian and International Copyright law
//crayonsmelting can be found at http://www.github.com/crayonsmelting/ or at crayons.melting@gmail.com
//Licence found within licence.txt
/////////////////////http://nomediakings.org/guildedyouth////////////////////////////

//GLOBALS

player = {
	gold: false,
	dead: false
};

function say(words) {
	var words = words.split("\n");// separate at new line

	//append each line as its own paragraph
	words.forEach( function(line) {
		var newParagraph = document.createElement("p");
		var newText = document.createTextNode(line);
		newParagraph.appendChild(newText);
		output.appendChild(newParagraph);
	});
}

//collects input, and then runs the next function to interpret it
function read(exit){
	window.addEventListener("keydown", function handler(e){
		 if(e.keyCode == 13) {
	window.removeEventListener("keydown", handler);

	caseSensCommand = input.value; // collect value of commands
	command = input.value.toLowerCase(); // collect value of commands for interpreting

	//return unified values for alternative command wordings, or report an error
	 if (command == "south" || command == "down" || command == "s") {
		 command = "south";
	 } else if (command == "north" || command == "n" || command == "forward" || command == "up") {
		 command = "north";
	 } else if (command == "east" || command == "e" || command == "right" ) {
		 command = "east";
	 } else if (command == "west" || command == "w" || command == "left") {
		 command = "west";
	 } else if (command == "") {
		 say("\nYou didn't even say anything!");
		 read(exit);
		}

	console.log("Player said '" + command + "'.");
	exit();
		 }
		});
}

//For whenever the player is free to move around and do whatever
function noEvent(exit) {
		if (command == "panic") {
			lineBreak();
			say( "\nHOW DO YOU EXPECT ME TO RESPOND TO SOMETHING LIKE THAT," +
				 "\nBUCKO? DO YOU THINK IT'S EASY REPLYING TO ALL YOUR BULL?! I DON'T" +
				 "\nGET PAID ENOUGH FOR THIS!" +
				 "\n... " +
				 "\nWas that good enough?");
			read(exit);
	 }

}

//----------------------------------------------------

function onionRoom() {
//Find where the output and prompt are
output = document.getElementById("output");
input = document.getElementById("input");

//introduction to a great adventure
say( "\nThis okay game is COPYRIGHT © 2015 crayonsmelting. See licence for info. " +
	 "\nHey guy! Welcome to your new adventure.");
	say("\nPress enter to continue...");
enterBreak(beginning);

}
//
//Library
//

function enterBreak(exit){
	window.addEventListener("keydown", function handler(e){
		 if(e.keyCode == 13) {
	window.removeEventListener("keydown", handler);
	exit();
	 }
 });
}

function lineBreak() {
	say("\n\t\n--------------------------------------------------------------------");
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
	read(firstRoom);
};

function firstRoom() {
	console.log("first room");
	noEvent(firstRoom);
	lineBreak();
	if (command == "south") {
		say("\nYou go to the south." +
			"\nYou enter the revolving door, and go round and round and round and round." +
			"\nYou come out the same way you went in.");
	} else {
		 say("\nI don't know what '" + caseSensCommand + "' means!");
	}
		read(firstRoom);
}


