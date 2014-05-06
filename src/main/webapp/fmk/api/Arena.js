ARENA_PHP = 'arena.php';
ARENA_MANUAL_BATTLE = 1;
ARENA_AUTO_BATTLE = 0;
ARENA_FREE_FIGHT_CHIP = 1;
ARENA_FREE_FIGHT_NO_CHIP = 0;

fmk.factory('Arena', function(Game) {
  return {

    getCompetitors: function(callback) {
      var params = {
      };
      Game.post(ARENA_PHP, 'GetCompetitors', params, callback);
    },

    freeFight: function(noChip, isManual, competitor, callback) {
      var params = {
        NoChip: noChip,
        isManual: isManual,
        competitor: competitor
      };
      Game.post(ARENA_PHP, 'FreeFight', params, callback);
    },

    rankFight: function(competitorRank, callback) {
      var params = {
        CompetitorRank: competitorRank
      };
      Game.post(ARENA_PHP, 'RankFight', params, callback);
    },

    getThieves: function(callback) {
      var params = {
      };
      Game.post(ARENA_PHP, 'GetThieves', params, callback);
    },

    thievesFight: function(userThievesId, callback) {
      var params = {
        UserThievesId: userThievesId
      };
      Game.post(ARENA_PHP, 'ThievesFight', params, callback);
    }
  }

});