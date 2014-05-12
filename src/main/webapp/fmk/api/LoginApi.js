LOGIN_PHP = 'login.php';

fmk.factory('LoginApi', function(GameApi) {
  return {

    passportLogin: function(success) {
      var token = GameApi.getToken();
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

      GameApi.post(LOGIN_PHP, 'passportLogin', params, success);
    }
  }

});