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
            getMotivators: getMotivators
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

        function getMotivators(id) {
            var url = "/api/user/" + id + "/motivators";
            return $http.get(url);
        }
    }
})();
