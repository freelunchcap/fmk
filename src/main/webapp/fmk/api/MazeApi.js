MAZE_PHP = 'maze.php';
MAZE_MANUAL_BATTLE = 1;
MAZE_AUTO_BATTLE = 0;

fmk.factory('MazeApi', function(GameApi) {
  return {

    battle: function(manual, mapStageId, layer, itemIndex, success) {
      var params = {
        manual: manual,
        MapStageId: mapStageId,
        Layer: layer,
        ItemIndex: itemIndex
      };
      GameApi.post(MAZE_PHP, 'Battle', params, success);
    },

    info: function(mapStageId, layer, success) {
      var params = {
        MapStageId: mapStageId,
        Layer: layer
      };
      GameApi.post(MAZE_PHP, 'Info', params, success);
    },

    show: function(mapStageId, success) {
      var params = {
        MapStageId: mapStageId
      };
      GameApi.post(MAZE_PHP, 'Show', params, success);
    },

    reset: function(mapStageId, success) {
      var params = {
        MapStageId: mapStageId
      };
      GameApi.post(MAZE_PHP, 'Reset', params, success);
    }
  }

});