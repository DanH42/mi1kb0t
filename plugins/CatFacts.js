var request = require('request');

module.exports = {listeners: [
{
    type: "equals",
    query: ".cat",
    callback: function(reply, message){
        request("http://catfact.ninja/fact", function(err, res, body){
            try{
                var obj = JSON.parse(body);
                if(obj && obj.fact)
                    return reply(obj.fact);
            }catch(e){}

			reply("Sorry, no cat facts for you today :'(");
        });
    }
}
]};
