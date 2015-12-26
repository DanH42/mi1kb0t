var request = require('request');

module.exports = {listeners: [
{
    type: "equals",
    query: ".cat",
    callback: function(reply, message){
        request("http://catfacts-api.appspot.com/api/facts?number=1", function(err, res, body){
            try{
                var obj = JSON.parse(body);
                if(obj && obj.facts && obj.facts[0])
                    reply(obj.facts[0]);
            }catch(e){}
        });
    }
}
]};
