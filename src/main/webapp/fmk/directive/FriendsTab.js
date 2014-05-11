FRIENDS_PROFILE = 'friends_profile';

fmk.directive('friendsTab', function (FriendApi, FenergyApi, NotificationService, ProfileService) {

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


      $scope.friends = [];
      $scope.refresh = function(callback) {
        $scope.friends = [];
        FriendApi.getFriends(function(response) {
          $scope.friends = response.Friends;
          if(callback)
            callback($scope.friends);
        });
      };
      $scope.findFriend = function(fid) {
        return $.grep($scope.friends, function(friend) {
          return friend.Uid == fid;
        })[0];
      };
      $scope.claimEnergy = function(fid) {
        FenergyApi.getFEnergy(fid, function () {
          $scope.findFriend(fid).FEnergySurplus = 0;
        });
      };
      $scope.sendEnergy = function(fid) {
        FenergyApi.sendFEnergy(fid, function () {
          $scope.findFriend(fid).FEnergySend = 0;
        });
      };


      $scope.outdated = true;

      function reload() {
        $scope.refresh(function() {
          ProfileService.getProfile(function(profiles) {
            $scope.profile = profiles[FRIENDS_PROFILE];
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
        returnSender: true,
        favourRecentOnline: true,
        favourHighRank: true
      });
    }


  }
});