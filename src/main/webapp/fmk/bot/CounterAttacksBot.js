fmk.factory('CounterAttacksBot', function(MapstageApi) {

  function getCounterAttacks(callback) {
    MapstageApi.getUserMapStages(function(userMapStages) {
      var counterAttacks = $.map(userMapStages, function(userMapStage) {
        if(userMapStage.CounterAttackTime > 0)
          return userMapStage;
        return null;
      });
      if(callback)
        callback(counterAttacks);
    });
  }

  function clear(mapStageDetailId, callback) {
    MapstageApi.editUserMapStages(mapStageDetailId, MAPSTAGE_AUTO_BATTLE, callback);
  }

  function clearAll(counterAttacks, callback) {
  }

  return {

    run: function(callback, counterAttacks) {

    },

    getCounterAttacks: function(callback) {
      getCounterAttacks(callback);
    },

    clear: function(mapStageDetailId, callback) {
      clear(mapStageDetailId, callback);
    }

  }

});