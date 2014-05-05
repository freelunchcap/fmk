fmk.factory('Game', function() {

  var token;

  return {

    setToken: function(result) {
      token = result;
    },

    getToken: function() {
      return token;
    },

    post: function(service, action, params, callback) {
      postRequest(token.GS_IP, service, action, params, callback);
    }

  }
});