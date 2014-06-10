fmk.factory('JourneyBot', function(JourneyApi, MapBot, UserBot, $timeout) {

  function exploreForBoss(success, failure) {
    MapBot.explore(function(resultWithJourney) {
      getFightStatus(function(fightStatus) {

      }, {
        userJourneyInfo: {
          userJourneyInfo: resultWithJourney.JourneyInfo
        }
      })
    }, function(exploreResult) {
      return exploreResult.JourneyInfo == null;
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
  var countdownPromise;
  function getFightStatus(callback, userJourneyInfo) {
    if(userJourneyInfo == null && currentFightStatus != null) {
      if(callback)
        callback(currentFightStatus);
      return;
    }

    var fightStatus = {};
    getUserJourneysStatus(function(journeyStatus) {
      fightStatus.userPointRank = journeyStatus.journeyList.userPointRank;
      fightStatus.userPoints = journeyStatus.journeyList.userPointRank;

      function setCDTime(userJourneyInfo) {
        fightStatus.CDTime = userJourneyInfo.userJourneyInfo.CDTime;
        fightStatus.CDTimeStatus = userJourneyInfo.userJourneyInfo.CDTimeStatus;
        currentFightStatus = $.extend(currentFightStatus, fightStatus);
        if(currentFightStatus.CDTime > 0)
          startCountdown();
        else
          currentFightStatus.CDTime = 0;
      }

      if(userJourneyInfo != null) {
        setCDTime(userJourneyInfo);
        callback(currentFightStatus);
      } else {
        var userJourneyId;
        if(journeyStatus.journeyList.journeyList.length != 0) {
          userJourneyId = journeyStatus.journeyList.journeyList[0].UserJourneyId;
        }
        if(userJourneyId == null) {
          fightStatus.CDTime = 0;
          fightStatus.CDTimeStatus = 1;
          currentFightStatus = $.extend(currentFightStatus, fightStatus);
          callback(currentFightStatus);
        } else {
          getUserJourneyInfo(userJourneyId, function(userJourneyInfo) {
            setCDTime(userJourneyInfo);
            callback(currentFightStatus);
          })
        }
      }

    });
  }

  function startCountdown() {
    countdownPromise = $timeout(function() {
      if(currentFightStatus) {
        currentFightStatus.CDTime -= 1;
        if(currentFightStatus.CDTime <= 0) {
          if(currentFightStatus.CDTimeStatus != 1)
            currentFightStatus.CDTimeStatus = 1;
        } else {
          startCountdown();
        }
      }
    }, 1000);
  }

  function stopCountdown(callback) {
    currentFightStatus = null;
    if(countdownPromise) {
      $timeout.cancel(countdownPromise);
      countdownPromise = null;
    }
    if(callback)
      callback();
  }

  return {

    exploreForBoss: function(success, failure) {
      exploreForBoss(success, failure);
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

    stopRegularUpdate: function(callback) {
      stopRegularUpdate(callback);
    },

    startRegularUpdate: function(callback) {
      startRegularUpdate(callback);
    },

    getFightStatus: function(callback) {
      getFightStatus(callback);
    },

    loseFightStatus: function(callback) {
      stopCountdown(callback);
    }

  };

});