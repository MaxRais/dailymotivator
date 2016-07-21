/**
 * Created by MaxRais on 5/23/16.
 */

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
            });
    }
})();
