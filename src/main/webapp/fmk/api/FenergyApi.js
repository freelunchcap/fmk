FENERGY_PHP = 'fenergy.php';

fmk.factory('FenergyApi', function(GameApi) {
  return {

    sendFEnergy: function(fid, success, failure) {
      var params = {
        Fid: fid
      };
      GameApi.post(FENERGY_PHP, 'SendFEnergy', params, success, failure);
    },

    getFEnergy: function(fid, success, failure) {
      var params = {
        Fid: fid
      };
      GameApi.post(FENERGY_PHP, 'GetFEnergy', params, success, failure);
    }

  }

});