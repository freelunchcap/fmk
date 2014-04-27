var reMail = /^(?:[a-z\d]+[_\-\+\.]?)*[a-z\d]+@(?:([a-z\d]+\-?)*[a-z\d]+\.)+([a-z]{2,})+$/i;

//cookies
function setCookie(name, value) {
  var exp = new Date();
  exp.setTime(exp.getTime() + 365 * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + strEncode(value) + ";expires=" + exp.toGMTString();
}

function getCookie(name) {
  var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
  if (arr && arr[2])
    return strDecode(arr[2]);
  return null;
}

function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  document.cookie = name + "=;expires=" + exp.toGMTString();
}

//commons
function showMsg(id, message) {
  $("#" + id).html(message ? message : "");
}

//commons
function showReturnMsg(id, returnCode, result) {
  var msg = LNG.ERROR_CODE[returnCode];
  showMsg(id, msg ? msg : result);
}

function checkname(divid, valueId) {
  var div = document.getElementById(divid);
  div.innerHTML = "";
  var input = document.getElementById(valueId);
  var name1 = input.value.trim();
  input.value = name1;
  if (name1 == "") {
    div.innerHTML = LNG.VALIDATE["username_empty"];
    return false;
  }
  if (name1.length < 4 || name1.length > 100) {
    div.innerHTML = LNG.VALIDATE["username_length"];
    return false;
  }

  if(valueId=="username_login"||valueId=="username_cg"||valueId=="username_forget"||valueId=="username"){
    if(/[@\x22]+/.test(name1)){
      if(!reMail.test(name1)){
        div.innerHTML = LNG.VALIDATE["username_content"];
        return false;
      }
    }else{
      if(locale && locale == "jp" && !/^\w+$/g.test(name1)){
        div.innerHTML = LNG.VALIDATE["username_content"];
        return false;
      }
    }
  }else{
    if(locale && locale == "jp" && !/^\w+$/g.test(name1)){
      div.innerHTML = LNG.VALIDATE["username_content"];
      return false;
    }
  }
  return true;
}

function checkpassword(divid, valueId) {
  var div = document.getElementById(divid);
  div.innerHTML = "";
  var input = document.getElementById(valueId);
  var password = input.value.trim();
  input.value = password;
  if (password == "") {
    div.innerHTML = LNG.VALIDATE["password_empty"];
    return false;
  }
  if (password.length < 4 || password.length > 30) {
    div.innerHTML = LNG.VALIDATE["password_length"];
    return false;
  }
  if(locale && locale == "jp" && !/^\S+$/g.test(password)){
    div.innerHTML = LNG.VALIDATE["password_content"];
    return false;
  }
  return true;
}

function checkrepassword(divid, valueold, valueNew) {
  var div = document.getElementById(divid);
  div.innerHTML = "";
  var password = document.getElementById(valueold).value;
  var input = document.getElementById(valueNew);
  if (password != input.value) {
    div.innerHTML = LNG.VALIDATE["password_not_match"];
    return false;
  }
  return true;
}

function checkEmail(divId, valueID, requried){
  var div = document.getElementById(divId);
  div.innerHTML = "";
  var input = document.getElementById(valueID);
  var email = input.value;
  if (email.length == 0) {
    if(requried){
      div.innerHTML = LNG.VALIDATE["email_empty"];
      return false;
    } else {
      return true;
    }
  } else if(email.length > 100) {
    div.innerHTML = LNG.VALIDATE["email_length"];
    return false;
  }
  if(!reMail.test(email)){
    div.innerHTML = LNG.VALIDATE["email_content"];
    return false;
  }
  return true;
}

function showLoading() {
  $("#loading").show();
}

function hideLoading() {
  $("#loading").hide();
}

String.prototype.trim = function() {
  return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

function httpCall(serviceName, callPara, callBack){
  var param = {
    serviceName: serviceName,
    callPara: callPara
  };
  $.ajax({
    url: (typeof httpUrl == 'undefined') ? "httpService.do" : httpUrl,
    data: jsonToString(param),
    type: "POST",
    dataType: "text",
    async: false,
    timeout: 30000,
    processData: false,
    success: callBack
  });
}

function jsonToString(obj){
  var THIS = this;
  switch(typeof(obj)){
    case 'string':
      return '"' + obj.replace(/(["\\])/g, '\\$1') + '"';
    case 'array':
      return '[' + obj.map(THIS.jsonToString).join(',') + ']';
    case 'object':
      if(obj instanceof Array){
        var strArr = [];
        var len = obj.length;
        for(var i=0; i<len; i++){
          strArr.push(THIS.jsonToString(obj[i]));
        }
        return '[' + strArr.join(',') + ']';
      }else if(obj==null){
        return 'null';

      }else{
        var string = [];
        for (var property in obj) string.push(THIS.jsonToString(property) + ':' + THIS.jsonToString(obj[property]));
        return '{' + string.join(',') + '}';
      }
    case 'number':
      return obj;
    case false:
      return obj;
  }
}

$(document).ready(function(){
  watchMessage();
});

// must by here for wp7 login
if (typeof droid == 'undefined') {
  droid = function () {};
}

// 需要修改js文件把所有的 location.href="js-call: 修改为 droid.jscall=",以使可以调用window.external.notify和C#code交互
Object.defineProperty(droid, "jscall", {
  set: function (x) {
    window.external.notify(x);
    this.newaccpropvalue = x;
  },
  get: function () {
    return this.newaccpropvalue;
  },
  enumerable: true,
  configurable: true
});

function loginGamePP(json){
  location.href = 'jscall://loginGame/'+json+'/';
}

function receiveMessage(message) {
  if (window.postMessage) {
    parent.postMessage('height=100', '*');
  } else {
    sendMessage(100);
  }
}

function watchMessage() {
  if (window.postMessage) {
    addDomListener(window, 'message', function(e) {
      if (e.data) {
        receiveMessage(e.data);
      }
    });
  }
}

function addDomListener (source, event, wrapper) {
  if (event == "dblclick" && Browser.isSafari()) {
    source.ondblclick = wrapper
  } else {
    if (source.addEventListener) {
      source.addEventListener(event, wrapper, false);
    } else {
      if (source.attachEvent) {
        source.attachEvent("on" + event, wrapper)
      } else {
        source["on" + event] = wrapper
      }
    }
  }
}

function clear(){
  $("#start_div, " +
    "#login_div, " +
    "#login_registration, " +
    "#changePwd_div, " +
    "#bindemail_div, " +
    "#forgetPwd_div, " +
    "#div1, " +
    "#div2, " +
    "#div3, " +
    "#div4, " +
    "#div5, " +
    "#div6, " +
    "#div7, " +
    "#div8, " +
    "#div9, " +
    "#div10, " +
    "#div11, " +
    "#div12, " +
    "#div13, " +
    "#div14, " +
    "#div15, " +
    "#div16").html("");
  $(":text,:password").val("");
}

function checkReg(){
  if (checkname("div1","username_reg")
    && checkpassword("div2","password_reg")
    && checkrepassword("div3","password_reg","confirm_reg")) {
    return true;
  }
  return false;
}

function checkLogin(){
  if (checkname("div5","username_login")
    && checkpassword("div6","password_login")) {
    return true;
  }
  return false;
}

function checkbindEmail(){
  if (checkpassword("div12","password_bind")
    && checkEmail("div13", "email_bind", true)
    && ($("#username_bind").val() ||
    (checkpassword("div16","password_bind_cf")
      && checkrepassword("div16","password_bind","password_bind_cf")))) {
    return true;
  }
  return false;
}

function checkFindPwd(){
  if (checkname("div14","username_forget")) {
    return true;
  }
  return false;
}

function checkChangePwd(){
  if (checkname("div10","username_cg")
    && checkpassword("div7","old_password_cg")
    && checkpassword("div8","new_password_cg")
    && checkrepassword("div9","new_password_cg","new_password_cf")) {
    return true;
  }
  return false;
}

function click_login(){
  clear();
  $("#start").hide();
  $("#start_login").show();
  if(navigator.cookieEnabled){
    delCookie("mh_nickname");
    delCookie("mh_password");
    var username = getCookie("username");
    if(username != null){
      $("#username_login").val(username);
    }
    var password = getCookie("password");
    if(password != null){
      $("#password_login").val(password);
    }
  } else {
    showMsg("login_div", LNG.HINT["cookieDiabled"]);
  }
}

var selGsId = null;
var isShowServers = "unknown";
var friendCode = null;
var servers = null;
var page = 0;
var needCaptcha = false;
var captchaResponse = null;
function click_registration(){
  clear();
  if(isShowServers === "unknown"){
    showLoading();
    var param = {
      "gameName": game,
      "locale": locale,
      "udid": udid,
      "idfa": idfa
    };
    httpCall("getLoginGameServers", param, function(result){
      var json = eval('(' + result + ')');
      if(json.returnCode == "0"){
        if(json.returnObjs && json.returnObjs["RECOMMENT_SERVER_ID"]){
          selGsId = json.returnObjs["RECOMMENT_SERVER_ID"];
        }
        if(json.returnObjs && json.returnObjs["SERVER_DISTRIBUTE"]){
          friendCode = json.returnObjs["SERVER_DISTRIBUTE"];
        }
        if(json.returnObjs && json.returnObjs["GAME_SERVER"]){
          // select server
          servers = eval('(' + json.returnObjs["GAME_SERVER"] + ')');
          for (var i = 0; i < servers.length; i++) {
            var server = servers[i];
            if(server && server.gsId == selGsId){
              $("#server_name_div").html(servers[i].gsName);
            }
          }
          drawServerPage();
          isShowServers = "Y";
          if(servers.length > 6){
            $("#nextPage").show();
          }
          $("#server_div").show();
        } else {
          isShowServers = "N";
          $("#server_div").hide();
        }
        $("#start").hide();
        needCaptcha = json.returnObjs["NEED_CAPTCHA"];
        if(needCaptcha == 'Y' && !captchaResponse){
          $.getScript('//www.google.com/recaptcha/api/js/recaptcha_ajax.js', function(data, textStatus, jqxhr){
            if(textStatus == "success"){
              $("#start_recaptcha").show();
              Recaptcha.create(captchaPublicKey, "recaptcha_div", { theme: "custom", custom_theme_widget: 'recaptcha_div'} );
            } else {
              showMsg("login_registration", textStatus);
            }
          });
        } else {
          if(usernameReg != ""){
            $("#username_reg").val(usernameReg);
          }
          $("#start_registration").show();
        }
      } else {
        showReturnMsg("start_div", json.returnCode, result);
      }
      hideLoading();
    });
  } else {
    $("#start").hide();
    if(needCaptcha == 'Y' && !captchaResponse){
      $("#start_recaptcha").show();
    } else {
      if(usernameReg != ""){
        document.getElementById("username_reg").value = usernameReg;
      }
      $("#start_registration").show();
    }
  }
}

function drawServerPage(){
  for (var i = 0; i < 6; i++) {
    var server = servers[page*6 + i];
    var serverBtn = document.getElementById("server" + i);
    if(serverBtn){
      if(server && server.gsName){
        serverBtn.value = server.gsName;
      } else {
        serverBtn.value = "　";
      }
      if(server && server.gsId){
        serverBtn.gsId = server.gsId;
      } else {
        serverBtn.gsId = null;
      }
    }
  }
  if(page > 0){
    $("#prePage").show();
  } else {
    $("#prePage").hide();
  }
  if((page*6 + 6) < servers.length){
    $("#nextPage").show();
  } else {
    $("#nextPage").hide();
  }
}

function clickPrePage(){
  if(page > 0){
    page--;
    drawServerPage();
  }
}

function clickNextPage(){
  if(page*6 < servers.length){
    page++;
    drawServerPage();
  }
}

function clickSwitchServer(){
  if(isShowServers === "Y"){
    $("#start_registration").hide();
    $("#start_server_selection").show();
  }
}

function chooseServer(btn){
  if(btn.gsId){
    selGsId = btn.gsId;
    $("#start_server_selection").hide();
    $("#start_registration").show();
    $("#server_name_div").html(btn.value);
  }
}

function click_account(){
  clear();
  $("#start").hide();
  $("#start_account").show();
}

function click_email(){
  clear();
  $("#start_account").hide();
  $("#start_account_email").show();
}

function click_changePwd(){
  clear();
  $("#start_account").hide();
  $("#start_account_changePwd").show();
}

function click_forgetPwd(){
  clear();
  $("#start_account").hide();
  $("#start_account_forgetPwd").show();
}

function click_cancel(){
  clear();
  $("#start_login, #start_server_selection, #start_registration, #start_account, #loading, #start_recaptcha").hide();
  $("#start").show();
}

function click_account_cancel(){
  clear();
  $("#start_account_email, #start_account_changePwd, #start_account_forgetPwd").hide();
  $("#start_account").show();
}

function login(){
  /* document.getElementById("login_button").disabled = true; */
  if(!checkLogin()){
    return false;
  }
  showLoading();

  var username = $("#username_login").val();
  var password = $("#password_login").val();
  var param = {
    "userName": username,
    "userPassword": password,
    "gameName": game,
    "udid": udid,
    "idfa": idfa,
    "clientType": getClientType(),
    "releaseChannel": releaseChannel,
    "locale": locale
  };
  showMsg("login_div", LNG.HINT["startlogin"]);
  httpCall("checkUserActivedBase64Json", strEncode(jsonToString(param)), function(result){
    var json = eval('(' + result + ')');
    if(json.returnCode == "0"){
      showMsg("login_div", LNG.HINT["loginSuccess"]);
      setCookie("username",username);
      if(document.getElementById("remember_me").checked){
        setCookie("password",password);
      }else{
        delCookie("password");
      }
      callBackGame(result, json);
    } else if (json.returnCode == "90204") {
      showMsg("login_div", LNG.HINT["activate"]);
      httpCall("activeGameBase64Json", strEncode(jsonToString(param)), function(result){
        var json = eval('(' + result + ')');
        if(json && json.returnCode == "0"){
          var count = 0;
          var max = 10;
          var m = LNG.HINT["activate"];
          var the_timeout = setInterval(function(){
            count++;
            m = m+"."
            showMsg("login_div", m);
            httpCall("checkUserActiveResultBase64Json", strEncode(jsonToString(param)), function(result){
              var json = eval('(' + result + ')');
              if(json.returnCode == "0"){
                showMsg("login_div", LNG.HINT["loginSuccess"]);
                clearInterval(the_timeout);
                setCookie("username",username);
                if(document.getElementById("remember_me").checked){
                  setCookie("password",password);
                }else{
                  delCookie("password");
                }
                callBackGame(result, json);
              } else if(json.returnCode != "90401"){
                showReturnMsg("login_div", json.returnCode, result);
                clearInterval(the_timeout);
                hideLoading();
              }
            })
            if(count == max){
              clearInterval(the_timeout);
              showMsg("login_div", LNG.HINT["activateFail"]);
              hideLoading();
            }
          },3000);
        } else {
          showReturnMsg("login_div", json.returnCode, result);
          hideLoading();
        }
      });
    } else {
      showReturnMsg("login_div", json.returnCode, result);
      hideLoading();
    }
  });
}

function recaptcha(){
  captchaResponse = Recaptcha.get_response();
  if(captchaResponse && captchaResponse != ""){
    var param = {
      "gameName": game,
      "udid": udid,
      "idfa": idfa,
      "captchaChallenge": Recaptcha.get_challenge(),
      "captchaResponse": captchaResponse
    };
    httpCall("checkCaptcha", param, function(result){
      var json = eval('(' + result + ')');
      if(json.returnCode == "0"){
        $("#start_recaptcha").hide();
        $("#start_registration").show();
        Recaptcha.destroy();
        reg();
      } else {
        showMsg("help_recaptcha", LNG.HINT["captchaError"]);
        Recaptcha.reload();
        captchaResponse = null;
      }
    });
  }
}

function reg(){
  if(!checkReg()){
    return false;
  }
  showLoading();
  var username = $("#username_reg").val();
  var password = $("#password_reg").val();
  var friendcode = $("#friendCode_reg").val();
  var param = {
    "udid": udid,
    "idfa": idfa,
    "gameName": game,
    "userName": username,
    "friendCode": friendcode,
    "selGsId": selGsId == null ? "" : selGsId
  };
  httpCall("checkGameActivatedByUdid", param, function(result){
    var json = eval('(' + result + ')');
    if(json.returnCode != "90204"){ // 用户不存在
      if(json.returnCode == "0"){ // 用户已经存在，已激活该游戏
        showMsg("login_registration", LNG.HINT["userAlreadyExist"]);
        hideLoading();
        return false;
      } else if(json.returnCode == "90405"){ // account limits
        if(!confirm(LNG.ERROR_CODE["90405"])){
          hideLoading();
          return false;
        }
      } else {
        showReturnMsg("login_registration", json.returnCode, result);
        hideLoading();
        return false;
      }
    }
    // 用户不存在
    showMsg("login_registration", LNG.HINT["startReg"]);
    var param = {
      "userName": username,
      "email": $("#email_reg").val(),
      "userPassword": password,
      "gameName": game,
      "udid": udid,
      "idfa": idfa,
      "clientType": getClientType(),
      "releaseChannel": releaseChannel,
      "locale": locale,
      "friendCode": friendcode,
      "selGsId": selGsId == null ? "" : selGsId
    };
    if(needCaptcha == 'Y' && typeof Recaptcha !== 'undefined'){
      param.captchaChallenge = Recaptcha.get_challenge();
      param.captchaResponse = captchaResponse;
    }
    httpCall("activeGameBase64Json", strEncode(jsonToString(param)), function(result){
      var json = eval('(' + result + ')');
      if(json && json.returnCode == "0"){
        var count = 0;
        var max = 10;
        var m = LNG.HINT["activate"];
        var the_timeout = setInterval(function(){
          count++;
          m = m+"."
          showMsg("login_registration", m);
          httpCall("checkUserActiveResultBase64Json", strEncode(jsonToString(param)), function(result){
            var json = eval('(' + result + ')');
            if(json.returnCode == "0"){
              setCookie("username",username);
              setCookie("password",password);
              clearInterval(the_timeout);
              showMsg("login_registration", LNG.HINT["loginSuccess"]);
              callBackGame(result, json);
            } else if(json.returnCode != "90401"){
              showReturnMsg("login_registration", json.returnCode, result);
              clearInterval(the_timeout);
              hideLoading();
            }
          })
          if(count == max){
            clearInterval(the_timeout);
            showMsg("login_registration", LNG.HINT["regFail"]);
            hideLoading();
          }
        },3000);
      } else {
        showReturnMsg("login_registration", json.returnCode, result);
        hideLoading();
      }
    });
  });
}

function changePassword(){
  if(!checkChangePwd()){
    return false;
  }
  showLoading();
  var param = {
    "userName": $("#username_cg").val(),
    "userPassword": $("#old_password_cg").val(),
    "newPassword": $("#new_password_cg").val(),
    "udid": udid,
    "idfa": idfa,
    "gameName": game,
    "clientType": getClientType(),
    "releaseChannel": releaseChannel,
    "locale": locale
  };
  httpCall("changePwdBase64Json", strEncode(jsonToString(param)), function(result){
    var json = eval('(' + result + ')');
    if(json && json.returnCode == "0"){
      showMsg("changePwd_div", LNG.HINT["changeSuccess"]);
    } else {
      showReturnMsg("changePwd_div", json.returnCode, result);
    }
    hideLoading();
  });
}

function getClientType(){
  if(from == null || from == '' || from == 'null'){
    if((/iphone/gi).test(navigator.appVersion)
      || (/ipad/gi).test(navigator.appVersion)
      || (/iphone|ipad/gi).test(navigator.appVersion)){
      from = 'ios';
    } else if((/Windows Phone/gi).test(navigator.appVersion)){
      from = 'wp8';
    } else if((/android/gi).test(navigator.appVersion)){
      from = 'android';
    } else {
      from = 'flash';
    }
  }
  return from;
}

function bindEmail(){
  if(!checkbindEmail()){
    return false;
  }
  showLoading();
  var param = {
    "userName": $("#username_bind").val(),
    "userPassword": $("#password_bind").val(),
    "newEmail": $("#email_bind").val(),
    "udid": udid,
    "idfa": idfa,
    "gameName": game,
    "locale": locale
  };
  httpCall("bindEmailBase64Json", strEncode(jsonToString(param)), function(result){
    var json = eval('(' + result + ')');
    if(json && json.returnCode == "0"){
      showMsg("bindemail_div", LNG.HINT["bindEmail"]);
      $("#username_bind, #password_bind, #password_bind_cf, #email_bind").val("");
    }else{
      showReturnMsg("bindemail_div", json.returnCode, result);
    }
    hideLoading();
  });
}

$(document).ready(function(){
  $("#username_bind, #password_bind").blur(function () {
    if($("#username_bind").val()){
      $("#email_bind_pwd_cf_div").hide();
    } else {
      $("#email_bind_pwd_cf_div").show();
      if($(this).attr("name") == "password_bind" && !$("#password_bind_cf").val()){
        $("#password_bind_cf").focus();
      }
    }
  });
});

function forgetPwd(){
  if(!checkFindPwd()){
    return false;
  }
  var param = {
    "userName": $("#username_forget").val(),
    "udid": udid,
    "idfa": idfa,
    "gameName": game,
    "clientType": getClientType(),
    "releaseChannel": releaseChannel,
    "locale": locale
  };
  showLoading();
  httpCall("forgetPwd", param, function(result){
    var json = eval('(' + result + ')');
    if(json && json.returnCode == "0"){
      showMsg("forgetPwd_div", LNG.HINT["checkEmail"]);
    }else{
      showReturnMsg("forgetPwd_div", json.returnCode, result);
    }
    hideLoading();
  });
}

function callBackGame(result, json) {
  hideLoading();
  if(from == 'flash'){
    if (window.postMessage) {
      parent.location.href = (flashRedirectUrl ? flashRedirectUrl : "flashRedirectUrl.do")
        + '#'
        + encodeURI(result);
    }
  } else if (from == 'ios'){
    if(typeof loginGame !== "undefined"){
      loginGame(json);
    } else {
      loginGamePP(result);
    }
  } else if (from == 'wp7'){
    droid.jscall='loginGame?json=' + result;
  } else if (from == 'android'){
    droid.loginGame(result);
  } else if(from == 'wp8' || from == 'win8'){
    window.external.notify('callback=loginGame?json=' + result);
  }
}

function utf16to8(str) {
  var out, i, len, c;

  out = "";
  len = str.length;
  for(i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if ((c >= 0x0001) && (c <= 0x007F)) {
      out += str.charAt(i);
    } else if (c > 0x07FF) {
      out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
      out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
      out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
    } else {
      out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
      out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
    }
  }
  return out;
}

var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function base64encode(str) {
  var out, i, len;
  var c1, c2, c3;

  len = str.length;
  i = 0;
  out = "";
  while(i < len) {
    c1 = str.charCodeAt(i++) & 0xff;
    if(i == len)
    {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt((c1 & 0x3) << 4);
      out += "==";
      break;
    }
    c2 = str.charCodeAt(i++);
    if(i == len)
    {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
      out += base64EncodeChars.charAt((c2 & 0xF) << 2);
      out += "=";
      break;
    }
    c3 = str.charCodeAt(i++);
    out += base64EncodeChars.charAt(c1 >> 2);
    out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
    out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6));
    out += base64EncodeChars.charAt(c3 & 0x3F);
  }
  return out;
}

//input base64 encode
function strEncode(str){
  return base64encode(utf16to8(str));
}

var base64DecodeChars = new Array(
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
  52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
  -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
  15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
  -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

function base64decode(str) {
  var c1, c2, c3, c4;
  var i, len, out;

  len = str.length;
  i = 0;
  out = "";
  while(i < len) {
    /* c1 */
    do {
      c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    } while(i < len && c1 == -1);
    if(c1 == -1)
      break;

    /* c2 */
    do {
      c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    } while(i < len && c2 == -1);
    if(c2 == -1)
      break;

    out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

    /* c3 */
    do {
      c3 = str.charCodeAt(i++) & 0xff;
      if(c3 == 61)
        return out;
      c3 = base64DecodeChars[c3];
    } while(i < len && c3 == -1);
    if(c3 == -1)
      break;

    out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

    /* c4 */
    do {
      c4 = str.charCodeAt(i++) & 0xff;
      if(c4 == 61)
        return out;
      c4 = base64DecodeChars[c4];
    } while(i < len && c4 == -1);
    if(c4 == -1)
      break;
    out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
  }
  return out;
}

function utf8to16(str) {
  var out, i, len, c;
  var char2, char3;

  out = "";
  len = str.length;
  i = 0;
  while(i < len) {
    c = str.charCodeAt(i++);
    switch(c >> 4)
    {
      case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
      // 0xxxxxxx
      out += str.charAt(i-1);
      break;
      case 12: case 13:
      // 110x xxxx   10xx xxxx
      char2 = str.charCodeAt(i++);
      out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
      break;
      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = str.charCodeAt(i++);
        char3 = str.charCodeAt(i++);
        out += String.fromCharCode(((c & 0x0F) << 12) |
          ((char2 & 0x3F) << 6) |
          ((char3 & 0x3F) << 0));
        break;
    }
  }

  return out;
}

//input base64 decode
function strDecode(str){
  return utf8to16(base64decode(str));
}var reMail = /^(?:[a-z\d]+[_\-\+\.]?)*[a-z\d]+@(?:([a-z\d]+\-?)*[a-z\d]+\.)+([a-z]{2,})+$/i;

//cookies
function setCookie(name, value) {
  var exp = new Date();
  exp.setTime(exp.getTime() + 365 * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + strEncode(value) + ";expires=" + exp.toGMTString();
}

function getCookie(name) {
  var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
  if (arr && arr[2])
    return strDecode(arr[2]);
  return null;
}

function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  document.cookie = name + "=;expires=" + exp.toGMTString();
}

//commons
function showMsg(id, message) {
  $("#" + id).html(message ? message : "");
}

//commons
function showReturnMsg(id, returnCode, result) {
  var msg = LNG.ERROR_CODE[returnCode];
  showMsg(id, msg ? msg : result);
}

function checkname(divid, valueId) {
  var div = document.getElementById(divid);
  div.innerHTML = "";
  var input = document.getElementById(valueId);
  var name1 = input.value.trim();
  input.value = name1;
  if (name1 == "") {
    div.innerHTML = LNG.VALIDATE["username_empty"];
    return false;
  }
  if (name1.length < 4 || name1.length > 100) {
    div.innerHTML = LNG.VALIDATE["username_length"];
    return false;
  }

  if(valueId=="username_login"||valueId=="username_cg"||valueId=="username_forget"||valueId=="username"){
    if(/[@\x22]+/.test(name1)){
      if(!reMail.test(name1)){
        div.innerHTML = LNG.VALIDATE["username_content"];
        return false;
      }
    }else{
      if(locale && locale == "jp" && !/^\w+$/g.test(name1)){
        div.innerHTML = LNG.VALIDATE["username_content"];
        return false;
      }
    }
  }else{
    if(locale && locale == "jp" && !/^\w+$/g.test(name1)){
      div.innerHTML = LNG.VALIDATE["username_content"];
      return false;
    }
  }
  return true;
}

function checkpassword(divid, valueId) {
  var div = document.getElementById(divid);
  div.innerHTML = "";
  var input = document.getElementById(valueId);
  var password = input.value.trim();
  input.value = password;
  if (password == "") {
    div.innerHTML = LNG.VALIDATE["password_empty"];
    return false;
  }
  if (password.length < 4 || password.length > 30) {
    div.innerHTML = LNG.VALIDATE["password_length"];
    return false;
  }
  if(locale && locale == "jp" && !/^\S+$/g.test(password)){
    div.innerHTML = LNG.VALIDATE["password_content"];
    return false;
  }
  return true;
}

function checkrepassword(divid, valueold, valueNew) {
  var div = document.getElementById(divid);
  div.innerHTML = "";
  var password = document.getElementById(valueold).value;
  var input = document.getElementById(valueNew);
  if (password != input.value) {
    div.innerHTML = LNG.VALIDATE["password_not_match"];
    return false;
  }
  return true;
}

function checkEmail(divId, valueID, requried){
  var div = document.getElementById(divId);
  div.innerHTML = "";
  var input = document.getElementById(valueID);
  var email = input.value;
  if (email.length == 0) {
    if(requried){
      div.innerHTML = LNG.VALIDATE["email_empty"];
      return false;
    } else {
      return true;
    }
  } else if(email.length > 100) {
    div.innerHTML = LNG.VALIDATE["email_length"];
    return false;
  }
  if(!reMail.test(email)){
    div.innerHTML = LNG.VALIDATE["email_content"];
    return false;
  }
  return true;
}

function showLoading() {
  $("#loading").show();
}

function hideLoading() {
  $("#loading").hide();
}

String.prototype.trim = function() {
  return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

function httpCall(serviceName, callPara, callBack){
  var param = {
    serviceName: serviceName,
    callPara: callPara
  };
  $.ajax({
    url: (typeof httpUrl == 'undefined') ? "httpService.do" : httpUrl,
    data: jsonToString(param),
    type: "POST",
    dataType: "text",
    async: false,
    timeout: 30000,
    processData: false,
    success: callBack
  });
}

function jsonToString(obj){
  var THIS = this;
  switch(typeof(obj)){
    case 'string':
      return '"' + obj.replace(/(["\\])/g, '\\$1') + '"';
    case 'array':
      return '[' + obj.map(THIS.jsonToString).join(',') + ']';
    case 'object':
      if(obj instanceof Array){
        var strArr = [];
        var len = obj.length;
        for(var i=0; i<len; i++){
          strArr.push(THIS.jsonToString(obj[i]));
        }
        return '[' + strArr.join(',') + ']';
      }else if(obj==null){
        return 'null';

      }else{
        var string = [];
        for (var property in obj) string.push(THIS.jsonToString(property) + ':' + THIS.jsonToString(obj[property]));
        return '{' + string.join(',') + '}';
      }
    case 'number':
      return obj;
    case false:
      return obj;
  }
}

$(document).ready(function(){
  watchMessage();
});

// must by here for wp7 login
if (typeof droid == 'undefined') {
  droid = function () {};
}

// 需要修改js文件把所有的 location.href="js-call: 修改为 droid.jscall=",以使可以调用window.external.notify和C#code交互
Object.defineProperty(droid, "jscall", {
  set: function (x) {
    window.external.notify(x);
    this.newaccpropvalue = x;
  },
  get: function () {
    return this.newaccpropvalue;
  },
  enumerable: true,
  configurable: true
});

function loginGamePP(json){
  location.href = 'jscall://loginGame/'+json+'/';
}

function receiveMessage(message) {
  if (window.postMessage) {
    parent.postMessage('height=100', '*');
  } else {
    sendMessage(100);
  }
}

function watchMessage() {
  if (window.postMessage) {
    addDomListener(window, 'message', function(e) {
      if (e.data) {
        receiveMessage(e.data);
      }
    });
  }
}

function addDomListener (source, event, wrapper) {
  if (event == "dblclick" && Browser.isSafari()) {
    source.ondblclick = wrapper
  } else {
    if (source.addEventListener) {
      source.addEventListener(event, wrapper, false);
    } else {
      if (source.attachEvent) {
        source.attachEvent("on" + event, wrapper)
      } else {
        source["on" + event] = wrapper
      }
    }
  }
}

function clear(){
  $("#start_div, " +
    "#login_div, " +
    "#login_registration, " +
    "#changePwd_div, " +
    "#bindemail_div, " +
    "#forgetPwd_div, " +
    "#div1, " +
    "#div2, " +
    "#div3, " +
    "#div4, " +
    "#div5, " +
    "#div6, " +
    "#div7, " +
    "#div8, " +
    "#div9, " +
    "#div10, " +
    "#div11, " +
    "#div12, " +
    "#div13, " +
    "#div14, " +
    "#div15, " +
    "#div16").html("");
  $(":text,:password").val("");
}

function checkReg(){
  if (checkname("div1","username_reg")
    && checkpassword("div2","password_reg")
    && checkrepassword("div3","password_reg","confirm_reg")) {
    return true;
  }
  return false;
}

function checkLogin(){
  if (checkname("div5","username_login")
    && checkpassword("div6","password_login")) {
    return true;
  }
  return false;
}

function checkbindEmail(){
  if (checkpassword("div12","password_bind")
    && checkEmail("div13", "email_bind", true)
    && ($("#username_bind").val() ||
    (checkpassword("div16","password_bind_cf")
      && checkrepassword("div16","password_bind","password_bind_cf")))) {
    return true;
  }
  return false;
}

function checkFindPwd(){
  if (checkname("div14","username_forget")) {
    return true;
  }
  return false;
}

function checkChangePwd(){
  if (checkname("div10","username_cg")
    && checkpassword("div7","old_password_cg")
    && checkpassword("div8","new_password_cg")
    && checkrepassword("div9","new_password_cg","new_password_cf")) {
    return true;
  }
  return false;
}

function click_login(){
  clear();
  $("#start").hide();
  $("#start_login").show();
  if(navigator.cookieEnabled){
    delCookie("mh_nickname");
    delCookie("mh_password");
    var username = getCookie("username");
    if(username != null){
      $("#username_login").val(username);
    }
    var password = getCookie("password");
    if(password != null){
      $("#password_login").val(password);
    }
  } else {
    showMsg("login_div", LNG.HINT["cookieDiabled"]);
  }
}

var selGsId = null;
var isShowServers = "unknown";
var friendCode = null;
var servers = null;
var page = 0;
var needCaptcha = false;
var captchaResponse = null;
function click_registration(){
  clear();
  if(isShowServers === "unknown"){
    showLoading();
    var param = {
      "gameName": game,
      "locale": locale,
      "udid": udid,
      "idfa": idfa
    };
    httpCall("getLoginGameServers", param, function(result){
      var json = eval('(' + result + ')');
      if(json.returnCode == "0"){
        if(json.returnObjs && json.returnObjs["RECOMMENT_SERVER_ID"]){
          selGsId = json.returnObjs["RECOMMENT_SERVER_ID"];
        }
        if(json.returnObjs && json.returnObjs["SERVER_DISTRIBUTE"]){
          friendCode = json.returnObjs["SERVER_DISTRIBUTE"];
        }
        if(json.returnObjs && json.returnObjs["GAME_SERVER"]){
          // select server
          servers = eval('(' + json.returnObjs["GAME_SERVER"] + ')');
          for (var i = 0; i < servers.length; i++) {
            var server = servers[i];
            if(server && server.gsId == selGsId){
              $("#server_name_div").html(servers[i].gsName);
            }
          }
          drawServerPage();
          isShowServers = "Y";
          if(servers.length > 6){
            $("#nextPage").show();
          }
          $("#server_div").show();
        } else {
          isShowServers = "N";
          $("#server_div").hide();
        }
        $("#start").hide();
        needCaptcha = json.returnObjs["NEED_CAPTCHA"];
        if(needCaptcha == 'Y' && !captchaResponse){
          $.getScript('//www.google.com/recaptcha/api/js/recaptcha_ajax.js', function(data, textStatus, jqxhr){
            if(textStatus == "success"){
              $("#start_recaptcha").show();
              Recaptcha.create(captchaPublicKey, "recaptcha_div", { theme: "custom", custom_theme_widget: 'recaptcha_div'} );
            } else {
              showMsg("login_registration", textStatus);
            }
          });
        } else {
          if(usernameReg != ""){
            $("#username_reg").val(usernameReg);
          }
          $("#start_registration").show();
        }
      } else {
        showReturnMsg("start_div", json.returnCode, result);
      }
      hideLoading();
    });
  } else {
    $("#start").hide();
    if(needCaptcha == 'Y' && !captchaResponse){
      $("#start_recaptcha").show();
    } else {
      if(usernameReg != ""){
        document.getElementById("username_reg").value = usernameReg;
      }
      $("#start_registration").show();
    }
  }
}

function drawServerPage(){
  for (var i = 0; i < 6; i++) {
    var server = servers[page*6 + i];
    var serverBtn = document.getElementById("server" + i);
    if(serverBtn){
      if(server && server.gsName){
        serverBtn.value = server.gsName;
      } else {
        serverBtn.value = "　";
      }
      if(server && server.gsId){
        serverBtn.gsId = server.gsId;
      } else {
        serverBtn.gsId = null;
      }
    }
  }
  if(page > 0){
    $("#prePage").show();
  } else {
    $("#prePage").hide();
  }
  if((page*6 + 6) < servers.length){
    $("#nextPage").show();
  } else {
    $("#nextPage").hide();
  }
}

function clickPrePage(){
  if(page > 0){
    page--;
    drawServerPage();
  }
}

function clickNextPage(){
  if(page*6 < servers.length){
    page++;
    drawServerPage();
  }
}

function clickSwitchServer(){
  if(isShowServers === "Y"){
    $("#start_registration").hide();
    $("#start_server_selection").show();
  }
}

function chooseServer(btn){
  if(btn.gsId){
    selGsId = btn.gsId;
    $("#start_server_selection").hide();
    $("#start_registration").show();
    $("#server_name_div").html(btn.value);
  }
}

function click_account(){
  clear();
  $("#start").hide();
  $("#start_account").show();
}

function click_email(){
  clear();
  $("#start_account").hide();
  $("#start_account_email").show();
}

function click_changePwd(){
  clear();
  $("#start_account").hide();
  $("#start_account_changePwd").show();
}

function click_forgetPwd(){
  clear();
  $("#start_account").hide();
  $("#start_account_forgetPwd").show();
}

function click_cancel(){
  clear();
  $("#start_login, #start_server_selection, #start_registration, #start_account, #loading, #start_recaptcha").hide();
  $("#start").show();
}

function click_account_cancel(){
  clear();
  $("#start_account_email, #start_account_changePwd, #start_account_forgetPwd").hide();
  $("#start_account").show();
}

function login(){
  /* document.getElementById("login_button").disabled = true; */
  if(!checkLogin()){
    return false;
  }
  showLoading();

  var username = $("#username_login").val();
  var password = $("#password_login").val();
  var param = {
    "userName": username,
    "userPassword": password,
    "gameName": game,
    "udid": udid,
    "idfa": idfa,
    "clientType": getClientType(),
    "releaseChannel": releaseChannel,
    "locale": locale
  };
  showMsg("login_div", LNG.HINT["startlogin"]);
  httpCall("checkUserActivedBase64Json", strEncode(jsonToString(param)), function(result){
    var json = eval('(' + result + ')');
    if(json.returnCode == "0"){
      showMsg("login_div", LNG.HINT["loginSuccess"]);
      setCookie("username",username);
      if(document.getElementById("remember_me").checked){
        setCookie("password",password);
      }else{
        delCookie("password");
      }
      callBackGame(result, json);
    } else if (json.returnCode == "90204") {
      showMsg("login_div", LNG.HINT["activate"]);
      httpCall("activeGameBase64Json", strEncode(jsonToString(param)), function(result){
        var json = eval('(' + result + ')');
        if(json && json.returnCode == "0"){
          var count = 0;
          var max = 10;
          var m = LNG.HINT["activate"];
          var the_timeout = setInterval(function(){
            count++;
            m = m+"."
            showMsg("login_div", m);
            httpCall("checkUserActiveResultBase64Json", strEncode(jsonToString(param)), function(result){
              var json = eval('(' + result + ')');
              if(json.returnCode == "0"){
                showMsg("login_div", LNG.HINT["loginSuccess"]);
                clearInterval(the_timeout);
                setCookie("username",username);
                if(document.getElementById("remember_me").checked){
                  setCookie("password",password);
                }else{
                  delCookie("password");
                }
                callBackGame(result, json);
              } else if(json.returnCode != "90401"){
                showReturnMsg("login_div", json.returnCode, result);
                clearInterval(the_timeout);
                hideLoading();
              }
            })
            if(count == max){
              clearInterval(the_timeout);
              showMsg("login_div", LNG.HINT["activateFail"]);
              hideLoading();
            }
          },3000);
        } else {
          showReturnMsg("login_div", json.returnCode, result);
          hideLoading();
        }
      });
    } else {
      showReturnMsg("login_div", json.returnCode, result);
      hideLoading();
    }
  });
}

function recaptcha(){
  captchaResponse = Recaptcha.get_response();
  if(captchaResponse && captchaResponse != ""){
    var param = {
      "gameName": game,
      "udid": udid,
      "idfa": idfa,
      "captchaChallenge": Recaptcha.get_challenge(),
      "captchaResponse": captchaResponse
    };
    httpCall("checkCaptcha", param, function(result){
      var json = eval('(' + result + ')');
      if(json.returnCode == "0"){
        $("#start_recaptcha").hide();
        $("#start_registration").show();
        Recaptcha.destroy();
        reg();
      } else {
        showMsg("help_recaptcha", LNG.HINT["captchaError"]);
        Recaptcha.reload();
        captchaResponse = null;
      }
    });
  }
}

function reg(){
  if(!checkReg()){
    return false;
  }
  showLoading();
  var username = $("#username_reg").val();
  var password = $("#password_reg").val();
  var friendcode = $("#friendCode_reg").val();
  var param = {
    "udid": udid,
    "idfa": idfa,
    "gameName": game,
    "userName": username,
    "friendCode": friendcode,
    "selGsId": selGsId == null ? "" : selGsId
  };
  httpCall("checkGameActivatedByUdid", param, function(result){
    var json = eval('(' + result + ')');
    if(json.returnCode != "90204"){ // 用户不存在
      if(json.returnCode == "0"){ // 用户已经存在，已激活该游戏
        showMsg("login_registration", LNG.HINT["userAlreadyExist"]);
        hideLoading();
        return false;
      } else if(json.returnCode == "90405"){ // account limits
        if(!confirm(LNG.ERROR_CODE["90405"])){
          hideLoading();
          return false;
        }
      } else {
        showReturnMsg("login_registration", json.returnCode, result);
        hideLoading();
        return false;
      }
    }
    // 用户不存在
    showMsg("login_registration", LNG.HINT["startReg"]);
    var param = {
      "userName": username,
      "email": $("#email_reg").val(),
      "userPassword": password,
      "gameName": game,
      "udid": udid,
      "idfa": idfa,
      "clientType": getClientType(),
      "releaseChannel": releaseChannel,
      "locale": locale,
      "friendCode": friendcode,
      "selGsId": selGsId == null ? "" : selGsId
    };
    if(needCaptcha == 'Y' && typeof Recaptcha !== 'undefined'){
      param.captchaChallenge = Recaptcha.get_challenge();
      param.captchaResponse = captchaResponse;
    }
    httpCall("activeGameBase64Json", strEncode(jsonToString(param)), function(result){
      var json = eval('(' + result + ')');
      if(json && json.returnCode == "0"){
        var count = 0;
        var max = 10;
        var m = LNG.HINT["activate"];
        var the_timeout = setInterval(function(){
          count++;
          m = m+"."
          showMsg("login_registration", m);
          httpCall("checkUserActiveResultBase64Json", strEncode(jsonToString(param)), function(result){
            var json = eval('(' + result + ')');
            if(json.returnCode == "0"){
              setCookie("username",username);
              setCookie("password",password);
              clearInterval(the_timeout);
              showMsg("login_registration", LNG.HINT["loginSuccess"]);
              callBackGame(result, json);
            } else if(json.returnCode != "90401"){
              showReturnMsg("login_registration", json.returnCode, result);
              clearInterval(the_timeout);
              hideLoading();
            }
          })
          if(count == max){
            clearInterval(the_timeout);
            showMsg("login_registration", LNG.HINT["regFail"]);
            hideLoading();
          }
        },3000);
      } else {
        showReturnMsg("login_registration", json.returnCode, result);
        hideLoading();
      }
    });
  });
}

function changePassword(){
  if(!checkChangePwd()){
    return false;
  }
  showLoading();
  var param = {
    "userName": $("#username_cg").val(),
    "userPassword": $("#old_password_cg").val(),
    "newPassword": $("#new_password_cg").val(),
    "udid": udid,
    "idfa": idfa,
    "gameName": game,
    "clientType": getClientType(),
    "releaseChannel": releaseChannel,
    "locale": locale
  };
  httpCall("changePwdBase64Json", strEncode(jsonToString(param)), function(result){
    var json = eval('(' + result + ')');
    if(json && json.returnCode == "0"){
      showMsg("changePwd_div", LNG.HINT["changeSuccess"]);
    } else {
      showReturnMsg("changePwd_div", json.returnCode, result);
    }
    hideLoading();
  });
}

function getClientType(){
  if(from == null || from == '' || from == 'null'){
    if((/iphone/gi).test(navigator.appVersion)
      || (/ipad/gi).test(navigator.appVersion)
      || (/iphone|ipad/gi).test(navigator.appVersion)){
      from = 'ios';
    } else if((/Windows Phone/gi).test(navigator.appVersion)){
      from = 'wp8';
    } else if((/android/gi).test(navigator.appVersion)){
      from = 'android';
    } else {
      from = 'flash';
    }
  }
  return from;
}

function bindEmail(){
  if(!checkbindEmail()){
    return false;
  }
  showLoading();
  var param = {
    "userName": $("#username_bind").val(),
    "userPassword": $("#password_bind").val(),
    "newEmail": $("#email_bind").val(),
    "udid": udid,
    "idfa": idfa,
    "gameName": game,
    "locale": locale
  };
  httpCall("bindEmailBase64Json", strEncode(jsonToString(param)), function(result){
    var json = eval('(' + result + ')');
    if(json && json.returnCode == "0"){
      showMsg("bindemail_div", LNG.HINT["bindEmail"]);
      $("#username_bind, #password_bind, #password_bind_cf, #email_bind").val("");
    }else{
      showReturnMsg("bindemail_div", json.returnCode, result);
    }
    hideLoading();
  });
}

$(document).ready(function(){
  $("#username_bind, #password_bind").blur(function () {
    if($("#username_bind").val()){
      $("#email_bind_pwd_cf_div").hide();
    } else {
      $("#email_bind_pwd_cf_div").show();
      if($(this).attr("name") == "password_bind" && !$("#password_bind_cf").val()){
        $("#password_bind_cf").focus();
      }
    }
  });
});

function forgetPwd(){
  if(!checkFindPwd()){
    return false;
  }
  var param = {
    "userName": $("#username_forget").val(),
    "udid": udid,
    "idfa": idfa,
    "gameName": game,
    "clientType": getClientType(),
    "releaseChannel": releaseChannel,
    "locale": locale
  };
  showLoading();
  httpCall("forgetPwd", param, function(result){
    var json = eval('(' + result + ')');
    if(json && json.returnCode == "0"){
      showMsg("forgetPwd_div", LNG.HINT["checkEmail"]);
    }else{
      showReturnMsg("forgetPwd_div", json.returnCode, result);
    }
    hideLoading();
  });
}

function callBackGame(result, json) {
  hideLoading();
  if(from == 'flash'){
    if (window.postMessage) {
      parent.location.href = (flashRedirectUrl ? flashRedirectUrl : "flashRedirectUrl.do")
        + '#'
        + encodeURI(result);
    }
  } else if (from == 'ios'){
    if(typeof loginGame !== "undefined"){
      loginGame(json);
    } else {
      loginGamePP(result);
    }
  } else if (from == 'wp7'){
    droid.jscall='loginGame?json=' + result;
  } else if (from == 'android'){
    droid.loginGame(result);
  } else if(from == 'wp8' || from == 'win8'){
    window.external.notify('callback=loginGame?json=' + result);
  }
}

function utf16to8(str) {
  var out, i, len, c;

  out = "";
  len = str.length;
  for(i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if ((c >= 0x0001) && (c <= 0x007F)) {
      out += str.charAt(i);
    } else if (c > 0x07FF) {
      out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
      out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
      out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
    } else {
      out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
      out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
    }
  }
  return out;
}

var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function base64encode(str) {
  var out, i, len;
  var c1, c2, c3;

  len = str.length;
  i = 0;
  out = "";
  while(i < len) {
    c1 = str.charCodeAt(i++) & 0xff;
    if(i == len)
    {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt((c1 & 0x3) << 4);
      out += "==";
      break;
    }
    c2 = str.charCodeAt(i++);
    if(i == len)
    {
      out += base64EncodeChars.charAt(c1 >> 2);
      out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
      out += base64EncodeChars.charAt((c2 & 0xF) << 2);
      out += "=";
      break;
    }
    c3 = str.charCodeAt(i++);
    out += base64EncodeChars.charAt(c1 >> 2);
    out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
    out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6));
    out += base64EncodeChars.charAt(c3 & 0x3F);
  }
  return out;
}

//input base64 encode
function strEncode(str){
  return base64encode(utf16to8(str));
}

var base64DecodeChars = new Array(
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
  52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
  -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
  15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
  -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

function base64decode(str) {
  var c1, c2, c3, c4;
  var i, len, out;

  len = str.length;
  i = 0;
  out = "";
  while(i < len) {
    /* c1 */
    do {
      c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    } while(i < len && c1 == -1);
    if(c1 == -1)
      break;

    /* c2 */
    do {
      c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
    } while(i < len && c2 == -1);
    if(c2 == -1)
      break;

    out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

    /* c3 */
    do {
      c3 = str.charCodeAt(i++) & 0xff;
      if(c3 == 61)
        return out;
      c3 = base64DecodeChars[c3];
    } while(i < len && c3 == -1);
    if(c3 == -1)
      break;

    out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

    /* c4 */
    do {
      c4 = str.charCodeAt(i++) & 0xff;
      if(c4 == 61)
        return out;
      c4 = base64DecodeChars[c4];
    } while(i < len && c4 == -1);
    if(c4 == -1)
      break;
    out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
  }
  return out;
}

function utf8to16(str) {
  var out, i, len, c;
  var char2, char3;

  out = "";
  len = str.length;
  i = 0;
  while(i < len) {
    c = str.charCodeAt(i++);
    switch(c >> 4)
    {
      case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
      // 0xxxxxxx
      out += str.charAt(i-1);
      break;
      case 12: case 13:
      // 110x xxxx   10xx xxxx
      char2 = str.charCodeAt(i++);
      out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
      break;
      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = str.charCodeAt(i++);
        char3 = str.charCodeAt(i++);
        out += String.fromCharCode(((c & 0x0F) << 12) |
          ((char2 & 0x3F) << 6) |
          ((char3 & 0x3F) << 0));
        break;
    }
  }

  return out;
}

//input base64 decode
function strDecode(str){
  return utf8to16(base64decode(str));
}