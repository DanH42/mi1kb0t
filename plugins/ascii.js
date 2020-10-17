module.exports = {listeners: [
{
	type: "regex",
	query: /^(?:(?:get-asciiart(?: -*)?)|(?:\.ascii(?: )?))(.*)$/i,
	callback: function(reply, message, api, match){
		var art = (match[1] || "").toLowerCase();
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

const ascii = {
	tableflip: "(╯°□°)╯︵ ┻━┻",
	shrug: "¯\\_(ツ)_/¯",
	lenny: "( ͡° ͜ʖ ͡°)",
	thinking: "⠀⠀⠀⠀⠀⢀⣀⣀⣀\n⠀⠀⠀⠰⡿⠿⠛⠛⠻⠿⣷\n⠀⠀⠀⠀⠀⠀⣀⣄⡀⠀⠀⠀⠀⢀⣀⣀⣤⣄⣀⡀\n⠀⠀⠀⠀⠀⢸⣿⣿⣷⠀⠀⠀⠀⠛⠛⣿⣿⣿⡛⠿⠷\n⠀⠀⠀⠀⠀⠘⠿⠿⠋⠀⠀⠀⠀⠀⠀⣿⣿⣿⠇\n⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠁\n\n⠀⠀⠀⠀⣿⣷⣄⠀⢶⣶⣷⣶⣶⣤⣀\n⠀⠀⠀⠀⣿⣿⣿⠀⠀⠀⠀⠀⠈⠙⠻⠗\n⠀⠀⠀⣰⣿⣿⣿⠀⠀⠀⠀⢀⣀⣠⣤⣴⣶⡄\n⠀⣠⣾⣿⣿⣿⣥⣶⣶⣿⣿⣿⣿⣿⠿⠿⠛⠃\n⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄\n⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡁\n⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠁\n⠀⠀⠛⢿⣿⣿⣿⣿⣿⣿⡿⠟\n⠀⠀⠀⠀⠀⠉⠉⠉",
};

function asciiart(art, reply){
	if(ascii[art])
		return reply(ascii[art]);
	var keys = Object.keys(ascii);
	if(art === "")
		return reply("Specify one of: " + keys.join(", "));
	art = keys[Math.floor(Math.random() * keys.length)];
	reply("I don't know what that is, but here's " + art + ":", {}, function(){
		reply(ascii[art]);
	});
}
