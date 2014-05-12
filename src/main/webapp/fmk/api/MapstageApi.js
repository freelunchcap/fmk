MAPSTAGE_PHP = 'mapstage.php';
MAPSTAGE_MANUAL_BATTLE = 1;
MAPSTAGE_AUTO_BATTLE = 0;

fmk.factory('MapstageApi', function(GameApi) {
  return {

    getUserMapStages: function(success) {
      var params = {
      };
      GameApi.post(MAPSTAGE_PHP, 'GetUserMapStages', params, success);
    },

    editUserMapStages: function(mapStageDetailId, isManual, success) {
      var params = {
        MapStageDetailId: mapStageDetailId,
        isManual: isManual
      };
      GameApi.post(MAPSTAGE_PHP, 'EditUserMapStages', params, success);
    },

    awardClear: function(mapStageId, success) {
      var params = {
        MapStageId: mapStageId
      };
      GameApi.post(MAPSTAGE_PHP, 'AwardClear', params, success);
    },

    explore: function(mapStageDetailId, success) {
      var params = {
        MapStageDetailId: mapStageDetailId
      };
      GameApi.post(MAPSTAGE_PHP, 'Explore', params, success);
    },

    getMapStageALL: function(success) {
      var params = {
      };
      GameApi.post(MAPSTAGE_PHP, 'GetMapStageALL&stageNum=' + max_stageNum, params, success);
    }



  }

});