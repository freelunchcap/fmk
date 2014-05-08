USER_BOT_USER_MAPSTAGES = 'user_mapstages';

fmk.factory('UserBot', function(CardApi, GameApi, MapstageApi, UserApi, Cookies, $timeout) {

  var allUserMapstages = Cookies.getObject(USER_BOT_USER_MAPSTAGES) || {};
  function saveAllUserMapStages() {
    Cookies.setObject(USER_BOT_USER_MAPSTAGES, allUserMapstages);
  }

  var savedUserinfo;
  var updatePromise;
  var regularUpdate = true;

  var ub = {



    getUserMapstages: function(refresh, callback) {
      var token = GameApi.getToken();
      if(refresh || !allUserMapstages[token.UserName]) {
        MapstageApi.getUserMapStages(function(userMapstages) {
          allUserMapstages[token.UserName] = userMapstages;
          saveAllUserMapStages();
          if(callback)
            callback(userMapstages);
        });
      } else if(callback)
        callback(allUserMapstages[token.UserName]);
    },

    getUserinfo: function(refresh, callback) {
      if(!savedUserinfo || refresh) {
        ub.cancelNextUpdate();
        UserApi.getUserinfo(function(userinfo) {
          if(regularUpdate)
            ub.scheduleNextUpdate();
          savedUserinfo = userinfo;
          callback(userinfo);
        });
      } else {
        callback(savedUserinfo);
      }
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
      }, 60000);
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
      savedUserinfo = null;
    }

  };

  return ub;

});