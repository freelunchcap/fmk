MAZE_BOT_EMPTY = 1;
MAZE_BOT_BOX = 2;
MAZE_BOT_MONSTER = 3;
MAZE_BOT_DOWNSTATIR = 4;
MAZE_BOT_UPSTATIR = 5;

fmk.factory('MazeBot', function(MazeApi, UserBot, AssetsBot, ProfileService, StorageService) {

  function clearItem(mapStageId, layer, itemIndex, layerStatus, battles, callback) {
    function checkFinish() {
      if(layerStatus.Layer == layerStatus.TotalLayer
        && layerStatus.RemainBoxNum == 0
        && layerStatus.RemainMonsterNum == 0) {
        layerStatus.Map.IsFinish = true;
      }
    }
    function doBattle(userinfo) {
      MazeApi.battle(MAZE_AUTO_BATTLE, mapStageId, layer, itemIndex, function(replay) {
        var coins = replay.ExtData.Award.Coins;
        if(replay.ExtData.Clear)
          coins += replay.ExtData.Clear.Coins;

        var awards = [];
        if(replay.ExtData.Award) {
          if(replay.ExtData.Award.CardId)
            awards.push(replay.ExtData.Award.CardId);
          if(replay.ExtData.Award.SecondDropCard) {
            $.each(replay.ExtData.Award.SecondDropCard, function(index, card) {
              awards.push(card.CardId);
            })
          }
        }
        if(replay.ExtData.Clear) {
          if(replay.ExtData.Clear.CardId)
            awards.push(replay.ExtData.Clear.CardId);
          if(replay.ExtData.Clear.SecondDropCard) {
            $.each(replay.ExtData.Clear.SecondDropCard, function(index, card) {
              awards.push(card.CardId);
            })
          }
        }

        battles.push({
          maze: mapStageId,
          layer: layer,
          enemy: replay.DefendPlayer.NickName,
          exp: replay.ExtData.Award.Exp,
          coins: coins,
          awards: awards,
          win: replay.Win == 1,
          clear: replay.ExtData.Clear && replay.ExtData.Clear.IsClear == 1
        });
        userinfo.Energy = parseInt(userinfo.Energy) - 2;
        userinfo.Coins = parseInt(userinfo.Coins) + parseInt(replay.ExtData.Award.Coins);
        userinfo.Exp = parseInt(userinfo.Exp) + parseInt(replay.ExtData.Award.Exp);
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
          if(userinfo.Exp > userinfo.NextExp)
            UserBot.getUserinfo(function() {
              if(callback)
                callback(layerStatus);
            }, true);
          else if(callback)
            callback(layerStatus);
        }
      });
    }
    UserBot.getUserinfo(function(userinfo) {
      if(userinfo.Energy >= 2)
        doBattle(userinfo);
    }, false);
  }

  function clearLayer(mapStageId, layer, mazeStatus, battles, callback, layerStatus) {
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
        clearItem(mapStageId, layer, nextItemIndex, layerStatus, battles, function(layerStatus) {
          clearLayer(mapStageId, layer, mazeStatus, battles, callback, layerStatus);
        });
      }
    }

    if(layerStatus)
      doClearLayer(layerStatus, callback);
    else
      MazeApi.info(mapStageId, layer, function(layerStatus) {
        doClearLayer(layerStatus, callback);
      });
  }

  function resetMaze(mapStageId, callback) {
    MazeApi.reset(mapStageId, function() {
      MazeApi.show(mapStageId, callback);
    });
  }

  function clearMaze(mapStageId, battles, callback, mazeStatus) {
    function doClearMaze(mazeStatus, callback) {
      if(mazeStatus.Clear) {
        if(mazeStatus.FreeReset == 1) {
          resetMaze(mapStageId, function(mazeStatus) {
            clearMaze(mapStageId, battles, callback, mazeStatus);
          });
        } else
          callback(mazeStatus);
      }
      else
        clearLayer(mapStageId, mazeStatus.Layer, mazeStatus, battles, function(mazeStatus) {
          clearMaze(mapStageId, battles, callback, mazeStatus);
        });
    }

    if(mazeStatus)
      doClearMaze(mazeStatus, callback);
    else
      MazeApi.show(mapStageId, function(mazeStatus) {
        doClearMaze(mazeStatus, callback);
      });
  }

  function clearMazes(mazeStatuses, profile, callback, battles) {
    var mazes = $.map(profile.attack, function(toAttack, maze) {
      if(toAttack)
        return maze;
      return null;
    });
    mazes.sort();
    mazes.reverse();

    function attackNext() {
      if(mazes.length == 0) {
        if(callback)
          callback(mazeStatuses);
        return;
      }

      var next = mazes[0];
      mazes = mazes.slice(1, mazes.length);
      clearMaze(next, battles, function(mazeStatus) {
        mazeStatuses[next] = $.extend(mazeStatuses[next], mazeStatus);
        attackNext();
      }, mazeStatuses[next]);
    }

    attackNext();
  }

  return {

    run: function(callback, battles, mazeStatuses) {
      ProfileService.getProfile(function(profile) {
        clearMazes(mazeStatuses || {}, profile[MAZE_PROFILE], callback, battles)
      });
    },

    getMazeStatus: function(maze, callback) {
      MazeApi.show(maze, callback);
    }

  };

});