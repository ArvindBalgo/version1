angular
    .module('myApp')
    .controller('HomeController', function($scope, $location, $http, Data, messages) {
        //Setup view model object
        console.log('HOME CONTROLLER');
       // spinnerService.show('spin');
        toastr.options.positionClass = 'toast-bottom-full-width';
        toastr.options.extendedTimeOut = 0; //1000;
        toastr.options.timeOut = 2000;
        toastr.options.fadeOut = 250;
        toastr.options.fadeIn = 250;
        toastr.success('Bienvenue sur Exakom, contactez nous si vous avez des soucis!');
        var vm = this;
        //document.getElementById("loader").style.display = "none";
        vm.btnMetier = [];
        vm.sampleMetier = [];
        vm.globalVal = '';
        vm.activeId = "";
        vm.origModels = [];
        Data.get('session.php').then(function (results) {
            $scope.sessionInfo = results;
            if(results.uid){
                $scope.isLogged = true;
                $scope.utilisateur = results.name;
            }
            $scope.sessionInfo = results;
            console.log(results, 'results from admin');

            //$location();
        });
        vm.instructions = [
            {id:1, description: "Réalisez votre maquette gratuitement et ensuite passer votre commande."},
            {id:1, description: "Choisissez votre profession et votre produit puis allez dans la fiche technique de votre produit."},
            {id:1, description: "Choisissez parmi nos modèles que vous pourrez modifier à votre convenance ou bien schématisez votre maquette. Choisissez vos caractères, vos photos et couleurs dans nos banques d’images. Une fois schématisez, votre maquette sera traitée par nos graphistes et sera mis à votre disposition gratuitement, vous pourrez la faire modifier à tout moment."},
            {id:1, description: "Vous avez vos photos, vos logos ou votre maquette télécharger le."},
            {id:1, description: "Vous avez votre maquette sur papier prenez une photo et téléchargez la."},
            {id:1, description: "Vous avez des idées mais pas le temps ou vous ne trouvez votre choix Vous avez besoin d’aide et vous voulez être rappelé par un conseil."},
            {id:1, description: "Vous avez plusieurs produits créezun modèle de base on pourra s’en servir pour la conception de tous vos produit"},
                        ];

        vm.description = "";
        vm.fnImgClick = function(data){
            console.log("CLICKED IMG: ",data.description, data.id);
            vm.description = data.description;
            vm.src = data.src
            $http({
                method: 'GET',
                params: {mode:0, id:data.id},
                url: 'api/v1/sampleControl.php'
            }).then(function successCallback(response) {
                    console.log(response);
                    vm.sampleMetier = angular.copy(response.data);
                    $('#myModel').modal();
                }, function errorCallback(error) {
                    console.log(error);
                });

            //$location.path('fichetech');
        }

        //WEBSERVICE
        vm.fnRecupMetier = function(){
            $http({
                method: 'GET',
                params: {mode:0},
                url: 'api/v1/info.php'
            }).then(function successCallback(response) {
                    console.log(response.data);
                    vm.btnMetier = response.data;
                    angular.forEach(vm.btnMetier, function(value){
                        if(value.libelle == "Tous les produits") {
                            vm.activeId = value.id;
                        }
                    })
                }, function errorCallback(error) {
                    console.log(error);
                });
        };

        /*vm.fnTest =function(){
            angular.forEach(vm.metier, function(value){
                $http({
                    method: 'POST',
                    params: {description:value.description, category:value.category, src:value.src},
                    url: 'test.php'
                }).then(function successCallback(response) {
                        console.log(response.data);
                    }, function errorCallback(error) {
                        console.log(error);
                    });
            });

        }
        vm.fnTest();*/
        vm.fnInsertMetier = function(libelle, sub_libelle) {
            $http({
                method: 'GET',
                params: {mode:1, desig:libelle, sub_desig:sub_libelle},
                url: 'api/v1/info.php'
            }).then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    console.log('insert mode');
                    console.log(response.data);
                }, function errorCallback(error) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log(error);
                });
        };

        vm.fnModelMetierAll = function(){
            $http({
                method: 'GET',
                params: {mode:2},
                url: 'api/v1/info.php'
            }).then(function successCallback(response) {
                    console.log("MODEL METIER");
                    vm.origModels = angular.copy(response.data);
                    vm.metier = response.data;
                }, function errorCallback(error) {
                    console.log(error);
                });
        }

        vm.fnModelClick  = function($id, $id_metier) {
           console.log($id);
            $('#myModel').modal('hide');

            localStorage.setItem("id_model", $id);
            localStorage.setItem("idModelMetier", $id_metier);
            localStorage.setItem("idMetier", vm.activeId);
            $location.path('fichetech');
        };

        vm.fnClickBtn = function($obj) {
            vm.activeId = $obj.id;
            var arrModels = [];
            if($obj.libelle == "Tous les produits") {
                vm.metier = angular.copy(vm.origModels);
                return;
            }
            angular.forEach(vm.origModels, function(value){
               if(value.category == $obj.id){
                   arrModels.push(value);
               }
            });
            vm.metier = angular.copy(arrModels);
        };

        vm.fnSignUp = function(){
            $('#myModal').modal('hide');
            $('#signup').modal();
        };
        vm.fnRecupMetier();
        vm.fnModelMetierAll();
    });
