angular
    .module('adminApp')
    .controller('produitsController', function($scope, $rootScope, $routeParams, $location, $http, Data, $timeout, FileUploader, $compile) {

        Data.get('session.php').then(function (results) {
            if (results.uid) {

            } else {
                $location.path("/login");
            }

            //$location();
        });

        var vm = this;
        vm.currentProduit = {};
        $scope.header = "Produits";

        //uploader img
        var uploader = $scope.uploader = new FileUploader({
            url: 'api/produitImg.php'
        });

        // FILTERS

        uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });
        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });
        uploader.formData.push({

        });
        uploader.onBeforeUploadItem = function(item) {

            item.formData = [{id_cata:vm.currentProduit.id_cata}];
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
            vm.fnGetProduits();
            $("#modalProduit").modal('hide');

        };



        vm.formatCell = function(){
            var trash = "<button type='button' class='btn btn-default btn-circle' style='margin-left: 5px;margin-top: 5px;' ng-click='grid.appScope.edit(grid, row.entity, 1)'><i class='glyphicon glyphicon-trash'></i></button>";
            var edit  = "<button type='button' class='btn btn-info btn-circle' style='margin-left: 5px;margin-top: 5px;' ng-click='grid.appScope.edit(grid, row.entity, 2)'><i class='glyphicon glyphicon-upload'></i></button>";
            var image = "<button type='button' class='btn btn-success btn-circle' style='margin-left: 5px;margin-top: 5px;' ng-click='grid.appScope.edit(grid, row.entity, 3)'><i class='glyphicon glyphicon-picture'></i></button>";
            return image+edit+trash;
        }

        vm.columns = [  { name:'Libelle',field: 'description',enableHiding:false},
            { name:'Reference',field: 'reference',enableHiding:false},
            { name:'Actif', field: '',enableFiltering:false,cellTemplate: vm.formatCell() ,enableHiding:false}

        ];

        $scope.edit  = function (grid, row, opt){
            console.log("TEST", row, opt);
            vm.currentProduit = angular.copy(row);
            if(opt == 1){
                //delete
                bootbox.confirm("Confirmez-vous la suppresion de cette ligne <b>" + vm.currentProduit.description + "|| Ref: " + vm.currentProduit.reference + "</b>?", function(result) {
                    if(result){
                        console.log(row.id);
                        console.log("confirmation to delete");

                        $http({
                            method: 'GET',
                            params: {mode:1, id:vm.currentProduit.id_cata},
                            url: 'api/v1/produitCRUD.php'
                        }).then(function successCallback(response) {
                                console.log(response.data);
                                vm.fnGetProduits();
                            }, function errorCallback(error) {
                                console.log(error);
                            });

                    }
                })
            }
            if(opt == 2){
                //exchange img
                $('#modalProduit').modal();
            }
            else if(opt == 3) {
                //display image
                $('#imgModal').modal();
            }
        };

        vm.fnRechCategory = function() {
            $http({
                method: 'GET',
                params: {mode:8},
                url: 'api/v1/sampleControl.php'
            }).then(function successCallback(response) {

                    vm.listMetier = response.data;

                    $(".sel_model_metier").select2({
                        theme:"classic",
                        data: vm.listMetier.modelsmetier
                    });

                    $(".sel_model_metier").on("select2:select", function (e) {
                        //console.log($(".sel_model_metier").select2().val() , "  :::");
                        vm.fnGetProduits();
                    });

                    vm.fnGetProduits();
                }, function errorCallback(error) {
                    console.log(error);
                });
        };

        vm.fnGetProduits = function() {
            var id_category = $(".sel_model_metier").select2().val();
            $http({
                method: 'GET',
                params: {mode:0 , id:id_category},
                url: 'api/v1/produitCRUD.php'
            }).then(function successCallback(response) {
                    console.log(response.data);
                    $scope.gridOptions.data = [];
                    $timeout(function(){
                        $scope.gridOptions.data = response.data
                    }, 0);

                }, function errorCallback(error) {
                    console.log(error);
                });
        };

        $(document).ready(function(){
            vm.fnRechCategory();
            $scope.gridOptions = {
                enableSorting: true,
                enableFiltering: true,
                columnDefs: vm.columns,
                rowHeight:50
            };
        });

    });

