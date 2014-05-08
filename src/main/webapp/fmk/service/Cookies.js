fmk.factory('Cookies', function($cookies) {

  return {

    getString: function(key) {
      return $cookies[key];
    },

    getObject: function(key) {
      var str = $cookies[key];
      if(str == null)
        return str;
      else
        return JSON.parse(str);
    },

    setString: function(key, value) {
      $cookies[key] = value;
    },

    setObject: function(key, value) {
      $cookies[key] = JSON.stringify(value);
    }

  }

});