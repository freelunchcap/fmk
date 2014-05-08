fmk.directive('mazeTab', function ($modal) {
  return {
    restrict: 'E',
    scope: {
      mazes: '=',
      userinfo: '='
    },
    templateUrl: 'fmk/view/MazeTab.html',

    controller: function($scope) {

    }

  }
});