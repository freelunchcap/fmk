fmk.factory('DungeonBot', function(DungeonApi) {

  function getDungeonStatus(callback) {
    DungeonApi.getUserDungeon(callback)
  }

  function sweep(callback) {
    DungeonApi.sweep(callback);
  }

  function fight(layer, callback) {
    DungeonApi.fight(layer, DUNGEON_AUTO_BATTLE, callback);
  }

  function clearAll(callback) {

  }

  return {

    run: function(callback, stageList) {
      if(!stageList) {

      } else
        clearAll(callback);
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