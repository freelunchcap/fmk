fmk.factory('DungeonBot', function(DungeonApi) {

  function getDungeonStatus(callback) {
    DungeonApi.getUserDungeon(callback)
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
    }
  }

});