//Copyright (C) 2015 crayonsmelting - protected under Australian and International Copyright law
//crayonsmelting can be found at http://www.github.com/crayonsmelting/ or at crayons.melting@gmail.com
//Licence found within licence.txt

/////////////////////http://nomediakings.org/guildedyouth////////////////////////////

/* GLOBALS */

var readCounter = 0;

GAME = {
	doNext: beginning,
	enterBreak: false,
	player: {
		room: "",
		gold: false,
		dead: false,
		crafted: false
	},
	inventory: [],
	vault: {
		passAttempts: 0
	},
	ground: {
		firstRoom: [],
	}
}

var _ = GAME;

//UI read/write

function say(words) {
	//todo: grey out old text to make what's new stand out
	//Also, probably add a UI or something

	//convert \n to paragraphs and \t to tabs in html
	words = words.replace(/\n/g,"<br/>");
	words = words.replace(/\t/g,"&emsp;");

	//append each line as its own paragraph
	$(output).append("<p>" + words + "</p>");

	//scroll to bottom of page
	var gameWindow = $("#onion-room-game")[0];
	gameWindow.scrollTop = gameWindow.scrollHeight;
}

function sayMessage(words) {
	say(words);
}

function match(subject,matches) {
	if (Object.prototype.toString.call(matches) === '[object Array]') {
		for (matchI in matches) {
			if (matches[matchI] === subject) {
				return true
			}
		}
		return false;
	}else {
		return subject === matches;
	}
}

function commandIs(matches) {
	return match(_.command,matches);
}

function read() {
	//collects input, and then runs the next function to interpret it
	readCounter++;
	console.log(readCounter);

	_.caseSensCommand = input.val(); // collect value of commands
	_.command = _.caseSensCommand.toLowerCase(); // collect value of commands for interpreting

	//return unified values for alternative command wordings, or report an error
	if (commandIs("")) {
		console.log("nothing");
		return;
	}

	console.log("running commands");
	if (commandIs(["south","down","s"])) {
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

function enterBreak(message) {
	//basically just triggers a flag to tell the parser not to do anything special
	_.command = "";
	_.enterBreak = true;
	if (message !== undefined) { sayMessage(message) }
	else { sayMessage("Press enter to continue...") }

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
	} else if ((/is the best/).test(_.command)) {
		lineBreak();
		say("And oh so modest!");
		return true;
	} else if ((/^combine|^craft|^make/).test(_.command)) {
		lineBreak();
		if (!_.player.crafted) {
			say("Crafting? What do you think this is, Minecraft!?");
			sayMessage("Select your materials:");
			return true;
		}
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

	$(window).keydown(function(keypress) {
		if(keypress.which == 13) {
			_.vault.typingPassword = false;
			if (!_.enterBreak) { 
				read();
			} else {
				_.enterBreak = false;
				$(input).val('');
				lineBreak();
				_.doNext();
			}
		} else if (_.vault.typingPassword) {
			var txt = $(output).children().last().text();
			if (keypress.which == 8 && txt.length > 16) {
				$(output).children().last().text(txt.substring(0, txt.length - 1));
			} else if (keypress.which != 8) {
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

function take(object) {
}

function beginning() {
	console.log("beginning");
	say("You stand in a dark room, with a door to the north, south east and west."); 
	say("\tThe door to the west is big, and made of metal." +
		"\n\tThe door to the north is tiny, you'll have to crawl through it." +
			"\n\tThe door to the south is a revolving door." +
			"\n\tThe door to the east is normal, and boring. ");
	sayMessage("Type into the prompt:");
	_.doNext = firstRoom;
};

function firstRoom() {
	console.log("first room");
	if (noEvent(firstRoom)) { return }
	lineBreak();
	if (commandIs("south")) {
		sayMessage("You go to the south.");
		say("You enter the revolving door, and go round and round and round and round." +
			"\nYou come out the same way you went in.");
		_.doNext = beginning;
		enterBreak();
		return;

	} else if (commandIs("east")) {
		say("You open the door and wa-- " +
			"\n\"AAAAAAAAAAH!\" You scream. Behind the door seemed to be a" +
				"large cliff. You fall, while still screaming.");
		say("Falling..." +
			"\nFalling...." +
				"\nTHUD.");
		say("You sit up with a jolt. Ah, phew it was all a dream..." +
			"\nThis must be were the real adventure begins." +
				"\nYou get up and take a look around...");

		_.doNext = beginning;
		enterBreak();
		return;
	} else if (commandIs("west")) {
		say("You walk up to the big, rock solid metal ... thing. " +
			"\nYou look for a door handle, but you don't see any. " + 
				"\nHmm, maybe it's voice activated, with a password. You give it a go. ");
		say("Enter Password: ");
		_.vault.typingPassword = true;
		_.doNext = vaultEntry;
	} else if (commandIs("north")) {
		console.log("northed");
		console.log("hit");
		say("You chose the tiny, little door. You squeeeeze in." +
			"\nInside is a small cottage-like interior. There's a little leprechaun sitting in a little arm chair." +
				"\n\"Eh? What de yeh thin' you're doin', Laddie?\" He asks." +
				"\n\"Yeh can' joost burst inte me hoose like that!\"");
		say("How do you reply?");
		_.doNext = lepReply;
	} else {
		sayMessage("I don't know what '" + _.caseSensCommand + "' means!");
	}
}

function vaultEntry() {
	if (!_.vault.passAttempt1) {
		say("...." +
			"\n..........");
		say("*ACCESS DENIED!*");
		say("Ah, wrong password. Maybe something else...");
		say("Enter Password:");
		_.vault.typingPassword = true;
		_.vault.passAttempt1 = _.command;
		_.vault.passAttempts++;
	} else {
		console.log("attempt number 2");
		if (commandIs(_.vault.passAttempt1)) {
			if ( _.vault.passAttempts == 1) {
				lineBreak();
				say("...." +
					"\n..........");
				say("*ACCESS DENIED!*");
				say("Well duh, you said the same thing again. You're not sure what you were epxecting. Well, may as well try again:");
				say("Enter Password:");
				_.vault.typingPassword = true;
				_.vault.passAttempts++;
			} else if (_.vault.passAttempts == 2) {
				lineBreak();
				say("...." +
					"\n..........");
				say("*ACCESS DENIED!*");
				say("You're starting to compare your mental capacity to some bacon." +
					"\nMaybe it's a sign. But you're not going to give up:");
				say("Enter Password:");
				_.vault.typingPassword = true;
				_.vault.passAttempts++;
			} else if (_.vault.passAttempts == 3) {
				_.vault.doorPity = true;
				lineBreak();
				say("....")
				say("The door is really starting to feel sorry for you, poor thing..." +
					"\nMaybe you were involed in a tragic accident, or maybe you were born with it." +
						"\nIt decides to let you in anyway...");
				say("..........");
				say("*ACCESS GRANTED!*");
			}
		} else {
			lineBreak();
			say("...." +
				"\n..........");
			say("*ACCESS GRANTED!*");
			say("Whew, that was easy...");
		}
		say("The door opens, shaking the entire room. It's pretty scary." +
			"\nYou cover your eyes, partially out of fear, mostly just because the inside is really bright.");
		enterBreak("Press enter to uh... enter...");
		_.doNext = vaultInt;
	}
}

function vaultInt() {
	say("Inside the concrete room is mountains, and mountains.");
	say("AND MOUNTAINS.");
	say("Of beautiful, beautiful gold. You're more tricked out than Harry Potter!" +
		"\nYou're super excited until you realise - you don't have any pockets." +
			"\nYou squeeeeeze as much gold as you can into your undies.");
	if (_.gold) {
		say("It's really hard, considering you've already stuffed them full of gold.");
	} else {
		_.inventory.push("gold");
		_.gold = true;
		console.log(_.inventory);
	}
	say("There's not really much more you can do in here, so you disappointedly drudge out.");
	if (_.vault.doorPity) {
		say("The door feels even worse. He never should have signed up for this...");
	}
	say("There is a loud thud of the door behind you.");
	enterBreak();
	_.doNext = beginning;
}

function lepReply() {
	lineBreak();
	say("\"I haven' heard sooch gurbage in me life." +
		"\nDiddley-Dee Diddle-Dee, get oot get oot get oot!" +
			"\n'" + _.caseSensCommand + "' indeed... Why I should spank yeh!\"");
	say("He gives you a great big kick on the bum, and you go flying out the door." +
		"\nYou hear a loud thud, along with some quiet muttering.");
	_.doNext = beginning;
}
