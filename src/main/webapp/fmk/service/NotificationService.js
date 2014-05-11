NOTIFICATION_INFOMATION = 'information';
NOTIFICATION_SUCCESS = 'success';
NOTIFICATION_WARNING = 'warning';
NOTIFICATION_ERROR = 'error';

fmk.factory('NotificationService', function() {

  var notifiers = [];

  var ns = {

    register: function(notifier) {
      notifiers.push(notifier);
    },

    notify: function(header, content, type) {
      $.each(notifiers, function(index, notifier) {
        notifier.notify(header, content, type);
      });
    },

    info: function(header, content) {
      ns.notify(header, content, NOTIFICATION_INFOMATION);
    },

    success: function(header, content) {
      ns.notify(header, content, NOTIFICATION_SUCCESS);
    },

    warn: function(header, content) {
      ns.notify(header, content, NOTIFICATION_WARNING);
    },

    error: function(header, content) {
      ns.notify(header, content, NOTIFICATION_ERROR);
    }

  };

  return ns;

});