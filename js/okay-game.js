//Copyright (C) 2015 crayonsmelting - protected under Australian and International Copyright law 
//crayonsmelting can be found at http://www.github.com/crayonsmelting/ or at crayons.melting@gmail.com 
//Licence found within licence.txt 
////////////////////////////////////////////////

//GLOBALS

var player = {
	gold: false,
	dead: false
};

function say(words) {
	console.log(words);
}

//This second one is for the prompt
function cue(words) {
	console.log(words);
}

function read(words){

};

//----------------------------------------------------


//introduction to a great adventure
say( "\nThis okay game is COPYRIGHT (C) 2015 crayonsmelting. See licence.txt. " +
	 "\nHey guy! Welcome to your new adventure.");

function beginning() {
	say("\nPress enter to continue...")
};
