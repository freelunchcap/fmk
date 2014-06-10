fmk.factory('JourneyBot', function(JourneyApi, UserBot, $timeout) {

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

  function getJourneyPointReward(userJourneyId, success, failure) {
    JourneyApi.getJourneyPointReward(userJourneyId, success, failure);
  }

  function getUserJourneyInfo(userJourneyId, success, failure) {
    JourneyApi.getUserJourneyInfo(userJourneyId, success, failure);
  }

  function fightJourney(userJourneyId, success, failure) {
    JourneyApi.journeyFight(userJourneyId, success, failure);
  }

  var currentUserJourneysStatus;
  var updatePromise;
  var regularUpdate = true;

  function getUserJourneysStatus(callback, refresh) {
    if(!currentUserJourneysStatus || refresh) {
      cancelNextUpdate();
      JourneyApi.getUserJourneysStatus(function(userJourneysStatus) {
        if(regularUpdate)
          scheduleNextUpdate();
        currentUserJourneysStatus = $.extend(currentUserJourneysStatus, userJourneysStatus);
        if(callback)
          callback(currentUserJourneysStatus);
      });
    } else if(callback)
      callback(currentUserJourneysStatus);
  }

  function cancelNextUpdate(callback) {
    if(updatePromise) {
      $timeout.cancel(updatePromise);
      updatePromise = null;
    }
    if(callback)
      callback();
  }

  function scheduleNextUpdate(callback) {
    updatePromise = $timeout(function() {
      getUserJourneysStatus(callback, true);
    }, 60000);
  }

  function stopRegularUpdate(callback) {
    regularUpdate = false;
    cancelNextUpdate(callback);
  }

  function startRegularUpdate(callback) {
    regularUpdate = true;
    getUserJourneysStatus(callback, true);
  }

  var currentFightStatus;
  function getFightStatus(callback, userJourneyId) {
    if(userJourneyId == null && currentFightStatus) {
      if(callback)
        callback(currentFightStatus);
      return;
    }

    var fightStatus = {

    };
    getUserJourneysStatus(function(journeyStatus) {
      fightStatus.userPointRank = journeyStatus.journeyList.userPointRank;
      fightStatus.userPoints = journeyStatus.journeyList.userPointRank;
      if(userJourneyId == null) {
        if(journeyStatus.journeyList.journeyList.length != 0) {
          userJourneyId = journeyStatus.journeyList.journeyList[0].UserJourneyId;
        }
      }
      if(userJourneyId == null)
        fightStatus.cd = 0;
      else {
        getUserJourneyInfo(userJourneyId, function(userJourneyInfo) {

        })
      }

    });
    /*
     "userPointRank": 107,
     "userPoints": 16663,
     */
  }




  return {

    exploreForBoss: function(success, failure) {
      findMapstage(function(mapStage) {

      });
    },

    getJourneyPointReward: function(userJourneyId, success, failure) {
      getJourneyPointReward(userJourneyId, success, failure);
    },

    fightJourney: function(userJourneyId, success, failure) {
      fightJourney(userJourneyId, success, failure);
    },

    getUserJourneysStatus: function(callback, refresh) {
      getUserJourneysStatus(callback, refresh);
    },

    getFightStatus: function(callback) {
      getFightStatus(callback);
    },

    stopRegularUpdate: function(callback) {
      stopRegularUpdate(callback);
    },

    startRegularUpdate: function(callback) {
      startRegularUpdate(callback);
    },

    getUserFightStatus: function(callback) {
      getFightStatus(callback);
    }

  };

});