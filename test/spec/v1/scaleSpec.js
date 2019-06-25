describe("Scale", function() {
  var C_MAJOR;
  var A_MINOR;

  beforeEach(function() {
    C_MAJOR = new Scale({key:'C', scale:SCALE.MAJOR});
    C_HARMO = new Scale({key:'C', scale:SCALE.HARMONIC_MINOR});
    A_MINOR = new Scale({key:'A', scale:SCALE.MINOR});
    E_BLUES = new Scale({key:'E', scale:SCALE.BLUES});
    E_MIXOL = new Scale({key:'E', scale:SCALE.MIXOLYDIAN});
  });

  it("should be able to get key", function() {
    expect(C_MAJOR.getKey()).toEqual('C');
    expect(A_MINOR.getKey()).toEqual('A');
  });

  it("should be able to set key", function() {
    C_MAJOR.setKey('D');
    expect(C_MAJOR.getKey()).toEqual('D');
  });

  it("should be able to get scale pattern", function() {
    expect(C_MAJOR.getScale()).toEqual([2,2,1,2,2,2,1]);
    expect(A_MINOR.getScale()).toEqual([2,1,2,2,1,2,2]);
  });

  it("should be able to set scale pattern", function() {
    C_MAJOR.setScale([1,2,3]);
    expect(C_MAJOR.getScale()).toEqual([1,2,3]);
  });

  it("should be able to get scale notes", function() {
    expect(C_MAJOR.getScaleNotes()).toEqual(['C','D','E','F','G','A','B']);
    expect(C_HARMO.getScaleNotes()).toEqual(["C", "D", "Eb", "F", "G", "Ab", "B"]);
    expect(A_MINOR.getScaleNotes()).toEqual(['A','B','C','D','E','F','G']);
    expect(E_BLUES.getScaleNotes()).toEqual(["E", "G", "A", "Bb", "B", "D"] );
    expect(E_MIXOL.getScaleNotes()).toEqual(["E", "F#", "G#", "A", "B", "C#", "D"]);
  });

  it("should be able to get extended scale notes", function() {
    expect(C_MAJOR.getScaleNotesExtended()).toEqual(['C','D','E','F','G','A','B','C','D','E','F','G','A','B']);
    expect(A_MINOR.getScaleNotesExtended()).toEqual(['A','B','C','D','E','F','G','A','B','C','D','E','F','G']);
  });

  it("should be able to flatten scale notes", function() {
    expect(C_MAJOR.shiftNote(3,'flatten').notes).toEqual(['C','D','Eb','F','G','A','B']);
   
  });

  it("should be able to sharpen scale notes", function() {
    expect(C_MAJOR.shiftNote(5,'sharpen').notes).toEqual(['C','D','E','F','G#','A','B']);
  });

  it("should be able to get filtered chromatic scale", function() {
    expect(E_BLUES.getChromaticScale()).toEqual(["E", "F", "Gb", "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb"]);
  });

    it("should be able to get unfiltered chromatic scale", function() {
    expect(C_MAJOR.getChromaticScale(false)).toEqual(["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"] );
  });

  it("should be able to normalize notes", function() {
    expect(C_MAJOR.normalizeNote('Fx')).toEqual("G");
    expect(C_MAJOR.normalizeNote('A#')).toEqual("A#");
    expect(C_MAJOR.normalizeNote('Cbb')).toEqual("Bb");
    expect(C_MAJOR.normalizeNote('B#')).toEqual("C");
  });

  it("should be able to sharpen notes", function() {
    expect(C_MAJOR.sharpenNote('A')).toEqual("A#");
    expect(C_MAJOR.sharpenNote('B#')).toEqual("C#");
    expect(C_MAJOR.sharpenNote('Cb')).toEqual("C");
  });

  it("should be able to flatten notes", function() {
    expect(C_MAJOR.flattenNote('A')).toEqual("Ab");
    expect(C_MAJOR.flattenNote('B#')).toEqual("B");
    expect(C_MAJOR.flattenNote('Cb')).toEqual("Bb");
  });

});
