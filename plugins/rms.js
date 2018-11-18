//Ensures proper nomenclature in referring to GNU/Linux operating system

var pasta = "I'd just like to interject for moment. What you're refering to as Linux, is in fact, GNU/Linux, or as I've recently taken to calling it, GNU plus Linux. Linux is not an operating system unto itself, but rather another free component of a fully functioning GNU system made useful by the GNU corelibs, shell utilities and vital system components comprising a full OS as defined by POSIX.";

module.exports = {listeners: [
{
	type: "regex",
	query: "(l|L)inux",
	callback: function(reply, message){
		if(message.body.indexOf("GNU") == -1) {
			reply(pasta);
		}
	}
}
]};
