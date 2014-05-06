MAZE_PHP = 'maze.php';
MAZE_MANUAL_BATTLE = 1;
MAZE_AUTO_BATTLE = 0;

fmk.factory('Maze', function(Game) {
  return {

    battle: function(manual, mapStageId, layer, itemIndex, callback) {
      var params = {
        manual: manual,
        MapStageId: mapStageId,
        Layer: layer,
        ItemIndex: itemIndex
      };
      Game.post(MAZE_PHP, 'Battle', params, callback);
    },

    info: function(mapStageId, layer, callback) {
      var params = {
        MapStageId: mapStageId,
        Layer: layer
      };
      Game.post(MAZE_PHP, 'Info', params, callback);
    },

    show: function(mapStageId, callback) {
      var params = {
        MapStageId: mapStageId
      };
      Game.post(MAZE_PHP, 'Show', params, callback);
    },

    reset: function(mapStageId, callback) {
      var params = {
        MapStageId: mapStageId
      };
      Game.post(MAZE_PHP, 'Reset', params, callback);
    }
  }

});