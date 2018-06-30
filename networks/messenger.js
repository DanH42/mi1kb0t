var stream = require('stream');

module.exports = {connect: function(credentials, readyCallback, messageCallback){
	var login = require('facebook-chat-api');

	login(credentials, function callback(err, api){
		if(err) return console.error(err);

		// Workaround to make a needlessly required argument optional again
		var native_sendTypingIndicator = api.sendTypingIndicator;
		api.sendTypingIndicator = function(thread_id, callback){
			if(!callback)
				callback = function(){};
			native_sendTypingIndicator(thread_id, callback);
		};

		var native_sendMessage = api.sendMessage;
		api.sendMessage = function(message, threadID, callback){
			try{
				native_sendMessage(message, threadID, function(err, messageInfo){
					if(err && err.errorDescription === "Please try closing and re-opening your browser window."){
						console.log("Re-logging...");
						api.logout(function(err){
							console.log("Logged out", err);
							module.exports.connect(credentials, function(api){
								console.log("Done re-logging.");
								api.sendMessage(text, message.thread_id, callback);
							}, messageCallback);
						});
					}
					if(typeof callback === 'function')
						callback.apply(api, arguments);
				});
			}catch(e){
				if(typeof callback === 'function')
					callback(e);
			}
		};

		api.type = "messenger";
		api.userid = api.getCurrentUserID();
		readyCallback(api);

		api.listen(function(err, message){
			if(err) return console.error(err);
			message.body = message.body || "";
			message.thread_id = message.threadID;
			console.log(message);

			if(message.isGroup === false)
				message.isAddressed = 2; // This is a PM

			if(message.mentions[api.userid])
				message.isAddressed = 2; // This is a direct mention

			var reply = function(text, options, callback){
				if(typeof options === "function"){
					callback = options;
					options = {};
				}else if(typeof options !== "object")
					options = {};

				if(typeof text === "string")
					console.log("Responding to", message.thread_id, text);
				else{
					console.log("Responding to", message.thread_id, "with an attachment");

					// facebook-chat-api has the weirdest way of testing streams
					if(text.attachment
					&& text.attachment instanceof stream.Stream
					&& (typeof text.attachment._read !== 'Function'
					 || typeof text.attachment._readableState !== 'Object')){
						text.attachment._read = function(){};
						text.attachment._readableState = {};
					}
				}

				var delay = options.delay || 0;
				if(options.delay === undefined && typeof text === "string"){
					delay = text.length * 100;
					// Subtract time since the original message was sent
					delay -= Date.now() - message.timestamp;
					// Ensure delay is non-negative and no more than 2 seconds
					delay = Math.min(Math.max(delay, 0), 2000);
				}

				if(delay > 0){
					api.sendTypingIndicator(message.thread_id);
					console.log("Delaying response by " + delay + "ms");
				}

				setTimeout(api.sendMessage.bind(api, text, message.thread_id, callback), delay);
			};

			messageCallback(reply, message, api);
		});
	});
}};
