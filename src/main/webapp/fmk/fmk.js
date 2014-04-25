var fmk = angular.module('fmk', ['ngRoute', 'ngSanitize', 'ui.bootstrap', 'pascalprecht.translate']);

fmk.config(['$routeProvider', '$translateProvider', function ($routeProvider, $translateProvider) {

  $translateProvider.translations({
    'HEADLINE': 'Introducing ngTranslate',
    'SUB_HEADLINE': 'Translations for your Angular Apps!',
    'AUTHOR_NAME': 'Pascal Precht',
    'GITHUB_LINK_TEXT': 'View source on GitHub',
    'GETTING_STARTED_HEADLINE': 'Getting Started',
    'HEADLINE_FILTER': 'ngTranslate::translateFilter',
    'HEADLINE_USAGE': 'Usage:',
    'HEADLINE_FILTER_DYN_VALUES': 'Translations with dynamic values',
    'INFO_TEXT_TRANSLATE_FILTER': 'ngTranslate comes with a filter you can use like this:',
    'INFO_TEXT_TRANSLATE_FILTER_2': 'Sometimes you have translations were specific values can be dynamic. ngTranslate  comes with different ways to pass dynamic values into a translation.',
    'INFO_TEXT_TRANSLATE_FILTER_3': 'First, a translation ID has to know that there is an optional dynamic value. Simply use string interpolation directive:',
    'INFO_TEXT_TRANSLATE_FILTER_4': '"value" is now an identifier which you can assign values to. There are to ways to pass values through the translate filter. Using a string expression in JavaScript Object Notation and simply an object hash on the current scope.',
    'HEADLINE_DIRECTIVE': 'ngTranslate::translateDirective',
    'INFO_TEXT_TRANSLATE_DIRECTIVE': 'Sometimes filters are bad for your app because to many watch expressions slow down your app. So in that case, you might wanna use a directive. ngTranslate has you covered. You can use the translate directive in many different ways. Examples are shown below:',
    'HEADLINE_DIRECTIVE_DYN_VALUES': 'Dealing with dynamic values',
    'INFO_TEXT_TRANSLATE_DIRECTIVE_2': 'To pass values through translate directives you have to use the "values" attribute on the element you want to translate. You can either pass a string expression, just like the filter does, or an interpolated values from scope like shown below:',
    'INFO_TEXT_TRANSLATE_DIRECTIVE_3': 'This works with every translation id combination.'
  });

  $routeProvider.when('/home', {
    templateUrl: 'fmk/view/Home.html',
    controller: 'Home'
  }).otherwise({
      redirectTo: '/home'
    });



//  $translateProvider.preferredLanguage('en');

}
]);