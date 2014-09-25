Game = function() {
    this.e = 10000;
    this.t = 8;
};

Game.prototype = {
    randomWithinLimitOf: function(n) {
        return Math.floor(Math.random() * n);
    },
    processCommand: function(ui) {
        var enemy;
        var distance;
        var damage;
        if(ui.parameter("command") === "phaser") {
            var amount = parseInt(ui.parameter("amount"), 10);
            enemy = ui.variable("target");
            if(this.e >= amount) {
                distance = enemy.distance;
                if(distance > 4000) {
                    $("#dialogue").append("<p>" + "Klingon out of range of phasers at " + distance + " sectors..." + "</p>");
                } else {
                    damage = amount - (((amount / 20) * distance / 200) + this.randomWithinLimitOf(200));
                    if (damage < 1) {
                        damage = 1;
                    }
                    $("#dialogue").append("<p>" + "Phasers hit Klingon at " + distance + " sectors with " + damage + " units" + "</p>");
                    if(damage < enemy.energy) {
                        enemy.energy = enemy.energy - damage;
                        $("#dialogue").append("<p>" + "Klingon has " + enemy.energy + " remaining" + "</p>");
                    } else {
                        $("#dialogue").append("<p>" + "Klingon destroyed!" + "</p>");
                        enemy.destroy();
                    }
                }
                this.e -= amount;
            } else {
                $("#dialogue").append("<p>" + "Insufficient energy to fire phasers!" + "</p>");
            }
        } else if(ui.parameter("command") === "photon") {
            enemy = ui.variable("target");
            if(this.t > 0) {
                distance = enemy.distance;
                if ((this.randomWithinLimitOf(4) + ((distance / 500) + 1) > 7)) {
                    $("#dialogue").append("<p>" + "Torpedo missed Klingon at " + distance + " sectors..." + "</p>");
                } else {
                    damage = 800 + this.randomWithinLimitOf(50);
                    $("#dialogue").append("<p>" + "Photons hit Klingon at " + distance + " sectors with " + damage + " units" + "</p>");
                    if (damage < enemy.energy) {
                        enemy.energy = enemy.energy - damage;
                        $("#dialogue").append("<p>" + "Klingon has " + enemy.energy + " remaining" + "</p>");
                    } else {
                        $("#dialogue").append("<p>" + "Klingon destroyed!" + "</p>");
                        enemy.destroy();
                    }
                }
                this.t--;
            } else {
                $("#dialogue").append("<p>" + "No more photon torpedoes!" + "</p>");
            }
        }
    }
};