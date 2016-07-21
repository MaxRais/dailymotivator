window.angular
    .module('webNotifications', ['angular-web-notification'])
    .directive('showButton', ['webNotification', function (webNotification) {
    'use strict';

    return {
        restrict: 'C',
        template: '',
        link: function (scope, element) {
            setInterval(checkNotification, 60000);

            function checkNotification() {
                var quotes = scope.model.user.motivators;
                var notifications = scope.model.user.notifications;
                var index = Math.floor(Math.random() * quotes.length);
                var time = new Date();
                var hours = time.getHours();
                var minutes = time.getMinutes();

                var notify = false;
                for(var i in notifications) {
                    if(notifications[i].hour === hours && notifications[i].minute === minutes) {
                        notify = true;
                        break;
                    }
                }

                if(notify) {
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
                }
            }
        }
    };
}]);