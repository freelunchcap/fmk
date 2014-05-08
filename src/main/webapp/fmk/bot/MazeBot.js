MAZE_BOT_EMPTY = 1;
MAZE_BOT_BOX = 2;
MAZE_BOT_MONSTER = 3;
MAZE_BOT_DOWNSTATIR = 4;
MAZE_BOT_UPSTATIR = 4;

fmk.factory('MazeBot', function(MazeApi) {

  var mb = {

    clearItem: function(mapStageId, layer, itemIndex, layerStatus, callback) {
      MazeApi.battle(MAZE_AUTO_BATTLE, mapStageId, layer, itemIndex, function(replay) {
        if(replay.Win) {
          switch(layerStatus.Map.Items[itemIndex]) {
            case MAZE_BOT_BOX:
              layerStatus.RemainBoxNum--;
              layerStatus.Map.Items[itemIndex] = MAZE_BOT_EMPTY;
              break;
            case MAZE_BOT_MONSTER:
              layerStatus.RemainMonsterNum--;
              layerStatus.Map.Items[itemIndex] = MAZE_BOT_EMPTY;
              break;
            case MAZE_BOT_UPSTATIR:
              layerStatus.Map.IsFinish = 1;
              break;
          }
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
          mb.clearItem(mapStageId, layer, nextItemIndex, function(layerStatus) {
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

    clearMaze: function(mapStageId, callback, mazeStatus) {
      function doClearMaze(mazeStatus, callback) {
        if(mazeStatus.Clear)
          callback(mazeStatus);
        else
          mb.clearLayer(mapStageId, mazeStatus.Layer, function(mazeStatus) {
            mb.clearMaze(mapStageId, callback, mazeStatus);
          });
      }

      if(mazeStatus)
        doClearMaze(mazeStatus, callback);
      else
        MazeApi.show(mapStageId, function(mazeStatus) {
          doClearMaze(mazeStatus, callback);
        });
    }

  };

  return mb;

});