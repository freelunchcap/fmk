var app = angular.module('fmk', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/home', {
      templateUrl: 'view/Home.html',
      controller: 'Home'
    }).otherwise({
      redirectTo: '/home'
    })
}
]);