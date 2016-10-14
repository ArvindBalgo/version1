angular
    .module('adminApp')
    .controller('metierController', function($scope, $rootScope, $routeParams, $location, $http, Data, $timeout, FileUploader, $compile) {

        Data.get('session.php').then(function (results) {
            if (results.uid) {

            } else {
                $location.path("/login");
            }

            //$location();
        });

        var vm = this;
        $scope.header = "Listes des metiers";
        vm.description = "";
        vm.currentImg = "";
        vm.selectedObj = {};
        vm.libMetier = "";
        vm.modelLibelle = "";
        vm.active = true;
        vm.originalData = [];
        vm.nouveauMetier = false;
        vm.isModified = true;
        vm.isImgModified = false;
        vm.selRowCategory = {};
        vm.currentSCate = {};
        vm.arrSubCategory = [];
        vm.currentSCImg = "";
        vm.scDescription = "";
        vm.currentSCategory = {};

        vm.arrValues = [
            {id:1, text:500},
            {id:2, text:1000},
            {id:3, text:1500},
            {id:4, text:2000},
            {id:5, text:3000},
            {id:6, text:5000},
            {id:7, text:10000},
            {id:8, text:11000},
            {id:9, text: 12000},
            {id:10, text: 13000},
            {id:11, text: 15000}
        ];

        $(".selObj").select2({
            tags: true,
            allowClear: true,
            data:vm.arrValues
        });

        var uploader = $scope.uploader12 = new FileUploader({
            url: 'api/categoryupload.php'
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
            name: vm.modelLibelle,
            //qte: $(".selObj").select2().val(),
            active:vm.active
        });
        uploader.onBeforeUploadItem = function(item) {
            console.log($(".selObj").select2().val(), "  javascript before upload");
            var id_model = 0;
            var img_modified = 0;
            if(typeof vm.selRowCategory.id === 'undefined' || vm.selRowCategory.id === null){
                id_model = 0
            }
            else{
                id_model = vm.selRowCategory.id;
            }
            if(vm.isImgModified){
                img_modified = 1;
            }

            item.formData = [{id:vm.selectedObj.id,name:vm.modelLibelle, qte:$(".selObj").select2().val(), active:vm.active, id_model:id_model, img_modified:img_modified}];
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
            vm.fnModelMetier();
            $("#modalModel").modal('hide');

        };

        //image upload sub category
        var uploadersc = $scope.uploader = new FileUploader({
            url: 'api/subCategoryUpload.php'
        });


        uploadersc.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });
        uploadersc.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });
        uploadersc.formData.push({
            name: vm.modelLibelle,
            //qte: $(".selObj").select2().val(),
            active:vm.active
        });
        uploadersc.onBeforeUploadItem = function(item) {
            var id_model = 0;
            var img_modified = 0;
            var isActive = 0;
            if(vm.currentSCategory.active){
                isActive = 1;
            }
            if(typeof vm.selRowCategory.id === 'undefined' || vm.selRowCategory.id === null){
                id_model = 0
            }
            else{
                id_model = vm.selRowCategory.id;
            }
            if(vm.isImgModified){
                img_modified = 1;
            }

            item.formData = [{id:vm.currentSCategory.id,description:vm.currentSCategory.description, active:vm.currentSCategory.active, message:vm.currentSCategory.message}];
        };
        uploadersc.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);

            $("#modalSCModel").modal('hide');
            $http({
                method: 'GET',
                params: {mode:7, id:vm.currentSCate.id},
                url: 'api/v1/info.php'
            }).then(function successCallback(response) {
                    console.log(response.data);
                    vm.arrSubCategory = response.data;

                }, function errorCallback(error) {
                    console.log(error);
                });
        };



        vm.fnFormatter = function(grid, row){
            console.log( row);
            return 'BLABLA';
        }

        $scope.edit  = function (grid, row, opt){
            vm.isModified = true;
            var arrQte = [];
            if(opt == 1) {
                bootbox.confirm("Confirmez-vous la suppresion de cette ligne <b>"+row.description+"</b>?", function(result) {
                    if(result){
                        console.log(row.id);
                        console.log("confirmation to delete");

                        $http({
                            method: 'GET',
                            params: {mode:0, id:row.id},
                            url: 'api/v1/metierCRUD.php'
                        }).then(function successCallback(response) {
                                console.log(response.data);
                                vm.fnModelMetier();
                            }, function errorCallback(error) {
                                console.log(error);
                            });

                    }
                })
            }
            if(opt == 2) {
                if(row.qte != ""){
                    arrQte = row.qte.split(",");
                }
                vm.isModified = false;
                vm.isImgModified = false;
                vm.modelLibelle = row.description;
                vm.selRowCategory = row;
                //vm.modalLibelle = row.description;
                if(row.active == 1){
                    vm.active = true;
                }
                else {
                    vm.active = false;
                }


                $("#modalModel").modal();

                $(".selObj").select2({
                    tags: true,
                    allowClear: true,
                    data:[]
                });

                $('.selObj').val(arrQte).trigger("change");

                vm.srcModel = row.src;
            }
            else if(opt == 3) {
                vm.currentImg = row.src;
                vm.description = row.description;
                $('#imgModal').modal();
            }
            else if(opt == 4) {
                console.log(grid, row, opt);
                $http({
                    method: 'GET',
                    params: {mode:7, id:row.id},
                    url: 'api/v1/info.php'
                }).then(function successCallback(response) {
                        console.log(response.data);
                        $scope.gridOptionsCategory.data = [];
                        $timeout(function(){
                            $scope.gridOptionsCategory.data = response.data;
                            //$scope.gridOptionsCategory.handleWindowResize();
                            vm.arrSubCategory = response.data;

                            /*var hgt = $('#modalSousCategory').height();
                            var wdt = $('#modalSousCategory').width();
                            $('#modalSousCategory').width(wdt);
                            $('#modalSousCategory').height(hgt);*/
                        }, 0);

                    }, function errorCallback(error) {
                        console.log(error);
                    });

                vm.currentSCate = row;
                $("#modalSousCategory").modal();
            }

        };
        vm.formatCell = function(){
            var trash = "<button type='button' class='btn btn-default btn-circle' style='margin-left: 5px;margin-top: 5px;' ng-click='grid.appScope.edit(grid, row.entity, 1)'><i class='glyphicon glyphicon-trash'></i></button>";
            var edit = "<button type='button' class='btn btn-info btn-circle' style='margin-left: 5px;margin-top: 5px;' ng-click='grid.appScope.edit(grid, row.entity, 2)'><i class='glyphicon glyphicon-pencil'></i></button>";
            var image = "<button type='button' class='btn btn-success btn-circle' style='margin-left: 5px;margin-top: 5px;' ng-click='grid.appScope.edit(grid, row.entity, 3)'><i class='glyphicon glyphicon-picture'></i></button>";
            var souscat = "<button type='button' class='btn btn-primary btn-circle' style='margin-left: 5px;margin-top: 5px;' ng-click='grid.appScope.edit(grid, row.entity, 4)'><i class='glyphicon glyphicon-th-list'></i></button>";
            return image+souscat+edit+trash;
        }


        vm.formatCellSubCategory = function(){
            var trash = "<button type='button' class='btn btn-default btn-circle' style='margin-left: 5px;margin-top: 5px;' ng-click='grid.appScope.editSubCategory(grid, row.entity, 1)'><i class='glyphicon glyphicon-trash'></i></button>";
            var edit = "<button type='button' class='btn btn-info btn-circle' style='margin-left: 5px;margin-top: 5px;' ng-click='grid.appScope.editSubCategory(grid, row.entity, 2)'><i class='glyphicon glyphicon-pencil'></i></button>";
            var image = "<button type='button' class='btn btn-success btn-circle' style='margin-left: 5px;margin-top: 5px;' ng-click='grid.appScope.editSubCategory(grid, row.entity, 3)'><i class='glyphicon glyphicon-picture'></i></button>";
            var souscat = "<button type='button' class='btn btn-primary btn-circle' style='margin-left: 5px;margin-top: 5px;' ng-click='grid.appScope.editSubCategory(grid, row.entity, 4)'><i class='glyphicon glyphicon-th-list'></i></button>";
            return image+souscat+edit+trash;
        }

        vm.fnEditSubCategory = function(obj , opt){
            console.log("****************************");
            console.log(obj);
            console.log("****************************");
            if(opt ==1) {
                vm.currentSCImg = obj.src;
                vm.scDescription = obj.description;
                $('#imgSCModal').modal();
            }
            else if(opt == 2) {
                vm.currentSCategory = obj;
                $("#modalSCModel").modal();
            }
            else if(opt ==3) {
                bootbox.confirm("Confirmez-vous la suppresion de cette ligne <b>"+obj.description+"</b>?", function(result) {
                    if(result){
                        console.log(obj.id);
                        console.log("confirmation to delete");

                        $http({
                            method: 'GET',
                            params: {mode:1, id:obj.id},
                            url: 'api/v1/metierCRUD.php'
                        }).then(function successCallback(response) {
                                console.log(response.data);
                              //  vm.fnModelMetier();
                                $http({
                                    method: 'GET',
                                    params: {mode:7, id:vm.currentSCate.id},
                                    url: 'api/v1/info.php'
                                }).then(function successCallback(response) {
                                        console.log(response.data);
                                        vm.arrSubCategory = response.data;

                                    }, function errorCallback(error) {
                                        console.log(error);
                                    });
                            }, function errorCallback(error) {
                                console.log(error);
                            });

                    }
                })
            }
        }

        vm.columns = [  { name:'Libelle',field: 'description',enableHiding:false ,cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) {
                return 'cssLibelle';
                        }},
                        { name:'Quantité', field: 'qte',enableFiltering:false,enableHiding:false},
                        { name:'Actif', field: 'active',enableFiltering:false,cellTemplate: vm.formatCell() ,enableHiding:false}

        ];

        vm.columnsCategory  = [ { name:'Libelle',width:'250',field: 'description',enableHiding:false ,cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) {
            return 'cssLibelle';
        }},
            { name:'Actions', field: '',enableFiltering:false,cellTemplate: vm.formatCellSubCategory() ,enableHiding:false}];

        $scope.gridOptions = {
            enableSorting: true,
            enableFiltering: true,
            columnDefs: vm.columns,
            rowHeight:50
        };

        $scope.gridOptionsCategory = {
            enableSorting   : true,
            enableFiltering : true,
            columnDefs      : vm.columnsCategory,
            rowHeight       : 50
        };

        vm.fnModelMetier = function(opt) {
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
                    });
                $('#modalMetier').modal('hide');
                $("#selMetier").empty();
                $( "#selMetier" ).append( "<select class='sel_metier' style='width: 100%;'></select>" );
                     $compile($(".sel_metier").select2({
                         theme:"classic",
                         data: arrMetier
                     }));
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
        };

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

        vm.fnCrudMetier = function(opt) {
            console.log(opt, vm.selectedObj);
            if(opt == 0) {
                vm.libelle = "";
                vm.sous_libelle = "";
                vm.active = false;
                vm.nouveauMetier = true;
                $('#modalMetier').modal();
            }
            else if(opt == 1) {
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
                vm.selRowCategory = {};
                vm.nouveauMetier = false;
                vm.isImgModified = true;
                vm.isModified = true;
                console.log("row data", vm.selRowCategory.id);

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
            $scope.gridOptions.data = [];
            $timeout(function(){
                $scope.gridOptions.data = arrFiltered
            }, 0);
        }

        vm.fnQuitter = function(){
            $('#imgModal').modal('hide');
            $('#modalMetier').modal('hide');
            $('#modalModel').modal('hide');
            $("#modalSousCategory").modal('hide');
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
                return;
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
                vm.fnModelMetier(1);
            }, function errorCallback(error) {
                console.log(error);
            });
        };

        vm.fnModifImg = function() {
            vm.isImgModified = true;
            vm.isModified    = true;
            console.log("row data", vm.selRowCategory);
        };

        vm.fnValidModel = function(){
            var flagactive = 0;
            if(vm.active){
                flagactive = 1;
            }

            $http({
                method: 'GET',
                params: {mode:6, id:vm.selRowCategory.id,name:vm.modelLibelle, qte:$(".selObj").select2().val().toString(), active:flagactive},
                url: 'api/v1/info.php'
            }).then(function successCallback(response) {
                    console.log(response.data);
                    vm.fnModelMetier();
                    $("#modalModel").modal('hide');
                }, function errorCallback(error) {
                    console.log(error);
                });
        }

        vm.fnAddNewCate = function() {
            bootbox.prompt({
                title: "Libelle",
                inputType: 'email',
                callback: function (result) {
                    console.log(result);
                    vm.saveModelCategory(result);
                }
            });
        }

        vm.saveModelCategory = function(libelle){
            $http({
                method: 'GET',
                params: {mode:8, description:libelle, id_modelmetier:vm.currentSCate.id, src:vm.currentSCate.src, qte:"", active:1},
                url: 'api/v1/info.php'
            }).then(function successCallback(response) {
                    console.log(response.data);
                    //$("#modalSousCategory").modal('hide');
                    $http({
                        method: 'GET',
                        params: {mode:7, id:vm.currentSCate.id},
                        url: 'api/v1/info.php'
                    }).then(function successCallback(response) {
                            console.log(response.data);
                            vm.arrSubCategory = response.data;

                        }, function errorCallback(error) {
                            console.log(error);
                        });

                }, function errorCallback(error) {
                    console.log(error);
                });
        }

        vm.fnModelMetier();

    });

