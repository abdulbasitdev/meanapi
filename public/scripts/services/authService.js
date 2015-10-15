/**
 * Created by abdulbasit on 9/30/2015.
 */
angular.module('app')
.factory('authService', ['$http','$location','$localStorage','$rootScope',
    function ($http,$location,$localStorage,$rootScope) {

        return {
            currentUser:null,
            authenticate : function(callb){
                // console.log("----location change here-----")
                if(!$localStorage.token){
                    callb(false);
                }else if($localStorage.token && !this.currentUser) {
                    this.getUserByToken(function (data) {
                        callb(data);
                    });
                }
                else{
                    //  $location.path("home");
                    // console.log("----location change here-----")
                }
            },
            getUserByToken : function(callb){
                $http.get("auth/get").success(function(data){
                    $rootScope.currentUser = data.data;
                   callb(data);

                })
            },
            checkPermission : function(roles,reqLogin){
                console.log(roles.indexOf($rootScope.currentUser.userType))
                notvalid = !$localStorage.token && !$localStorage.userid;
                if(notvalid)
                {
                    console.log("--------not valid---------")
                   // $location.path('/signin');
                    return;
                }
                else if(!notvalid && $location.path()!='/' && reqLogin==false && roles.indexOf($rootScope.currentUser.userType)!=-1){
                    console.log("--------valid, not home, correct role---------")
                    $location.path("/");
                    return;
                }
                else if(!notvalid && roles.indexOf($rootScope.currentUser.userType)==-1 && $location.path()!="/403"){
                    console.log("--------valid, not 403, not correct role---------")
                  // $location.path("/403");
                    return;
                }

            }

        }



    }])