function stringToByteArray(str) {
  var bytes = [];
  for (var i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }
  return bytes;
}

function byteArrayToString(data) {
  return String.fromCharCode.apply(null, data);
}

function decompress(str) {
  return byteArrayToString((new Zlib.Inflate(stringToByteArray(str))).decompress());
}

function getParams(request) {
  var res = {};
  var pairs = request.split("&");
  for(var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split("=");
    res[pair[0]] = decodeURIComponent(pair[1]);
  }
  return res;
}

function decode(str) {
  return atob(str.substr(str.indexOf('eNqr'), str.length));
}

function decryptRequest(str) {
  return decompress(decode(getParams(str).z));
}