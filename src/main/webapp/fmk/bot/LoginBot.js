fmk.factory('LoginBot', function(GameApi, LoginApi, WebApi) {
  return {
    login: function(username, password, callback) {
      WebApi.login(username, password, function(token) {
        GameApi.setToken(token);
        LoginApi.passportLogin(callback);
      });
    }
  }
});