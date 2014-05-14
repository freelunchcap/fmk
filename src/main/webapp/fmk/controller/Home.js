HOME_SWITCH_USER = 'switch_user';

fmk.controller('Home', ['$scope', '$rootScope', '$modal', 'CardApi', 'FenergyApi', 'FriendApi', 'MapstageApi', 'LoginBot', 'MazeBot', 'UserBot', 'LogService', 'ProfileService',
  function($scope, $rootScope, $modal, CardApi, FenergyApi, FriendApi, MapstageApi, LoginBot, MazeBot, UserBot, LogService) {

    $scope.tabs = {
      user: true,
      maze: false,
      friends: false,
      counterAttacks: false,
      dungeon: false,
      arena: false
    };

  }
]);