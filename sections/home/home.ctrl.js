angular
    .module('myApp')
    .controller('HomeController', function($scope, $location, $http, Data, messages) {
        //Setup view model object
        console.log('HOME CONTROLLER');
        var vm = this;
        vm.btnMetier = [];
        vm.sampleMetier = [];
        vm.globalVal = '';
        Data.get('session').then(function (results) {
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
                    console.log(response.data);
                    vm.metier = response.data;
                }, function errorCallback(error) {
                    console.log(error);
                });
        }

        vm.fnModelClick  = function($id, $id_metier) {
           console.log($id);
            $('#myModel').modal('hide');
            messages.add($id, $id_metier);
            $location.path('fichetech');
        };

        vm.fnSignUp = function(){
            $('#myModal').modal('hide');
            $('#signup').modal();
        };
        vm.fnRecupMetier();
        vm.fnModelMetierAll();
    });
