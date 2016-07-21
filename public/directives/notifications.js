/**
 * Created by MaxRais on 7/21/16.
 */

window.angular
    .module('webNotifications', ['angular-web-notification'])
    .directive('showButton', ['webNotification', function (webNotification) {
    'use strict';

    return {
        restrict: 'C',
        template: 'Show Notification',
        link: function (scope, element) {

            element.on('mouseenter', function onClick() {
                var quotes = scope.model.user.motivators;
                var notifications = scope.model.user.notifications;
                var index = Math.floor(Math.random() * quotes.length);
                var time = new Date();
                var hours = time.getHours();
                var minutes = time.getMinutes();
                

                webNotification.showNotification('Daily Motivator', {
                    body: quotes[index],
                    icon: '../img/icon.png',
                    autoClose: 5000 //auto close the notification after 5 seconds (you can manually close it via hide function)
                }, function onShow(error, hide) {
                    if (error) {
                        window.alert('Unable to show notification: ' + error.message);
                    } else {
                        setTimeout(function hideNotification() {
                            hide(); //manually close the notification (you can skip this if you use the autoClose option)
                        }, 5000);
                    }
                });
            });
        }
    };
}]);