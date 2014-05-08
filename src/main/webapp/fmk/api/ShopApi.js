SHOP_PHP = 'shop.php';

fmk.factory('ShopApi', function(GameApi) {
  return {

    getGoods: function(callback) {
      var params = {
      };
      GameApi.post(SHOP_PHP, 'GetGoods', params, callback);
    },

    buy: function(goodsId, callback) {
      var params = {
        GoodsId: goodsId
      };
      GameApi.post(SHOP_PHP, 'Buy', params, callback);
    }

  }

});