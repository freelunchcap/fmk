fmk.factory('FriendsBot', function(FriendsApi, FenergyApi, ProfileService) {

  function claimAndSend(friendList, callback) {
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

      function claimNext(callback) {
        if(toClaim.length > 0) {
          var next = toClaim[0];
          toClaim = toClaim.slice(1, toClaim.length);
          FenergyApi.getFEnergy(next.Uid, claimNext, callback);
        }
      }

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

      function sendNext() {
        if(toSend.length > 0) {
          var next = toSend[0];
          toSend = toSend.slice(1, toSend.length);
          FenergyApi.sendFEnergy(next.Uid, sendNext, callback);
        }
      }

      claimNext(sendNext);
    });
  }

  return {

    run: function(friendList, callback) {
      if(!friendList) {
        FriendsApi.getFriends(function(friends) {
          var friendList = friends.Friends;
          claimAndSend(friendList, callback);
        });
      } else
        claimAndSend(friendList, callback);
    }

  }

});