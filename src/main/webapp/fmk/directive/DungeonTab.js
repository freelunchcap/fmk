DUNGEON_PROFILE = 'dungeon_profile';

fmk.directive('dungeonTab', function (DungeonBot, NotificationService, ProfileService) {

  return {
    restrict: 'E',
    scope: {
      tabs: '='
    },
    templateUrl: 'fmk/view/DungeonTab.html',

    controller: function($scope) {

      $scope.saveSettings = function() {
        ProfileService.saveProfile(function() {
          NotificationService.success($filter('translate')('DUNGEON'), $filter('translate')('SETTING_SAVED_SUCCESSFULLY'))
        });
      };

      $scope.showConfigOptions = function() {
        $scope.configOptionsHidden = false;
      };

      $scope.hideConfigOptions = function() {
        $scope.configOptionsHidden = true;
      };
      $scope.start = function() {
        DungeonBot.run(function() {
        }, $scope.dungeonStatus);
      };

      $scope.outdated = true;
      $scope.refresh = function(callback) {
        DungeonBot.getDungeonStatus(function(dungeonStatus) {
          $scope.dungeonStatus = dungeonStatus;
          if(callback)
            callback(dungeonStatus);
        });
      };
      function reload() {
        $scope.refresh(function() {
          $scope.outdated = false;
        });
      }
      $scope.$on(HOME_SWITCH_USER, function() {
        $scope.outdated = true;
        if($scope.tabs.dungeon)
          reload();
      });

      $scope.$watch('tabs.dungeon', function(newValue) {
        if(newValue && $scope.outdated)
          reload();
      });
    }

  }
});