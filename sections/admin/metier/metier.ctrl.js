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
        vm.originalData = [];
        vm.nouveauMetier = false;

        $(".selObj").select2({
            tags: true
        })

        var uploader = $scope.uploader = new FileUploader({
            url: 'api/upload.php'
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
            name: $scope.hopeData
        });

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
                    $(".sel_metier").on("select2:select", function (e) {
                        vm.fnSelectActivated();
                    });

                    vm.fnSubCategory();
                }, function errorCallback(error) {
                    console.log(error);
                });

        };

        vm.fnSelectActivated = function(){
            console.log($(".sel_metier").select2().val());
            angular.forEach(vm.myData, function(value){
                if(value.libelle == $(".sel_metier").select2().val()){
                    vm.selectedObj = value;
                }
            });
            vm.fnFilterGrid();
        }

        vm.fnSubCategory = function(){
            $http({
                method: 'GET',
                params: {mode:2},
                url: 'api/v1/info.php'
            }).then(function successCallback(response) {
                    console.log(response.data);
                    vm.originalData = angular.copy(response.data);
                    var $example = $(".sel_metier").select2();

                    angular.forEach(vm.myData, function(value){
                        if(value.libelle == $example.val()){
                            vm.selectedObj = value;
                        }
                    });
                    vm.fnFilterGrid();


                }, function errorCallback(error) {
                    console.log(error);
                });
        };

        vm.fnCrudMetier = function(opt){
            console.log(opt, vm.selectedObj);
            if(opt == 0) {
                vm.libelle = "";
                vm.sous_libelle = "";
                vm.active = false;
                vm.nouveauMetier = true;
                $('#modalMetier').modal();
            }
            else if(opt == 1){
                vm.libelle = vm.selectedObj.libelle;
                vm.sous_libelle = vm.selectedObj.sub_libelle;
                vm.nouveauMetier = false;
                if(vm.selectedObj.active == 1){
                    vm.active = true;
                }
                else{
                    vm.active = false;
                }
                $('#modalMetier').modal();
                //vm.libMetier = vm.selectedObj.libelle + " - " + vm.selectedObj.sub_libelle;
            }
            else if(opt == 2){
                vm.nouveauMetier = false;
                tags: true
                vm.currentImg = "assets/img/contenants.png";
                $('#modalModel').modal();
            }
        }

        vm.fnFilterGrid = function() {
            var arrData = angular.copy(vm.originalData);
            console.log(vm.selectedObj);
            var arrFiltered = [];
            angular.forEach(arrData, function(value) {
                if(value.category == vm.selectedObj.id){
                    arrFiltered.push(value);
                }
            });
            console.log(arrFiltered, "  filttered data");
            //vm.gridOptions.data = response.data;
        }

        vm.fnQuitter = function(){
            $('#imgModal').modal('hide');
            $('#modalMetier').modal('hide');
            $('#modalModel').modal('hide');
        }

        vm.fnValid = function() {
            var flagMode = -1;
            var flagactive = 0;
            var id  = 0;
            console.log(vm.actif);
            if(vm.active){
                flagactive = 1;
            }
            if(vm.libelle.length == 0){
                bootbox.alert("<h4>Le champs libelle ne peut pas etre vide!!!</h4>");
            }
            if(vm.nouveauMetier){
                flagMode = 4;//Sauvegarde nouveau metier
            }
            else{
                flagMode = 5;//Sauvegarde nouveau metier
                id = vm.selectedObj.id;
            }

            $http({
                method: 'GET',
                params: {mode:flagMode, id:id, libelle:vm.libelle, sub_libelle:vm.sous_libelle, actif:flagactive},
                url: 'api/v1/info.php'
            }).then(function successCallback(response) {
                    console.log(response.data);

                }, function errorCallback(error) {
                    console.log(error);
                });
            console.log(vm.selectedObj, "  selected object");

        };

        vm.fnModelMetier();

    });