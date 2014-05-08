LOGIN_BOT_LOGIN_RECORDS = "login_records";

fmk.factory('LoginBot', function(GameApi, LoginApi, WebApi, Storage) {

  var loginRecords = Storage.getObject(LOGIN_BOT_LOGIN_RECORDS) || [];
  function saveLoginRecords() {
    Storage.setObject(LOGIN_BOT_LOGIN_RECORDS, loginRecords);
  }

  return {

    getLoginRecords: function() {
      return loginRecords;
    },

    login: function(username, password, callback) {
      WebApi.login(username, password, function(token) {
        GameApi.setToken(token);
        LoginApi.passportLogin(function() {
          var newRecord = {
            username: username,
            password: password,
            server: token.GS_DESC,
            timestamp: new Date().getTime()
          };

          var existingRecord = $.grep(loginRecords, function(record) {
            return record.username = newRecord.username;
          });
          if(existingRecord.length == 0)
            loginRecords.push(newRecord);
          else {
            existingRecord[0].timestamp = newRecord.timestamp;
            newRecord = existingRecord[0];
          }

          saveLoginRecords();
          if(callback)
            callback(newRecord);
        });
      });
    }
  }
});