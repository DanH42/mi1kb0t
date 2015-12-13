module.exports = {listeners: [
{
	type: "equals",
	query: "CF?",
  callback: function(reply, message){
    var json = http://catfacts-api.appspot.com/api/facts?number=1;
    obj = JSON.parse(json);
    reply(obj.facts[0]);
  }
}
