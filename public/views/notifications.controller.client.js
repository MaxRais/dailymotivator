/**
 * Created by MaxRais on 5/25/16.
 */

(function() {
    angular
        .module("DM")
        .controller("NotificationsController", NotificationsController);

    function NotificationsController($routeParams, $window, $location, UserService) {
        var vm = this;
        var uid = $routeParams.uid;

        vm.uid = uid;
        vm.user = JSON.parse($window.localStorage.getItem("currentUser"));
        vm.notifications = [];
        vm.hour = "";
        vm.minute = "";
        vm.tense = "";
        vm.addNotification = addNotification;
        vm.deleteNotification = deleteNotification;

        UserService
            .getNotifications(uid)
            .then(
                function (response) {
                    console.log(response)
                    vm.notifications = response.data;
                },
                function (error) {
                    vm.error = error.data;
                }
            );

        function addNotification() {
            var hour = vm.hour;
            var minute = vm.minute;
            var tense = vm.tense;

            if(hour && minute && tense) {
                vm.notifications.push(convertHmtTo24(hour, minute, tense));
                vm.user.notifications = vm.notifications;
                console.log(vm.user.notifications);
                $window.localStorage.setItem("currentUser", angular.toJson(vm.user));
                UserService
                    .updateUser(uid, vm.user)
                    .then(
                        function (user) {
                            location.reload();
                        });
            }
        }

        function convertHmtTo24(hour, minute, tense) {
            var resultHour;
            var resultMinute = parseInt(minute);

            if(tense === "AM") {
                if(hour == "12") {
                    resultHour = 0;
                }
                else {
                    resultHour = parseInt(hour);
                }
            }
            else {
                if(hour == "12") {
                    resultHour = 12;
                }
                else {
                    resultHour = parseInt(hour) + 12
                }
            }
            return {
                hour: resultHour,
                minute: resultMinute,
                hmt: hour + ":" + minute + " " + tense
            };
        }

        function deleteNotification(notification) {
            var index = vm.notifications.indexOf(notification);
            vm.notifications.splice(index, 1);
            vm.user.notifications = vm.notifications;
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
