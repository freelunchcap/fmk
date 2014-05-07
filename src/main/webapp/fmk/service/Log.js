fmk.factory('Log', function() {

  var logger;

  return {

    linkLogs: function(logs) {
      logger = {
        log: function(log) {
          logs.push(log);
          return logs.length - 1;
        },
        amend: function(index, log) {
          return $.extend(logs[index], log);
        }
      }
    },

    log: function(log) {
      if(logger)
        return logger.log(log);
      console.error(JSON.stringify(log));
      return -1;
    },

    amend: function(index, log) {
      logger.amend(index, log);
    }

  }

});