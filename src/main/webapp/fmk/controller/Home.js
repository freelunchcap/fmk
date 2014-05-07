fmk.controller('Home', ['$scope', '$modal', 'Friend', 'Log',
  function($scope, $modal, Friend, Log) {

    function openLogin() {
      $modal.open({
        templateUrl: 'fmk/view/Login.html',
        controller: 'Login',
        backdrop: 'static'
      });
    }

    $scope.list = function() {
      Friend.getFriends();
    };

    $scope.accept = function() {
      Friend.disposeFriendApply(FRIEND_AGREE, 1);
    };

    $scope.logs = [];
    Log.linkLogs($scope.logs);

    openLogin();
  }
]);