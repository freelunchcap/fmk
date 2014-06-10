JOURNEY_PHP = 'Journey.php';

fmk.factory('JourneyApiApi', function(GameApi) {
  return {

    getUserJourneysStatus: function(success) {
      var params = {
      };
      GameApi.post(JOURNEY_PHP, 'GetUserJourneysStatus', params, success);
    },

    journeyFight: function(success) {
      var params = {
      };
      GameApi.post(JOURNEY_PHP, 'JourneyFight', params, success);
    },

    getUserJourneyInfo: function(success) {
      var params = {
      };
      GameApi.post(JOURNEY_PHP, 'GetUserJourneyInfo', params, success);
    },

    getFriendContributeList: function(success) {
      var params = {
      };
      GameApi.post(JOURNEY_PHP, 'GetFriendContributeList', params, success);
    },

    getContributePoints: function(success) {
      var params = {
      };
      GameApi.post(JOURNEY_PHP, 'GetContributePoints', params, success);
    },

    getRandList: function(success) {
      var params = {
      };
      GameApi.post(JOURNEY_PHP, 'GetRandList', params, success);
    },

    getMyRandList: function(success) {
      var params = {
      };
      GameApi.post(JOURNEY_PHP, 'GetMyRandList', params, success);
    },

    getRankRewardList: function(success) {
      var params = {
      };
      GameApi.post(JOURNEY_PHP, 'GetRankRewardList', params, success);
    },

    getLegionRankList: function(success) {
      var params = {
      };
      GameApi.post(JOURNEY_PHP, 'GetLegionRankList', params, success);
    },

    getMyLegionRankList: function(success) {
      var params = {
      };
      GameApi.post(JOURNEY_PHP, 'GetMyLegionRankList', params, success);
    },

    getLegionRankRewardList: function(success) {
      var params = {
      };
      GameApi.post(JOURNEY_PHP, 'GetLegionRankRewardList', params, success);
    },

    getJourneyPointReward: function(success) {
      var params = {
      };
      GameApi.post(JOURNEY_PHP, 'GetJourneyPointReward', params, success);
    },

    clearCDTime: function(success) {
      var params = {
      };
      GameApi.post(JOURNEY_PHP, 'ClearCDTime', params, success);
    },

    getPointsAchievedStatus: function(success) {
      var params = {
      };
      GameApi.post(JOURNEY_PHP, 'GetPointsAchievedStatus', params, success);
    },

    getRules: function(success) {
      var params = {
      };
      GameApi.post(JOURNEY_PHP, 'GetRules', params, success);
    }

  }

});