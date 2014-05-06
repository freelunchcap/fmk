fmk.factory('UserBot', function(User, $timeout) {

  var savedUserinfo;
  var updatePromise;
  var regularUpdate = true;

  var ub = {

    getUserinfo: function(refresh, callback) {
      if(!savedUserinfo || refresh) {
        ub.cancelNextUpdate();
        User.getUserinfo(function(userinfo) {
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