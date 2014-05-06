LOGIN_PHP = "maze.php";

fmk.factory('Maze', function(Game) {
  return {

    battle: function(manual, mapStageId, layer, itemIndex, callback) {
      var params = {
        manual: manual,
        MapStageId: mapStageId,
        Layer: layer,
        ItemIndex: itemIndex
      };
      Game.post(LOGIN_PHP, 'Battle', params, callback);
    },

    info: function(mapStageId, layer, callback) {
      var params = {
        MapStageId: mapStageId,
        Layer: layer
      };
      Game.post(LOGIN_PHP, 'Info', params, callback);
    },

    show: function(mapStageId, callback) {
      var params = {
        MapStageId: mapStageId
      };
      Game.post(LOGIN_PHP, 'Show', params, callback);
    },

    reset: function(mapStageId, callback) {
      var params = {
        MapStageId: mapStageId
      };
      Game.post(LOGIN_PHP, 'reset', params, callback);
    }
  }

});