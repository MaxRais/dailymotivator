/**
 * Created by MaxRais on 5/25/16.
 */

(function() {
    angular
        .module("DM")
        .factory("UserService", UserService);
    
    function UserService($http) {
        var api = {
            createUser: createUser,
            checkLoggedin: checkLoggedin,
            register: register,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login,
            logout: logout,
            addBracket: addBracket,
            addParticipating: addParticipating,
            followUser: followUser,
            findParticipants: findParticipants
        };
        return api;

        function checkLoggedin() {
            return $http.get("/api/loggedin");
        }

        function logout() {
            return $http.post('/api/logout');
        }

        function createUser(user) {
            var url = "/api/user";
            return $http.post(url, user);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url);
        }

        function findUserById(id) {
            var url = "/api/user/" + id;
            return $http.get(url);
        }
        
        function findUserByUsername(username) {
            var url = "/api/user?username="+username;
            return $http.get(url);
        }

        function login(username, password) {
            var url = "/api/login";
            var user = {
                username: username,
                password: password
            };
            return $http.post(url, user);
        }

        function updateUser(id, newUser) {
            var url = "/api/user/"+id;
            return $http.put(url, newUser);
        }

        function deleteUser(id) {
            var url = "/api/user/"+id;
            return $http.delete(url);
        }

        function register(username, password) {
            var url = "/api/register";
            var user = {
                username: username,
                password: password
            };
            return $http.post(url, user);
        }

        function addBracket(uid, bid) {
            var url = "/api/user/"+uid+"/brackets/"+bid;
            return $http.put(url);
        }

        function addParticipating(uid, bid, pid) {
            var url = "/api/user/"+uid+"/participating";
            var part = {
                bracketId: bid,
                participantId: pid
            };
            return $http.put(url, part);
        }

        function followUser(yourId, theirId) {
            var url = "/api/user/"+yourId+"/follow/"+theirId;
            return $http.put(url);
        }

        function findParticipants(id) {
            var url = "/api/user/brackets/"+id;
            return $http.get(url);
        }
    }
})();
