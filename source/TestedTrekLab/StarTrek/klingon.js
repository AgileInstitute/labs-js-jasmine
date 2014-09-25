Klingon = function(initialDistance, initialEnergy) {
    this.distance = initialDistance || 100 + Math.floor(Math.random() * 4000);
    this.energy = initialEnergy || 1000 + Math.floor(Math.random() * 2000);
};

Klingon.prototype = {
    destroy: function() {
    }
};