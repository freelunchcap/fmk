LEGION_PHP = 'legion.php';

fmk.factory('Rune', function(Game) {
  return {

    getTech: function(callback) {
      var params = {
      };
      Game.post(LEGION_PHP, 'GetTech', params, callback);
    },

    getUserLegion: function(callback) {
      var params = {
      };
      Game.post(LEGION_PHP, 'GetUserLegion', params, callback);
    },

    getLegions: function(callback) {
      var params = {
      };
      Game.post(LEGION_PHP, 'GetLegions', params, callback);
    },

    getMember: function(callback) {
      var params = {
      };
      Game.post(LEGION_PHP, 'getMember', params, callback);
    },

    donate: function(type, techType, coins, callback) {
      var params = {
        Type: type,
        TechType: techType,
        Coins: coins
      };
      Game.post(LEGION_PHP, 'Donate', params, callback);
    }

  }

});