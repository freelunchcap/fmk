MAZE_PROFILE = 'maze_profile';

fmk.directive('mazeTab', function ($modal, $filter, MazeApi, AssetsBot, MazeBot, UserBot, MaskService, NotificationService, ProfileService) {

  return {
    restrict: 'E',
    scope: {
      tabs: '='
    },
    templateUrl: 'fmk/view/MazeTab.html',

    controller: function($scope) {

      $scope.saveSettings = function() {
        ProfileService.saveProfile(function() {
          NotificationService.success($filter('translate')('MAZE'), $filter('translate')('SETTINGS_SAVED_SUCCESSFULLY'))
        });
      };

      $scope.showConfigOptions = function() {
        $scope.configOptionsHidden = false;
      };

      $scope.hideConfigOptions = function() {
        $scope.configOptionsHidden = true;
      };

      function openMazeAttackModal(progress) {
        $modal.open({
          templateUrl: 'fmk/view/MazeAttackModal.html',
          controller: 'MazeAttackModal',
          backdrop: 'static',
          resolve: {
            cardDefs: function() {
              return $scope.cardDefs;
            },
            progress: function() {
              return progress;
            }
          }
        });
      }

      $scope.start = function() {
        var progress = {
          battles: [],
          finish: false
        };
        openMazeAttackModal(progress);
        MazeBot.run(function() {
          progress.finish = true;
        }, progress.battles, $scope.mazeStatuses);
      };

      $scope.getMazeStatus = function(maze, callback) {
        delete $scope.mazeStatuses[maze];
        MazeBot.getMazeStatus(maze, function(mazeStatus) {
          $scope.mazeStatuses[maze] = mazeStatus;
          if(callback)
            callback(mazeStatus);
        });
      };

      $scope.refresh = function(callback) {
        $scope.mazeStatuses = {};

        var toGetStatuses = $.map($scope.profile.attack, function(toAttack, maze) {
          if(toAttack)
            return maze;
          return null;
        });

        function getNextMazeStatus(callback) {
          if(toGetStatuses.length == 0) {
            if(callback)
              callback($scope.mazeStatuses);
          } else {
            var next = toGetStatuses[0];
            toGetStatuses = toGetStatuses.slice(1, toGetStatuses.length);
            $scope.getMazeStatus(next, function() {
              getNextMazeStatus(callback);
            });
          }
        }

        var mask = MaskService.mask($filter('translate')('REFRESHING_MAZE_STATUSES'));
        getNextMazeStatus(function(mazeStatuses) {
          MaskService.unmask(mask);
          if(callback)
            callback(mazeStatuses);
        });
      };

      $scope.getMazeStatusLabel = function(maze) {
        var status = $scope.mazeStatuses[maze];
        if(!status)
          return $filter('translate')('UNKNOWN');
        if(status.Clear)
          return $filter('translate')('CLEAR');
        else
          return $filter('translate')('LAYER') + ': ' + status.Layer;
      };

      $scope.getMazeResetLabel = function(maze) {
        var status = $scope.mazeStatuses[maze];
        if(!status)
          return $filter('translate')('UNKNOWN');
        if(status.FreeReset)
          return $filter('translate')('FREE');
        else
          return status.ResetCash + ' ' + $filter('translate')('CRYSTALS');
      };

      $scope.reset = function(maze, callback) {
        MazeBot.resetMaze(maze, callback, $scope.mazeStatuses[maze]);
      };

      $scope.attack = function(maze) {
        var progress = {
          battles: [],
          finish: false
        };
        openMazeAttackModal(progress);
        MazeBot.clearMaze(maze, progress.battles, function() {
          progress.finish = true;
        }, $scope.mazeStatuses[maze]);
      };

      $scope.outdated = true;
      function reload() {
        ProfileService.getProfile(function(profiles) {
          $scope.profile = profiles[MAZE_PROFILE];
          UserBot.getUserinfo(function(userinfo) {
            $scope.userinfo = userinfo;
            $scope.outdated = false;
            $scope.refresh(function() {
              var mask = MaskService.mask($filter('translate')('LOADING_CARD_DEFINITIONS'));
              AssetsBot.getCardDefs(function(cardDefs) {
                MaskService.unmask(mask);
                $scope.cardDefs = cardDefs;
              });
            });
          });
        });
      }
      $scope.$on(HOME_SWITCH_USER, function() {
        $scope.outdated = true;
        if($scope.tabs.maze)
          reload();
      });
      $scope.$watch('tabs.maze', function(newValue) {
        if(newValue && $scope.outdated)
          reload();
      });

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
        },
        interval: 180,
        autoRun: true,
        maxReset: 0
      });
    }

  }
});