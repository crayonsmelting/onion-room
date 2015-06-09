#Copyright (C) 2015 crayonsmelting - protected under Australian and International Copyright law 
#crayonsmelting can be found at http://www.github.com/crayonsmelting/ or at crayons.melting@gmail.com 
#Licence found within licence.txt 
############################################


#introduction to a great adventure
puts "
This okay game is COPYRIGHT (C) 2015 crayonsmelting. See licence.txt. 
Hey guy! Welcome to your new adventure."

gold_room = false
#asks for user input
def askCommand()
	print "
Press enter to continue..."
	gets.chomp
	puts "

--------------------------------------------------------------------

You stand in a dark room, with a door to the north, south east and west.
	The door to the west is big, and made of metal.
	The door to the north is tiny, you'll have to crawl through it.
	The door to the south is a revolving door.
	The door to the east is normal, and boring. 
 Type into the prompt:
	"

	failedCommand()

end

def failedCommand()

	print ">-|-O>"
	command = gets.chomp
	if command == "quit" || command == "exit"
		return 0
	elsif command == "south" || command == "South" || command == "down" || command == "Down" || command == "s" || command == "S"
		puts "	You go to the south.
	You enter the revolving door, go round and round and round and round.
	You come out the same way you went in."
		askCommand()

	elsif command == "north" || command == "North" || command == "n" || command == "N" || command == "forward" || command == "Forward" || command == "up" || command == "Up"
		puts "	You chose the tiny, little door. You squeeeeeze in.
	You see a small cottage-like house. There is a little 
	Leprechaun in an arm chair.
	"
#	if gold_room
#		puts "	Top 'o the mornin' to ya, bulge-belt"
#		end
	puts "	\"What do you thin' you're doin', Laddie?\", he asks you. 
	How do you reply?
		"
		print ">-|-O>"
		reply = gets.chomp
		puts " 	\"I haven' heard sooch gurbage in me life. 
	Diddley-Dee, Diddley-Dee, get oot o' me hoose
	Or I'll make you a tree!
	\"#{reply}\" indeed... Why I should spank you!\"

	He gives you a great big kick on the bum, and you go flying out the door
	You hear a loud thud, along with some quiet muttering."
		askCommand()

	elsif command == "west" || command == "West" || command == "w" || command == "W" || command == "left" || command == "Left"
		puts "	You walk up to the big, rock solid metal ... thing.
	You look for a door handle, but you don't see any.
	Hmm, maybe it's voice activated, with a password. You give it a go.
		"
		print "password>"
		activate_1 = gets.chomp
		puts "	....
	..........

	*ACCESS DENIED!*

	Ah, wrong password. Maybe something else...
		"
		print "password>"
		activate_2 = gets.chomp
		if activate_1 == activate_2
			puts "	....
	..........

	*ACCESS DENIED!*

	Well duh, you said the same thing again. You're not sure what you 
	were expecting. Well, may as well try again:
			"
			print "password>"
			activate_2 = gets.chomp
			if activate_1 == activate_2
				puts "	....
	..........

	*ACCESS DENIED!*

	You're starting to compare your mental capacity to some bacon. 
	Maybe it's a sign. But you're not going to give up:
				"
				print "password>"
				activate_2 = gets.chomp
				if activate_1 == activate_2
					puts "	....
	..........

	The door is really starting to feel sorry for you, poor thing. Maybe
	you were involved in a tragic accident, or maybe you were born with it.
	It decides to let you in anwyay....

	*ACCESS GRANTED*"
				end
			end
		else puts "	....
	..........

	*ACCESS GRANTED*

	Whew. That was easy...
			"
		end

		puts "	The door opens, shaking the entire room. It's pretty scary.
	You cover your face from the blinding light within."

		print "
Press enter to, err... enter."
		gets.chomp

		puts "	Inside the concrete room is mountains, and mountains.

	AND MOUNTAINS.

	of beautiful, beautiful gold. You're more tricked out
	than Harry Potter! You're super excited until you realise - 
	You don't have any pockets. You squeeeeeze as much gold
	as you can into your undies. There's not really much more you can
	do in here, so you disappointedly drudge out. 
			"
		if activate_1 == activate_2
			puts "	The door feels even worse. He never should
			have signed up for this....
			"
		end
		puts "
				There is a loud thud behind you."
		gold_room = true
	elsif command == "east" || command == "East" || command == "E" || command == "e" || command == "right" || command == "Right"
		puts "	You open the door and wa--
	\"AAAAAAAAAAH!\" You scream. Behind the door seemed to be a
	large cliff. You fall, while still screaming.
	Falling...
	Falling....
	THUD.

	You sit up with a jolt. Ah, phew it was all a dream...
	This must be were the real adventure begins. You get up and
	take a look around..."


	elsif command == ""	
		puts "you didn't even say anything!"
		failedCommand
		elsif command == "panic"
			puts "	HOW DO YOU EXPECT ME TO RESPOND TO SOMETHING LIKE THAT,
	BUCKO? DO YOU THINK IT'S EASY REPLYING TO ALL YOUR BULL!? I DON'T
	GET PAID ENOUGH FOR THIS!

	Was that good enough?"
			failedCommand
		elsif command ==  "Jacob is the best" || command == "jacob is the best"
			puts "And oh so modest!"
			failedCommand
		else 
			puts "I don't know what '#{command}' means!"
			failedCommand()
		end
	askCommand()
end
askCommand()
