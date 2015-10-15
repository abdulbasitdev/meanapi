/**
 * Created by abdulbasit on 9/29/2015.
 */
angular.module('app', [

    'ngRoute',
    'ngStorage'

])
    .constant('urls', {
        BASE: 'http://jwt.dev:8000',
        BASE_API: 'http://api.jwt.dev:8000/v1'
    })
    .run(function(authService,$rootScope,$location){
        $rootScope.isLoggedIn = false;
        $rootScope.currentUser = {};
       $rootScope.$on("$routeChangeStart",function(event,next,current){
          //  console.log(next.$$route.permission);
            console.log($location.path());

           authService.authenticate(function(data){
               authService.checkPermission(next.$$route.permission,next.$$route.reqAuthenticate);
               $rootScope.currentUser = data.data;
               console.log(data);
               $rootScope.isLoggedIn = true;
               // console.log(data);
             /*  if(data &&  $location.path()!=="/")
               {
                  // console.log("home");

                  $location.path("/");

               }
               else if(data){
                   $rootScope.isLoggedIn = true;
               }*/

           })
       })
    })
    .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
        $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                   // $localStorage.token = "abcd";
                    if ($localStorage.token) {
                      //  config.headers.Authorization = 'Bearer ' + $localStorage.token;
                        config.headers['x-access-token'] =$localStorage.token;
                        config.headers['userid'] =$localStorage.userid;


                    }

                    return config;
                },
                'responseError': function (response) {
                    if (response.status === 401 || response.status === 403) {
                       $location.path('/signin');
                    }
                    return $q.reject(response);
                }
            };
        }]);
        $routeProvider.
            when('/', {
                name : 'home',
                reqAuthenticate :true,
                permission:['admin'],
                templateUrl: 'partials/home.html',
                controller: 'countryController'
            }).
            when('/admin', {
                reqAuthenticate :true,
                permission:['admin','user'],
                templateUrl: 'partials/admin.html',
                controller: 'countryController'
            }).
            when('/signin', {
                name:'signin',
                reqAuthenticate :false,
                permission:['user','admin'],
                templateUrl: 'partials/signin.html',
                controller: 'userController'
            }).
            when('/signup', {
                reqAuthenticate :true,
                templateUrl: 'partials/signup.html',
                permission:['user','admin'],
                controller: 'userController'
            }).
            when('/restricted', {
                reqAuthenticate :false,
                templateUrl: 'partials/restricted.html',
                controller: 'RestrictedController'
            })
            . when('/403', {
                reqAuthenticate :false,
                permission:['user','admin'],
                templateUrl: 'partials/403.html',

            }).
            otherwise({
                redirectTo: '/'
            });
    }]);
