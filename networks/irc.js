module.exports = {connect: function(credentials, readyCallback, messageCallback){
	var irc = require('irc');

	var client = new irc.Client(credentials.server, credentials.nick, credentials);
	client.type = "irc";
	readyCallback(client);

	client.addListener('message', function(from, to, msg){
		var respondTo = to;
		if(to == credentials.nick)
			respondTo = from;

		var message = {
			type: 'message',
			sender_name: from,
			sender_id: from,
			body: msg,
			thread_id: respondTo
		};

		console.log(message);

		var reply = function(text, callback){
			client.say(respondTo, text);
			if(typeof callback === "function")
				callback(null); // We can't detect errors here, assume success
		};

		messageCallback(reply, message, client);
	});
}};
