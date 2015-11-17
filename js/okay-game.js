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
	},
	vault: {}
}

var _ = GAME;

//UI read/write

function say(words) {
	words = words.replace(/\n/g,"<br/>");
	words = words.replace(/\t/g,"&emsp;");
	//append each line as its own paragraph
	$(output).append("<p>" + words + "</p>");
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
		}
		return false;
	}else{
		return subject === matches;
	}
}

function commandIs(matches){
	return match(_.command,matches);
}

function read(){
	//collects input, and then runs the next function to interpret it
	readCounter++;
	console.log(readCounter);

	_.caseSensCommand = input.val(); // collect value of commands
	_.command = _.caseSensCommand.toLowerCase(); // collect value of commands for interpreting

	//return unified values for alternative command wordings, or report an error
	if (commandIs("")){
		console.log("nothing");
		return;
	}

	console.log("running commands");
	if (commandIs(["south","down","s"])){
		_.command = "south";

	} else if (commandIs(["north","n","forward","up"])) {
		_.command = "north";

	} else if (commandIs(["east","e","right"])) {
		_.command = "east";

	} else if (commandIs(["west","w","left"])) {
		_.command = "west";
	}
	console.log("Player said '" + _.command + "'.");
	$(input).val('');
	_.doNext();
}

function enterBreak(){
	_.command = "";
	_.enterBreak = true;
	sayMessage("Press enter to continue...");
}
function noEvent() {
	//For whenever the player is free to move around and do whatever
	console.log("noEvent");
	if (commandIs("panic")) {
		lineBreak();
		say( "HOW DO YOU EXPECT ME TO RESPOND TO SOMETHING LIKE THAT," +
				"\nBUCKO? DO YOU THINK IT'S EASY REPLYING TO ALL YOUR BULL?! I DON'T" +
				"\nGET PAID ENOUGH FOR THIS!" +
				"\n... " +
				"\nWas that good enough?");
		return true;
	}

}

//----------------------------------------------------

function onionRoom() {
	//Find where the output and prompt are
	output = $("#output");
	input = $("#input");

	//introduction to a great adventure
	sayMessage( "This okay game is COPYRIGHT © 2015 crayonsmelting. See licence for info.");
	say("\nHey guy! Welcome to your new adventure.");
	enterBreak();

	$(window).keydown(function(e){
		if(e.which == 13) {
			_.vault.typingPassword = false;
			if (!_.enterBreak){ 
					read();
			} else {
			_.enterBreak = false;
			$(input).val('');
			_.doNext();
		}
		} else if (_.vault.typingPassword){
			var txt = $(output).children().last().text();
			if (e.which == 8 && txt.length > 16){
				$(output).children().last().text(txt.substring(0, txt.length - 1));
			} else if (e.which != 8) {
				$(output).children().last().text(txt + "*");
			}
		}
	});

}
//
//Story Events
//

function lineBreak() {
	sayMessage("--------------------------------------------------------------------");
}

function beginning() {
	console.log("beginning");
	lineBreak();
	say("You stand in a dark room, with a door to the north, south east and west."); 
	say("\tThe door to the west is big, and made of metal." +
			"\n\tThe door to the north is tiny, you'll have to crawl through it." +
			"\n\tThe door to the south is a revolving door." +
			"\n\tThe door to the east is normal, and boring. ");
	sayMessage("Type into the prompt:");
	_.doNext = function(){ firstRoom()}
};

function firstRoom() {
	console.log("first room");
	if (noEvent(firstRoom)) { return }
	lineBreak();
	if (commandIs("south")) {
		sayMessage("You go to the south.");
		say("You enter the revolving door, and go round and round and round and round." +
			"\nYou come out the same way you went in.");
		_.doNext = function(){ beginning()}
		enterBreak();
		return;

	} else if (commandIs("east")) {
		lineBreak();
		say("You open the door and wa-- " +
		"\n\"AAAAAAAAAAH!\" You scream. Behind the door seemed to be a" +
		"large cliff. You fall, while still screaming.");
		say("Falling..." +
		"\nFalling...." +
		"\nTHUD.");
		say("You sit up with a jolt. Ah, phew it was all a dream..." +
		"\nThis must be were the real adventure begins. You get up and" +
		"\ntake a look around...");

		_.doNext = function(){ beginning()}
		enterBreak();
		return;
	} else if (commandIs("west")){
		say("You walk up to the big, rock solid metal ... thing. " +
		"\nYou look for a door handle, but you don't see any. " + 
		"\nHmm, maybe it's voice activated, with a password. You give it a go. ");
		say("Enter Password: ");
		_.vault.typingPassword = true;
		_.doNext = function(){ vaultEntry()}

	} else {
		sayMessage("I don't know what '" + _.caseSensCommand + "' means!");
	}
}

function vaultEntry(){
	if (!_.vault.passAttempt1){
		console.log("there aint no password");
	say("...." +
	"\n..........");
	say("*ACCESS DENIED!*");
	lineBreak();
	say("Ah, wrong password. Maybe something else...");
	say("Enter Password:");
	} else if (!_.vault.passAttempt2){
		console.log("there's an error in my code!");
	}


}
