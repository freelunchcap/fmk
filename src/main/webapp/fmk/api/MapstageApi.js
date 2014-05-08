MAPSTAGE_PHP = 'mapstage.php';
MAPSTAGE_MANUAL_BATTLE = 1;
MAPSTAGE_AUTO_BATTLE = 0;

fmk.factory('MapstageApi', function(GameApi) {
  return {

    getUserMapStages: function(callback) {
      var params = {
      };
      GameApi.post(MAPSTAGE_PHP, 'GetUserMapStages', params, callback);
    },

    editUserMapStages: function(mapStageDetailId, isManual, callback) {
      var params = {
        MapStageDetailId: mapStageDetailId,
        isManual: isManual
      };
      GameApi.post(MAPSTAGE_PHP, 'EditUserMapStages', params, callback);
    },

    awardClear: function(mapStageId, callback) {
      var params = {
        MapStageId: mapStageId
      };
      GameApi.post(MAPSTAGE_PHP, 'AwardClear', params, callback);
    },

    explore: function(mapStageDetailId, callback) {
      var params = {
        MapStageDetailId: mapStageDetailId
      };
      GameApi.post(MAPSTAGE_PHP, 'Explore', params, callback);
    },

    getMapStageALL: function(callback) {
      var params = {
      };
      GameApi.post(MAPSTAGE_PHP, 'GetMapStageALL&stageNum=' + max_stageNum, params, callback);
    }



  }

});