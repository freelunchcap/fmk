LOGIN_PHP = 'login.php';

fmk.factory('Login', function(Game) {
  return {

    passportLogin: function(callback) {
      var token = Game.getToken();
      var params = {
        Password: token.U_ID,
        IDFA: getIDFA(token.userName),
        time: token.timestamp,
        newguide: token.G_TYPE,
        ppgamename: 'CARD-IPHONE-CHS',
        UDid: '',
        key: token.key,
        UserName: token.userName,
        Origin: ''
      };

      Game.post(LOGIN_PHP, 'passportLogin', params, callback);
    }
  }

});