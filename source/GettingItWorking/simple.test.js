describe("simple math", function() {
    it ('can add', function() {
        expect(simpleAdd(2, 2)).toBe(4);
    });

    it('can concatenate (really a demo of equality rather than identity)', function() {
        expect([[1,2]].concat([[3,4]])).toEqual([[1,2],[3,4]]);
    });
});
