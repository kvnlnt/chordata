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
        expect(guitar.getStrings()[1]).toEqual(['E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb']);
        expect(guitar.getStrings()[2]).toEqual(['B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb']);
    });

    it("should be able to get a string", function() {
        expect(guitar.getStrings()[1]).toEqual(['E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb']);
    });

    it("should be able to get a note by string and fret", function() {
        expect(guitar.getNote(1, 1)).toEqual("F");
        expect(guitar.getNote(1, 6)).toEqual("A#/Bb");
    });

});