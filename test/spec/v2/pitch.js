describe("Pitch", function() {

    var mock;

    beforeEach(function() {
        mock = Pitch();
    });

    it("set & get the frequency", function() {
        mock.setFreq(450);
        expect(mock.getFreq()).toEqual(450);
    });

    it("set & get the symbol", function() {
        mock.setSymbol('~');
        expect(mock.getSymbol()).toEqual('~');
    });

    it("set & get the enharmonic", function() {
        mock.setEnharmonic(['A#','Bb']);
        expect(mock.getEnharmonic()).toEqual(['A#','Bb']);
    });

    it("set & get the klass", function() {
        mock.setKlass(0);
        expect(mock.getKlass()).toEqual(0);
    });

    it("get relative pitch", function() {
        mock.setKlass(8);
        mock.setFreq(100);
        var rel = mock.getRelativePitch(mock, { symbol:'X', enharmonic:[]}, 1, 2);
        expect(rel.getFreq()).toEqual(0.78125);
    });

    it("get wave length", function() {
        expect(mock.getWaveLength()).toEqual(0.7805000000000001);
    });

});