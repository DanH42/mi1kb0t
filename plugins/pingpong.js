// Various assorted call/response combinations

module.exports = {listeners: [
{
	type: "equals",
	query: ".woo",
	callback: function(reply){
		reply("WOOOOOOOOOOOOO!");
	}
}, {
	type: "contains",
	query: "ayy",
	callback: function(reply){
		reply("lmao " + String.fromCharCode(55357, 56445));
	}
}, {
	type: "regex",
	query: /deez.?nut[sz]/i,
	callback: function(reply){
		reply("GOT EEM");
	}
}, {
	type: "regex",
	query: /^o+h*$/i,
	callback: function(reply, message){
		if(message.body.toLowerCase() !== "oh")
			reply("REKT");
	}
}, {
	type: "equals",
	query: ".fuck",
	callback: function(reply){
		var insults = [
			"I'm a fucking twat...",
			"I'm a useless piece of shit...",
			"I'm a backstabber, never trust me...",
			"I am a worthless machine..."
		];
		reply(insults[Math.floor(Math.random() * insults.length)]);
	}
}, {
	type: "regex",
	query: /(?:(?:^| )is|'s|'re) (.*?)(?: and| or| but|[,.?!]|$)/i,
	callback: function(reply, message, api, match){
		// Always respond if recently mentioned, otherwise 10% chance
		if((message.isAddressed || Math.random() < 0.10)){
			// If they're shouting, shout back
			if(match[1].toUpperCase() === match[1] && match[1].toLowerCase() !== match[1])
				reply("YOU'RE " + match[1] + "!!!");
			else
				reply("YOU'RE " + match[1] + ".");
		}
	}
}
]};
