RUNE_PHP = 'mapstage.php';

fmk.factory('Rune', function(Game) {
  return {

    getAllRune: function(callback) {
      var params = {
      };
      Game.post(RUNE_PHP, 'GetAllRune', params, callback);
    },

    getUserRunes: function(callback) {
      var params = {
      };
      Game.post(RUNE_PHP, 'GetUserRunes', params, callback);
    }

  }

});