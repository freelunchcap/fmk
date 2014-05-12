LEGION_PHP = 'legion.php';

fmk.factory('RuneApi', function(GameApi) {
  return {

    getTech: function(success) {
      var params = {
      };
      GameApi.post(LEGION_PHP, 'GetTech', params, success);
    },

    getUserLegion: function(success) {
      var params = {
      };
      GameApi.post(LEGION_PHP, 'GetUserLegion', params, success);
    },

    getLegions: function(success) {
      var params = {
      };
      GameApi.post(LEGION_PHP, 'GetLegions', params, success);
    },

    getMember: function(success) {
      var params = {
      };
      GameApi.post(LEGION_PHP, 'getMember', params, success);
    },

    donate: function(type, techType, coins, success) {
      var params = {
        Type: type,
        TechType: techType,
        Coins: coins
      };
      GameApi.post(LEGION_PHP, 'Donate', params, success);
    }

  }

});