fmk.controller('Home', ['$scope', '$modal',
  function($scope, $modal) {
    $modal.open({
      templateUrl: 'fmk/view/Login.html',
      controller: 'Login',
      resolve: {

      }
    });
  }
]);