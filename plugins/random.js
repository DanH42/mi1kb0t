// Various assorted call/response combinations

module.exports = {listeners: [
{
    type: "startsWith",
    query: ".dice",
    callback: function(reply, message){
        var words = message.body.match(/[0-9]+/);
        if (words && words[0] && !isNaN(words[0])) {
            reply(Math.floor(Math.random() * words[0]) + 1 + "");
            return;
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
