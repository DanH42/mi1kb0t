var request = require('request');

module.exports = {listeners: [
{
    type: "equals",
    query: ".corgi",
    callback: function(reply, message){
        var url = Math.random()<0.5 ? "https://www.reddit.com/r/corgi/top/.json?sort=top&t=week" : "https://www.reddit.com/r/BabyCorgis/top/.json?sort=top&t=week";
        request(url, function(err, res, body){
            try{
                var posts = JSON.parse(body).data.children;
                var index = Math.floor(Math.random() * posts.length);
                var attempts = 0;
                while(!posts[index].data.url || posts[index].data.url.indexOf("i.imgur.com") === -1){
                     index = Math.floor(Math.random() * posts.length);
                     attempts++;
                     if(attempts > 5){
                         reply({attachment: request("http://i.imgur.com/djeivlK.gif")});
                         break;
                     }
                }
                var corgi = posts[index].data.url;
                console.log(corgi);
                var image = request(corgi);
                if(image){
                    reply({attachment: image});
                }
                else{
                    reply({attachment: request("http://i.imgur.com/djeivlK.gif")});
                }
            }catch(e){
                reply({attachment: request("http://i.imgur.com/djeivlK.gif")});
            }
        });
    }
}
]};
