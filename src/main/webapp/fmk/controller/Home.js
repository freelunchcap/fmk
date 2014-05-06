fmk.controller('Home', ['$scope', '$modal', 'Friend',
  function($scope, $modal, Friend) {

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

    openLogin();
  }
]);