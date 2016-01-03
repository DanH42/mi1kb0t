module.exports = {connect: function(credentials, readyCallback, messageCallback){
	var login = require('facebook-chat-api');

	login(credentials, function callback(err, api){
		if(err) return console.error(err);

		api.type = "messenger";
		readyCallback(api);

		api.listen(function(err, message){
			if(err) return console.error(err);
			message.body = message.body || "";
			console.log(message);

			if(message.participant_ids.length === 1 && message.thread_id == message.participant_ids[0])
				message.isAddressed = 2; // This is a PM

			var reply = function(text, callback){
				if(typeof text === "string")
					console.log("Responding to", message.thread_id, text);
				else
					console.log("Responding to", message.thread_id, "with an attachment");
				api.sendMessage(text, message.thread_id, callback);
			};

			messageCallback(reply, message, api);
		});
	});
}};
