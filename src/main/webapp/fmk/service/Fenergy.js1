FENERGY_PHP = 'fenergy.php';

fmk.factory('FEnergy', function(Game) {
  return {

    sendFEnergy: function(fid, callback) {
      var params = {
        Fid: fid
      };
      Game.post(FENERGY_PHP, 'SendFEnergy', params, callback);
    },

    getFEnergy: function(fid, callback) {
      var params = {
        Fid: fid
      };
      Game.post(FENERGY_PHP, 'GetFEnergy', params, callback);
    }

  }

});