FRIENDS_PROFILE = 'friends_profile';

fmk.directive('friendsTab', function (DungeonApi) {

  return {
    restrict: 'E',
    scope: {
      tabs: '='
    },
    templateUrl: 'fmk/view/FriendsTab.html',

    controller: function($scope) {

      $scope.outdated = true;

      function reload() {
        $scope.outdated = false;
      }

      $scope.$on(HOME_SWITCH_USER, function() {
        $scope.outdated = true;
        if($scope.tabs.friends)
          reload();
      });

      $scope.$watch('tabs.friends', function(newValue) {
        if(newValue && $scope.outdated)
          reload();
      });
    }

  }
});