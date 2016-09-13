angular
    .module('adminApp')
    .controller('galleryController', function($scope, $rootScope, $routeParams, $location, $http, Data, $timeout, FileUploader) {
        $scope.header = "Gallery des images";

        var vm          = this;
        vm.mode         = "";
        vm.active       =  false;
        vm.isRowModif   =  false;
        vm.isImgModif   =  false;
        vm.optCategory  = 0;
        vm.objCategory  = {};
        vm.objSel       = {};
        vm.arrCategory  = [];
        vm.arrOrigImg   = [];


        //uploader start

        var uploader = $scope.uploader = new FileUploader({
            url: 'api/galleryupload.php'
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

            var act = 0;
            if(vm.active) {
                act = 1;
            }
            item.formData = [{id:0,libelle:vm.libelle, reference:vm.reference, active:act, id_category:vm.objSel.id, category_name:vm.objSel.libelle}];
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
            $('#modalImage').modal('hide');


        };
        //uploader end
        $scope.editImage  = function (grid, row, opt){
            vm.isModified = true;
           // console.log("+++++");
           // console.log(row, opt);
           // console.log(opt, "option");
            if(opt == 2) {
                vm.isRowModif   =  true;
                vm.imgsrc = row.src;
                $("#modalImage").modal();
            }
            else if(opt == 3) {
                console.log(opt, "option");
                vm.imgsrc = row.src;
                $("#modalSrcImg").modal();
            }

        };

        vm.formatCell = function(){
            var trash = "<button type='button' class='btn btn-default btn-circle'   style='margin-left: 5px;margin-top: 5px;' ng-click='grid.appScope.editImage(grid, row.entity, 1)'><i class='glyphicon glyphicon-trash'></i></button>";
            var edit  = "<button type='button' class='btn btn-info btn-circle'      style='margin-left: 5px;margin-top: 5px;' ng-click='grid.appScope.editImage(grid, row.entity, 2)'><i class='glyphicon glyphicon-pencil'></i></button>";
            var image = "<button type='button' class='btn btn-success btn-circle'   style='margin-left: 5px;margin-top: 5px;' ng-click='grid.appScope.editImage(grid, row.entity, 3)'><i class='glyphicon glyphicon-picture'></i></button>";
            return image+edit+trash;
        }

        vm.columns = [  { name:'Libelle',field: 'libelle',enableHiding:false},
                        { name:'Reference', field: 'reference',enableFiltering:false,enableHiding:false},
                        { name:'', field: 'active',enableFiltering:false,cellTemplate: vm.formatCell() ,enableHiding:false}

        ];

        $scope.gridOptions = {
            enableSorting: true,
            enableFiltering: true,
            columnDefs: vm.columns,
            rowHeight:50
        };

        vm.fnGetAllCategory = function(){
            //Get all categories
            $http({
                method: 'GET',
                params: {mode:0},
                url: 'api/v1/imageInfo.php'
            }).then(function successCallback(response) {
                    console.log(response.data);
                    angular.forEach(response.data, function(value){
                        value.text = value.libelle;
                    });
                    vm.arrCategory = angular.copy(response.data);
                    $("#selCategory").empty();
                    $( "#selCategory" ).append( "<select class='sel_category' style='width: 100%;'></select>" );
                    $(".sel_category").select2({
                        theme:"classic",
                        data: response.data
                    });
                    $(".sel_category").on("select2:select", function (e) {
                        vm.fnFilterGrid();
                    });
                    vm.fnGetAllImages();
                }, function errorCallback(error) {
                    console.log(error);
                });
        }

        vm.fnGetAllImages  = function(){
            $http({
                method: 'GET',
                params: {mode:3},
                url: 'api/v1/imageInfo.php'
            }).then(function successCallback(response) {
                    console.log(response.data);
                    vm.arrOrigImg = angular.copy(response.data);
                    vm.fnFilterGrid();

                }, function errorCallback(error) {
                    console.log(error);
                });
        }

        vm.fnCrudCategory = function(opt){
            console.log("clicked button");
            vm.optCategory = opt;
            if(opt ==0){
                vm.mode = "Nouvelle";
                vm.libelle = "";
                vm.active = false;
                $('#modalCategory').modal();
            }
            else if(opt == 1){
                console.log($(".sel_category").select2().val(), "  @@@" , vm.arrCategory);
                angular.forEach(vm.arrCategory, function(value){
                    if(value.id == $(".sel_category").select2().val()){
                        vm.objCategory = value;
                        vm.libelle = value.libelle;
                        if(value.active == 0){
                            vm.active = false;
                        }
                        else{
                            vm.active = true;
                        }
                    }
                })
                vm.mode = "Modification";
                $('#modalCategory').modal();
            }
            else if(opt == 2){
                angular.forEach(vm.arrCategory, function(value){
                    if(value.id == $(".sel_category").select2().val()){
                        vm.objSel = value;
                    }
                });
                vm.isRowModif   =  false;
                vm.isImgModif   =  false;
                $('#modalImage').modal();
            }
        };

        vm.fnQuitter = function(){
            $('#modalCategory').modal('hide');
            $('#modalImage').modal('hide');
            $('#modalSrcImg').modal('hide');
        }

        vm.fnModifImg = function(){
            vm.isRowModif   =  true;
            vm.isImgModif   =  true;
        }

        //valider category
        vm.fnValider = function(){
            console.log("valider");
            var flag = 0;
            if(vm.libelle.length == 0){
                bootbox.alert("<h4>Le champs libelle ne peut pas etre vide!!!</h4>");
                return;
            }
            var mode = 1;
            if(vm.optCategory == 1){
                mode = 2;
            }
            if(vm.active == true) {
                flag = 1;
            }
            $http({
                method: 'GET',
                params: {mode:mode, libelle:vm.libelle, id:vm.objCategory.id, active:flag},
                url: 'api/v1/imageInfo.php'
            }).then(function successCallback(response) {
                    console.log(response.data);
                    vm.fnGetAllCategory();
                    $('#modalCategory').modal('hide');
                }, function errorCallback(error) {
                    console.log(error);
                });
        }

        vm.fnFilterGrid = function() {
            angular.forEach(vm.arrCategory, function(value){
                if(value.id == $(".sel_category").select2().val()){
                    vm.objSel = value;
                }

            });
            console.log(vm.objSel, " selected object");
            console.log(vm.arrOrigImg, "  array of images");
            var arrData = angular.copy(vm.arrOrigImg);
            var arrFiltered =  [];
            angular.forEach(arrData, function(value){
                if(value.id_category == $(".sel_category").select2().val()) {
                    arrFiltered.push(value);
                }
            });

            $scope.gridOptions.data = [];
            $timeout(function(){
                $scope.gridOptions.data = arrFiltered
            }, 0);
        }

        $( document ).ready(function() {
            vm.fnGetAllCategory();

        });

    });