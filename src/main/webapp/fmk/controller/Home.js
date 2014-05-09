fmk.controller('Home', ['$scope', '$modal', 'CardApi', 'FenergyApi', 'FriendApi', 'MapstageApi', 'LoginBot', 'MazeBot', 'UserBot', 'LogService', 'ProfileService',
  function($scope, $modal, CardApi, FenergyApi, FriendApi, MapstageApi, LoginBot, MazeBot, UserBot, LogService, ProfileService) {

    $scope.historyLogins = LoginBot.getAccounts();
    function showLoginModal(callback) {
      var loginModal = $modal.open({
        templateUrl: 'fmk/view/LoginModal.html',
        controller: 'LoginModal',
        backdrop: $scope.currentAccount == null ? 'static' : true
      });
      loginModal.result.then(callback);
    }
    function setCurrentAccount(account) {
      $scope.currentAccount = account;
      $scope.targetAccount = account;
      $scope.profile = ProfileService.getProfile();
      UserBot.getUserinfo(true, function(userinfo) {
        $scope.userinfo = userinfo;
      });
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

    autoLogin();
  }
]);