// Repeat a message in SPonGEbOB CaSe

module.exports = {listeners: [
{
	type: "regex",
	query: /^\.(sb|sponge|spongebob) +(.+)/i,
	callback: function(reply, message, api, match){
		var str = match[2];
		var out = "";
		// Try up to 10 times to get random-looking case
		for(var i = 0; i < 10; i++){
			out = spongebob(str);
			if(out !== str && out !== str.toUpperCase() && out !== str.toLowerCase())
				break;
		}
		reply(out);
	}
}
]};

function spongebob(str){
	var out = "";
	for(var i = 0; i < str.length; i++){
		if(Math.random() < .5)
			out += str[i].toUpperCase();
		else
			out += str[i].toLowerCase();
	}
	return out;
}
