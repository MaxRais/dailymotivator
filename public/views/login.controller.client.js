/**
 * Created by MaxRais on 5/24/16.
 */

(function () {
    angular
        .module("DM")
        .controller("LoginController", LoginController);

    function LoginController($location, $rootScope, $window, UserService) {

        var vm = this;
        vm.login = login;

        function init() {
            vm.user = JSON.parse($window.localStorage.getItem("currentUser"));
            //if(vm.user)
              //  $location.url("/user/" + vm.user._id)
        }
        init();

        function login (username, password) {
            var user = UserService
                .login(username, password)
                .then(
                    function (response) {
                        var user = response.data;
                        if (user) {
                            $rootScope.currentUser = user;
                             $window.localStorage.setItem("currentUser", angular.toJson(user));
                            var id = user._id;
                            $location.url("/user/"+id);
                        } else {
                            vm.error = "User not found";
                        }
                    },
                    function (error) {
                        vm.error = error.data;
                    });
        }
    }
})();