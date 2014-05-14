fmk.factory('FriendsBot', function(FriendApi, FenergyApi, ProfileService) {

  function getFriends(callback) {
    FriendApi.getFriends(function(response) {
      if(callback)
        callback(response.Friends);
    });
  }


  function findFriend(fid, friendList) {
    return $.grep(friendList, function(friend) {
      return friend.Uid == fid;
    })[0];
  }

  function claimEnergy(fid, friendList, success, failure) {
    FenergyApi.getFEnergy(fid, function () {
      if(friendList)
        findFriend(fid, friendList).FEnergySurplus = 0;
      if(success)
        success();
    }, failure);
  }

  function sendEnergy(fid, friendList, success, failure) {
    FenergyApi.sendFEnergy(fid, function () {
      if(friendList)
        findFriend(fid, friendList).FEnergySend = 0;
      if(success)
        success();
    }, failure);
  }

  function claimAndSend(friendList, callback) {
    friendList = friendList.slice();
    ProfileService.getProfile(function(profile) {
      var friendsProfile = profile[FRIENDS_PROFILE];
      var toClaim = [];
      var toSend = [];
      $.each(friendList, function(index, friend) {
        if(friend.FEnergySurplus) {
          toClaim.push(friend);
          if(friendsProfile.returnSender && friend.FEnergySend)
            toSend.push(friend);
        }
      });

      if(friendsProfile.favourRecentOnline)
        friendList.sort(function(f1, f2) {
          return Date.parse(f2.LastLogin) - Date.parse(f1.LastLogin);
        });
      else
        friendList.sort(function(f1, f2) {
          return f1.Rank - f2.Rank;
        });
      $.each(friendList, function(index, friend) {
        if(friend.FEnergySend && $.inArray(friend, toSend) == -1)
          toSend.push(friend);
      });

      function claimNext() {
        if(toClaim.length > 0) {
          var next = toClaim[0];
          toClaim = toClaim.slice(1, toClaim.length);
          claimEnergy(next.Uid, friendList, claimNext, sendNext);
        } else
          sendNext();
      }
      function sendNext() {
        if(toSend.length > 0) {
          var next = toSend[0];
          toSend = toSend.slice(1, toSend.length);
          sendEnergy(next.Uid, friendList, sendNext, callback);
        } else if(callback)
          callback();
      }

      claimNext();
    });
  }

  return {

    run: function(callback, friends) {
      if(!friends) {
        getFriends(function(friends) {
          claimAndSend(friends, callback);
        });
      } else
        claimAndSend(friends, callback);
    },

    getFriends: function(callback) {
      getFriends(callback);
    },

    claimEnergy: function(fid, friendList, success, failure) {
      claimEnergy(fid, friendList, success, failure);
    },

    sendEnergy: function(fid, friendList, success, failure) {
      sendEnergy(fid, friendList, success, failure);
    }

  }

});