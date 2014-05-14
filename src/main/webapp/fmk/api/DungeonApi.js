DUNGEON_PHP = 'dungeon.php';
DUNGEON_MANUAL_BATTLE = 1;
DUNGEON_AUTO_BATTLE = 0;

fmk.factory('DungeonApi', function(GameApi) {
  return {

    getUserDungeon: function(success) {
      var params = {
      };
      GameApi.post(DUNGEON_PHP, 'GetUserDungeon', params, success);
    },

    buyResurrection: function(success) {
      var params = {

      };
      GameApi.post(DUNGEON_PHP, 'BuyResurrection', params, success);
    },

    clearBufferCd: function(success) {
      var params = {

      };
      GameApi.post(DUNGEON_PHP, 'ClearBufferCd', params, success);
    },

    refreshBuffer: function(success) {
      var params = {

      };
      GameApi.post(DUNGEON_PHP, 'RefreshBuffer', params, success);
    },

    buyBuffer: function(success) {
      var params = {

      };
      GameApi.post(DUNGEON_PHP, 'BuyBuffer', params, success);
    },

    getRankUsers: function(success) {
      var params = {

      };
      GameApi.post(DUNGEON_PHP, 'GetRankUsers', params, success);
    },

    getOldRank: function(success) {
      var params = {

      };
      GameApi.post(DUNGEON_PHP, 'GetOldRank', params, success);
    },

    buffer: function(success) {
      var params = {

      };
      GameApi.post(DUNGEON_PHP, 'Buffer', params, success);
    },

    sweep: function(success) {
      var params = {
      };
      GameApi.post(DUNGEON_PHP, 'Sweep', params, success);
    },

    fight: function(layer, isManual, success) {
      var params = {
        Layer: layer,
        isManual: isManual
      };
      GameApi.post(DUNGEON_PHP, 'Fight', params, success);
    },

    award: function(success) {
      var params = {

      };
      GameApi.post(DUNGEON_PHP, 'Award', params, success);
    },

    getStrategy: function(success) {
      var params = {

      };
      GameApi.post(DUNGEON_PHP, 'GetStrategy', params, success);
    },

    buyAnger: function(success) {
      var params = {

      };
      GameApi.post(DUNGEON_PHP, 'BuyAnger', params, success);
    },

    fightManual: function(success) {
      var params = {

      };
      GameApi.post(DUNGEON_PHP, 'FightManual', params, success);
    }

  }

});