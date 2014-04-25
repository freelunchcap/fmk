var fmk = angular.module('fmk', ['ngRoute', 'ngSanitize', 'ui.bootstrap', 'pascalprecht.translate']);

fmk.config(['$routeProvider', '$translateProvider', function ($routeProvider, $translateProvider) {

  $translateProvider.translations('en', {
    TITLE: 'Hello',
    FOO: 'This is a paragraph.',
    BUTTON_LANG_EN: 'english',
    BUTTON_LANG_DE: 'german'
  });
  $translateProvider.translations('de', {
    TITLE: 'Hallo',
    FOO: 'Dies ist ein Paragraph.',
    BUTTON_LANG_EN: 'englisch',
    BUTTON_LANG_DE: 'deutsch'
  });
  $translateProvider.preferredLanguage('en');

  $routeProvider.when('/home', {
    templateUrl: 'fmk/view/Home.html',
    controller: 'Home'
  }).otherwise({
      redirectTo: '/home'
    });



//  $translateProvider.preferredLanguage('en');

}
]);