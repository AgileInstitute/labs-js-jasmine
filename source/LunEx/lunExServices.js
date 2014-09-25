LunExServices = function () {
};

LunExServices.prototype = {
    currentPrice: function (symbol) {
        this.pauseToEmulateSendReceive();
        if (this.invisibleHand() > 0.8) {
            throw "Sorry, sunspot activity today...please try again later";
        }
        var currentPrice = 42.0 + (this.invisibleHand() * 2.1);
        return Math.floor(currentPrice);
    },
    invisibleHand: function () {
        return Math.random();
    },
    pauseToEmulateSendReceive: function () {
        this.sleep(5000);
    },
    sleep: function (delay) {
        var startTime = new Date();
        var endTime = null;
        do {
            endTime = new Date();
        } while ((endTime - startTime) < delay);
    }
};