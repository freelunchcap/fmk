MAPSTAGE_PHP = 'mapstage.php';
MAPSTAGE_MANUAL_BATTLE = 1;
MAPSTAGE_AUTO_BATTLE = 0;

fmk.factory('Rune', function(Game) {
  return {

    getUserMapStages: function(callback) {
      var params = {
      };
      Game.post(MAPSTAGE_PHP, 'GetUserMapStages', params, callback);
    },

    editUserMapStages: function(mapStageDetailId, isManual, callback) {
      var params = {
        MapStageDetailId: mapStageDetailId,
        isManual: isManual
      };
      Game.post(MAPSTAGE_PHP, 'EditUserMapStages', params, callback);
    },

    awardClear: function(mapStageId, callback) {
      var params = {
        MapStageId: mapStageId
      };
      Game.post(MAPSTAGE_PHP, 'AwardClear', params, callback);
    },

    explore: function(mapStageDetailId, callback) {
      var params = {
        MapStageDetailId: mapStageDetailId
      };
      Game.post(MAPSTAGE_PHP, 'Explore', params, callback);
    },

    getMapStageALL: function(callback) {
      var params = {
      };
      Game.post(MAPSTAGE_PHP, 'GetMapStageALL', params, callback);
    }



  }

});