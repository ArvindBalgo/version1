
angular
    .module('myApp')
    .controller('aproposController', function($scope, $location, $timeout, messages, $http, Data) {
        var vm = this;
        vm.title = "";
        vm.contenu = "";
        vm.id=0;
        vm.arrContents = [];

        vm.fnInit = function() {
            $http({
                method: 'GET',
                params: {mode:3, type:1},
                url: 'api/v1/metierCRUD.php'
            }).then(function successCallback(response) {
                console.log(response.data);
                vm.id=response.data.id;
                vm.title = response.data.title;
                vm.contenu = response.data.description;
                vm.arrContents = angular.copy(response.data);
            }, function errorCallback(error) {
                console.log(error);
            });
        };

        $lang = localStorage.getItem("LANG");
        $http({
            method: 'GET',
            params: {mode:3, lang:$lang},
            url: 'api/v1/langueCRUD.php'
        }).then(function successCallback(response) {
            console.log(response.data);
            $scope.langue = angular.copy(response.data);
            vm.fnInit();
        });
    });
