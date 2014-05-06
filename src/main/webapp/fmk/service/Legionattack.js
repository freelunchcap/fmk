LEGIONATTACK_PHP = 'legionattack.php';

fmk.factory('Legionattack', function(Game) {
  return {

    info: function(callback) {
      var params = {
      };
      Game.post(LEGIONATTACK_PHP, 'info', params, callback);
    }

  }

});