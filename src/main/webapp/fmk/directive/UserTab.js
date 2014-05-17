USER_PROFILE = "user_profile";

fmk.directive('userTab', function (UserBot, NotificationService, ProfileService) {

  return {
    restrict: 'E',
    scope: {
      tabs: '='
    },
    templateUrl: 'fmk/view/UserTab.html',

    controller: function($scope) {

      $scope.saveSettings = function() {
        ProfileService.saveProfile(function() {
          NotificationService.success($filter('translate')('FRIENDS'), $filter('translate')('SETTINGS_SAVED_SUCCESSFULLY'))
        });
      };

      $scope.showConfigOptions = function() {
        $scope.configOptionsHidden = false;
      };

      $scope.hideConfigOptions = function() {
        $scope.configOptionsHidden = true;
      };
      $scope.start = function() {
      };

      $scope.refresh = function(callback) {
        UserBot.getUserinfo(function(userinfo) {
          $scope.userinfo = userinfo;
          if(callback)
            callback(userinfo);
        });
      };

      $scope.openTreasureBox = function(callback) {
        UserBot.collectSalary(callback);
      };

      $scope.bankOrcShopScores = function(callback) {

      };

      $scope.outdated = true;
      function reload() {
        $scope.refresh(function() {
          ProfileService.getProfile(function(profile) {
            $scope.profile = profile[USER_PROFILE];
            $scope.refresh(function() {
              $scope.outdated = false;
            });
          });
        });
      }
      $scope.$on(HOME_SWITCH_USER, function() {
        $scope.outdated = true;
        if($scope.tabs.user)
          reload();
      });
      $scope.$watch('tabs.user', function(newValue, oldValue) {
        if(newValue && newValue != oldValue && $scope.outdated)
          reload();
      });
    },

    link: function() {
      ProfileService.setDefaultProfile(USER_PROFILE, {
        interval: 360,
        autoRun: true
      });
    }

  }
});