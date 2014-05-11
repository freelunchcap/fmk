fmk.controller('Notification', ['$timeout', 'NotificationService',
  function($timeout, NotificationService) {

    var notifications = [];

    function show(notification) {
      var index = $.inArray(notification, notifications);
      var bottom = 0;
      for(var i = 0; i < index; i++) {
        bottom += notifications[i].height() + 30;
      }
      notification.css({
        'z-index': 1080,
        width: '300px',
        position: 'absolute',
        right: '20px',
        bottom: bottom + 'px'
      });
      notification.animate({bottom: '+=20', opacity: 0.8}, 400);
    }

    function fade(notification) {
      var height = notification.height() + 30;
      notification.animate({bottom: 20, opacity: 0}, 400, 'swing', function() {
        var index = $.inArray(notification, notifications);
        notifications.splice(index, 1);
        notification.remove();
        for(var i = index; i < notifications.length; i++) {
          $(notifications[i]).animate({bottom: '-=' + height}, 400)
        }
      });
    }

    function fadeAll() {
      $.each(notifications, function(index, notification) {
        if(notification.type == NOTIFICATION_INFOMATION || notification.type == NOTIFICATION_SUCCESS)
          fade(notification);
      });
    }

    var timer;
    function resetTimer() {
      if(timer) $timeout.cancel(timer);
      timer = $timeout(fadeAll, 3000);
    }

    var cls = {};
    cls[NOTIFICATION_INFOMATION] = 'alert-info';
    cls[NOTIFICATION_SUCCESS] = 'alert-success';
    cls[NOTIFICATION_WARNING] = 'alert-warning';
    cls[NOTIFICATION_ERROR] = 'alert-danger';
    function notify(header, message, type) {
      var notification = $('<div class="alert notification"></div>');
      notification.type = type;
      notification.css('opacity', 0);
      notification.addClass(cls[type]);
      var close = $('<button type="button" class="close">&times;</button>');
      close.click(function() {
        fade(notification);
      });
      notification.append(close);
      if(header) notification.append($('<h4></h4>').html(header));
      if(message) notification.append($('<small></small>').html(message));

      notifications.push(notification);
      $('body').append(notification);
      show(notification);
      resetTimer();
    }

    NotificationService.register({
      notify: notify
    });
  }
]);