fmk.controller('Home', ['$scope', '$modal', 'Friend', 'Fenergy', 'Log',
  function($scope, $modal, Friend, Fenergy, Log) {

    function openLogin() {
      $modal.open({
        templateUrl: 'fmk/view/Login.html',
        controller: 'Login',
        backdrop: 'static'
      });
    }

    $scope.accept = function() {
      Friend.disposeFriendApply(FRIEND_AGREE, 1);
    };

    $scope.logs = [];
    Log.linkLogs($scope.logs);

    $scope.friends = [];
    $scope.list = function() {
      Friend.getFriends(function(response) {
        $scope.friends = response.Friends;
      });
    };
    $scope.claimEnergy = function(fid) {
      Fenergy.getFEnergy(fid, function () {
        $.grep($scope.friends, function(friend) {
          return friend.Uid == fid;
        })[0].FEnergySurplus = 0;
      });
    };
    $scope.sendEnergy = function(fid) {
      Fenergy.sendFEnergy(fid, function () {
        $.grep($scope.friends, function(friend) {
          return friend.Uid == fid;
        })[0].FEnergySend = 0;
      });
    };

    openLogin();
  }
]);