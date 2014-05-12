DUNGEON_PHP = 'dungeon.php';

fmk.factory('DungeonApi', function(GameApi) {
  return {

    getUserDungeon: function(success) {
      var params = {
      };
      GameApi.post(DUNGEON_PHP, 'GetUserDungeon', params, success);
    },

    sweep: function(success) {
      var params = {
      };
      GameApi.post(DUNGEON_PHP, 'Sweep', params, success);
    }

  }

});