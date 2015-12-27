// Various assorted call/response combinations

module.exports = {listeners: [
{
    type: "equals",
    query: ".dice",
    callback: function(reply){
        reply(Math.floor(Math.random() * 6) + 1);
    }
}, {
    type: "equals",
    query: ".coin",
    callback: function(reply){
        reply(Math.random()<.5 ? "Heads" : "Tails");
    }
}
]};
