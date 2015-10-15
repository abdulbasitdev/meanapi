/**
 * Created by abdulbasit on 9/30/2015.
 */

angular.module('app')
    .controller('userController', ['$rootScope', '$scope', '$location',  'userService','countryService','$localStorage',
        function ($rootScope, $scope, $location,userService,countryService,$localStorage) {
            $scope.countries=[];
            $scope.country = {};
            $scope.init = function(){
                console.log("here");
                userService.getById("560a689d4c3d8cc441092a61").then(function(users){
                    console.log("here");
                });

            }
            $scope.signIn = function(user){

                userService.login(user).success(function(data){
                    console.log(data);
                    if(data.success){
                        $localStorage.token = data.token;
                        $localStorage.userid = data.data._id;
                        $location.path("/");
                    }

                })

            }



            $scope.signUp = function(user){
              userService.create(user).success(function(data){
                    if(data.success){
                        $localStorage.token = data.token;
                        $localStorage.userid = data.data._id;
                        $location.path("/");
                    }

                })
            }


          //  $scope.init();
        }])