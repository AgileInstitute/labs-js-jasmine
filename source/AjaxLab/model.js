Model = function() {
};

Model.prototype = {
  getProduct: function(productId, callback) {
      jQuery.ajax("/product", {
          data: { productId : productId },
          success: function(response) {
              if(response.error) {
                  callback(response.error);
              } else {
                  callback(null, response.product);
              }
          },
          error: function() {
              callback(new Error("server connection failed"));
          }
      });
  }
};