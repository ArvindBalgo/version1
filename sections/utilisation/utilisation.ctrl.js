
angular
    .module('myApp')
    .controller('utilisationController', function($scope, $location, $timeout, messages, $http, Data) {
        var vm = this;
        vm.title = "";
        vm.contenu = "";
        vm.id=0;

        vm.fnInit = function() {
            $http({
                method: 'GET',
                params: {mode:3, type:3},
                url: 'api/v1/metierCRUD.php'
            }).then(function successCallback(response) {
                console.log(response.data);
                vm.id=response.data.id;
                vm.title = response.data.title;
                vm.contenu = response.data.description;
            }, function errorCallback(error) {
                console.log(error);
            });
        };
        vm.fnInit();
    });
