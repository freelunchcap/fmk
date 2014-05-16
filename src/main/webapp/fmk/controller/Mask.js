fmk.controller('Mask', ['$scope', 'MaskService',
  function($scope, MaskService) {

    MaskService.register({
      mask: function(message) {
        $scope.message = message;
      },
      unmask: function() {
        delete $scope.message;
      }
    });

  }
]);