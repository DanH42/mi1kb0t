var request = require('request');

module.exports = {listeners: [
{
	type: "startsWith",
	query: ".hedgehog",
	callback: hedgehogs
}, {
	type: "equals",
	query: ".hh",
	callback: hedgehogs
}
]};

function hedgehogs(reply, message, api){
	if(api.type === "messenger")
		api.sendTypingIndicator(message.thread_id);
	var url = "https://www.facebook.com/groups/hedgehoghackers/photos/";
	request({
		url: url,
		headers: {
			'User-Agent': "Mozilla/5.0 AppleWebKit (KHTML, like Gecko) Chrome Safari"
		}
	}, function(err, res, body){
		var images = body.match(/i style="background-image: url\((.+?)\)/g);
		if(!images || !images.length)
			return reply({attachment: request("https://i.imgur.com/TBwbKw1.png")});
		var index = Math.floor(Math.random() * images.length);
		var url = images[index];
		url = url.substring(31, url.length - 1).replace('&amp;', '&');
		console.log(url);
		var image = request(url + '&.jpg');
		console.log(typeof image);

		if(image)
			reply({attachment: image});
		else
			reply({attachment: request("https://i.imgur.com/TBwbKw1.png")});
	});
}
