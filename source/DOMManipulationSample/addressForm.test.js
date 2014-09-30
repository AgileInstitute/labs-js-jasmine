describe("onCountryChange", function() {
    beforeEach(function() {
        this.$fixture = $('#test-fixture');
    });

    afterEach(function() {
        this.$fixture.html("");
    });

    describe("when user selects defined fieldset", function() {
        beforeEach(function() {
            this.$fixture.html($("#japaneseAndOtherFixture").text());

            $("#countrySelect", this.$fixture).val("JP");
            onCountryChange(this.$fixture);
        });
        it ("reveals selected fieldset", function() {
            expect($(".address_jp:visible", this.$fixture).length).toBe(1);
        });
        it ("hides all but selected fieldset", function() {
            expect($(".new_address_form:visible", this.$fixture).length).toBe(1);
        });
    });

    describe("when user selects undefined fieldset eg Narnia", function() {
        beforeEach(function() {
            this.$fixture.html($("#narniaWithNoCustomFieldsetAndDefaultFixture").text());

            $("#countrySelect", this.$fixture).val("$$");
            onCountryChange(this.$fixture);
        });
        it ("reveals default generic fieldset", function() {
            expect($(".address_generic:visible", this.$fixture).length).toBe(1);
        });
        it ("hides all but default generic fieldset", function() {
            expect($(".new_address_form:visible", this.$fixture).length).toBe(1);
        });
    });


});
