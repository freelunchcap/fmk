fmk.factory('UserBot', function(User) {

  var userinfo;

  return {

    getUserinfo: function(refresh, callback) {
      if(!userinfo || refresh)
        User.getUserinfo(callback);
      else
        callback(userinfo);
    }

  }

});