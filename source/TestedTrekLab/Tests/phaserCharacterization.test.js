describe("phasers", function() {
    var game;
    var ui;
    var energyBefore;
    
    beforeEach(function() {
        game = new Game();
        energyBefore = game.e;
        ui = new UserInterface("phaser");
        spyOn(ui, "writeLine");
    });

    it("should complain with insufficient energy when not available", function() {
        // given
        ui.commandParameter = game.e + 1;

        // when
        game.processCommand(ui);

        // then
        expect(ui.writeLine).toHaveBeenCalledWith("Insufficient energy to fire phasers!");
    });

    describe("when Klingon out of range", function() {
        var outOfRange;
        var energyToFire = 1000;
        beforeEach(function() {
            outOfRange = game.maxPhaserRange + 1;
            ui.target = new Klingon(outOfRange);
            ui.commandParameter = energyToFire;
            game.processCommand(ui);
        });

        it("reports out-of-range", function() {
            expect(ui.writeLine).toHaveBeenCalledWith("Klingon out of range of phasers at " + outOfRange + " sectors...");
        });

        it("still subtracts the energy", function() {
            expect(game.e).toBe(energyBefore - energyToFire);
        });
    });

    describe("when Klingon destroyed by sufficient strike", function() {
        var klingon;
        beforeEach(function() {
            klingon = new Klingon(2000, 200);
            spyOn(klingon, "destroy");
            ui.target = klingon;
            ui.commandParameter = 1000;
            spyOn(game, "generator").and.returnValue(0);

            game.processCommand(ui);
        });

        it("reports hit and destroyed", function() {
            expect(ui.writeLine).toHaveBeenCalledWith("Phasers hit Klingon at 2000 sectors with 500 units");
            expect(ui.writeLine).toHaveBeenCalledWith("Klingon destroyed!");
        });

        it("subtracts energy", function() {
            expect(game.e).toBe(energyBefore - 1000);
        });

        it("really destroys", function() {
            expect(klingon.destroy).toHaveBeenCalled();
        });
    });

    describe("when damaging Klingon", function() {
        beforeEach(function() {
            ui.target = new Klingon(2000, 200);
            ui.commandParameter = 50;
            spyOn(game, "generator").and.returnValue(0);

            game.processCommand(ui);
        });

        it("reports damage", function() {
            expect(ui.writeLine).toHaveBeenCalledWith("Phasers hit Klingon at 2000 sectors with 25 units");
            expect(ui.writeLine).toHaveBeenCalledWith("Klingon has 175 remaining");
        });

        it("subtracts energy", function() {
            expect(game.e).toBe(energyBefore - 50);
        });
    });


    describe("a defect when firing zero", function() {
        beforeEach(function() {
            ui.target = new Klingon(2000, 200);
            ui.commandParameter = 0;
            spyOn(game, "generator").and.returnValue(0);

            game.processCommand(ui);
        });

        it("reports miscalculated damage!", function() {
            expect(ui.writeLine).toHaveBeenCalledWith("Phasers hit Klingon at 2000 sectors with 1 units");
            expect(ui.writeLine).toHaveBeenCalledWith("Klingon has 199 remaining");
        });

        it("mistakenly doesn't subtract that one unit", function() {
            expect(game.e).toBe(energyBefore);
        });
    });


});
