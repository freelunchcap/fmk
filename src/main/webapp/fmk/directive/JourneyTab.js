JOURNEY_PROFILE = 'journey_profile';

fmk.directive('journeyTab', function (JourneyBot, UserBot, ProfileService) {

  return {
    restrict: 'E',
    scope: {
      tabs: '='
    },
    templateUrl: 'fmk/view/JourneyTab.html',

    controller: function($scope) {

      $scope.refreshUserJourneysStatus = function() {
        JourneyBot.getUserJourneysStatus(function(userJourneysStatus) {
          $scope.userJourneysStatus = userJourneysStatus;
        }, true);
      };

      $scope.exploreForBoss = function() {
        JourneyBot.exploreForBoss(function(boss) {

        }, function() {

        })
      };


      function reload() {
        ProfileService.getProfile(function(profile) {
          $scope.profile = profile[JOURNEY_PROFILE];
          UserBot.getUserinfo(function(userinfo) {
            if(userinfo.JourneyActStatus && userinfo.JourneyActStatus.isOpen) {
              JourneyBot.startRegularUpdate(function(userJourneysStatus) {
                $scope.userJourneysStatus = userJourneysStatus;
              })
            }
          });
        });
      }
      $scope.$on(HOME_SWITCH_USER, function() {
        JourneyBot.stopRegularUpdate();
        if($scope.tabs.journey)
          reload();
      });
      $scope.$watch('tabs.journey', function(newValue) {
        if(newValue)
          reload();
        else
          JourneyBot.stopRegularUpdate();
      });
    },

    link: function() {
      ProfileService.setDefaultProfile(JOURNEY_PROFILE, {

      });
    }

  }
});