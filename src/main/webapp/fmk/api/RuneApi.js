RUNE_PHP = 'rune.php';

fmk.factory('RuneApi', function(GameApi) {
  return {

    getAllRune: function(callback) {
      var params = {
      };
      GameApi.post(RUNE_PHP, 'GetAllRune', params, callback);
    },

    getUserRunes: function(callback) {
      var params = {
      };
      GameApi.post(RUNE_PHP, 'GetUserRunes', params, callback);
    }

  }

});