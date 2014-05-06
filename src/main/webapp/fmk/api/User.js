USER_PHP = 'user.php';

fmk.factory('User', function(Game) {
  return {

    editNickName: function(sex, inviteCode, nickName, callback) {
      var params = {
        Sex: sex,
        InviteCode: inviteCode,
        NickName: nickName
      };
      Game.post(USER_PHP, 'EditNickName', params, callback);
    },

    editFresh: function(freshStep, callback) {
      var params = {
        FreshStep: freshStep
      };
      Game.post(USER_PHP, 'EditFresh', params, callback);
    },

    getUserSalary: function(callback) {
      var params = {
      };
      Game.post(USER_PHP, 'GetUserSalary', params, callback);
    },

    awardSalary: function(callback) {
      var params = {
      };
      Game.post(USER_PHP, 'AwardSalary', params, callback);
    },

    getUserinfo: function(callback) {
      var params = {
      };
      Game.post(USER_PHP, 'GetUserinfo', params, callback);
    },

    getStatus: function(callback) {
      var params = {
      };
      Game.post(USER_PHP, 'GetStatus', params, callback);
    }
  }

});