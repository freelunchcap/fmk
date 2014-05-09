MAZE_BOT_EMPTY = 1;
MAZE_BOT_BOX = 2;
MAZE_BOT_MONSTER = 3;
MAZE_BOT_DOWNSTATIR = 4;
MAZE_BOT_UPSTATIR = 5;

MAZE_BOT_MAZE_REQUIREMENTS = 'maze_requirements';

fmk.factory('MazeBot', function(MazeApi, UserBot, AssetsBot, StorageService) {

  var mazeRequirements = StorageService.getObject(MAZE_BOT_MAZE_REQUIREMENTS);
  function saveMazeRequirements() {
    StorageService.setObject(MAZE_BOT_MAZE_REQUIREMENTS, mazeRequirements);
  }

  var mb = {

    clearItem: function(mapStageId, layer, itemIndex, layerStatus, callback) {
      function checkFinish() {
        if(layerStatus.Layer == layerStatus.TotalLayer
          && layerStatus.RemainBoxNum == 0
          && layerStatus.RemainMonsterNum == 0) {
          layerStatus.Map.IsFinish = true;
        }
      }

      MazeApi.battle(MAZE_AUTO_BATTLE, mapStageId, layer, itemIndex, function(replay) {
        if(replay.Win) {
          switch(layerStatus.Map.Items[itemIndex]) {
            case MAZE_BOT_BOX:
              layerStatus.RemainBoxNum--;
              layerStatus.Map.Items[itemIndex] = MAZE_BOT_EMPTY;
              checkFinish();
              break;
            case MAZE_BOT_MONSTER:
              layerStatus.RemainMonsterNum--;
              layerStatus.Map.Items[itemIndex] = MAZE_BOT_EMPTY;
              checkFinish();
              break;
            case MAZE_BOT_UPSTATIR:
              layerStatus.Map.IsFinish = true;
              break;
          }
          if(callback)
            callback(layerStatus);
        }
      });
    },

    clearLayer: function(mapStageId, layer, mazeStatus, callback, layerStatus) {
      function doClearLayer(layerStatus, callback) {
        if(layerStatus.Map.IsFinish
          && layerStatus.RemainBoxNum == 0
          && layerStatus.RemainMonsterNum == 0) {
          if(layerStatus.Layer == layerStatus.TotalLayer)
            mazeStatus.Clear = 1;
          else
            mazeStatus.Layer++;
          if(callback)
            callback(mazeStatus);
        } else {
          var nextItemIndex = null;
          $.each(layerStatus.Map.Items, function(itemIndex, itemType) {
            if(itemType == MAZE_BOT_BOX || itemType == MAZE_BOT_MONSTER)
              nextItemIndex = itemIndex;
            else if(itemType == MAZE_BOT_UPSTATIR && !layerStatus.Map.IsFinish) {
              nextItemIndex = itemIndex;
            }
          });
          mb.clearItem(mapStageId, layer, nextItemIndex, layerStatus, function(layerStatus) {
            mb.clearLayer(mapStageId, layer, mazeStatus, callback, layerStatus);
          });
        }
      }

      if(layerStatus)
        doClearLayer(layerStatus, callback);
      else
        MazeApi.info(mapStageId, layer, function(layerStatus) {
          doClearLayer(layerStatus, callback);
        });
    },

    resetMaze: function(mapStageId, callback) {
      MazeApi.reset(mapStageId, function() {
        MazeApi.show(mapStageId, callback);
      });
    },

    clearMaze: function(mapStageId, callback, mazeStatus) {
      function doClearMaze(mazeStatus, callback) {
        if(mazeStatus.Clear) {
          if(mazeStatus.FreeReset == 1) {
            mb.resetMaze(mapStageId, function(mazeStatus) {
              mb.clearMaze(mapStageId, callback, mazeStatus);
            });
          } else
            callback(mazeStatus);
        }
        else
          mb.clearLayer(mapStageId, mazeStatus.Layer, mazeStatus, function(mazeStatus) {
            mb.clearMaze(mapStageId, callback, mazeStatus);
          });
      }

      if(mazeStatus)
        doClearMaze(mazeStatus, callback);
      else
        MazeApi.show(mapStageId, function(mazeStatus) {
          doClearMaze(mazeStatus, callback);
        });
    },

    clearMazes: function(mazeProfile, callback) {
      var toAttack = [];
      $.each(mazeProfile.attack, function(mapStageId, attack) {
        if(attack)
          toAttack.push(mapStageId);
      });
      toAttack.sort();
      toAttack.reverse();

      var mazeStatuses = {};

      function attackNext() {
        if(toAttack.length == 0) {
          if(callback)
            callback(mazeStatuses);
          return;
        }

        var next = toAttack[0];
        toAttack = toAttack.slice(1, toAttack.length);
        mb.clearMaze(next, function(mazeStatus) {
          mazeStatuses[next] =  mazeStatus;
          attackNext();
        });
      }

      attackNext();
    },

    getMazeRequirements: function(refresh, callback) {
      if(refresh || !mazeRequirements) {
        mazeRequirements = {};
        AssetsBot.getMapstageDefs(function(mapstageDefs) {
          $.each(mapstageDefs, function(mapstagePos, mapstage) {
            if(mapstage.MazeCount > 0) {
              mazeRequirements[mapstagePos] = $.grep(mapstage.MapStageDetails, function (mapstageDetail) {
                return mapstageDetail.Type == 2;
              })[0].MapStageDetailId;
            }
          });
          saveMazeRequirements();
          if(callback)
            callback(mazeRequirements);
        });
      } else if(callback)
        callback(mazeRequirements);
    },

    getAvailableMazes: function(refresh, callback) {
      UserBot.getUserMapstages(refresh, function(userMapstages) {
        mb.getMazeRequirements(false, function(mazeRequirements) {
          var mazes = {};
          $.each(mazeRequirements, function(mapPos, bossMapstageId) {
            var userBossMapstage = userMapstages[bossMapstageId];
            mazes[mapPos] = userBossMapstage != null ? userBossMapstage.FinishedStage > 0 : false;
          });
          if(callback)
            callback(mazes);
        });
      });
    }

  };

  return mb;

});