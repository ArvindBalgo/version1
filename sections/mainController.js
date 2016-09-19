angular
    .module('myApp')
    .controller('mainController', function($scope, $rootScope, $routeParams, $location, $http, Data) {
        //Setup view model object
        console.log('main CONTROLLER');
        Data.get('session').then(function (results) {
            $scope.sessionInfo = results;
                $location.path('home');
        });

        $scope.doLogin = function (customer) {
            Data.post('login', {
                customer: customer
            }).then(function (results) {
                    console.log("RESULTS", results);
                    Data.toast(results);
                    if (results.status == "success") {
                            $location.path('home');
                    }
                });
        };

        $scope.signUp = function (customer) {
            console.log("customer" , customer);
            Data.post('signUp', {
                customer: customer
            }).then(function (results) {
                Data.toast(results);
                if (results.status == "success") {
                    $location.path('home');
                }
            });
        };

        $scope.logout = function () {
            console.log("main js logout");
            Data.get('logout').then(function (results) {
                Data.toast(results);
                $location.path('home');
            });
        }
    });
