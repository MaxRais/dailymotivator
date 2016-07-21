var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var passport         = require('passport');
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, models) {

    var userModel = models.userModel;

    app.post("/api/user", createUser);
    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.get("/api/user", findUserByCredentials);
    app.post('/api/login', passport.authenticate('wam'), login);
    app.post('/api/logout', logout);
    app.post('/api/register', register);
    app.get('/api/loggedin', loggedin);
    app.get('/api/user/:userId/motivators', getMotivators);
    app.get('/api/user/:userId/notifications', getNotifications);

    passport.use('wam', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function register (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user) {
                        res.status(400).send("Username already exists");
                        return;
                    } else {
                        req.body.password = bcrypt.hashSync(password);
                        return userModel
                            .createUser(req.body);
                    }
                },
                function(error) {
                    res.status(400).send(error);
                }
            )
            .then(
                function(user) {
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(error) {
                    res.status(400).send(error);
                }
            )
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function login(req, res, done) {
        var user = req.user;
        //console.log("USER: " + user);
        res.json(user);
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    //console.log("username: " + username);
                    //console.log("password: " + password);
                    //console.log("user.password: " + user);
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        //console.log('2');
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function deleteUser(req, res) {
        var id = req.params.userId;

        userModel
            .deleteUser(id)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.status(404).send("Unable to remove user with ID: " + id);
                }
            );
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var newUser = req.body;
        userModel
            .updateUser(id, newUser)
            .then(
                function(user) {
                    res.send(user);
                },
                function(error) {
                    res.status(404).send("Unable to update user with ID: " + id);
                }
            );
    }

    function createUser(req, res) {
        var newUser = req.body;

        userModel
            .createUser(newUser)
            .then(
                function(user) {
                    console.log(user);
                    res.json(user);
                },
                function(error) {
                    res.status(400).send("Username " + newUser.username + " is already in use");
                }
        );
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(
                function(user){
                    res.send(user);
                },
                function(error){
                    res.status(400).send(error);
                }
            );
    }

    function getUsers(req, res) {
        var tournamentId = req.params["bracketId"];
        var username = req.query["username"];
        if(username) {
            findUserByUsername(username, res);
        }
        else {
            userModel
                .findUsersForTournament(tournamentId)
                .then(
                    function(users) {
                        var result = [];
                        for(var i in users) {
                            var user = users[i];
                            if (user.participating.length > 0) {
                                var bracketIds = user.participating.map(function (p) {
                                    return p.bracketId;
                                });
                                var contains = false;
                                for(var b in bracketIds) {
                                    if (bracketIds[b] == tournamentId)
                                        contains = true;
                                }
                                if (contains) {
                                    result.push(user);
                                }
                            }
                        }
                        res.send(result);
                    },
                    function(error){
                        res.status(400).send(error);
                    }
                );
        }
    }

    function findUserByUsername(username, res) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(403).send("no user exists");
                }
            );
    }

    function findUserByCredentials(username, password, res) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(403).send("no user exists");
                }
            );
    }

    function authenticate(req, res, next) {
        //console.log(req.user);
        //console.log(req.isAuthenticated());
        if(req.isAuthenticated()) {
            next();
        }
        else {
            res.send(403);
        }
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function getMotivators(req, res) {
        var id = req.params.userId;

        userModel
            .findUserById(id)
            .then(
                function(user) {
                    res.send(user.motivators);
                }
            )
    }

    function getNotifications(req, res) {
        var id = req.params.userId;

        userModel
            .findUserById(id)
            .then(
                function(user) {
                    res.send(user.notifications);
                }
            )
    }
};
