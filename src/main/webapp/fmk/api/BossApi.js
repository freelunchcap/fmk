BOSS_PHP = 'boss.php';

fmk.factory('BossApi', function(GameApi) {
  return {

    getBoss: function(success) {
      var params = {
      };
      GameApi.post(BOSS_PHP, 'GetBoss', params, success);
    },

    fight: function(success) {
      var params = {
      };
      GameApi.post(BOSS_PHP, 'Fight', params, success);
    },

    getFightData: function(success) {
      var params = {
      };
      GameApi.post(BOSS_PHP, 'GetFightData', params, success);
    },

    getRanks: function(success) {
      var params = {
      };
      GameApi.post(BOSS_PHP, 'GetRanks', params, success);
    },

    buyTime: function(success) {
      var params = {
      };
      GameApi.post(BOSS_PHP, 'BuyTime', params, success);
    },

    getStatus: function(success) {
      var params = {
      };
      GameApi.post(BOSS_PHP, 'GetStatus', params, success);
    }
  }

});