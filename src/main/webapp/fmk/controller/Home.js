ACCOUNTS = "accounts";

fmk.controller('Home', ['$scope', '$modal', '$cookies', 'CardApi', 'FenergyApi', 'FriendApi', 'MapstageApi', 'MazeBot', 'Log',
  function($scope, $modal, $cookies, CardApi, FenergyApi, FriendApi, MapstageApi, MazeBot, Log) {

    var accounts = $cookies[ACCOUNTS];
    function activateAccount() {
      $.each(accounts, function(index, account) {

      });
    }


    function openLogin() {
      $modal.open({
        templateUrl: 'fmk/view/Login.html',
        controller: 'Login',
        backdrop: 'static'
      });
    }

    $scope.user = function() {
    };

    $scope.card = function () {
      CardApi.getAllCard();
    };

    $scope.map = function() {
      MapstageApi.getMapStageALL();
    };

    $scope.maze = function() {
      MazeBot.fetchMazes(false, function(mazes) {
      });
    };

    $scope.logs = [];
    Log.linkLogs($scope.logs);

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

    openLogin();
  }
]);