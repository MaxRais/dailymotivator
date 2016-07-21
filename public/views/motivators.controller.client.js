/**
 * Created by MaxRais on 5/25/16.
 */

(function() {
    angular
        .module("DM")
        .controller("MotivatorsController", MotivatorsController);

    function MotivatorsController($routeParams, $window, $location, UserService) {
        var vm = this;
        var uid = $routeParams.uid;

        vm.uid = uid;
        vm.user = JSON.parse($window.localStorage.getItem("currentUser"));
        vm.motivators = [];
        vm.addMotivator = addMotivator;
        vm.deleteMotivator = deleteMotivator;

        UserService
            .getMotivators(uid)
            .then(
                function (response) {
                    vm.motivators = response.data;
                },
                function (error) {
                    vm.error = error.data;
                }
            );

        function addMotivator(motivator) {
            if(motivator) {
                vm.motivators.push(motivator);
                vm.user.motivators = vm.motivators;
                $window.localStorage.setItem("currentUser", angular.toJson(vm.user));
                UserService
                    .updateUser(uid, vm.user)
                    .then(
                        function (user) {
                            location.reload();
                        });
            }
        }

        function deleteMotivator(motivator) {
            var index = vm.motivators.indexOf(motivator);
            vm.motivators.splice(index, 1);
            vm.user.motivators = vm.motivators;
            $window.localStorage.setItem("currentUser", angular.toJson(vm.user));
            UserService
                .updateUser(uid, vm.user)
                .then(
                    function (user) {
                        location.reload();
                    });
        }
    }
})();
