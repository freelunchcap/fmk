CARD_PHP = 'card.php';

fmk.factory('CardApi', function(GameApi) {
  return {

    getUserCards: function(callback) {
      var params = {
      };
      GameApi.post(CARD_PHP, 'GetUserCards', params, callback);
    },

    getCardGroup: function(callback) {
      var params = {
      };
      GameApi.post(CARD_PHP, 'GetCardGroup', params, callback);
    },

    setCardGroup: function(cards, runes, groupId, callback) {
      var params = {
        Cards: cards,
        Runes: runes,
        GroupId: groupId
      };
      GameApi.post(CARD_PHP, 'SetCardGroup', params, callback);
    },

    getAllSkill: function(callback) {
      var params = {
      };
      GameApi.post(CARD_PHP, 'GetAllSkill', params, callback);
    },

    getAllCard: function(callback) {
      var params = {
      };
      GameApi.post(CARD_PHP, 'getAllCard', params, callback);
    }
  }

});