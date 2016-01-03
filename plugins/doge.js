var request = require('request');

module.exports = {listeners: [
{
    type: "equals",
    query: ".doge",
    callback: function(reply, message){
        var url = Math.random()<0.5 ? "https://www.reddit.com/r/doge/top/.json?sort=top&t=week" : "https://www.reddit.com/r/supershibe/top/.json?sort=top&t=week";
        request(url, function(err, res, body){
            try{
                var posts = JSON.parse(body).data.children;
                var index = Math.floor(Math.random() * posts.length);
                var attempts = 0;
                while(!posts[index].data.url || posts[index].data.url.indexOf("i.imgur.com") === -1){
                     index = Math.floor(Math.random() * posts.length);
                     attempts++;
                     if(attempts > 5){
                         reply({attachment: request("http://i.imgur.com/WMiliXD.jpg")});
                         break;
                     }
                }
                var doge = posts[index].data.url;
                console.log(doge);
                var image = request(doge);
                if(image){
                    reply({attachment: image});
                }
                else{
                    reply({attachment: request("http://i.imgur.com/3U9oYna.jpg")});
                }
            }catch(e){
                reply({attachment: request("http://i.imgur.com/GpvsU4L.jpg")});
            }
        });
    }
}
]};