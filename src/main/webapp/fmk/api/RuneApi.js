RUNE_PHP = 'rune.php';

fmk.factory('RuneApi', function(GameApi) {
  return {

    getAllRune: function(success) {
      var params = {
      };
      GameApi.post(RUNE_PHP, 'GetAllRune', params, success);
    },

    getUserRunes: function(success) {
      var params = {
      };
      GameApi.post(RUNE_PHP, 'GetUserRunes', params, success);
    }

  }

});