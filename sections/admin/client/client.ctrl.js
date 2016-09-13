angular
    .module('adminApp')
    .controller('clientController', function($scope, $rootScope, $routeParams, $location, $http, Data, $timeout) {
        console.log("Admin client controller");
    });

Data.get('session').then(function (results) {
    if (results.uid) {

    } else {
        $location.path("/login");
    }

    //$location();
});