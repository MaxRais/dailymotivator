module.exports = function (app) {
    var models = require("./models/models.js")();
    var userService = require("./services/user.service.server.js")(app, models);
};