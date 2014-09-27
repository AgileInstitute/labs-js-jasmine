describe("photons", function() {
    var game;
    var ui;

    beforeEach(function() {
        game = new Game();
        ui = new UserInterface("photon");
        spyOn(ui, "writeLine");
        spyOn(game, "generator").and.returnValue(1);

    });

    it ("notifies you when no torpedoes remain", function() {
        // given
        game.t = 0;
        ui.target = new Klingon();

        // when
        game.processCommand(ui);

        // then
        expect(ui.writeLine).toHaveBeenCalledWith("No more photon torpedoes!");
    });

    describe("when drift over distance causes torpedo to miss", function() {
        beforeEach(function() {
            var distanceWhereRandomFactorsHoldSway = 3000;
            ui.target = new Klingon(distanceWhereRandomFactorsHoldSway, 200);

            game.processCommand(ui);
        });

        it("reports torpedo missed", function() {
            expect(ui.writeLine).toHaveBeenCalledWith("Torpedo missed Klingon at 3000 sectors...");
        });

        it("reduces torpedoes available", function() {
            expect(game.t).toBe(7);
        });
    });

    describe("how photon always misses when Klingon is quite far away, presumably due to clever evasive actions", function() {
        beforeEach(function() {
            var distanceWhereTorpedoesAlwaysMiss = 3500;
            ui.target = new Klingon(distanceWhereTorpedoesAlwaysMiss, 200);

            game.processCommand(ui);
        });

        it("reports torpedo missed", function() {
            expect(ui.writeLine).toHaveBeenCalledWith("Torpedo missed Klingon at 3500 sectors...");
        });

        it("reduces torpedoes available", function() {
            expect(game.t).toBe(7);
        });
    });

    it("destroys Klingon", function() {
        // given
        var klingon = new Klingon(500, 200);
        spyOn(klingon, "destroy");
        ui.target = klingon;

        // when
        game.processCommand(ui);

        // then
        expect(ui.writeLine).toHaveBeenCalledWith("Photons hit Klingon at 500 sectors with 850 units");
        expect(ui.writeLine).toHaveBeenCalledWith("Klingon destroyed!");
        expect(game.t).toBe(7);
        expect(klingon.destroy).toHaveBeenCalled();
    });

    it("damages Klingon", function() {
        // given
        ui.target = new Klingon(500, 2000);

        // when
        game.processCommand(ui);

        // then
        expect(ui.writeLine).toHaveBeenCalledWith("Photons hit Klingon at 500 sectors with 850 units");
        expect(ui.writeLine).toHaveBeenCalledWith("Klingon has 1150 remaining");
        expect(game.t).toBe(7);
    });
});

