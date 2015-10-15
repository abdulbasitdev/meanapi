/**
 * Created by abdulbasit on 9/29/2015.
 */
angular.module('app')
    .controller('HomeController', ['$rootScope', '$scope', '$location',  'userService','countryService','$localStorage',
        function ($rootScope, $scope, $location,userService,countryService,$localStorage) {
            $scope.countries=[];
            $scope.country = {};
          $scope.init = function(){
              console.log("here");
              userService.getById("560a689d4c3d8cc441092a61").then(function(users){
               console.log("here");
               });
              countryService.get().success(function(users){
                  $scope.countries = users.data;
                  //console.log(users.data.data);
              });
          }
            $scope.signIn = function(user){
                console.log(user);
                userService.login(user).success(function(data){
                    $localStorage.token = data.token;
                })

            }
            $scope.addCountry = function(country){
                if(!country.edit)
                countryService.create(country).success(function(data){
                    $scope.countries = data.data;
                })
                else{
                    delete country.edit;
                    countryService.update(country._id,country).success(function(data){
                        $scope.countries = data.data;
                    })
                }
                $scope.country = {};

            }
            $scope.removeCountry = function(country){
                console.log(country);
                countryService.delete(country._id).success(function(data){
                    console.log(data)
                    $scope.countries = data.data;
                })
            }

            $scope.signUp = function(user){
                console.log(user);
            }
            $scope.editAssign = function(country){
                country.edit = true;
                obj = {};
                $scope.country = angular.extend(obj,country);
            }
          $scope.init();
        }])