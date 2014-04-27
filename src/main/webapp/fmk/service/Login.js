LOGIN_PHP = "login.php";

fmk.factory('Login', function(Game) {
  return {

    passportLogin: function(callback) {
      var token = Game.getToken();
      Game.post(LOGIN_PHP, 'passportLogin', {
        time: token.timestamp,
        key: token.key,
        Udid: '',
        Password: token.U_ID,
        Devicetoken: '',
        UserName: token.userName,
        Origin: ''
      }, callback);

    }

  }

});