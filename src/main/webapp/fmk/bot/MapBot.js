MAP_BOT_USER_MAPSTAGES = 'user_mapstages';

fmk.factory('MapBot', function(GameApi, MapstageApi, UserBot, StorageService) {

  var allUserMapstages = StorageService.getObject(MAP_BOT_USER_MAPSTAGES) || {};
  function saveAllUserMapStages() {
    StorageService.setObject(MAP_BOT_USER_MAPSTAGES, allUserMapstages);
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

  function findExploreMapstage(callback) {
    getUserMapstages(function(userMapstages) {
      var stage = null;
      $.each(userMapstages, function(index, userMapstage) {
        if(stage == null || userMapstage.FinishedStage >= stage.FinishedStage)
          stage = userMapstage;
      });
      if(callback)
        callback(stage);
    });
  }

  function explore(callback, continueFn) {
    UserBot.getUserinfo(function(userinfo) {
      findExploreMapstage(function(mapstage) {
        function doExplore() {
          if(userinfo.Energy < 2) {
            if(callback)
              callback();
          } else {
            MapstageApi.explore(mapstage, function(exploreResult) {
              userinfo.Energy -= 2;
              /*
               "Bonus": [
               "Exp_190",
               "Coins_360"
               ],
               */
              if(continueFn != null && continueFn(exploreResult))
                doExplore();
              else
                callback(exploreResult);
            });
          }
        }
        doExplore();
      });
    });

  }

  return {

    getUserMapstages: function(callback, refresh) {
      getUserMapstages(callback, refresh)
    },

    explore: function(callback, continueFn) {
      explore(callback, continueFn);
    }

  };

});