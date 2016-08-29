angular
    .module('adminApp')
    .controller('modelController', function($scope, $rootScope, $routeParams, $location, $http, Data, $timeout, FileUploader) {
    console.log("MODEL CONTROLLER");
        var vm = this;
        $scope.header = "Construction des modeles";
        vm.libelle = '';
        vm.description = '';
        vm.reference = '';


        Data.get('session').then(function (results) {
            if (results.uid) {

            } else {
                $location.path("/login");
            }

            //$location();
        });

        vm.imgList = [
            {id:1,title:"Cheque cadeau",src:"assets/img/cheque_cadeau.png"},
            {id:2,title:"Carte Message",src:"assets/img/carte_message.png"},
            {id:3,title:"Carte",src:"assets/img/CARTE.png"},
            {id:4,title:"emballage",src:"assets/img/emballage.png"},
            {id:5,title:"contenants",src:"assets/img/contenants.png"},
            {id:6,title:"Envelope",src:"assets/img/enveloppe.png"},
            {id:7,title:"Etiquette Adhesive",src:"assets/img/etiquette_adhesive.png"},
            {id:8,title:"Flyer",src:"assets/img/flyer.png"},
            {id:9,title:"Lettre",src:"assets/img/lettre.png"},
            {id:10,title:"Pochette Couvert",src:"assets/img/pochette_couvert.png"}
        ];

        vm.productList = [
            {id:1, title:'Etiquette', thumbnail_src:'images/etiquetteprix/maquette_complet1.png', img_src : [
                {id:1 , src:'images/etiquetteprix/etiquette_prix1.png'}
            ]}
        ];

        vm.imgList = [];
        vm.productList = [];

        vm.fnModelMetier = function() {
            $http({
                method: 'GET',
                params: {mode:2},
                url: 'api/v1/info.php'
            }).then(function successCallback(response) {
                    console.log(response.data);
                    vm.arrData = response.data;
                }, function errorCallback(error) {
                    console.log(error);
                });
        };

        vm.fnModelMetier();

        vm.productsDesign = [
            {id:1, title:'SWIRL', imgsrc:[
                {id:1, src:'images/designs/swirl.png', title:'Swirl'},
                {id:2, src:'images/designs/swirl2.png', title:'Swirl 2'},
                {id:3, src:'images/designs/swirl3.png', title:'Swirl 3'},
                {id:4, src:'images/designs/heart_blur.png', title:'Heart Blur'},
                {id:5, src:'images/designs/converse.png', title:'Converse'},
                {id:6, src:'images/designs/crown.png', title:'Crown'},
                {id:7, src:'images/designs/men_women.png', title:'Men hits Women'}
            ]},
            {id:2, title:'Retro', imgsrc:[
                {id:1, src:'images/designs/retro_1.png', title:'Retro One'},
                {id:2, src:'images/designs/retro_2.png', title:'Retro Two'},
                {id:3, src:'images/designs/retro_3.png', title:'Retro Three'},
                {id:4, src:'images/designs/heart_circle.png', title:'Heart Circle'},
                {id:5, src:'images/designs/swirl.png', title:'Swirl'},
                {id:6, src:'images/designs/swirl2.png', title:'Swirl 2'},
                {id:7, src:'images/designs/swirl3.png', title:'Swirl 3'}
            ]},
            {id:3, title:'Carte', imgsrc:[
                {id:1, src:'images/businesscard/adresse.png', title:'Adresse'},
                {id:2, src:'images/businesscard/down.png', title:'Down'},
                {id:3, src:'images/businesscard/upper.png', title:'Up'},
                {id:4, src:'images/businesscard/logo.png', title:'Logo'}
            ]},
            {id:3, title:'Retro', imgsrc:[
                {id:1, src:'images/carte/1.png', title:'IMG1'},
                {id:1, src:'images/carte/2.png', title:'IMG2'},
                {id:1, src:'images/carte/3.png', title:'IMG3'},
                {id:1, src:'images/carte/4.png', title:'IMG4'},
                {id:1, src:'images/carte/5.png', title:'IMG5'},
            ]},
        ];

        vm.fnMaquette = function() {
            $http({
                method: 'GET',
                params: {mode:1, type:0},
                url: 'api/v1/sampleControl.php'
            }).then(function successCallback(response) {
                    console.log(response.data);
                    vm.productList = response.data;
                    console.log(vm.productList);
                    $timeout(function() {
                        $("#imgScroll").endlessScroll({ width: '100%',height: '250px', steps: -2, speed: 40, mousestop: true });

                        var $yourDesigner = $('#model'),
                            pluginOpts = {
                                stageWidth: 1200,
                                editorMode: true,
                                fonts: ['Arial', 'Fearless', 'Helvetica', 'Times New Roman', 'Verdana', 'Geneva', 'Gorditas','Amerika Sans'],
                                customTextParameters: {
                                    colors: true,
                                    removable: true,
                                    resizable: true,
                                    draggable: true,
                                    rotatable: true,
                                    autoCenter: true,
                                    boundingBox: "Base",
                                    curvable:true,
                                    curveReverse:true
                                },
                                customImageParameters: {
                                    draggable: true,
                                    removable: true,
                                    resizable: true,
                                    rotatable: true,
                                    colors: '#000',
                                    autoCenter: true,
                                    boundingBox: "Base"
                                },
                                customAdds:{
                                    uploads:true
                                },
                                customImageAjaxSettings:{
                                    data:{
                                        saveOnServer:1,
                                        uploadsDir:'../test',
                                        uploadsDirURL:"./test"
                                    },
                                    url:'api/imageUpload.php'
                                },
                                imageParameters : {
                                    availableFilters: ['grayscale', 'sepia', 'sepia2'],
                                    filter:true
                                },
                                actions:  {
                                    'top': ['download','print', 'snap', 'preview-lightbox'],
                                    'right': ['magnify-glass', 'zoom', 'reset-product', 'qr-code', 'ruler'],
                                    'bottom': ['undo','redo'],
                                    'left': ['manage-layers','info','save','load']
                                }
                            },
                            yourDesigner = new FancyProductDesigner($yourDesigner, pluginOpts);

                        console.log(vm.productList);
                        angular.forEach(vm.productList, function(value){
                            var arrProducts = [];
                            var arrFront = [];
                            var arrBack = [];
                            angular.forEach(value.elemfront.params, function(value1){
                                console.log(value1.parameters.fill);
                                var flag = false;
                                if(value1.parameters.fill != "false"){
                                    flag = value1.parameters.fill;
                                }
                                arrFront.push({source:value1.source, title:value1.title, type:value1.type,parameters:{"left":value1.parameters.left, "top":value1.parameters.top, "fill":flag}})
                            })
                            angular.forEach(value.elemback.params, function(value1){
                                var flag = false;
                                if(value1.parameters.fill != "false"){
                                    console.log("FILLLING:: ", value1.parameters.fill);
                                    flag = value1.parameters.fill;
                                }
                                console.log(value1.parameters.fill);
                                arrBack.push({source:value1.source, title:value1.title, type:value1.type,parameters:{"left":value1.parameters.left, "top":value1.parameters.top, "fill":flag}})
                            })
                            arrProducts.push({title:value.title, thumbnail:value.thumbnail_src, elements:arrFront});
                            arrProducts.push({title:value.title, thumbnail:value.thumbnail_src, elements:arrBack});
                            yourDesigner.addProduct(arrProducts);
                            console.log(arrProducts, "  £££");

                        });
                        //print button
                        $('#print-button').click(function(){
                            yourDesigner.print();
                            return false;
                        });

                        //create an image
                        $('#image-button').click(function(){
                            var image = yourDesigner.createImage();
                            console.log(image);
                            return false;
                        });



                        //checkout button with getProduct()
                        $('#checkout-button').click(function(){
                            var product = yourDesigner.getProduct();
                            console.log(product);
                            return;
                            $http({
                                method: 'GET',
                                params: {mode:2, data:product},
                                url: 'api/v1/sampleControl.php'
                            }).then(function successCallback(response) {
                                    console.log(response.data, "  ::data");
                                }, function errorCallback(error) {
                                    console.log(error);
                                });
                            return false;
                        });

                        //event handler when the price is changing
                        $yourDesigner.on('priceChange', function(evt, price, currentPrice) {
                            $('#thsirt-price').text(currentPrice);
                        });

                        $yourDesigner.on('ready', function(evt, price, currentPrice) {

                        });

                        //save image on webserver
                        $('#save-image-php').click(function() {

                            yourDesigner.getProductDataURL(function(dataURL) {
                                $.post( "php/save_image.php", { base64_image: dataURL} );
                            });

                        });

                        //send image via mail
                        $('#send-image-mail-php').click(function() {

                            yourDesigner.getProductDataURL(function(dataURL) {
                                $.post( "php/send_image_via_mail.php", { base64_image: dataURL} );
                            });

                        });
                        vm.fnNouveau = function() {
                            console.log("NOUVEAU");
                            $http({
                                method: 'GET',
                                params: {mode:1, type:0},
                                url: 'api/v1/sampleControl.php'
                            }).then(function successCallback(response) {
                                    console.log(response);
                                }, function errorCallback(error) {
                                    console.log(error);
                                });
                        };

                        vm.fnOpenModal = function(){
                            $scope.product = yourDesigner.getProduct();
                            console.log($scope.product);
                            $('#myModel').modal();
                        }

                        vm.fnQuitter  = function(){
                            console.log("annuler");
                            $('#myModel').modal('hide');
                        };

                        vm.fnValider = function(){

                            yourDesigner.getProductDataURL(function(dataURL) {
                                console.log("LIBELLE:: ", vm.libelle);
                                console.log("DEscription:: ", vm.description);
                                console.log("Reference:: ", vm.reference);
                                console.log("selected: ", $(".selObj").select2().val());
                                console.log("valider", yourDesigner.getProduct());

                                if(vm.libelle == '' || vm.description=='' || $(".selObj").select2().val() == '' || $(".selObj").select2().val() == null){
                                    bootbox.alert("Toutes les informations sont obligatoire");
                                    return;
                                }

                                $.post( "api/save_image.php", { base64_image: dataURL, ref:vm.reference, libelle:vm.libelle, description:vm.description, metiers:$(".selObj").select2().val(), data:yourDesigner.getProduct()});

                            });
                            $('#myModel').modal('hide');

                        }

                        vm.fnSauvegarde = function() {
                            var product = yourDesigner.getProduct();
                            console.log("SAUVEGARDE");
                            $http({
                                method: 'GET',
                                params: {mode:2, data:product},
                                url: 'api/v1/sampleControl.php'
                            }).then(function successCallback(response) {
                                    console.log(response.data, "  ::data");
                                }, function errorCallback(error) {
                                    console.log(error);
                                });
                            console.log(product);
                            console.log("*******************");
                        }

                        vm.fnImage = function() {
                            yourDesigner.getProductDataURL(function(dataURL) {
                                $.post( "api/save_image.php", { base64_image: dataURL} ).success(function(data) {
                                    // console.log(data);
                                    console.log("TESTING ISSUE ");
                                })
                            });
                        }

                    }, 0);

                }, function errorCallback(error) {
                    console.log(error);
                });
        };

        vm.fnMaquette();



        vm.fnModifier = function() {
            console.log("modifier");
        }

        vm.fnSuppression = function() {
            console.log("SUPPRESSION");
        }




        $(document).ready(function() {
            $(".selObj").select2(
                {allowClear: true,
                    closeOnSelect:false}
            );
            var $eventSelect = $(".selObj");
        });
    });
