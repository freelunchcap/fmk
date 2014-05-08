STRENG_PHP = 'streng.php';

fmk.factory('StrengApi', function(GameApi) {
  return {

    card: function(userCardId1, userCardId2, callback) {
      var params = {
        UserCardId1: userCardId1,
        UserCardId2: userCardId2
      };
      GameApi.post(STRENG_PHP, 'Card', params, callback);
    }

  }

});