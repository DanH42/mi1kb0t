module.exports = {listeners: [
{
	type: "regex",
	query: /^(?:(?:get-asciiart(?: -*)?)|(?:\.ascii(?: )?))(.*)$/i,
	callback: function(reply, message, api, match){
		console.log(match);
		if(!match[1])
			match[1] = "";
		var art = match[1].toLowerCase();
		asciiart(art, reply);
	}
}, {
	type: "equals",
	query: ".shrug",
	callback: asciiart.bind(this, "shrug")
}, {
	type: "regex",
	query: /^\.(table|flip|tableflip)$/i,
	callback: asciiart.bind(this, "tableflip")
}, {
	type: "equals",
	query: ".lenny",
	callback: asciiart.bind(this, "lenny")
}, {
	type: "regex",
	query: /^\.think(ing)?$/,
	callback: asciiart.bind(this, "thinking")
}
]};

function asciiart(art, reply){
	switch(art){
		case "tableflip":
			reply("(╯°□°)╯︵ ┻━┻", {delay: 0});
			break;
		case "shrug":
			reply("¯\\_(ツ)_/¯", {delay: 0});
			break;
		case "lenny":
			reply("( ͡° ͜ʖ ͡°)", {delay: 0});
			break;
		case "thinking":
			reply("⠀⠀⠀⠀⠀⢀⣀⣀⣀\n⠀⠀⠀⠰⡿⠿⠛⠛⠻⠿⣷\n⠀⠀⠀⠀⠀⠀⣀⣄⡀⠀⠀⠀⠀⢀⣀⣀⣤⣄⣀⡀\n⠀⠀⠀⠀⠀⢸⣿⣿⣷⠀⠀⠀⠀⠛⠛⣿⣿⣿⡛⠿⠷\n⠀⠀⠀⠀⠀⠘⠿⠿⠋⠀⠀⠀⠀⠀⠀⣿⣿⣿⠇\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠁\n\n⠀⠀⠀⠀⣿⣷⣄⠀⢶⣶⣷⣶⣶⣤⣀\n⠀⠀⠀⠀⣿⣿⣿⠀⠀⠀⠀⠀⠈⠙⠻⠗\n⠀⠀⠀⣰⣿⣿⣿⠀⠀⠀⠀⢀⣀⣠⣤⣴⣶⡄\n⠀⣠⣾⣿⣿⣿⣥⣶⣶⣿⣿⣿⣿⣿⠿⠿⠛⠃\n⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄\n⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡁\n⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠁\n⠀⠀⠛⢿⣿⣿⣿⣿⣿⣿⡿⠟\n⠀⠀⠀⠀⠀⠉⠉⠉", {delay: 0});
			break;
		case "":
			reply("Please specify some art", {delay: 0});
			break;
		default:
			reply("This is not art", {delay: 0});
			break;
	}
}
