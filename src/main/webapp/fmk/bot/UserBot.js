fmk.factory('UserBot', function(GameApi, UserApi, StorageService, $timeout) {

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