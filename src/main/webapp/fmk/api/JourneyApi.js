JOURNEY_PHP = 'Journey.php';

fmk.factory('JourneyApi', function(GameApi) {
  return {

    getUserJourneysStatus: function(success, failure) {
      var params = {
      };
      GameApi.post(JOURNEY_PHP, 'GetUserJourneysStatus', params, success, failure);
    },

    journeyFight: function(userJourneyId, success, failure) {
      var params = {
        userJourneyId: userJourneyId
      };
      GameApi.post(JOURNEY_PHP, 'JourneyFight', params, success, failure);
    },

    getUserJourneyInfo: function(userJourneyId, success, failure) {
      var params = {
        userJourneyId: userJourneyId
      };
      GameApi.post(JOURNEY_PHP, 'GetUserJourneyInfo', params, success, failure);
    },

    getFriendContributeList: function(success, failure) {
      var params = {
      };
      GameApi.post(JOURNEY_PHP, 'GetFriendContributeList', params, success, failure);
    },

    getContributePoints: function(success, failure) {
      var params = {
      };
      GameApi.post(JOURNEY_PHP, 'GetContributePoints', params, success, failure);
    },

    getRandList: function(success, failure) {
      var params = {
      };
      GameApi.post(JOURNEY_PHP, 'GetRandList', params, success, failure);
    },

    getMyRandList: function(success, failure) {
      var params = {
      };
      GameApi.post(JOURNEY_PHP, 'GetMyRandList', params, success, failure);
    },

    getRankRewardList: function(success, failure) {
      var params = {
      };
      GameApi.post(JOURNEY_PHP, 'GetRankRewardList', params, success, failure);
    },

    getLegionRankList: function(success, failure) {
      var params = {
      };
      GameApi.post(JOURNEY_PHP, 'GetLegionRankList', params, success, failure);
    },

    getMyLegionRankList: function(success, failure) {
      var params = {
      };
      GameApi.post(JOURNEY_PHP, 'GetMyLegionRankList', params, success, failure);
    },

    getLegionRankRewardList: function(success, failure) {
      var params = {
      };
      GameApi.post(JOURNEY_PHP, 'GetLegionRankRewardList', params, success, failure);
    },

    getJourneyPointReward: function(userJourneyId, success, failure) {
      var params = {
        userJourneyId: userJourneyId
      };
      GameApi.post(JOURNEY_PHP, 'GetJourneyPointReward', params, success, failure);
    },

    clearCDTime: function(success, failure) {
      var params = {
      };
      GameApi.post(JOURNEY_PHP, 'ClearCDTime', params, success, failure);
    },

    getPointsAchievedStatus: function(success, failure) {
      var params = {
      };
      GameApi.post(JOURNEY_PHP, 'GetPointsAchievedStatus', params, success, failure);
    },

    getRules: function(success, failure) {
      var params = {
      };
      GameApi.post(JOURNEY_PHP, 'GetRules', params, success, failure);
    }

  }

});