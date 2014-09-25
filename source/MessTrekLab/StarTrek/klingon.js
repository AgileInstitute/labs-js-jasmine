Klingon = function() {
    this.distance = 100 + Math.floor(Math.random() * 4000);
    this.energy = 1000 + Math.floor(Math.random() * 2000);
};

Klingon.prototype = {
    destroy: function() {

    }
};