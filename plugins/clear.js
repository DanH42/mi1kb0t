module.exports = {listeners: [
{
	type: "startsWith",
	query: ".clear",
	callback: cls
}, {
	type: "regex",
	query: /^\.?cls/i,
	callback: cls
}, {
	type: "startsWith",
	query: ".nest",
	callback: cls
}
]};

function cls(reply, message){
	var small_space = String.fromCharCode(65279, 32);
	var big_space = String.fromCharCode(65279, 32, 65039, 32, 65039);
	var split = message.body.split(" ");
	split.shift();
	var extra = "\n" + split.join(" ").trim();
	reply(new Array(50).fill(big_space).join("\n") + extra, {delay: 0});
}
