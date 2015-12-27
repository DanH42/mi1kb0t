var request = require('request');

module.exports = {listeners: [
{
    type: "equals",
    query: ".minion",
    callback: function(reply, message){
        var url = Math.random()<.5 ? "https://www.reddit.com/r/MinionHate/top/.json?sort=top&t=week" : "https://www.reddit.com/r/WackyTicTacs/top/.json?sort=top&t=week";
        request(url, function(err, res, body){
            try{
                var posts = JSON.parse(body).data.children;
                var index = Math.floor(Math.random() * posts.length);
                while(!posts[index].data.url){
                     index = Math.floor(Math.random() * posts.length);
                }
                var minion = posts[index].data.url;
                var image = request(minion);
                if(image){
                    reply({attachment: image});
                }
                else{
                    reply({attachment: request("http://i.imgur.com/L07nbhn.jpg")});
                }
            }catch(e){
                reply({attachment: request("http://i.imgur.com/L07nbhn.jpg")});
            }
        });
    }
}
]};
