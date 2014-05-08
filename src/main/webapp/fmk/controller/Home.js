fmk.controller('Home', ['$scope', '$modal', 'CardApi', 'FenergyApi', 'FriendApi', 'MapstageApi', 'LoginBot', 'MazeBot', 'Log',
  function($scope, $modal, CardApi, FenergyApi, FriendApi, MapstageApi, LoginBot, MazeBot, Log) {

    $scope.historyLogins = LoginBot.getLoginRecords();
    function showLoginModal(callback) {
      var loginModal = $modal.open({
        templateUrl: 'fmk/view/Login.html',
        controller: 'LoginModal',
        backdrop: 'static'
      });
      loginModal.result.then(callback);
    }
    function setCurrentAccount(account) {
      $scope.currentAccount = account;
      $scope.targetAccount = account;
    }
    function autoLogin() {
      var lastLogin = null;
      $.each($scope.historyLogins, function(index, account) {
        if(lastLogin == null)
          lastLogin = account;
        else if(account.timestamp > lastLogin.timestamp) {
          lastLogin = account;
        }
      });
      if(lastLogin != null)
        $scope.switchAccount(lastLogin);
      else
        $scope.useDifferentAccount();
    }
    $scope.switchAccount = function(login) {
      LoginBot.login(login.username, login.password, setCurrentAccount);
    };
    $scope.useDifferentAccount = function() {
      showLoginModal(setCurrentAccount);
    };

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

    autoLogin();
  }
]);