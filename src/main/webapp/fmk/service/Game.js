fmk.factory('Game', function() {

  var token;

  return {

    setToken: function(result) {
      token = result;
    },

    getToken: function() {
      return token;
    },

    post: function(service, action, param, callback) {
      $.ajax({
        url: token.GS_IP + service + (action ? '?do=' + action : ''),
        data: param,
        type: 'POST',
        dataType: 'json',
        timeout: 30000,
        success: callback
      })
    }

  }
});