
angular
    .module('myApp')
    .controller('conditionventeController', function($scope, $location, $timeout, messages, $http, Data) {
        var vm = this;
        vm.title = "";
        vm.contenu = "";
        vm.id=0;
        vm.arrContents = [];

        vm.fnInit = function() {
            $http({
                method: 'GET',
                params: {mode:10, type:2},
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
        vm.fnInit();
    });
