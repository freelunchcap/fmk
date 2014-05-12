SHOP_PHP = 'shop.php';

fmk.factory('ShopApi', function(GameApi) {
  return {

    getGoods: function(success) {
      var params = {
      };
      GameApi.post(SHOP_PHP, 'GetGoods', params, success);
    },

    buy: function(goodsId, success) {
      var params = {
        GoodsId: goodsId
      };
      GameApi.post(SHOP_PHP, 'Buy', params, success);
    }

  }

});