var request = require('request');

module.exports = {listeners: [
{
	type: "equals",
	query: ".minion",
	callback: function(reply, message, api){
		redditImage(["MinionHate", "WackyTicTacs"], "http://i.imgur.com/L07nbhn.jpg", reply, message, api);
	}
}, {
	type: "equals",
	query: ".corgi",
	callback: function(reply, message, api){
		redditImage(["corgi", "BabyCorgis"], "http://i.imgur.com/djeivlK.gif", reply, message, api);
	}
}, {
	type: "equals",
	query: ".doge",
	callback: function(reply, message, api){
		redditImage(["doge", "supershibe"], "http://i.imgur.com/WMiliXD.jpg", reply, message, api);
	}
}, {
	type: "regex",
	query: /.o?pos+um/i,
	callback: function(reply, message, api){
		redditImage(["Possums"], "https://i.imgur.com/T0wMPRg.jpg", reply, message, api);
	}
}, {
	type: "regex",
	query: /^\.(copy)?pasta$/i,
	callback: function(reply, message, api){
		redditText(["copypasta", "emojipasta"], "What the fuck did you just fucking say about me, you little bitch? I'll have you know I graduated top of my class in the Navy Seals, and I've been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I'm the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You're fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that's just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little \"clever\" comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn't, you didn't, and now you're paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You're fucking dead, kiddo.", reply, message, api);
	}
}
]};

function redditAPI(subs, callback){
	var sub = subs[Math.floor(Math.random() * subs.length)];
	var url = "https://www.reddit.com/r/" + sub + "/top/.json?sort=top&t=year&limit=100";

	request(url, function(err, res, body){
		if(err){
			console.error("Request error for subreddit " + sub);
			console.error(err);
			callback("Server error");
		}

		try{
			var posts = JSON.parse(body).data.children;
			if(posts.length)
				return callback(null, posts);

			console.error("No posts for subreddit " + sub);
			console.error(body);
			callback("No posts returned");
		}catch(e){
			console.error(e);
			callback(e);
		}
	});
}

function redditImage(subs, fail, reply, message, api){
	if(api.type === "messenger")
		api.sendTypingIndicator(message.thread_id);

	redditAPI(subs, function(err, posts){
		if(err)
			return reply({attachment: request(fail)});

		try{
			var index = Math.floor(Math.random() * posts.length);
			var attempts = 0;
			while(!posts[index].data.url || (
				posts[index].data.url.indexOf("i.imgur.com") === -1 &&
				posts[index].data.url.indexOf("i.redd.it") === -1 &&
				posts[index].data.url.indexOf("i.redditmedia.com") === -1
			)){
				index = Math.floor(Math.random() * posts.length);
				if(++attempts > 50)
					return reply({attachment: request(fail)});
			}
			var post = posts[index].data.url;
			console.log(post);

			if(api.type === "messenger"){
				var image = request(post);

				if(image)
					reply({attachment: image});
				else
					reply({attachment: request(fail)});
			}else
				reply(post);
		}catch(e){
			console.error(e);
			reply({attachment: request(fail)});
		}
	});
}

function redditText(subs, fail, reply, message, api){
	if(api.type === "messenger")
		api.sendTypingIndicator(message.thread_id);

	redditAPI(subs, function(err, posts){
		if(err)
			return reply(fail);

		try{
			var index = Math.floor(Math.random() * posts.length);
			var attempts = 0;
			while(posts[index].data.selftext.length < 200){
				index = Math.floor(Math.random() * posts.length);
				if(++attempts > 50)
					return reply(fail);
			}
			reply(posts[index].data.selftext);
		}catch(e){
			console.error(e);
			reply(fail);
		}
	});
}
