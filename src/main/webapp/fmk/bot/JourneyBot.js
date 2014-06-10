fmk.factory('JourneyBot', function(UserBot, $timeout) {

  function findMapstage(callback) {
    UserBot.getUserMapstages(function(userMapstages) {
      var stage = null;
      $.each(userMapstages, function(index, userMapstage) {
        if(stage == null || userMapstage.FinishedStage >= stage.FinishedStage)
          stage = userMapstage;
      });
      if(callback)
        callback(stage);
    });
  }




  return {

    exploreForBoss: function(success, failure) {
      findMapstage(function(mapStage) {

      });
    }

  };

});