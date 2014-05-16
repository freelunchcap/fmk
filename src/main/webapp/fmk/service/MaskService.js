fmk.factory('MaskService', function() {

  var maskers = [];
  var masks = [];

  function removeMask(uid) {
    masks =  $.grep(masks, function(mask) {
      return mask.uid != uid;
    });
  }

  return {

    register: function(masker) {
      maskers.push(masker);
    },

    mask: function(message) {
      var uid = new Date().getTime();
      masks.push({
        uid: uid,
        message: message
      });
      $.each(maskers, function(index, masker) {
        masker.mask(message);
      });
      return uid;
    },

    unmask: function(uid) {
      removeMask(uid);
      $.each(maskers, function(index, masker) {
        if(masks.length == 0)
          masker.unmask();
        else
          masker.mask(masks[masks.length - 1].message);
      });
    }

  };

});