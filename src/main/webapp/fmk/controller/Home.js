HOME_SWITCH_USER = 'switch_user';

fmk.controller('Home', ['$scope', '$rootScope', '$modal', 'CardApi', 'FenergyApi', 'FriendApi', 'MapstageApi', 'LoginBot', 'MazeBot', 'UserBot', 'LogService', 'ProfileService',
  function($scope, $rootScope, $modal, CardApi, FenergyApi, FriendApi, MapstageApi, LoginBot, MazeBot, UserBot, LogService) {

    $scope.tabs = {
      user: true,
      maze: false,
      friends: false,
      counter_attacks: false,
      dungeon: false,
      arena: false
    };

    $scope.loadMazes = function() {
      MazeBot.getAvailableMazes(false, function(mazes) {
        $scope.mazes = mazes;
      });
    };

    $scope.logs = [];
    LogService.linkLogs($scope.logs);

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

  }
]);