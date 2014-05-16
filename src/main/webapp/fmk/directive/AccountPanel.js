fmk.directive('accountPanel', function ($rootScope, $filter, $modal, LoginBot, MazeBot, UserBot, MaskService, ProfileService) {
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
          backdrop: 'static',
          resolve: {
            allowDismiss: function() {
              return $scope.currentAccount != null;
            }
          }
        });
        loginModal.result.then(callback);
      }
      function setCurrentAccount(account) {
        $scope.currentAccount = account;
        $scope.targetAccount = account;
        $scope.profile = ProfileService.getProfile();
        var mask = MaskService.mask($filter('translate')('UPDATING_USER_INFORMATION'));
        UserBot.startRegularUpdate(function(userinfo) {
          $scope.userinfo = userinfo;
          $rootScope.$broadcast(HOME_SWITCH_USER);
          MaskService.unmask(mask);
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
          $scope.switchAccount(previousLoginAccount, null, $scope.useDifferentAccount);
        else
          $scope.useDifferentAccount();
      }
      $scope.switchAccount = function(account, success, failure) {
        var mask = MaskService.mask($filter('translate')('LOGGING_INTO_GAME_SERVER'));
        LoginBot.login(account.username, account.password, function(account) {
          setCurrentAccount(account);
          MaskService.unmask(mask);
          if(success)
            success(account);
        }, failure);
      };
      $scope.useDifferentAccount = function() {
        showLoginModal(setCurrentAccount);
      };

      autoLogin();

    }

  }
});