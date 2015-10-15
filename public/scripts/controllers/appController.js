/**
 * Created by abdulbasit on 9/29/2015.
 */
angular.module('app')
    .controller('appController', ['$rootScope', '$scope', '$location',  'userService','countryService','$localStorage',
        function ($rootScope, $scope, $location,userService,countryService,$localStorage) {
           // console.log($rootScope.isLoggedIn)
            $scope.logout = function(){

                delete $localStorage.token ;
                $localStorage.$reset();
                $location.path("/signin");
            }
        }])
