fmk.factory('StorageService', function() {

  return {

    getString: function(key) {
      return window.localStorage[key];
    },

    getObject: function(key) {
      var str = window.localStorage[key];
      if(str == null)
        return str;
      else
        return JSON.parse(str);
    },

    setString: function(key, value) {
      window.localStorage[key] = value;
    },

    setObject: function(key, value) {
      window.localStorage[key] = JSON.stringify(value);
    }

  }

});