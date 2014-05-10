DUNGEON_PHP = 'dungeon.php';

fmk.factory('DungeonApi', function(GameApi) {
  return {

    getUserDungeon: function(callback) {
      var params = {
      };
      GameApi.post(DUNGEON_PHP, 'GetUserDungeon', params, callback);
    },

    sweep: function(callback) {
      var params = {
      };
      GameApi.post(DUNGEON_PHP, 'Sweep', params, callback);
    }

  }

});