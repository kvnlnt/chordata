describe("Guitar", function() {
    var guitar;

    beforeEach(function() {
        guitar = new Guitar();
    });

    it("should be able to get tuning", function() {
        expect(guitar.getTuning()).toEqual(['E', 'A', 'D', 'G', 'B', 'E']);
    });

    it("should be able to set tuning", function() {
        guitar.setTuning(['A', 'B']);
        expect(guitar.getTuning()).toEqual(['A', 'B']);
    });

    it("should be able to get frets", function() {
        expect(guitar.getFrets()).toEqual(24);
    });

    it("should be able to set frets", function() {
        guitar.setFrets(12);
        expect(guitar.getFrets()).toEqual(12);
    });

    it("should be able to get all strings", function() {
        expect(guitar.getStrings()[1]).toEqual(["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"]);
        expect(guitar.getStrings()[2]).toEqual(["B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#"]);
        expect(guitar.getStrings()[3]).toEqual(["G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#"]);
        expect(guitar.getStrings()[4]).toEqual(["D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#"]);
        expect(guitar.getStrings()[5]).toEqual(["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"]);
        expect(guitar.getStrings()[6]).toEqual(["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"]);
    });

    it("should be able to get string", function() {
      expect(guitar.getString(1,10)).toEqual(["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#"] );
    });

    it("should be able to get a note by string and fret", function() {
      expect(guitar.getNote(1,3)).toEqual("G");
    });

});