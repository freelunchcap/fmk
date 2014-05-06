STRENG_PHP = 'streng.php';

fmk.factory('Streng', function(Game) {
  return {

    card: function(userCardId1, userCardId2, callback) {
      var params = {
        UserCardId1: userCardId1,
        UserCardId2: userCardId2
      };
      Game.post(STRENG_PHP, 'Card', params, callback);
    }

  }

});