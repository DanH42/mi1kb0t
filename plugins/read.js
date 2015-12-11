// Mark all messages as read in threads where your name was recently mentioned
// On non-Messenger networks, respond with "That's me!" when first mentioned.

module.exports = {listeners: [
{
	type: "all",
	callback: function(reply, message, api){
		if(message.isAddressed === 2){
			if(api.type === "messenger")
				api.markAsRead(message.thread_id);
			else
				reply("That's me!");
		}else if(message.isAddressed === 1){
			if(api.type === "messenger")
				api.markAsRead(message.thread_id);
		}
	}
}
]};
