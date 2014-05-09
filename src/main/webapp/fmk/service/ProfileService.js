PROFILES = 'profiles';

fmk.factory('ProfileService', function(GameApi, StorageService) {

  var defaultProfile = {};

  var profiles = StorageService.getObject(PROFILES) || {};
  function saveProfiles() {
    StorageService.setObject(PROFILES, profiles);
  }
  function getProfile() {
    var username = GameApi.getToken().userName;
    var profile = profiles[username];
    if(profile == null) {
      profile = $.extend(true, {}, defaultProfile);
      profiles[username] = profile;
    }
    return profile;
  }

  return {

    setDefaultProfile: function(key, profile) {
      defaultProfile[key] = profile;
    },

    getProfile: function() {
      return getProfile();
    },

    saveProfile: function() {
      saveProfiles();
    }

  }

});