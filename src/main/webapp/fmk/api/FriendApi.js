FRIEND_PHP = 'friend.php';
FRIEND_AGREE = 'agree';
FRIEND_REJECT = 'reject';

fmk.factory('FriendApi', function(GameApi) {
  return {

    getFriends: function(success) {
      var params = {
      };
      GameApi.post(FRIEND_PHP, 'GetFriends', params, success);
    },

    getFriendApplys: function(success) {
      var params = {
      };
      GameApi.post(FRIEND_PHP, 'GetFriendApplys', params, success);
    },

    disposeFriendApply: function(type, fid, success) {
      var params = {
        type: type,
        Fid: fid
      };
      GameApi.post(FRIEND_PHP, 'DisposeFriendApply', params, success);
    }

  }

});