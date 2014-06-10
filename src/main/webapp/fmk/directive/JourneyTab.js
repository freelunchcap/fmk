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
                /*
                 Avatar: "0"
                 FleeTime: 0
                 Grade: 3
                 HPCount: 130260
                 HPCurrent: 0
                 JourneyAvatar: "9103"
                 JourneyBigAvatar: "http://s6.mysticalcard.com/public/swf/journey/img_maxCard_9103.jpg"
                 JourneyId: "11"
                 JourneyName: "困难·莉莉丝"
                 LastAttackerName: "瞎玩吧"
                 LastAttackerUid: 219659
                 Level: 24
                 NickName: "瞎玩吧"
                 Round: 6
                 Sex: "0"
                 Status: 2
                 Time: 1402407961
                 Uid: 219659
                 UserJourneyId: 20889
                 enableAward: 0
                 */
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