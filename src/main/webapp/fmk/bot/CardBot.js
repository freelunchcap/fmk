fmk.factory('CardBot', function(CardApi, GameApi) {

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

  function setCurrentCardGroup(pos, success, failure) {

  }

  function getCurrentCardGroup(success, failure) {
    getAllCardGroups(function(allCardGroups) {
      var groups = allCardGroups.Groups;
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