fmk.controller('Login', ['$scope', '$modalInstance', 'LoginBot',
  function($scope, $modalInstance, LoginBot) {

    $scope.login = function() {
      LoginBot.login($scope.username, $scope.password, function() {
        $modalInstance.close();
      });

    }
  }
]);