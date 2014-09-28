describe("model", function () {
    var model;

    beforeEach(function () {
        model = new Model();
    });

    afterEach(function () {
        $.mockjaxClear();
    });

    describe("getProduct", function() {
        it("retrieves product info", function (done) {
            // given
            $.mockjax({
                // mockjax input
                url: '/product',
                data: { productId: 4711},
                // mockjax output
                responseText: { error: false, product: { name: 'banana'}},
                responseTime: 1
            });

            // when
            model.getProduct(4711, function (error, product) {

                // then
                expect(error).toBe(null);
                expect(product.name).toBe('banana');
                done(); // important for async test, must be called in final callback
            });
        });

        it("reports product-not-found server error", function (done) {
            // given
            $.mockjax({
                url: '/product',
                data: { productId: 17},
                responseText: { error: { message: "product with id 17 not found"}},
                responseTime: 1
            });

            // when
            model.getProduct(17, function (error, product) {

                // then
                expect(error.message).toBe("product with id 17 not found");
                done();
            });
        });

        it("handles unresponsive server", function (done) {
            // when
            model.getProduct(17, function (error, product) {

                // then
                expect(error.message).toBe("server connection failed");
                done();
            });
        });
    });

});