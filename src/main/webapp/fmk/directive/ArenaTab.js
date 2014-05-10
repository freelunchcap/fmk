ARENA_PROFILE = 'arena_profile';

fmk.directive('arenaTab', function () {

  return {
    restrict: 'E',
    scope: {
      tabs: '='
    },
    templateUrl: 'fmk/view/ArenaTab.html',

    controller: function($scope) {

    }

  }
});