module.exports = function() {
    var mongoose = require('mongoose');

    var connectionString = 'mongodb://localhost/imprivatahackathon';
    mongoose.connect(connectionString);

    var userModel = require("./user/user.model.server.js")();
    var models = {
        userModel: userModel
    };

    return models;
};