/**
 * Created by abdulbasit on 9/29/2015.
 */
angular.module('app')
    .controller('countryController', ['$rootScope', '$scope', '$location',  'userService','countryService','$localStorage',
        function ($rootScope, $scope, $location,userService,countryService,$localStorage) {
            $scope.countries=[];
            $scope.country = {};
            $scope.init = function(){

                countryService.get().success(function(users){
                    $scope.countries = users.data;
                    //console.log(users.data.data);
                });
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


            $scope.editAssign = function(country){
                country.edit = true;
                obj = {};
                $scope.country = angular.extend(obj,country);
            }
            $scope.init();
        }])/**
 * Created by abdulbasit on 9/30/2015.
 */
