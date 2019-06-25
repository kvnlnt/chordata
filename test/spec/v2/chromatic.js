describe("Chromatic Scale", function() {

    var mock;

    beforeEach(function() {
        mock = Chromatic();
    });

    it("set & get the degree", function() {
        mock.setDegree(4);
        expect(mock.getDegree()).toEqual(4);
    });

    it("set & get the degree by tonic", function() {
        mock.setDegreeByTonic('E');
        expect(mock.getDegree()).toEqual(4);
        expect(mock.getDegreeByTonic('A')).toEqual(5);
    });

    it("set & get a chromatic scale", function() {
        mock.setDegree(0);
        mock.setScale(mock.SCALE);
        expect(mock.getScale()[0].getSymbol()).toEqual('C');
        expect(mock.getScale()[1].getSymbol()).toEqual('C#/Db');
        expect(mock.getScale()[2].getSymbol()).toEqual('D');
        expect(mock.getScale()[3].getSymbol()).toEqual('D#/Eb');
        expect(mock.getScale()[4].getSymbol()).toEqual('E');
        expect(mock.getScale()[5].getSymbol()).toEqual('F');
        expect(mock.getScale()[6].getSymbol()).toEqual('F#/Gb');
        expect(mock.getScale()[7].getSymbol()).toEqual('G');
        expect(mock.getScale()[8].getSymbol()).toEqual('G#/Ab');
        expect(mock.getScale()[9].getSymbol()).toEqual('A');
        expect(mock.getScale()[10].getSymbol()).toEqual('A#/Bb');
        expect(mock.getScale()[11].getSymbol()).toEqual('B');
    });

    it("set & get the chromatic scale degree (9 aka A)", function() {
        mock.setDegree(9);
        mock.setScale(mock.SCALE);
        expect(mock.getScale()[0].getSymbol()).toEqual('A');
        expect(mock.getScale()[1].getSymbol()).toEqual('A#/Bb');
        expect(mock.getScale()[2].getSymbol()).toEqual('B');
        expect(mock.getScale()[3].getSymbol()).toEqual('C');
        expect(mock.getScale()[4].getSymbol()).toEqual('C#/Db');
        expect(mock.getScale()[5].getSymbol()).toEqual('D');
        expect(mock.getScale()[6].getSymbol()).toEqual('D#/Eb');
        expect(mock.getScale()[7].getSymbol()).toEqual('E');
        expect(mock.getScale()[8].getSymbol()).toEqual('F');
        expect(mock.getScale()[9].getSymbol()).toEqual('F#/Gb');
        expect(mock.getScale()[10].getSymbol()).toEqual('G');
        expect(mock.getScale()[11].getSymbol()).toEqual('G#/Ab');

    });

    it("set & get the fundamental pitch", function() {
    	var p = new Pitch({ freq: 450, symbol: '~' });
    	mock.setFundamental(p);
    	expect(mock.getFundamental().class).toEqual('Pitch');
        expect(mock.getFundamental().getSymbol()).toEqual('~');
        expect(mock.getFundamental().getFreq()).toEqual(450);
    });

    it("get an interval between two notes", function() {
        expect(mock.getInterval('D','C')).toEqual(2);
    });

    it("get the next & prev note", function() {
        expect(mock.getNextSymbol()).toEqual('C#/Db');
        expect(mock.getPrevSymbol()).toEqual('B');
    });

    it("get the next & prev pitch", function() {
        expect(mock.getNextPitch().getSymbol()).toEqual('C#/Db');
        expect(mock.getPrevPitch().getSymbol()).toEqual('B');
    });

});