MAZE_PROFILE = 'maze_profile';

fmk.directive('mazeTab', function ($modal, MazeApi, MazeBot, ProfileService) {
  return {
    restrict: 'E',
    scope: {
      mazes: '=',
      userinfo: '=',
      profile: '='
    },
    templateUrl: 'fmk/view/MazeTab.html',

    controller: function($scope) {

      $scope.start = function() {
        MazeBot.clearMazes($scope.profile);
      };

      $scope.saveSettings = function() {
        ProfileService.saveProfile();
      };

      $scope.test = function() {
        MazeApi.info(7, 5);
      }

    },

    link: function() {
      ProfileService.setDefaultProfile(MAZE_PROFILE, {
        attack: {
          2: false,
          3: false,
          4: false,
          5: false,
          6: true,
          7: true,
          8: true
        }
      });
    }

  }
});