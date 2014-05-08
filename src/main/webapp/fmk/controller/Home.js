fmk.controller('Home', ['$scope', '$modal', 'CardApi', 'FenergyApi', 'FriendApi', 'MapstageApi', 'Log',
  function($scope, $modal, CardApi, FenergyApi, FriendApi, MapstageApi, Log) {

    function openLogin() {
      $modal.open({
        templateUrl: 'fmk/view/Login.html',
        controller: 'Login',
        backdrop: 'static'
      });
    }

    $scope.card = function () {
      CardApi.getAllCard();
    };

    $scope.map = function() {
      MapstageApi.getMapStageALL();
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