HOME_SWITCH_USER = 'switch_user';

fmk.controller('Home', ['$scope', '$window',
  function($scope, $window) {

    $scope.tabs = {
      user: true,
      maze: false,
      friends: false,
      counterAttacks: false,
      dungeon: false,
      arena: false
    };

    function setStatusPanelMaxHeight() {
      var window = $($window);
      var statusPanels = $('.status-panel');
      $.each(statusPanels, function(index, element) {
        var statusPanel = $(element);
        var top = statusPanel.offset().top;
        statusPanel.css('max-height', window.height() - top - 20 + 'px');
      });
    }

    $scope.$watch('tabs', function(newValue, oldValue) {
      if(newValue == oldValue) {
        angular.element($window).bind('resize', function() {
          setStatusPanelMaxHeight();
        });
      }
      setStatusPanelMaxHeight();
    }, true);

  }
]);