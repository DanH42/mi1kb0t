// Teach those marmite-lovers what's up

module.exports = {listeners: [
{
    type: "regex",
    query: /marmite/i,
    callback: marmite
}
]};

function marmite(reply, message) {
    console.log("Someone said marmite!!!!!");
    reply("Fuck marmite!");
}
