CARD_PHP = 'card.php';

fmk.factory('CardApi', function(GameApi) {
  return {

    getUserCards: function(success) {
      var params = {
      };
      GameApi.post(CARD_PHP, 'GetUserCards', params, success);
    },

    getCardGroup: function(success) {
      var params = {
      };
      GameApi.post(CARD_PHP, 'GetCardGroup', params, success);
    },

    setCardGroup: function(cards, runes, groupId, success) {
      var params = {
        Cards: cards,
        Runes: runes,
        GroupId: groupId
      };
      GameApi.post(CARD_PHP, 'SetCardGroup', params, success);
    },

    setDefaultGroup: function(groupId, success, failure) {
      var params = {
        GroupId: groupId
      };
      GameApi.post(CARD_PHP, 'SetDefalutGroup', params, success, failure);
    },

    getAllSkill: function(success) {
      var params = {
      };
      GameApi.post(CARD_PHP, 'GetAllSkill', params, success);
    },

    getAllCard: function(success) {
      var params = {
      };
      GameApi.post(CARD_PHP, 'getAllCard', params, success);
    }
  }

});