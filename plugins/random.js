// Various assorted call/response combinations

module.exports = {listeners: [
{
    type: "startsWith",
    query: ".dice",
    callback: function(reply){
        var words = message.body.match(/\S+/gi);
        for (var i = 0; i < words.length; i++) {
            if (!isNaN(words[i])) {
                reply(Math.floor(Math.random() * words[i]) + 1 + "");
                return;
            }
        }
        reply(Math.floor(Math.random() * 6) + 1 + "");
    }
}, {
    type: "equals",
    query: ".coin",
    callback: function(reply){
        reply(Math.random()<0.5 ? "Heads" : "Tails");
    }
}
]};
