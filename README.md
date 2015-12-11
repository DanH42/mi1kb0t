mi1kb0t
=======

A multi-platform chat bot

Installation
------------

- `git clone https://github.com/DanH42/mi1kb0t.git`
- `npm install`
- Edit `networks.js` to fit your needs and add valid credentials
- `node bot` to start

I'd recommend setting up the bot as a service or running it in a screen/tmux session, but that specific implementation is up to you.

Working with Networks
---------------------

When the bot is started, it will look in `networks.js` for a list of networks it should connect to. The arguments each network needs depend on the network itself. The only property required is `type`, which tells the bot which file in the `networks/` directory to use for the connection. You can connect to multiple networks of the same type simply by adding multiple entries of that type. Each item in `networks.js` is indexed using a unique string of the user's choosing describing that connection. While currently unused, this could be used later to help facilitate cross-network features.

The included `networks.js` contains an example of a Messenger connection and also a connection to a ZNC IRC bouncer.

Creating Plugins
----------------

Plugins consist of a `.js` file placed in the `plugins/` directory that defines a list of callback functions and parameters for when they should be called. The available callback types are:

- `equals` - The message must match the given query
- `startsWith` - The message must start with the given query
- `contains` - The query must exist somewhere in the message
- `regex` - The query is a /regular expression/, and the mesage must match it
- `all` - The callback should be called for all messages

All listeners except `all`s should specify a `query` to be matched against. The query provided should be in all lowercase. The callback will be provided with up to 4 arguments:

- `reply` - A function to respond to the message. Accepts a string argument, and an optional second argument that is a callback indicating whether there was an error responding.
- `message` - An object containing metadata about the message received. Should include, at a minimum:
	- `type` - A string describing the type of message. Will normally be "message", but could be something like "sticker".
	- `sender_name` - The name of the user sending the message
	- `sender_id` - A network-specific unique ID for the user sending the message. May or may not be human-readable
	- `body` - A string containing the message sent by the user
	- `thread_id` - A network-specific unique ID for the conversation the message was sent in
- `api` - An instance of the API handler used to communicate with the network. Used for network-specific custom functions like sending stickers
- `match` - Only provided for `regex` listener types. Contains the results of the regex match

Every module should fit into a basic skeleton:

    module.exports = {listeners: [/* list of objects */]};

In addition to `listeners`, you may also specify a callback function called `apiReady` that will be called once on startup as soon as a connection to a network has been made. This will be called once per network connection (NOT once per startup). The callback function will be passed a copy of the network API for each network connection.

For example, here's a basic module that responds to all messages starting with "Hello":

    module.exports = {listeners: [
    {   
        type: "startsWith",
        query: "hello",
        callback: function(reply, message){
            reply("Hello, " + message.sender_name + "!");
        }
    }
    ]};

Adding Networks
---------------

To add your own custom network support, just add a new `.js` file in the `networks/` directory. The file should export an object with a `connect` function that will be called on startup. The function will be supplied with 3 arguments:

- `credentials` - An object from `credentials.js` containing the credentials needed to connect to your network. Can contain whatever properties you need
- `readyCallback` - A function that should be called upon successful network connection once for each module that has specified an `apiReady` callback. Should be passed an argument containing any network-specific functionality that might be useful
- `messageCallback` - A function that should be called once for each incoming message. Should be passed 3 arguments:
	- `reply` - A function to be called by plugins to respond in the current thread. Should accept 2 arguments:
		- `text` - A string containing the message to respond with
		- `callback` - A function that will be called once the message is send. Should be passed an `error` argument that contains an error message if something went wrong
	- `message` - An object describing the incoming message. Should contain, at a minimum:
		- `type` - A string describing the type of message. Will normally be "message", but could be something like "sticker".
		- `sender_name` - The name of the user sending the message
		- `sender_id` - A network-specific unique ID for the user sending the message. May or may not be human-readable
		- `body` - A string containing the message sent by the user
		- `thread_id` - A network-specific unique ID for the conversation the message was sent in
		- Any other data about the message
	- `api` - Any network-specific functionality that might be useful

This project is an eternal work-in-progress. Questions/issues/PRs welcome.
