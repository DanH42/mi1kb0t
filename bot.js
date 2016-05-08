var fs = require('fs');
var networks = require('./networks.js');

var isAddressed = {};
var listeners = {
    equals: [],
    startsWith: [],
    contains: [],
    regex: [],
    all: []
};

var readyCallbacks = [];

// Load all plugins in plugins/ directory and save their callbacks
fs.readdirSync(__dirname + '/plugins/').forEach(function(file) {
    if (file.match(/\.js$/) !== null) {
        var plugin = require('./plugins/' + file);
        if (plugin.listeners) {
            for (var i = 0; i < plugin.listeners.length; i++) {
                var listener = plugin.listeners[i];
                listeners[listener.type].push(listener);
            }
        }

        if (plugin.apiReady)
            readyCallbacks.push(plugin.apiReady);
    }
});

// Start connecting to networks
for (var connectionName in networks) {
    var networkCreds = networks[connectionName];
    var network = require('./networks/' + networkCreds.type + '.js');

    network.connect(networkCreds, function(api) {
        api.networkType = networkCreds.type;
        for (var i = 0; i < readyCallbacks.length; i++)
            readyCallbacks[i](api);
    }, function(reply, message, api) {
        // Detect if you're being spoken to; adjust if you rename your bot
        // isAddressed = 2 means the current message is addressing the bot
        // isAddressed = 1 means the bot was mentioned in the past 30 seconds
        // isAddressed = 0 means the bot has not been mentioned recently
        if (message.isAddressed === 2 || (message.body && message.body.match(/b[0o]t/i) && message.body.match(/mi[l1]k/i))) {
            if (isAddressed[message.thread_id])
                clearTimeout(isAddressed[message.thread_id]);
            isAddressed[message.thread_id] = setTimeout(function(id) {
                delete isAddressed[message.thread_id];
            }.bind(this, message.thread_id), 30000);
            message.isAddressed = 2;
        } else if (isAddressed[message.thread_id])
            message.isAddressed = 1;
        else
            message.isAddressed = 0;

        // Call all the `all` listeners first
        for (var i = 0; i < listeners.all.length; i++)
            listeners.all[i].callback(reply, message, api);

        // Some messages may not actually have text in their body
        if (message.body) {
            var msg = message.body.toLowerCase();
            for (var i = 0; i < listeners.equals.length; i++)
                if (msg === listeners.equals[i].query)
                    listeners.equals[i].callback(reply, message, api);
            for (var i = 0; i < listeners.startsWith.length; i++)
                if (msg.indexOf(listeners.startsWith[i].query) === 0)
                    listeners.startsWith[i].callback(reply, message, api);
            for (var i = 0; i < listeners.contains.length; i++)
                if (msg.indexOf(listeners.contains[i].query) !== -1)
                    listeners.contains[i].callback(reply, message, api);

            for (var i = 0; i < listeners.regex.length; i++) {
                var match = message.body.match(listeners.regex[i].query);
                if (match !== null)
                    listeners.regex[i].callback(reply, message, api, match);
            }
        }
    });
}
