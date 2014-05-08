ARENA_PHP = 'arena.php';
ARENA_MANUAL_BATTLE = 1;
ARENA_AUTO_BATTLE = 0;
ARENA_FREE_FIGHT_CHIP = 1;
ARENA_FREE_FIGHT_NO_CHIP = 0;

fmk.factory('ArenaApiApi', function(GameApi) {
  return {

    getCompetitors: function(callback) {
      var params = {
      };
      GameApi.post(ARENA_PHP, 'GetCompetitors', params, callback);
    },

    freeFight: function(noChip, isManual, competitor, callback) {
      var params = {
        NoChip: noChip,
        isManual: isManual,
        competitor: competitor
      };
      GameApi.post(ARENA_PHP, 'FreeFight', params, callback);
    },

    rankFight: function(competitorRank, callback) {
      var params = {
        CompetitorRank: competitorRank
      };
      GameApi.post(ARENA_PHP, 'RankFight', params, callback);
    },

    getThieves: function(callback) {
      var params = {
      };
      GameApi.post(ARENA_PHP, 'GetThieves', params, callback);
    },

    thievesFight: function(userThievesId, callback) {
      var params = {
        UserThievesId: userThievesId
      };
      GameApi.post(ARENA_PHP, 'ThievesFight', params, callback);
    }
  }

});