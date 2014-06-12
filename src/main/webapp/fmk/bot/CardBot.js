fmk.factory('CardBot', function(CardApi, GameApi, UserBot) {

  var cardGroups = {};

  function getAllCardGroups(success) {
    var token = GameApi.getToken();
    var username = token.userName;
    if(cardGroups[username] != null) {
      if(success)
        success(cardGroups[username]);
    } else {
      CardApi.getCardGroup(function(cardGroup) {
        cardGroups[username] = cardGroup;
        if(success)
          success(cardGroup);
      });
    }
  }

  function sortCardGroupByPos(allCardGroups) {
    var groups = allCardGroups.Groups;
    var result = {};
    var count = 1;
    $.each(groups, function(index, group) {
      if(group.Type == 1)
        result.def = group;
      else
        result[count++] = group;
    });
    return result;
  }

  function setCurrentCardGroup(pos, success, failure) {
    getAllCardGroups(function(allCardGroups) {
      var targetCardGroup = sortCardGroupByPos(allCardGroups)[pos];
      if(targetCardGroup != null)
        CardApi.setDefaultGroup(targetCardGroup.GroupId, success, failure);
    });
  }

  function getCurrentCardGroup(success, failure) {
    UserBot.getUserinfo(function(userinfo) {
      var currentCardGroup = userinfo.DefaultGroupId;
      getAllCardGroups(function(allCardGroups) {
        var sortedGroups = sortCardGroupByPos(allCardGroups);
        $.each(sortedGroups, function(pos, group) {
          if(group.GroupId == currentCardGroup) {
            if(success)
              success(pos);
            return false;
          }
          return true;
        });
      });
    });
  }

  return {
    setCurrentCardGroup: function(pos, success, failure) {
      setCurrentCardGroup(pos, success, failure);
    },

    getCurrentCardGroup: function(success, failure) {
      getCurrentCardGroup(success, failure);
    }

  };

});