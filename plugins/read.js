// Mark all messages as read in threads where your name was recently mentioned

module.exports = {
    listeners: [{
        type: "all",
        callback: function(reply, message, api) {
            if (api.type === "messenger") {
                if (message.isAddressed === 2)
                    api.markAsRead(message.threadID);
                else if (message.isAddressed === 1)
                    api.markAsRead(message.threadID);
            }
        }
    }]
};
