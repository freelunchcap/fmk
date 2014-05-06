LOGIN_PHP = 'friend.php';
AGREE = 'agree';
REJECT = 'reject';

fmk.factory('Friend', function(Game) {
  return {

    getFriends: function(callback) {
      var params = {
      };
      Game.post(LOGIN_PHP, 'GetFriends', params, callback);
    },

    getFriendApplys: function(callback) {
      var params = {
      };
      Game.post(LOGIN_PHP, 'GetFriendApplys', params, callback);
    },

    disposeFriendApply: function(type, fid, callback) {
      var params = {
        type: type,
        Fid: fid
      };
      Game.post(LOGIN_PHP, 'DisposeFriendApply', params, callback);
    }

  }

});