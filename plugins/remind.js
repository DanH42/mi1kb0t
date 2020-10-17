const units = [
	{
		name: "hour",
		seconds: 60 * 60
	}, {
		name: "minute",
		seconds: 60
	}, {
		name: "second",
		seconds: 1
	}
];

module.exports = {listeners: [
{
	type: "regex",
	//query: /^[^a-z0-9]remind ([1-9]+[0-9]*)([hms]) (.+)/i,
	query: /^[^a-z0-9]remind (?:([1-9]+[0-9]*)h)?(?:([1-9]+[0-9]*)m)?(?:([1-9]+[0-9]*)s)? (.+)/i,
	callback: function(reply, message, api, match){
		match.shift();

		var seconds = 0;
		var names = [];
		for(var i = 0; i < units.length; i++){
			if(match[i] === undefined)
				continue;
			var unit = units[i];
			var num = parseInt(match[i]);
			seconds += num * unit.seconds;
			var unitName = unit.name;
			if(num !== 1) unitName += "s";
			names.push(`${num} ${unitName}`);
		}

		var msg = match[units.length];
		setTimeout(reply.bind(api, msg), seconds * 1000);
		reply(`Reminder set for ${names.join(", ")}`);
	}
}
]};
