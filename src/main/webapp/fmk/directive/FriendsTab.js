FRIENDS_PROFILE = 'friends_profile';

fmk.directive('friendsTab', function (FriendApi, FenergyApi) {

  return {
    restrict: 'E',
    scope: {
      tabs: '='
    },
    templateUrl: 'fmk/view/FriendsTab.html',

    controller: function($scope) {

      $scope.friends = [];
      $scope.list = function() {
        FriendApi.getFriends(function(response) {
          $scope.friends = response.Friends;
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
        $scope.outdated = false;
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
    }

  }
});