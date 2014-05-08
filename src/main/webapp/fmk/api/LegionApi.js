LEGION_PHP = 'legion.php';

fmk.factory('RuneApi', function(GameApi) {
  return {

    getTech: function(callback) {
      var params = {
      };
      GameApi.post(LEGION_PHP, 'GetTech', params, callback);
    },

    getUserLegion: function(callback) {
      var params = {
      };
      GameApi.post(LEGION_PHP, 'GetUserLegion', params, callback);
    },

    getLegions: function(callback) {
      var params = {
      };
      GameApi.post(LEGION_PHP, 'GetLegions', params, callback);
    },

    getMember: function(callback) {
      var params = {
      };
      GameApi.post(LEGION_PHP, 'getMember', params, callback);
    },

    donate: function(type, techType, coins, callback) {
      var params = {
        Type: type,
        TechType: techType,
        Coins: coins
      };
      GameApi.post(LEGION_PHP, 'Donate', params, callback);
    }

  }

});