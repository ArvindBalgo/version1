angular
    .module('adminApp')
    .controller('homeController', function($scope, $rootScope, $routeParams, $location, $http, Data, $timeout) {
        console.log("HOME CONtroller admin partt");

        Data.get('session').then(function (results) {
            if (results.uid) {

            } else {
                $location.path("/login");
            }

            //$location();
        });
    });

