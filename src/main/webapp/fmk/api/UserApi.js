USER_PHP = 'user.php';

fmk.factory('UserApi', function(GameApi) {
  return {

    editNickName: function(sex, inviteCode, nickName, success) {
      var params = {
        Sex: sex,
        InviteCode: inviteCode,
        NickName: nickName
      };
      GameApi.post(USER_PHP, 'EditNickName', params, success);
    },

    editFresh: function(freshStep, success) {
      var params = {
        FreshStep: freshStep
      };
      GameApi.post(USER_PHP, 'EditFresh', params, success);
    },

    getUserSalary: function(success) {
      var params = {
      };
      GameApi.post(USER_PHP, 'GetUserSalary', params, success);
    },

    awardSalary: function(success) {
      var params = {
      };
      GameApi.post(USER_PHP, 'AwardSalary', params, success);
    },

    getUserinfo: function(success) {
      var params = {
      };
      GameApi.post(USER_PHP, 'GetUserinfo', params, success);
    },

    getStatus: function(success) {
      var params = {
      };
      GameApi.post(USER_PHP, 'GetStatus', params, success);
    }
  }

});