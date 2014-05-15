USER_BOT_USER_MAPSTAGES = 'user_mapstages';

fmk.factory('UserBot', function(CardApi, GameApi, MapstageApi, UserApi, StorageService, $timeout) {

  var allUserMapstages = StorageService.getObject(USER_BOT_USER_MAPSTAGES) || {};
  function saveAllUserMapStages() {
    StorageService.setObject(USER_BOT_USER_MAPSTAGES, allUserMapstages);
  }

  function getUserMapstages(callback, refresh) {
    var token = GameApi.getToken();
    if(refresh || !allUserMapstages[token.userName]) {
      MapstageApi.getUserMapStages(function(userMapstages) {
        allUserMapstages[token.userName] = userMapstages;
        saveAllUserMapStages();
        if(callback)
          callback(userMapstages);
      });
    } else if(callback)
      callback(allUserMapstages[token.userName]);
  }

  var currentUserinfo;
  var updatePromise;
  var regularUpdate = true;

  function getUserinfo(callback, refresh) {
    if(!currentUserinfo || refresh) {
      cancelNextUpdate();
      UserApi.getUserinfo(function(userinfo) {
        if(regularUpdate)
          scheduleNextUpdate();
        currentUserinfo = $.extend(currentUserinfo || {}, userinfo);
        if(callback)
          callback(currentUserinfo);
      });
    } else if(callback)
      callback(currentUserinfo);
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
      getUserinfo(callback, true);
    }, 300000);
  }

  function stopRegularUpdate(callback) {
    regularUpdate = false;
    cancelNextUpdate(callback);
  }

  function startRegularUpdate(callback) {
    regularUpdate = true;
    getUserinfo(callback, true);
  }

  return {

    getUserMapstages: function(callback, refresh) {
      getUserMapstages(callback, refresh)
    },

    getUserinfo: function(callback, refresh) {
      getUserinfo(callback, refresh)
    },

    stopRegularUpdate: function(callback) {
      stopRegularUpdate(callback);
    },

    startRegularUpdate: function(callback) {
      startRegularUpdate(callback)
    },

    collectSalary: function(callback) {
      UserApi.awardSalary(callback);
    }

  };

});