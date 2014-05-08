MAZE_PHP = 'maze.php';
MAZE_MANUAL_BATTLE = 1;
MAZE_AUTO_BATTLE = 0;

fmk.factory('MazeApi', function(GameApi) {
  return {

    battle: function(manual, mapStageId, layer, itemIndex, callback) {
      var params = {
        manual: manual,
        MapStageId: mapStageId,
        Layer: layer,
        ItemIndex: itemIndex
      };
      GameApi.post(MAZE_PHP, 'Battle', params, callback);
    },

    info: function(mapStageId, layer, callback) {
      var params = {
        MapStageId: mapStageId,
        Layer: layer
      };
      GameApi.post(MAZE_PHP, 'Info', params, callback);
    },

    show: function(mapStageId, callback) {
      var params = {
        MapStageId: mapStageId
      };
      GameApi.post(MAZE_PHP, 'Show', params, callback);
    },

    reset: function(mapStageId, callback) {
      var params = {
        MapStageId: mapStageId
      };
      GameApi.post(MAZE_PHP, 'Reset', params, callback);
    }
  }

});