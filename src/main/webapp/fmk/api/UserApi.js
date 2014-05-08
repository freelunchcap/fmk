USER_PHP = 'user.php';

fmk.factory('UserApi', function(GameApi) {
  return {

    editNickName: function(sex, inviteCode, nickName, callback) {
      var params = {
        Sex: sex,
        InviteCode: inviteCode,
        NickName: nickName
      };
      GameApi.post(USER_PHP, 'EditNickName', params, callback);
    },

    editFresh: function(freshStep, callback) {
      var params = {
        FreshStep: freshStep
      };
      GameApi.post(USER_PHP, 'EditFresh', params, callback);
    },

    getUserSalary: function(callback) {
      var params = {
      };
      GameApi.post(USER_PHP, 'GetUserSalary', params, callback);
    },

    awardSalary: function(callback) {
      var params = {
      };
      GameApi.post(USER_PHP, 'AwardSalary', params, callback);
    },

    getUserinfo: function(callback) {
      var params = {
      };
      GameApi.post(USER_PHP, 'GetUserinfo', params, callback);
    },

    getStatus: function(callback) {
      var params = {
      };
      GameApi.post(USER_PHP, 'GetStatus', params, callback);
    }
  }

});