module.exports = function() {
    var mongoose = require("mongoose");

    var UserSchema  = mongoose.Schema({
        username: String,
        password: String,
        motivators: [String],
        notifications: [{
            hour: Number,
            minute: Number,
            hmt: String
        }]
    }, {collection: "dmUser"});

    return UserSchema;
};