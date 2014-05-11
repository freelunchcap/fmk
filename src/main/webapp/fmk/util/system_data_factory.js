function getIDFA(key) {
  var val = md5(key);
  return val.substring(0, 8) + '-' + val.substring(8, 12) + '-' + val.substring(12, 16) + '-' + val.substring(16, 20) + '-' + val.substring(20, 32);
}