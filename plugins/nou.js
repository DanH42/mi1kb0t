// Turn messages back around on their sender

var responseTimes = {};
module.exports = {listeners: [
{
	type: "regex",
	query: /(?: is|['’]s|['’]re) (.*?)(?: and| or| but|http|[,.?!:()]|$)/i,
	callback: function(reply, message, api, match){
		// Always respond if recently mentioned, otherwise 5% chance
		if((message.isAddressed || Math.random() < 0.05)){
			var time = new Date().getTime();
			// Don't respond unless it's been at least half an hour, or the current message is also a mention
			if(message.isAddressed === 2 || !responseTimes[message.threadID] || time - responseTimes[message.threadID] > 1800000){
				responseTimes[message.threadID] = time;
				var comeback = match[1].trim();
				// If they're shouting, shout back
				if(comeback.toUpperCase() === comeback && comeback.toLowerCase() !== comeback)
					reply("YOUR MOM'S " + comeback + "!!!");
				else
					reply("YOU'RE " + comeback + ".");
			}
		}
	}
}
]};
