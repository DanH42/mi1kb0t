module.exports = {listeners: [
{
	type: "regex",
	query: /^(?:(?:get-asciiart(?: -*)?)|(?:\.ascii(?: )?))(.*)$/i,
	callback: function(reply, message, api, match){
		console.log(match);
		if(!match[1])
			match[1] = "";
		var art = match[1].toLowerCase();
		switch(art){
			case "tableflip":
				reply("(╯°□°)╯︵ ┻━┻");
				break;
			case "shrug":
				reply("¯\\_(ツ)_/¯");
				break;
			case "lenny":
				reply("( ͡° ͜ʖ ͡°)");
				break;
			case "":
				reply("Please specify some art");
				break;
			default:
				reply("This is not art");
				break;
		}
	}
}
]};
