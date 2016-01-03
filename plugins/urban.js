var request = require('request');

module.exports = {listeners: [
{
	type: "startsWith",
	query: ".ud",
	callback: function(reply, message, api){
		if(message.body.length === 3)
			return reply("Usage: .ud <term>");
		urban(message.body.substr(4), reply, message, api);
	}
}, {
	type: "startsWith",
	query: ".urban",
	callback: function(reply, message, api){
		if(message.body.length === 6)
			return reply("Usage: .urban <term>");
		urban(message.body.substr(7), reply, message, api);
	}
}
]};

function urban(term, reply, message, api){
	if(api.type === "messenger")
		api.sendTypingIndicator(message.thread_id);
	request("http://api.urbandictionary.com/v0/define?term=" + encodeURIComponent(term), function(err, res, body){
		try{
			var obj = JSON.parse(body);
			if(obj && obj.list && obj.list[0]){
				var index = -1;
				var max = -1;
				for(var i = 0; i < obj.list.length; i++){
					if(obj.list[i].thumbs_up > max){
						index = i;
						max = obj.list[i].thumbs_up;
					}
				}
				reply(obj.list[index].definition);
			}else
				reply("No results found for \"" + term + "\"");
		}catch(e){
			reply("No results found for \"" + term + "\"");
		}
	});
}
