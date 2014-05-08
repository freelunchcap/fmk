FRIEND_PHP = 'friend.php';
FRIEND_AGREE = 'agree';
FRIEND_REJECT = 'reject';

fmk.factory('FriendApi', function(GameApi) {
  return {

    getFriends: function(callback) {
      var params = {
      };
      GameApi.post(FRIEND_PHP, 'GetFriends', params, callback);
    },

    getFriendApplys: function(callback) {
      var params = {
      };
      GameApi.post(FRIEND_PHP, 'GetFriendApplys', params, callback);
    },

    disposeFriendApply: function(type, fid, callback) {
      var params = {
        type: type,
        Fid: fid
      };
      GameApi.post(FRIEND_PHP, 'DisposeFriendApply', params, callback);
    }

  }

});