PROFILES = 'profiles';

fmk.factory('ProfileService', function(GameApi, StorageService) {

  var defaultProfile = {};

  var profiles = StorageService.getObject(PROFILES) || {};
  function saveProfiles(callback) {
    StorageService.setObject(PROFILES, profiles);
    if(callback)
      callback();
  }
  function getProfile(callback) {
    var username = GameApi.getToken().userName;
    var profile = profiles[username];
    if(profile == null) {
      profile = $.extend(true, {}, defaultProfile);
      profiles[username] = profile;
    }
    if(callback)
      callback(profile);
  }

  return {

    setDefaultProfile: function(key, profile) {
      defaultProfile[key] = profile;
    },

    getProfile: function(callback) {
      getProfile(callback);
    },

    saveProfile: function(callback) {
      saveProfiles(callback);
    }

  }

});