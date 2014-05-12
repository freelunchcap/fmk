ARENA_PHP = 'arena.php';
ARENA_MANUAL_BATTLE = 1;
ARENA_AUTO_BATTLE = 0;
ARENA_FREE_FIGHT_CHIP = 1;
ARENA_FREE_FIGHT_NO_CHIP = 0;

fmk.factory('ArenaApiApi', function(GameApi) {
  return {

    getCompetitors: function(success) {
      var params = {
      };
      GameApi.post(ARENA_PHP, 'GetCompetitors', params, success);
    },

    freeFight: function(noChip, isManual, competitor, success) {
      var params = {
        NoChip: noChip,
        isManual: isManual,
        competitor: competitor
      };
      GameApi.post(ARENA_PHP, 'FreeFight', params, success);
    },

    rankFight: function(competitorRank, success) {
      var params = {
        CompetitorRank: competitorRank
      };
      GameApi.post(ARENA_PHP, 'RankFight', params, success);
    },

    getThieves: function(success) {
      var params = {
      };
      GameApi.post(ARENA_PHP, 'GetThieves', params, success);
    },

    thievesFight: function(userThievesId, success) {
      var params = {
        UserThievesId: userThievesId
      };
      GameApi.post(ARENA_PHP, 'ThievesFight', params, success);
    }
  }

});