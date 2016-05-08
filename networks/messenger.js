module.exports = {
	connect: function(credentials, readyCallback, messageCallback) {
		var fs = require('fs');
		var login = require('facebook-chat-api');

		// See if the user has already logged in, if so don't log in again.
		try {
			fs.accessSync('appstate.json', fs.F_OK);
			var appstate = {
				appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))
			};
			console.log("Logging in with appstate.");
		} catch (err) {
			var appstate = false;
			console.log("Logging in with credentials.");
		}

		login(appstate || credentials, function(err, api) {
			if (err) return console.error(err);

			// Write the appstate to file for future use.
			fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));

			api.type = "messenger";
			readyCallback(api);

			// Listen for messages.
			api.listen(function(err, message) {
				console.log(message);

				var reply = function(text, callback) {
					console.log(text);
					if (typeof text === "string")
						console.log("Responding to", message.threadID, text);
					else
						console.log("Responding to", message.threadID, "with an attachment");
					api.sendMessage(text, message.threadID, callback);
				}

				api.markAsRead(message.threadID, function(err) {
					if (err) console.log(err);
				});
				messageCallback(reply, message, api);
			});
		});
	}
};
