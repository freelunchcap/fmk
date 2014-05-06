fmk.controller('Home', ['$scope', '$modal', 'Friend', 'Log',
  function($scope, $modal, Friend, Log) {

    function openLogin() {
      $modal.open({
        templateUrl: 'fmk/view/Login.html',
        controller: 'Login',
        backdrop: 'static',
        resolve: {
          token: $scope.token
        }
      });
    }

    $scope.list = function() {
      Friend.getFriends();
    };

    $scope.logs = [];
    Log.linkLogs($scope.logs);

    openLogin();
  }
]);