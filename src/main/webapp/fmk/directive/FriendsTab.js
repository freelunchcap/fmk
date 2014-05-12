FRIENDS_PROFILE = 'friends_profile';

fmk.directive('friendsTab', function (FriendApi, FenergyApi, FriendsBot, NotificationService, ProfileService) {

  return {
    restrict: 'E',
    scope: {
      tabs: '='
    },
    templateUrl: 'fmk/view/FriendsTab.html',

    controller: function($scope) {

      $scope.saveSettings = function() {
        ProfileService.saveProfile(function() {
          NotificationService.success($filter('translate')('MAZE'), $filter('translate')('SETTING_SAVED_SUCCESSFULLY'))
        });
      };

      $scope.showConfigOptions = function() {
        $scope.configOptionsHidden = false;
      };

      $scope.hideConfigOptions = function() {
        $scope.configOptionsHidden = true;
      };
      $scope.start = function() {
        FriendsBot.run($scope.friends, function() {
          $scope.refresh();
        });
      };


      $scope.friends = [];
      $scope.refresh = function(callback) {
        $scope.friends = [];
        FriendApi.getFriends(function(response) {
          $scope.friends = response.Friends;
          if(callback)
            callback($scope.friends);
        });
      };

      $scope.claimEnergy = function(fid) {
        FriendsBot.claimEnergy(fid, $scope.friends);
      };
      $scope.sendEnergy = function(fid) {
        FriendsBot.sendEnergy(fid, $scope.friends);
      };


      $scope.outdated = true;

      function reload() {
        $scope.refresh(function() {
          ProfileService.getProfile(function(profile) {
            $scope.profile = profile[FRIENDS_PROFILE];
            $scope.outdated = false;
          });
        });
      }

      $scope.$on(HOME_SWITCH_USER, function() {
        $scope.outdated = true;
        if($scope.tabs.friends)
          reload();
      });

      $scope.$watch('tabs.friends', function(newValue) {
        if(newValue && $scope.outdated)
          reload();
      });
    },

    link: function() {
      ProfileService.setDefaultProfile(FRIENDS_PROFILE, {
        interval: 360,
        autoRun: true,
        returnSender: true,
        favour: 'recentOnline'
      });
    }


  }
});