/**
 * Created by MaxRais on 6/6/16.
 */

module.exports = function() {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var User = mongoose.model("User", UserSchema);

    var api = {
        createUser: createUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUsersForTournament: findUsersForTournament
    };

    return api;

    function createUser(user) {
        return User.create(user);
    }

    function findUserByUsername(username) {
        return User.findOne({username: username}).populate('following','participating username');
    }

    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password}).populate('following','participating username');
    }

    function findUserById(id) {
        return User.findById(id).populate('following','participating username');
    }

    function updateUser(id, newUser) {

        return User.findOneAndUpdate(id,
            {
                $set: {
                    motivators: newUser.motivators,
                    notifications: newUser.notifications
                }
            });
    }

    function deleteUser(id) {
        return User.remove({_id: id}).populate('following','participating username');
    }

    function getFollowing(userIds) {
        var promise = User.find(function(err, users) {
            var resultUsers = [];
            for(var key in users) {
                var user = users[key];
                if(userIds.contains(user._id))
                    resultUsers.push(user);
            }
        }).populate('following','participating username');
    }

    function findUsersForTournament(id) {
        return User.find().populate('following','participating username');
    }
};