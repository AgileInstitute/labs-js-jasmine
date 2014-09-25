

module("photon", {
    setup: function() {
        // given
        game = new Game();
        ui = new UserInterface("photon");
        sinon.stub(ui, "writeLine");
        sinon.stub(game, "generator", function() { return 1; }); // Note: without this the test would often fail
    }
});

test("Notified if no torpedoes remain", function() {
    // given
    game.t = 0;
    ui.target = new Klingon();

    // when
    game.processCommand(ui);

    // then
    equal(ui.writeLine.args[0], "No more photon torpedoes!", "message");
});

test("Torpedo misses due to random factors", function() {
    // given
    var distanceWhereRandomFactorsHoldSway = 3000;
    ui.target = new Klingon(distanceWhereRandomFactorsHoldSway, 200);

    // when
    game.processCommand(ui);

    // then
    equal(ui.writeLine.args[0], "Torpedo missed Klingon at 3000 sectors...", "message");
    equal(game.t, 7, "torpedo count");
});

test("Torpedo misses due to distance and clever klingon evasive actions", function() {
    // given
    var distanceWhereTorpedoesAlwaysMiss = 3500;
    ui.target = new Klingon(distanceWhereTorpedoesAlwaysMiss, 200);

    // when
    game.processCommand(ui);

    // then
    equal(ui.writeLine.args[0], "Torpedo missed Klingon at 3500 sectors...", "message");
    equal(game.t, 7, "torpedo count");
});

test("Torpedo destroys klingon", function() {
    // given
    var klingon = new Klingon(500, 200);
    sinon.spy(klingon, "destroy");
    ui.target = klingon;

    // when
    game.processCommand(ui);

    // then
    equal(ui.writeLine.getCall(0).args[0], "Photons hit Klingon at 500 sectors with 850 units", "first message");
    equal(ui.writeLine.getCall(1).args[0], "Klingon destroyed!", "second message");
    equal(game.t, 7, "torpedo count");
    ok(klingon.destroy.calledOnce, "klingon destroyed");
});

test("Torpedo damages klingon", function() {
    // given
    ui.target = new Klingon(500, 2000);

    // when
    game.processCommand(ui);

    // then
    equal(ui.writeLine.getCall(0).args[0], "Photons hit Klingon at 500 sectors with 850 units", "first message");
    equal(ui.writeLine.getCall(1).args[0], "Klingon has 1150 remaining", "second message");
    equal(game.t, 7, "torpedo count");
});
