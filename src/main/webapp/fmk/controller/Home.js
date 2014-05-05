fmk.controller('Home', ['$scope', '$modal',
  function($scope, $modal) {

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

    openLogin();
  }
]);