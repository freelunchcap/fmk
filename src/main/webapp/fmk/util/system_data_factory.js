function getIDFA(key) {
  var val = md5(key);
  return val.substr(0, 8) + '-' + val.substr(8, 12) + '-' + val.substr(12, 16) + '-' + val.substr(16, 20) + '-' + val.substr(20, 32);
}