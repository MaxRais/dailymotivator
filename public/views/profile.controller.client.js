/**
 * Created by MaxRais on 5/24/16.
 */

(function () {
    angular
        .module("DM")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $window, $routeParams, $rootScope, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;
        var id = $routeParams["uid"];

        init();

        function updateUser() {
            $window.localStorage.setItem("currentUser", angular.toJson(vm.user));
            UserService
                .updateUser(vm.user._id, vm.user)
                .then(
                    function (response) {
                        vm.success = "User successfully updated";
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                );
        }

        function deleteUser() {
            UserService
                .deleteUser(id)
                .then(
                    function (success) {
                        $location.url("/login");
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                );
        }

        function init() {
            UserService
                .findUserById(id)
                .then(function (response) {
                    vm.user = response.data;
                });

            vm.user = JSON.parse($window.localStorage.getItem("currentUser"));
        }

        
        function logout() {
            UserService
                .logout()
                .then(
                    function () {
                        $rootScope.currentUser = null;
                        $window.localStorage.setItem("currentUser", null);
                        $location.url("/login");
                    },
                    function () {
                        $rootScope.currentUser = null;
                        $window.localStorage.setItem("currentUser", null);
                        $location.url("/login");
                    }
                );
        }
    }
})();
