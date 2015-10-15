/**
 * Created by abdulbasit on 9/30/2015.
 */
angular.module('app')
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