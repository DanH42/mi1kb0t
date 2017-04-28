var request = require('request');

module.exports = {listeners: [
{
	type: "equals",
	query: ".minion",
	callback: function(reply, message, api){
		reddit(["MinionHate", "WackyTicTacs"], "http://i.imgur.com/L07nbhn.jpg", reply, message, api);
	}
}, {
	type: "equals",
	query: ".corgi",
	callback: function(reply, message, api){
		reddit(["corgi", "BabyCorgis"], "http://i.imgur.com/djeivlK.gif", reply, message, api);
	}
}, {
	type: "equals",
	query: ".doge",
	callback: function(reply, message, api){
		reddit(["doge", "supershibe"], "http://i.imgur.com/WMiliXD.jpg", reply, message, api);
	}
}
]};

function reddit(subs, fail, reply, message, api){
	if(api.type === "messenger")
		api.sendTypingIndicator(message.thread_id);
	var url = "https://www.reddit.com/r/" + subs[Math.floor(Math.random() * subs.length)] + "/top/.json?sort=top&t=week";

	request(url, function(err, res, body){
		try{
			var posts = JSON.parse(body).data.children;
			var index = Math.floor(Math.random() * posts.length);
			var attempts = 0;
			while(!posts[index].data.url || posts[index].data.url.indexOf("i.imgur.com") === -1){
				index = Math.floor(Math.random() * posts.length);
				if(++attempts > 10)
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
			reply({attachment: request(fail)});
		}
	});
}
