COUNTER_ATTACKS_PROFILE = 'counter_attacks_profile';

fmk.directive('counterAttacksTab', function (NotificationService, ProfileService) {


  return {
    restrict: 'E',
    scope: {
      tabs: '='
    },
    templateUrl: 'fmk/view/CounterAttacksTab.html',

    controller: function($scope) {

      $scope.saveSettings = function() {
        ProfileService.saveProfile(function() {
          NotificationService.success($filter('translate')('DUNGEON'), $filter('translate')('SETTINGS_SAVED_SUCCESSFULLY'))
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


      $scope.outdated = true;
      $scope.refresh = function(callback) {

      };
      function reload() {
        $scope.refresh(function() {
          $scope.outdated = false;
        });
      }
      $scope.$on(HOME_SWITCH_USER, function() {
        $scope.outdated = true;
        if($scope.tabs.counterAttacks)
          reload();
      });

      $scope.$watch('tabs.counterAttacks', function(newValue) {
        if(newValue && $scope.outdated)
          reload();
      });
    }

  }
});