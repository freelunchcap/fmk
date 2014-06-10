JOURNEY_PROFILE = 'journey_profile';

fmk.directive('journeyTab', function (JourneyBot) {

  return {
    restrict: 'E',
    scope: {
      tabs: '='
    },
    templateUrl: 'fmk/view/JourneyTab.html',

    controller: function($scope) {
      $scope.exploreForBoss = function() {
        JourneyBot.exploreForBoss(function(boss) {

        }, function() {

        })
      }
    }

  }
});