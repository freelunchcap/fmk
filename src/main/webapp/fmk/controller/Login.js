fmk.controller('Login', ['$scope', '$log', 'Game',
  function($scope, $log, Game) {

    $scope.login = function() {
      var request = {
        userName: $scope.username,
        userPassword: $scope.password,
        gameName: 'CARD-IPHONE-CHS'
      };

      httpCall("checkUserActivedBase64Json", strEncode(jsonToString(request)), function(result){
        var json = eval('(' + result + ')');
        if(json.returnCode == '0'){
          $log.info(LNG.HINT["loginSuccess"]);
          Game.setGame(result);
        } else {
          $log.info(LNG.ERROR_CODE[json.returnCode] || result);
        }
      });
    }
  }
]);