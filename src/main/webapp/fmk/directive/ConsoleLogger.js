fmk.directive('consoleLogger', function (Log) {
    return {
      restrict: 'E',
      scope: {
        logs: '='
      },
      templateUrl: 'fmk/view/ConsoleLogger.html'
    }
  });