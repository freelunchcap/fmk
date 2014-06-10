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




  return {

    exploreForBoss: function(success, failure) {
      findMapstage(function(mapStage) {

      });
    },

    getUserJourneysStatus: function(callback, refresh) {
      getUserJourneysStatus(callback, refresh)
    },

    stopRegularUpdate: function(callback) {
      stopRegularUpdate(callback);
    },

    startRegularUpdate: function(callback) {
      startRegularUpdate(callback)
    }

  };

});