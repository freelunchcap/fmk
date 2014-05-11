fmk.directive('userTab', function ($modal, NotificationService) {

  return {
    restrict: 'E',
    scope: {
    },
    templateUrl: 'fmk/view/UserTab.html',

    controller: function($scope) {
      $scope.info = function() {
        NotificationService.info('TEST', 'this is test');
      };

      $scope.success = function() {
        NotificationService.success('TEST', 'this is test');
      };

      $scope.warn = function() {
        NotificationService.warn('TEST', 'this is test');
      };

      $scope.error = function() {
        NotificationService.error('TEST', 'this is test');
      };
    }

  }
});