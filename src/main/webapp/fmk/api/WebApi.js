fmk.factory('WebApi', function($http, $modal) {

  var retryCount = 0;

  function postRequest(serviceName, callParam, success) {
    var param = {
      serviceName: serviceName,
      callPara: callParam
    };

    $http({
      method: 'POST',
      url: httpUrl,
      data: param,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(function(response) {
      retryCount = 0;
      if(success)
        success(response);
    }) .error(function() {
        retryCount++;
        if(retryCount > 2) {
          $modal.open({
            templateUrl: 'fmk/view/WebSecuritySettingModal.html',
            backdrop: 'static',
            windowClass:'large',
            controller: function($scope) {
              $scope.retry = function() {
                location.reload();
              }
            }
          });
        } else {
          postRequest(serviceName, callParam, success);
        }
      });
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