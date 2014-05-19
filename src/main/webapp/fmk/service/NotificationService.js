NOTIFICATION_INFOMATION = 'information';
NOTIFICATION_SUCCESS = 'success';
NOTIFICATION_WARNING = 'warning';
NOTIFICATION_ERROR = 'error';

fmk.factory('NotificationService', function() {

  var notifiers = [];

  function notify(header, content, type) {
    $.each(notifiers, function(index, notifier) {
      notifier.notify(header, content, type);
    });
  }

  return {

    register: function(notifier) {
      notifiers.push(notifier);
    },

    info: function(header, content) {
      notify(header, content, NOTIFICATION_INFOMATION);
    },

    success: function(header, content) {
      notify(header, content, NOTIFICATION_SUCCESS);
    },

    warn: function(header, content) {
      notify(header, content, NOTIFICATION_WARNING);
    },

    error: function(header, content) {
      notify(header, content, NOTIFICATION_ERROR);
    }

  };

});