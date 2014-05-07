fmk.directive('consoleLogger', function ($modal, $filter) {
    return {
      restrict: 'E',
      scope: {
        logs: '='
      },
      templateUrl: 'fmk/view/ConsoleLogger.html',

      controller: function($scope) {

        $scope.view = function(log) {
          $modal.open({
            templateUrl: 'fmk/view/LogDetail.html',
            controller: 'LogDetail',
            windowClass: 'log-detail-modal',
            resolve: {
              log: function() {
                return log;
              }
            }
          })
        };

        $scope.getStatus = function(log) {
          if(log.status == -1)
            return $filter('translate')('PENDING');
          if(log.status == 1)
            return $filter('translate')('SUCCESS');
          return log.message;
        }

      }

    }
  });