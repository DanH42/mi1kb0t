module.exports = {listeners: [
{
	type: "equals",
	query: "CF?",
  function Get(yourUrl){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;
  }
  callback: function(reply, message){
    var json = "http://catfacts-api.appspot.com/api/facts?number=1";
    obj = JSON.parse(Get(json));
    reply(obj.facts[0]);
  }
}
