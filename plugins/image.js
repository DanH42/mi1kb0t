// When someone's message ends in an image extension, Google an image for them

var request = require('request');
var google = require('googleapis');
var search = google.customsearch('v1');

// Replace these with your own to customize results
var options = {
	key: 'AIzaSyCmDAUo4oMpJBomql5uRo6dWLxUpzyfH5U',
	cx: '014430627749204945988:lkriy0exegq'
};

module.exports = {listeners: [
{
	type: "regex",
	query: /(.+)\.(jpe?g|png|bmp|gifv?|webm)$/i,
	callback: function(reply, message, api, match){
		var error = function(code){
			reply({attachment: request("https://http.cat/" + code + ".jpg")});
		}

		if(message.body.indexOf('/') !== -1) return;

		var opts = {
			auth: options.key,
			cx: options.cx,
			q: match[1].replace(/[^a-z0-9]/ig, " "),
			safe: "medium",
			num: 1,
			searchType: "image"
		};
		if(match[2].match(/gifv?|webm/))
			opts.fileType = "gif";

		search.cse.list(opts, function(err, res){
			if(err) return error(500);
			if(!res.items || res.items.length === 0) return error(404);
				var url = res.items[0].link;

			var giphy = url.match(/\.giphy\.com\/media\/(.*)\//)
			if(giphy && giphy[1])
				url = "https://media.giphy.com/media/" + giphy[1] + "/giphy.gif";
			console.log(url);

			if(api.type === "messenger"){
				api.sendTypingIndicator(message.thread_id);
				reply({attachment: request(url)}, function(err){
					if(err) return error(500);
				});
			}else
				reply(url);
		});
	}
}
]};
