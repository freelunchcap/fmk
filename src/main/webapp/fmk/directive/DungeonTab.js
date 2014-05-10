DUNGEON_PROFILE = 'dungeon_profile';

fmk.directive('dungeonTab', function (DungeonApi) {

  return {
    restrict: 'E',
    scope: {
      tabs: '='
    },
    templateUrl: 'fmk/view/DungeonTab.html',

    controller: function($scope) {

      $scope.outdated = true;

      $scope.refresh = function(callback) {
        DungeonApi.getUserDungeon(function(userDungeon) {
          $scope.userDungeon = userDungeon;
          if(callback)
            callback(userDungeon);
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