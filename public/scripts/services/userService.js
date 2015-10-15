/**
 * Created by abdulbasit on 9/30/2015.
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