app.controller('authCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data) {
    console.log('test tese');
    //initially set those objects to null to avoid undefined error
    $scope.login = {};
    $scope.signup = {};
    $scope.doLogin = function (customer) {
        Data.post('loginadmin', {
            customer: customer
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $location.path('home');
            }
        });
    };
    $scope.signup = {email:'',password:'',name:'',phone:'',address:'',ville:'',codepostal:'',nosiret:''};
    $scope.signUp = function (customer) {
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
        Data.get('logout').then(function (results) {
            Data.toast(results);
            $location.path('login');
        });
    }
});