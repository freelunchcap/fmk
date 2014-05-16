fmk.factory('WebApi', function($http) {

  function postRequest(serviceName, callParam, callback) {
    var param = {
      serviceName: serviceName,
      callPara: callParam
    };

    $http({
      method: 'POST',
      url: httpUrl,
      data: param,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(callback);
  }

  return {

    login: function(username, password, success, failure) {
      var request = {
        userName: username,
        userPassword: password,
        gameName: game_name
      };

      postRequest("checkUserActivedBase64Json", strEncode(jsonToString(request)), function(response){
        if(response.returnCode == '0') {
          if(success)
            success(response.returnObjs);
        } else
          failure(LNG.ERROR_CODE[response.returnCode] || response.returnMsg || response);
      });

    }
  }
});