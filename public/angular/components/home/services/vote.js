(function() {
  'use strict';

  angular.module('vote').service('Vote', ['$http',
    function($http) {
      var Vote = {};

      /**
       * Sends an http POST request the votes API endpoint with the
       * specified msg format.
       *
       * @param gender
       * @returns {HttpPromise}
       */
      Vote.manifest = function(gender) {
        return $http.post('/api/votes', { gender: gender });
      };

      /**
       * Retrieves a list of all the previously casted votes
       *
       * @returns {HttpPromise}
       */
      Vote.list = function() {
        return $http.get('/api/votes');
      };

      return Vote;
    }
  ]);
})();