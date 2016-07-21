/**
 * Created by MaxRais on 6/6/16.
 */

module.exports = function() {
    var mongoose = require("mongoose");

    var UserSchema  = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        quotes: [String],
        reminders: [{
            hour: Number,
            minute: Number
        }]
    }, {collection: "dmUser"});

    return UserSchema;
};