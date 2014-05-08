FENERGY_PHP = 'fenergy.php';

fmk.factory('FenergyApi', function(GameApi) {
  return {

    sendFEnergy: function(fid, callback) {
      var params = {
        Fid: fid
      };
      GameApi.post(FENERGY_PHP, 'SendFEnergy', params, callback);
    },

    getFEnergy: function(fid, callback) {
      var params = {
        Fid: fid
      };
      GameApi.post(FENERGY_PHP, 'GetFEnergy', params, callback);
    }

  }

});