
/**
 * Created by abdulbasit on 9/29/2015.
 */
angular.module('app')
    .factory('userService', ['$http',
        function ($http) {
            var users;
            return {

                    get : function() {
                        return $http.get('users');
                    },
                    getById : function(id) {
                        console.log("here");
                        return $http.get('users/'+id);
                    },
                    create : function(user) {
                        return $http.post('/users', user);
                    },
                    delete : function(id) {
                        return $http.delete('/api/todos/' + id);
                    },
                    login : function(user){
                        return $http.post("/auth/authenticate",user);
                    }

            }
        }])

    .factory('countryService', ['$http',
        function ($http) {
            var users;
            return {

                get : function() {
                    return $http.get('country');
                },
                getById : function(id) {
                return $http.get('country/'+id);
                 },
                create : function(user) {
                    return $http.post('/country', user);
                },
                update : function(id,country) {
                    return $http.put('/country/'+id, country);
                },
                delete : function(id) {
                    //console.log(id);
                    return $http.delete('country/'+id);
                }
            }
        }])

    .factory('authService', ['$http','$location','$localStorage',
        function ($http,$location,$localStorage) {

            return {
                currentUser:null,
                authenticate : function(callb){
                   // console.log("----location change here-----")
                if(!$localStorage.token){
                    callb(false);
                }else if($localStorage.token && !this.currentUser) {
                    this.getUserByToken(function (data) {
                        callb(true);
                    });
                }
                else{
                  //  $location.path("home");
                   // console.log("----location change here-----")
                }
               },
                getUserByToken : function(callb){
                    $http.get("auth/get").success(function(data){
                       // console.log(data);
                        callb(data);

                    })
                }

                }


        }])