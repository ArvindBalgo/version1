angular
    .module('adminApp')
    .controller('metierController', function($scope, $rootScope, $routeParams, $location, $http, Data, $timeout, FileUploader) {
        var vm = this;
        $scope.header = "Listes des metiers";
        vm.description = "";
        vm.currentImg = "";
        vm.selectedObj = {};
        vm.libMetier = "";
        vm.active = true;
        vm.fnFormatter = function(grid, row){
            console.log( row);
            return 'BLABLA';
        }

        $scope.edit  = function (grid, row, opt){
            console.log("+++++");
            console.log(row, opt);
            //console.log(grid, row, opt);
            console.log("+++++");
            if(opt == 3) {
                vm.description = row.description;
                vm.currentImg = row.src;
                $('#imgModal').modal();
            }

        }
        vm.formatCell = function(){
            var trash = "<button type='button' class='btn btn-default btn-circle' style='margin-left: 5px;margin-top: 5px;' ng-click='grid.appScope.edit(grid, row.entity, 1)'><i class='glyphicon glyphicon-trash'></i></button>";
            var edit = "<button type='button' class='btn btn-info btn-circle' style='margin-left: 5px;margin-top: 5px;' ng-click='grid.appScope.edit(grid, row.entity, 2)'><i class='glyphicon glyphicon-pencil'></i></button>";
            var image = "<button type='button' class='btn btn-success btn-circle' style='margin-left: 5px;margin-top: 5px;' ng-click='grid.appScope.edit(grid, row.entity, 3)'><i class='glyphicon glyphicon-picture'></i></button>";
            return image+edit+trash;
        }


        vm.columns = [  { name:'Libelle',field: 'description',enableHiding:false ,
            cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) {
                return 'cssLibelle';
        }},
//                        {name:'Lien Image', field: 'src', enableFiltering:false,enableHiding:false},
                        { name:'Actif', field: 'active',enableFiltering:false,cellTemplate: vm.formatCell() ,enableHiding:false}];

        vm.gridOptions = {
            enableSorting: true,
            enableFiltering: true,
            columnDefs: vm.columns,
            rowHeight:50
        };


        vm.fnModelMetier = function() {
            $http({
                method: 'GET',
                params: {mode:0},
                url: 'api/v1/info.php'
            }).then(function successCallback(response) {
                    console.log(response.data);
                   // vm.gridOptions.data = response.data;
                    response.data.splice(0, 1);
                    vm.myData = response.data;
                    var arrMetier = [];

                    angular.forEach(response.data, function(value){
                        arrMetier.push(value.libelle);
                    })

                    $(".sel_metier").select2({
                        theme:"classic",
                        data: arrMetier
                    })
                    vm.fnSubCategory();
                }, function errorCallback(error) {
                    console.log(error);
                });

        };

        vm.fnSubCategory = function(){
            $http({
                method: 'GET',
                params: {mode:2},
                url: 'api/v1/info.php'
            }).then(function successCallback(response) {
                    console.log(response.data);
                    var $example = $(".sel_metier").select2();

                    angular.forEach(vm.myData, function(value){
                        if(value.libelle == $example.val()){
                            console.log("******************************");
                            console.log(value);
                            vm.selectedObj = value;
                            console.log("******************************");
                        }
                    })
                    vm.gridOptions.data = response.data;
                }, function errorCallback(error) {
                    console.log(error);
                });
        };

        vm.fnCrudMetier = function(opt){
            console.log(opt, vm.selectedObj);
            vm.libMetier = vm.selectedObj.libelle + " - " + vm.selectedObj.sub_libelle
            $('#modalMetier').modal();
        }

        vm.fnQuitter = function(){
            $('#imgModal').modal('hide');
            $('#modalMetier').modal('hide');
        }

        vm.fnModelMetier();

    });