DUNGEON_PROFILE = 'dungeon_profile';

fmk.directive('dungeonTab', function (DungeonBot, NotificationService, ProfileService) {


  function createDungeonLayerLabels(dungeonStatus) {
    var labels = [];
    $.each(dungeonStatus.DungeonConditions, function(index, bossLayer) {
      var sublist = [];
      var max = bossLayer.Layer;
      var previousBossLayer = dungeonStatus.DungeonConditions[index - 1];
      var min = previousBossLayer ? previousBossLayer.Layer : 0;
      var finishedBosses = $.map(dungeonStatus.UserDungeon.FinishedBoss.split(','), function(value) {
        return parseInt(value);
      });
      for(var i = min + 1; i <= max; i++) {
        var finished = i <= dungeonStatus.UserDungeon.CurrentLayer;
        var awarded;
        var text;
        if(i == max) {
          awarded = $.inArray(i, finishedBosses) != -1;
          text = i + ': ' + bossLayer.Content;
        } else {
          awarded = finished;
          text = i;
        }
        sublist.push({
          layer: i,
          finished: finished,
          awarded: awarded,
          text: text
        });
      }
      labels.push(sublist);
    });
    return labels;
  }

  return {
    restrict: 'E',
    scope: {
      tabs: '='
    },
    templateUrl: 'fmk/view/DungeonTab.html',

    controller: function($scope) {

      $scope.saveSettings = function() {
        ProfileService.saveProfile(function() {
          NotificationService.success($filter('translate')('DUNGEON'), $filter('translate')('SETTING_SAVED_SUCCESSFULLY'))
        });
      };

      $scope.showConfigOptions = function() {
        $scope.configOptionsHidden = false;
      };

      $scope.hideConfigOptions = function() {
        $scope.configOptionsHidden = true;
      };
      $scope.start = function() {
        DungeonBot.run(function() {
        }, $scope.dungeonStatus);
      };

      $scope.sweep = function(callback) {
        DungeonBot.sweep(function() {
          $scope.refresh(callback);
        });
      };

      $scope.fight = function(layer, callback) {
        DungeonBot.fight(layer, function() {
          if(callback)
            callback();
        });
      };

      $scope.outdated = true;
      $scope.refresh = function(callback) {
        DungeonBot.getDungeonStatus(function(dungeonStatus) {
          $scope.dungeonStatus = dungeonStatus;
          $scope.layerLables = createDungeonLayerLabels(dungeonStatus);
          if(callback)
            callback(dungeonStatus);
        });
      };
      function reload() {
        $scope.refresh(function() {
          $scope.outdated = false;
        });
      }
      $scope.$on(HOME_SWITCH_USER, function() {
        $scope.outdated = true;
        if($scope.tabs.dungeon)
          reload();
      });

      $scope.$watch('tabs.dungeon', function(newValue) {
        if(newValue && $scope.outdated)
          reload();
      });
    }

  }
});