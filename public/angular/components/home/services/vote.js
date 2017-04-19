(function() {
  'use strict';

  angular.module('vote').service('Vote', ['$http', function($http) {
    var Vote = {};

    Vote.manifest = function(gender) {
      return $http.post('/api/votes', { gender: gender });
    };

    Vote.list = function() {
      return $http.get('/api/votes');
    };

    return Vote;
  }]);
})();