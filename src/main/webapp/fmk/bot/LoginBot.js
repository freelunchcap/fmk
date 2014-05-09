LOGIN_BOT_ACCOUNTS = "accounts";

fmk.factory('LoginBot', function(GameApi, LoginApi, WebApi, StorageService) {

  var accounts = StorageService.getObject(LOGIN_BOT_ACCOUNTS) || [];
  function saveAccounts() {
    StorageService.setObject(LOGIN_BOT_ACCOUNTS, accounts);
  }

  return {

    getAccounts: function() {
      return accounts;
    },

    login: function(username, password, callback) {
      WebApi.login(username, password, function(token) {
        GameApi.setToken(token);
        LoginApi.passportLogin(function() {
          var previousRecord = $.grep(accounts, function(record) {
            return record.username == username;
          });

          var account;
          var timestamp = new Date().getTime();
          if(previousRecord.length == 0) {
            account = {
              username: username,
              password: password,
              server: token.GS_DESC,
              timestamp: timestamp
            };
            accounts.push(account);
          }
          else {
            previousRecord[0].timestamp = timestamp;
            account = previousRecord[0];
          }

          saveAccounts();
          if(callback)
            callback(account);
        });
      });
    }
  }
});