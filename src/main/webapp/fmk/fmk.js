var fmk = angular.module('fmk', ['ngRoute', 'ngSanitize', 'ui.bootstrap', 'pascalprecht.translate']);

fmk.config(['$routeProvider', '$translateProvider', function ($routeProvider, $translateProvider) {

  $.each(i18n, function (lang, translation) {
    $translateProvider.translations(lang, translation);
  });

  $translateProvider.preferredLanguage(navigator.language);

  $routeProvider.when('/home', {
    templateUrl: 'fmk/view/Home.html',
    controller: 'Home'
  }).otherwise({
      redirectTo: '/home'
    });

}
]);