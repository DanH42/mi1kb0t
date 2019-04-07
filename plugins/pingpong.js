// Various assorted call/response combinations

var request = require('request');
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
		var alien = String.fromCharCode(55357, 56445);
		var flame = String.fromCharCode(55357, 56613);
		var date = new Date();
		if(date.getMonth() === 3 && date.getDate() === 20){
			if(date.getHours() % 12 === 4 && date.getMinutes() === 20)
				reply(`${flame} ${alien} ${flame} ｌｍａｏ ${flame} ${alien} ${flame}`);
			else
				reply(`lmao ${flame}`);
		}else{
			if(date.getHours() % 12 === 4 && date.getMinutes() === 20)
				reply(`${alien} ${alien} ${alien} ｌｍａｏ ${alien} ${alien} ${alien}`);
			else
				reply(`lmao ${alien}`);
		}
	}
}, {
	type: "regex",
	query: /deez.?nut[sz]/i,
	callback: function(reply){
		reply("GOT EEM");
	}
}, {
	type: "regex",
	query: /\.((dick)|(threatbutt))(butt)?|\.(butt)/i,
	callback: function(reply, message){
		if(message.body.toLowerCase().indexOf('threat') != -1){
			reply({attachment: request("https://pbs.twimg.com/profile_images/590578632906637312/hGTAcKmm.png")});
		}
		else{
			reply({attachment: request("http://i.imgur.com/j0ymrVQ.png")});
		}
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
	type: "contains",
	query: "thank",
	callback: function(reply, message){
		if((message.isAddressed || Math.random() < 0.10))
			reply("You're welcome m'lady");
	}
}, {
	type: "regex",
	query: /know what .*grandm(a|other) .*says/i,
	callback: function(reply){
		reply("Fuck 'em!");
	}
}, {
	type: "equals",
	query: "rip",
	callback: function(reply){
		var respects = ["F", "𝖥", "𝐹", "𝘍", "𝙵", "𝑭", "𝙁", "Ｆ", "𝐅", "𝗙", "𝓕", "🅵", "🄵", "🅕", "Ⓕ", "ᶠ"];
		reply(respects[Math.floor(Math.random() * respects.length)]);
	}
}
]};
