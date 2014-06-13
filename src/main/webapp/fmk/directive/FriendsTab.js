FRIENDS_PROFILE = 'friends_profile';

fmk.directive('friendsTab', function ($filter, FriendsBot, MaskService, NotificationService, ProfileService) {

  return {
    restrict: 'E',
    scope: {
      tabs: '='
    },
    templateUrl: 'fmk/view/FriendsTab.html',

    controller: function($scope) {

      $scope.saveSettings = function() {
        ProfileService.saveProfile(function() {
          NotificationService.success($filter('translate')('FRIENDS'), $filter('translate')('SETTINGS_SAVED_SUCCESSFULLY'))
        });
      };

      $scope.showConfigOptions = function() {
        $scope.configOptionsHidden = false;
      };

      $scope.hideConfigOptions = function() {
        $scope.configOptionsHidden = true;
      };
      $scope.start = function() {
        FriendsBot.run(function() {
          $scope.refresh();
        }, $scope.friends);
      };


      $scope.refresh = function(callback) {
        $scope.friends = [];
        var mask = MaskService.mask($filter('translate')('REFRESHING_FRIEND_LIST'));
        FriendsBot.getFriends(function(friends) {
          MaskService.unmask(mask);
          $scope.friends = friends;
          if(callback)
            callback($scope.friends);
        });
      };

      $scope.delFriend = function(fid) {
        FriendsBot.delFriend(fid);
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