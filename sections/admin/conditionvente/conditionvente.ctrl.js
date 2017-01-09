angular
    .module('adminApp')
    .controller('conditionventeController', function($scope, $rootScope, $routeParams, $location, $http, Data, $timeout) {
        console.log("conditionventeController controller");

        Data.get('session.php').then(function (results) {
            if (results.uid) {

            } else {
                $location.path("/login");
            }

            //$location();
        });

        var vm = this;
        $scope.header = "Conditions de vente";
        vm.title = "";
        vm.contenu = "";
        vm.id=0;
        vm.objconditionvente = [];

        vm.fnInit = function() {
            /*$http({
                method: 'GET',
                params: {mode:10, type:2},
                url: 'api/v1/metierCRUD.php'
            }).then(function successCallback(response) {
                console.log(response.data);
                vm.title = response.data.title;
                vm.dataText = response.data.data;
                vm.objconditionvente = angular.copy(response.data);
            }, function errorCallback(error) {
                console.log(error);
            });*/

            $.ajax({
                url: 'api/v1/metierCRUDPOST.php',
                type: 'post',
                dataType: 'json',
                success: function (data) {
                    console.log(response.data);
                    vm.title = response.data.title;
                    vm.dataText = response.data.data;
                    vm.objconditionvente = angular.copy(response.data);
                },
                data: { mode:10, type:2}
            });
        };

        vm.fnNew = function() {
            //vm.dataText.push({id:0 , description:''});
            $http({
                method: 'GET',
                params: {mode:11, type:2},
                url: 'api/v1/metierCRUD.php'
            }).then(function successCallback(response) {
                console.log(response.data);
                vm.title = response.data.title;
                vm.dataText = response.data.data;
                vm.objconditionvente = angular.copy(response.data);
                //vm.id=response.data.id;
                // vm.title = response.data.title;
                //vm.contenu = response.data.description;
            }, function errorCallback(error) {
                console.log(error);
            });
        };

        vm.fnValid = function() {
            bootbox.dialog({
                message: "Confirmez-vous la sauvegarde?",
                title: "Sauvegarde",
                buttons: {
                    annuler: {
                        label: "Non",
                        className: "btn-secondary",
                        callback: function() {
                            console.log("Annulation");
                        }
                    },
                    valider: {
                        label: "Oui",
                        className: "btn-success",
                        callback: function() {
                            $http({
                                method: 'GET',
                                params: {mode:6, contenu:JSON.stringify(vm.objconditionvente)},
                                url: 'api/v1/metierCRUD.php'
                            }).then(function successCallback(response) {
                                console.log(response.data);
                                //vm.fnInit();
                            }, function errorCallback(error) {
                                console.log(error);
                            });
                        }
                    }
                }
            });
        };

        vm.fnValidLigne = function(objLigne){
            $.ajax({
                url: 'api/v1/metierCRUDPOST.php',
                type: 'post',
                dataType: 'json',
                success: function (data) {
                    bootbox.alert("Sauvegarde terminer");
                },
                data: {  mode:12, contenu:JSON.stringify(objLigne)}
            });

        };

        vm.fnDelLigne  = function (objLigne) {
            $http({
                method: 'GET',
                params: {mode:13, id:objLigne.id},
                url: 'api/v1/metierCRUD.php'
            }).then(function successCallback(response) {
                console.log(response.data);
                bootbox.alert("Suppression terminer");
                vm.fnInit();
            }, function errorCallback(error) {
                console.log(error, "blablabalba");
            });
        };

        vm.fnValidHeader = function(){
            $http({
                method: 'GET',
                params: {mode:14,  contenu:JSON.stringify(vm.objconditionvente)},
                url: 'api/v1/metierCRUD.php'
            }).then(function successCallback(response) {
                console.log(response.data);
                bootbox.alert("Sauvegarde terminer");
                vm.fnInit();
            }, function errorCallback(error) {
                console.log(error);
            });
        };

        vm.fnInit();
    });
