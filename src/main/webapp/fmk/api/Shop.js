SHOP_PHP = 'shop.php';

fmk.factory('Shop', function(Game) {
  return {

    getGoods: function(callback) {
      var params = {
      };
      Game.post(SHOP_PHP, 'GetGoods', params, callback);
    },

    buy: function(goodsId, callback) {
      var params = {
        GoodsId: goodsId
      };
      Game.post(SHOP_PHP, 'Buy', params, callback);
    }

  }

});