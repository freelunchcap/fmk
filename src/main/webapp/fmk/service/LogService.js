fmk.factory('LogService', function() {

  var loggers = [];
  var logs = [];

  return {

    register: function(logger) {
      loggers.push(logger);
      return logs;
    },

    log: function(log, callback) {
      logs.push($.extend(true, {}, log));
      if(callback)
        callback(logs.length - 1);
      $.each(loggers, function(index, logger) {
        logger.notify();
      });
    },

    amend: function(index, log, callback) {
      $.extend(logs[index], $.extend(true, {}, log));
      if(callback)
        callback(logs[index]);
    }

  }

});