(function() {
  'use strict';

  angular.module('home').controller('homeCtrl', ['$scope', 'Vote',
    function($scope, Vote) {
      var totalVotes = 0;
      var maleVotes = 0;
      var femaleVotes = 0;
      var malePercentage = 0;
      var femalePercentage = 0;
      $scope.totalVotes = totalVotes;
      $scope.maleVotes = maleVotes;
      $scope.femaleVotes = femaleVotes;
      $scope.malePercentage = malePercentage;
      $scope.femalePercentage = femalePercentage;

      $scope.maleColorClass = '';

      /**
       * Triggered on ng-init. Request all the necessary data to render
       * the view. Segment out the data by gender after receiving the data
       * from the server. This is necessary to calculate the percentage of
       * male to female voters.
       */
      $scope.init = function() {
        Vote.list()
          .then(function(res) {
            var votes = res.data;
            totalVotes = votes.length;

            for(var i = 0; i < totalVotes; i++) {
              if(0 === votes[i].gender.localeCompare('m'))
                ++maleVotes;
              else if(0 === votes[i].gender.localeCompare('f'))
                ++femaleVotes;
            }

            if(totalVotes > 0) {
              malePercentage = Math.floor((maleVotes/totalVotes)*100);
              femalePercentage = 100 - malePercentage;
            }

            updateView();
          });
      };

      /**
       * Triggered when user clicks the vote button to cast a vote. Checks
       * that the input has not been modified. If so, prevent the function
       * from executing further. Otherwise, cast the vote by triggering
       * the manifest() function in the Vote service.
       *
       * If the vote has been successfully casted, when server response
       * code is 200. Update the appropriate scope variables and
       * recalculate percentages.
       *
       * @param gender
       */
      $scope.castVote = function(gender) {
        if(0 !== gender.localeCompare('m') && 0 !== gender.localeCompare('f')) {
          console.log('IllegalInputException');
          return;
        }

        Vote.manifest(gender)
          .then(function(res) {
            var resIsOk = 200 === res.status;

            if(!resIsOk) {
              console.log('ServerResponseException');
              return;
            }

            if(0 === gender.localeCompare('m'))
              ++maleVotes;
            else if(0 === gender.localeCompare('f'))
              ++femaleVotes;

            ++totalVotes;
            malePercentage = Math.floor((maleVotes/totalVotes)*100);
            femalePercentage = 100 - malePercentage;

            updateView();
          });
      };

      /**
       * Private helper function to update the values in the $scope
       * variable.
       */
      function updateView() {
        $scope.totalVotes = totalVotes;
        $scope.maleVotes = maleVotes;
        $scope.femaleVotes = femaleVotes;
        $scope.malePercentage = malePercentage.toFixed(0) + '%';
        $scope.femalePercentage = femalePercentage.toFixed(0) + '%';

        if(femalePercentage > malePercentage) {
          $scope.currentWinner = 'f';
          $scope.femaleColorClass = 'text-success';
          $scope.maleColorClass = 'text-danger';
        }
        else if(malePercentage > femalePercentage) {
          $scope.currentWinner = 'm';
          $scope.femaleColorClass = 'text-danger';
          $scope.maleColorClass = 'text-success';
        }
        else {
          $scope.currentWinner = '#';
          $scope.femaleColorClass = '';
          $scope.maleColorClass = '';
        }
      }
    }
  ]);
})();