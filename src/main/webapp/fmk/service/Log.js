fmk.factory('Log', function() {

  var logger;

  return {

    linkLogs: function(logs) {
      logger = {
        log: function(message, request, response, error) {
          logs.push({
            message: message || '',
            request: request || '',
            response: response || '',
            error: error || false
          });
          return logs.length - 1;
        },
        amend: function(index, data) {
          var log = logs[index];
          if(log)
            $.each(log, function (key) {
              if(data[key] !== undefined)
                log[key] = data[key];
            });
          return log;
        }
      }
    },

    info: function(message, request, response) {
      if(logger)
        return logger.log(message, request, response, false);
      console.log(message, request, response);
      return -1;
    },

    error: function(message, request, response) {
      if(logger)
        return logger.log(message, request, response, true);
      console.error(message, request, response);
      return -1;
    },

    amend: function(index, data) {
      logger.amend(index, data);
    }

  }

});