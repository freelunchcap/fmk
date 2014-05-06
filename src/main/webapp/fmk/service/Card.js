CARD_PHP = 'card.php';

fmk.factory('Card', function(Game) {
  return {

    getUserCards: function(callback) {
      var params = {
      };
      Game.post(CARD_PHP, 'GetUserCards', params, callback);
    },

    getCardGroup: function(callback) {
      var params = {
      };
      Game.post(CARD_PHP, 'GetCardGroup', params, callback);
    },

    setCardGroup: function(cards, runes, groupId, callback) {
      var params = {
        Cards: cards,
        Runes: runes,
        GroupId: groupId
      };
      Game.post(CARD_PHP, 'SetCardGroup', params, callback);
    },

    getAllSkill: function(callback) {
      var params = {
      };
      Game.post(CARD_PHP, 'GetAllSkill', params, callback);
    },

    getAllCard: function(callback) {
      var params = {
      };
      Game.post(CARD_PHP, 'getAllCard', params, callback);
    }
  }

});