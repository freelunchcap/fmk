CbSlot =  '_-()+15ebf9a59893a34809c3573b7051f678';
CbSlotkey = 'ncn';
CbSlotvalue = '100';

fmk.factory('GameApi', function($http, Log) {
  var seq;

  function stringToByteArray(str) {
    var bytes = [];
    for(var i = 0; i < str.length; ++i) {
      bytes.push(str.charCodeAt(i));
    }
    return bytes;
  }

  function byteArrayToString(data) {
    return String.fromCharCode.apply(null, data);
  }

  function decompressStr(str) {
    return byteArrayToString((new Zlib.Inflate(stringToByteArray(str))).decompress());
  }

  function compressStr(str) {
    return byteArrayToString((new Zlib.Deflate(stringToByteArray(str))).compress());
  }

  function decodeBase64(str) {
    var extraSaltSize = parseInt(str.charAt(5));
    var realStr = str.substr(6 + extraSaltSize);
    return atob(realStr);
  }

  function encodeBase64(str) {
    var extraSaltSize = Math.floor(5 + Math.random() * 5);
    var salt = '';
    var i;
    for(i = 0; i < 5; i++) {
      salt = salt + String.fromCharCode(Math.random() * 25 + 97);
    }
    salt = salt + extraSaltSize;
    for(i = 0; i < extraSaltSize; i++) {
      salt = salt + String.fromCharCode(Math.random() * 25 + 97);
    }
    return salt + btoa(str);
  }

  function getSeq() {
    if(seq === undefined) {
      seq = Math.floor(Math.random() * 10000);
    } else if(seq > 10000000) {
      seq = 1;
    }
    return seq++;
  }

  function encryptRequest(req) {
    var reqStr = JSON.stringify(req);
    var z = encodeBase64(compressStr(reqStr));
    var b = md5(z + '_-()+15ebf9a59893a34809c3573b7051f678');
    return {z: z, b: b};
  }

  function createRawRequest(action, params) {
    var mzsg = '';
    if(action) {
      mzsg += 'do=' + action + '&';
    }
    mzsg += ('v=' + getSeq());
    mzsg += ('phpp=' + platform);
    mzsg += ('phpl=' + language);
    var res = {};
    res[CbSlotkey] = CbSlotvalue;
    $.each(params, function(key, value) {
      res[key] = value;
    });
    res.mzsg = mzsg;
    return res;
  }

  function postRequest(server, service, action, params, callback) {
    var url = server + service + '?pvc=' + encodeURIComponent(ver_client) + '&pvb=' + encodeURIComponent(ver_build);

    $http({
      method: 'POST',
      url: url,
      data: $.param(encryptRequest(createRawRequest(action, params))),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).success(callback);
  }

  var token;

  return {

    setToken: function(result) {
      token = result;
    },

    getToken: function() {
      return token;
    },

    post: function(service, action, params, callback, log) {
      var logIndex = Log.log({
        service: service,
        action: action,
        params: params,
        log: log,
        status: -1
      });
      postRequest(token.GS_IP, service, action, params, function(response) {
        Log.amend(logIndex, {
          response: response.data,
          status: response.status,
          message: response.message
        });
        if(callback)
          callback(response.data);
      });
    }

  }
});