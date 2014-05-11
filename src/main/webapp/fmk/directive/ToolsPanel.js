fmk.directive('toolsPanel', function ($modal) {
  return {
    restrict: 'E',
    scope: {
    },
    templateUrl: 'fmk/view/ToolsPanel.html',

    controller: function($scope) {
      $scope.shop = function() {

      };

      $scope.enchant = function() {

      }
    }

  }
});