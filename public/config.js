(function(){
    angular
        .module("DM")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user", {
                templateUrl: "views/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "views/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/user/:uid/motivators", {
                templateUrl: "views/motivators.view.client.html",
                controller: "MotivatorsController",
                controllerAs: "model"
            })
            .when("/user/:uid/notifications", {
                templateUrl: "views/notifications.view.client.html",
                controller: "NotificationsController",
                controllerAs: "model"
            });
    }
})();
