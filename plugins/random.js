// Get some random numbers

module.exports = {
    listeners: [{
        type: "startsWith",
        query: ".dice",
        callback: roll
    }, {
        type: "startsWith",
        query: ".roll",
        callback: roll
    }, {
        type: "equals",
        query: ".coin",
        callback: function(reply) {
            reply(Math.random() < 0.5 ? "Heads" : "Tails");
        }
    }]
};

function roll(reply, message) {
    var sides = 6;
    var rolls = 1;
    var overflow = false;

    var match = message.body.match(/(?:([0-9]*)d)?([0-9]+)/i);
    console.log(match);
    if (match && match.length === 3) {
        if (match[1])
            rolls = parseInt(match[1])
        sides = parseInt(match[2]);

        if (rolls > 10) {
            rolls = 10;
            overflow = true;
        }
    }

    var rolled = 0;
    var total = 0;
    var nextRoll = function() {
        var num = Math.floor(Math.random() * sides) + 1;
        total += num;
        reply(num + "");

        if (++rolled < rolls)
            setTimeout(nextRoll, 100);
        else if (overflow)
            setTimeout(function() {
                reply("Ran out of dice!");
            }, 100);
        else if (rolls > 1)
            setTimeout(function() {
                reply("Total: " + total);
            }, 100);
    }
    nextRoll();
}
