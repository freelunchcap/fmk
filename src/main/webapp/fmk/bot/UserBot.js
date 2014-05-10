USER_BOT_USER_MAPSTAGES = 'user_mapstages';

fmk.factory('UserBot', function(CardApi, GameApi, MapstageApi, UserApi, StorageService, $timeout) {

  var allUserMapstages = StorageService.getObject(USER_BOT_USER_MAPSTAGES) || {};
  function saveAllUserMapStages() {
    StorageService.setObject(USER_BOT_USER_MAPSTAGES, allUserMapstages);
  }

  var currentUserinfo;
  var updatePromise;
  var regularUpdate = true;

  var ub = {

    getUserMapstages: function(refresh, callback) {
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
    },

    getUserinfo: function(refresh, callback) {
      if(!currentUserinfo || refresh) {
        ub.cancelNextUpdate();
        UserApi.getUserinfo(function(userinfo) {
          if(regularUpdate)
            ub.scheduleNextUpdate();
          currentUserinfo = $.extend(currentUserinfo || {}, userinfo);
          if(callback)
            callback(currentUserinfo);
        });
      } else if(callback)
        callback(currentUserinfo);
    },

    cancelNextUpdate: function() {
      if(updatePromise) {
        $timeout.cancel(updatePromise);
        updatePromise = null;
      }
    },

    scheduleNextUpdate: function() {
      updatePromise = $timeout(function() {
        ub.getUserinfo(true);
      }, 300000);
    },

    stopRegularUpdate: function() {
      regularUpdate = false;
      ub.cancelNextUpdate();
    },

    startRegularUpdate: function() {
      regularUpdate = true;
      ub.getUserinfo(true);
    },

    clearSavedUserinfo: function() {
      currentUserinfo = null;
    }

  };

  return ub;

});