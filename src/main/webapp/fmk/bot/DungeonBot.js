fmk.factory('DungeonBot', function(DungeonApi) {

  function getDungeonStatus(callback) {
    DungeonApi.getUserDungeon(callback)
  }

  function sweep(dungeonStatus, callback) {
    DungeonApi.sweep(function(awards) {
      if(callback)
        callback(dungeonStatus);
    });
  }

  function fight(layer, callback) {
    DungeonApi.fight(layer, DUNGEON_AUTO_BATTLE, callback);
  }

  function clearAll(dungeonStatus, callback) {

  }

  return {

    run: function(callback, dungeonStatus) {
      if(!dungeonStatus) {
        getDungeonStatus(function(dungeonStatus) {
          clearAll(dungeonStatus, callback);
        });
      } else
        clearAll(dungeonStatus, callback);
    },

    getDungeonStatus: function(callback) {
      getDungeonStatus(callback);
    },

    sweep: function(callback) {
      sweep(callback);
    },

    fight: function(layer, callback) {
      fight(layer, callback);
    }
  }

});