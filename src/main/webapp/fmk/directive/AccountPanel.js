fmk.directive('accountPanel', function ($rootScope, $modal, LoginBot, MazeBot, UserBot, MaskService, ProfileService) {
  return {
    restrict: 'E',
    scope: {

    },
    templateUrl: 'fmk/view/AccountPanel.html',

    controller: function($scope) {
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
        UserBot.startRegularUpdate(function(userinfo) {
          $scope.userinfo = userinfo;
          $rootScope.$broadcast(HOME_SWITCH_USER);
        });
      }
      function autoLogin() {
        var previousLoginAccount = null;
        $.each($scope.historyLogins, function(index, account) {
          if(previousLoginAccount == null)
            previousLoginAccount = account;
          else if(account.timestamp > previousLoginAccount.timestamp) {
            previousLoginAccount = account;
          }
        });
        if(previousLoginAccount != null)
          $scope.switchAccount(previousLoginAccount);
        else
          $scope.useDifferentAccount();
      }
      $scope.switchAccount = function(account) {
        LoginBot.login(account.username, account.password, setCurrentAccount);
      };
      $scope.useDifferentAccount = function() {
        showLoginModal(setCurrentAccount);
      };

      autoLogin();

    }

  }
});