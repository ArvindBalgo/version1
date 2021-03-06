var app = angular.module('adminApp', ['ngRoute', 'ngAnimate', 'toaster','angularFileUpload', 'ui.grid','ui.grid.edit', 'ui.grid.selection', 'ngSanitize']);

app.config(['$routeProvider',
  function ($routeProvider) {
      console.log($routeProvider);
        $routeProvider.
        when('/login', {
            title: 'Login',
            templateUrl: 'sections/login/login.tpl.html',
            controller: 'loginController as login'
        })
        .when('/home', {
            title: 'Admin Dashboard',
            templateUrl: 'sections/admin/home/home.tpl.html',
            controller: 'homeController as home'
        })
        .when('/param', {
            title: 'Parametrage',
            templateUrl: 'sections/admin/param/param.tpl.html',
            controller: 'paramController as param'
        })
        .when('/maquette', {
            title: 'Maquette',
            templateUrl: 'sections/admin/maquette/maquette.tpl.html',
            controller: 'maquetteController as maquette'
        })
        .when('/commande', {
            title: 'Commande',
            templateUrl: 'sections/admin/commande/commande.tpl.html',
            controller: 'commandeController as comm'
        })
        .when('/client', {
            title: 'Clients',
            templateUrl: 'sections/admin/client/client.tpl.html',
            controller: 'clientController as client'
        })
        .when('/sample', {
            title:      'Sample Gabarits',
            templateUrl:'sections/admin/sample/sample.tpl.html',
            controller: 'sampleController as sample'
        })
        .when('/samplemodel', {
            title:      'Sample Modele',
            templateUrl:'sections/admin/samplemodel/sample.tpl.html',
            controller: 'sampleModelController as sample'
        })
        .when('/revendeurs', {
            title: 'Revendeur',
            templateUrl: 'sections/admin/revendeur/revendeur.tpl.html',
            controller: 'revendeurController as revendeur'
        })
        .when('/compte', {
                title:      'Compte',
                templateUrl:'sections/admin/compte/compte.tpl.html',
                controller: 'CompteController as compte'
            })
        .when('/model', {
            title:      'Model',
            templateUrl:'sections/admin/model/model.tpl.html',
            controller: 'modelController as model'
        })
            .when('/imgProduits', {
            title:      'Produits',
            templateUrl:'sections/admin/produits/produits.tpl.html',
            controller: 'produitsController as produits'
        })
        .when('/metier', {
                title:      'Metier',
                templateUrl:'sections/admin/metier/metier.tpl.html',
                controller: 'metierController as metier'
            })
        .when('/gallery', {
                title:      'Gallery',
                templateUrl:'sections/admin/gallery/gallery.tpl.html',
                controller: 'galleryController as gallery'
            })
        .when('/instructions', {
            title:      'Instructions',
            templateUrl:'sections/admin/instructions/instructions.tpl.html',
            controller: 'instructionsController as instructions'
        })
        .when('/tarif', {
            title:      'Tarif',
            templateUrl:'sections/admin/tarif/tarif.tpl.html',
            controller: 'tarifController as tarif'
        })
        .when('/support', {
            title:      'Type de Support',
            templateUrl:'sections/admin/type_support/type_support.tpl.html',
            controller: 'typeSupportController as support'
        })
        .when('/apropos', {
            title:      'Qui sommes nous?',
            templateUrl:'sections/admin/apropos/apropos.tpl.html',
            controller: 'aproposController as apropos'
        })
        .when('/conditionvente', {
            title:      'Condition de vente',
            templateUrl:'sections/admin/conditionvente/conditionvente.tpl.html',
            controller: 'conditionventeController as conditionvente'
        })
        .when('/utilisation', {
            title:      "Mentions d'utilisation",
            templateUrl:'sections/admin/utilisation/utilisation.tpl.html',
            controller: 'utilisationController as utilisation'
        })
        .when('/legale', {
            title:      'Mentions légales',
            templateUrl:'sections/admin/legale/legale.tpl.html',
            controller: 'legaleController as legale'
        })
        .when('/langue', {
            title:      'Language',
            templateUrl:'sections/admin/langue/langue.tpl.html',
            controller: 'langueController as langue'
        })
        .when('/', {
            title: 'Login',
            templateUrl: 'sections/login/login.tpl.html',
            controller: 'loginController as login'
        })
        .otherwise({
            redirectTo: '/login'
        });
  }])
    .run(function ($rootScope, $location, Data) {
        console.log('error checkgin');
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            $rootScope.authenticated = false;
            Data.get('session.php').then(function (results) {
               console.log("SESSION CHECKED: ", results);
            });
        });
    });
