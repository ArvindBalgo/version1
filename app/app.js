var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'toaster','angularFileUpload']);

app.config(['$routeProvider',
  function ($routeProvider) {
      console.log("rouet here");
        $routeProvider.
        when('/home', {
            title: 'Home',
            templateUrl: 'sections/home/home.tpl.html',
            controller: 'HomeController as home'
        })
        .when('/fichetech', {
            title: 'Fiche Technique',
            templateUrl: 'sections/fiche/fiche.tpl.html',
            controller: 'ficheController as fiche'
        })
            .when('/logout', {
                title: 'Logout',
                templateUrl: 'partials/login.html',
                controller: 'logoutCtrl'
            })
            .when('/signup', {
                title: 'Signup',
                templateUrl: 'partials/signup.html',
                controller: 'authCtrl'
            })
            .when('/dashboard', {
                title: 'Dashboard',
                templateUrl: 'partials/dashboard.html',
                controller: 'authCtrl'
            })
            .when('/', {
                title: 'Home',
                templateUrl: 'sections/home/home.tpl.html',
                controller: 'HomeController as home'
            })
            .when('/admin', {
                title:'admin',
                templateUrl:'sections/admin/admin.tpl.html',
                controller:'adminController as admin'
            })
            .otherwise({
                redirectTo: '/home'
            });
  }])
    .run(function ($rootScope, $location, Data) {
        console.log('error checkgin');
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            console.log('edafefe');
            $rootScope.authenticated = false;
            Data.get('session.php').then(function (results) {
                if (results.uid) {
                    $rootScope.authenticated = true;
                    $rootScope.uid = results.uid;
                    $rootScope.name = results.name;
                    $rootScope.email = results.email;
                    $rootScope.type = results.admin;
                } else {
                    /*var nextUrl = next.$$route.originalPath;
                    if (nextUrl == '/signup' || nextUrl == '/login') {

                    } else {
                        $location.path("/home");
                    }*/
                }
                //$location();
            });
        });
    });