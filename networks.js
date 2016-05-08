module.exports = {
	"facebook": {
		type: "messenger",
		email: process.env.messenger_username || "example@example.com",
		password: process.env.messenger_password || "example"
	}, "my_bouncer": {
		type: "irc",
		server: "bouncer.example.com",
		port: 6667,
		sasl: true,
		secure: true,
		selfSigned: true,
		certExpired: true,
		nick: "mi1kb0t",
		userName: "mi1kb0t",
		password: "mi1kb0t:hunter2",
		channels: ['#general']
	}
};
