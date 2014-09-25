Game = function() {
    this.e = 10000;
    this.t = 8;
    this.maxPhaserRange = 4000;
};

Game.prototype = {
    generator: function() {
        return Math.random();
    },
    randomWithinLimitOf: function(n) {
        return Math.floor(this.generator() * n);
    },
    processCommand: function(ui) {
        var enemy;
        var distance;
        var damage;
        if(ui.parameter("command") === "phaser") {
            var amount = parseInt(ui.parameter("amount"), 10);
            enemy = ui.variable("target");
            if (this.e >= amount) {
                distance = enemy.distance;
                if (distance > this.maxPhaserRange) {
                    ui.writeLine("Klingon out of range of phasers at " + distance + " sectors...");
                } else {
                    damage = amount - (((amount / 20) * distance / 200) + this.randomWithinLimitOf(200));
                    if (damage < 1) {
                        damage = 1;
                    }
                    ui.writeLine("Phasers hit Klingon at " + distance + " sectors with " + damage + " units");
                    if (damage < enemy.energy) {
                        enemy.energy = enemy.energy - damage;
                        ui.writeLine("Klingon has " + enemy.energy + " remaining");
                    } else {
                        ui.writeLine("Klingon destroyed!");
                        enemy.destroy();
                    }
                }
                this.e -= amount;
            } else {
                ui.writeLine("Insufficient energy to fire phasers!");
            }
        } else if(ui.parameter("command") === "photon") {
            enemy = ui.variable("target");
            if(this.t > 0) {
                distance = enemy.distance;
                if ((this.randomWithinLimitOf(4) + ((distance / 500) + 1) > 7)) {
                    ui.writeLine("Torpedo missed Klingon at " + distance + " sectors...");
                } else {
                    damage = 800 + this.randomWithinLimitOf(50);
                    ui.writeLine("Photons hit Klingon at " + distance + " sectors with " + damage + " units");
                    if (damage < enemy.energy) {
                        enemy.energy = enemy.energy - damage;
                        ui.writeLine("Klingon has " + enemy.energy + " remaining");
                    } else {
                        ui.writeLine("Klingon destroyed!");
                        enemy.destroy();
                    }
                }
                this.t--;
            } else {
                ui.writeLine("No more photon torpedoes!");
            }
        }
    }
};