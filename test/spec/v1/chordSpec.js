describe("Chord", function() {
  var C_MAJOR;
  var A_MINOR;

  beforeEach(function() {
    C_MAJOR = new Chord({root:'C', type:CHORD.MAJOR});
    A_MINOR = new Chord({root:'A', type:CHORD.MINOR});
  });

  it("should be able to get root", function() {
    expect(C_MAJOR.getRoot()).toEqual('C');
  });

  it("should be able to set root", function() {
    C_MAJOR.setRoot('D');
    expect(C_MAJOR.getRoot()).toEqual('D');
  });

  it("should be able to get type", function() {
    expect(C_MAJOR.getType().formula).toEqual(['1','3','5']);
  });

  it("should be able to set type", function() {
    C_MAJOR.setType(CHORD.MINOR);
    expect(C_MAJOR.getType().formula).toEqual(['1','3b','5']);
  });

  it("should be able to get chord notes", function() {
    expect(C_MAJOR.getChordNotes()).toEqual(['C','E','G']);
  });

  it("should be able to get all chords", function() {
    expect(C_MAJOR.getAllChords()['C'].MAJOR.notes).toEqual(['C','E','G']);
  });

  it("should be able to get all chords containing a specific note", function() {
    expect(C_MAJOR.getChordsContainingNote('C').length).toEqual(116);
  });

   it("should be able to get all chords containing specified notes, including enhamronics", function() {
    expect(C_MAJOR.getChordsContainingNotes(['C','Eb','Gb','Bb'])[0].key).toEqual('C');
    expect(C_MAJOR.getChordsContainingNotes(['C','Eb','Gb','Bb'])[0].chord).toEqual('MINOR_7TH_FLAT_5');
    expect(C_MAJOR.getChordName(['E','Ab','B']).root).toEqual('E');
    expect(C_MAJOR.getChordName(['E','Ab','B']).type).toEqual('Major');
    expect(C_MAJOR.getChordName(['E','G#','B']).root).toEqual('E');
    expect(C_MAJOR.getChordName(['E','G#','B']).type).toEqual('Major');
  });

   it("should be able to translate enhamronics", function(){
    expect(C_MAJOR.getEnharmonic(['G#','Ab'])).toEqual(['Ab','G#']);
   });


});
