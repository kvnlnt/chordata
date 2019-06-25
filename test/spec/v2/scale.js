describe("Scale", function() {

    var mock;

    beforeEach(function() {
        mock = Scale();
    });

    it("set & get the scale (pitches)", function() {
        mock.setScale(mock.SCALE.BLUES);
        mock.setBase(Chromatic({degree:4}));
        expect(mock.getScale()[0].class).toEqual('Pitch');
        expect(mock.getScale()[0].getSymbol()).toEqual('E');
        expect(mock.getScale().length).toEqual(6);
    });

    it("set & get the base scale", function() {
        mock.setBase(Chromatic({degree:4}));
        expect(mock.getBase().class).toEqual('Chromatic');
        expect(mock.getBase().getScale().length).toEqual(12);
        expect(mock.getBase().getScale()[0].class).toEqual('Pitch');
        expect(mock.getBase().getScale()[0].getSymbol()).toEqual('E');
    });

    it("get scale symbols", function() {
        expect(mock.getScaleSymbols()).toEqual(['C','D','E','F','G','A','B']);
    });

    it("get the scale symbols with no enharmonic", function() {
        mock.setTonic('E');
        mock.setScale(mock.SCALE.BLUES);
        expect(mock.getScaleSymbolsNoEnharmonics()).toEqual(["E","G","A","A#","B","D"]);
    });

    it("get scale pitches", function() {
        mock.setBase(Chromatic({degree:9}));// set to A
        expect(mock.getScalePitches()[0]).toEqual(440);
    });

    it("get the next & prev note", function() {
        expect(mock.getNextSymbol('C')).toEqual('D');
        expect(mock.getPrevSymbol('C')).toEqual('B');
    });

    it("get the next & prev pitch", function() {
        expect(mock.getNextPitch('C').getSymbol()).toEqual('D');
        mock.setScale(mock.SCALE.BLUES);
        mock.setTonic('E');
        expect(mock.getPrevPitch('A#').getSymbol()).toEqual('A');
    });

});