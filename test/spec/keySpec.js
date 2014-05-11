describe("Key", function() {
  var C_MAJOR;
  var E_MINOR;

  beforeEach(function() {
    C_MAJOR = new Key({root:'C', key:KEY.MAJOR});
    E_MINOR = new Key({root:'E', key:KEY.MINOR});
  });

  it("should be able to get root", function() {
    expect(C_MAJOR.getRoot()).toEqual('C');
  });

  it("should be able to set root", function() {
    C_MAJOR.setRoot('A');
    expect(C_MAJOR.getRoot()).toEqual('A');
  });

   it("should be able to get key", function() {
    expect(C_MAJOR.getKey().name).toEqual('Major');
  });

  it("should be able to set key", function() {
    C_MAJOR.setKey(KEY.MINOR);
    expect(C_MAJOR.getKey().name).toEqual('Minor');
  });

  it("should be able to get roots", function() {
    expect(C_MAJOR.getRoots()).toEqual(["C", "C#", "Db", "D", "D#", "Eb", "E", "F", "F#", "Gb", "G", "G#", "Ab", "A", "A#", "Bb", "B"]);
  });

  it("should be able to get notes", function() {
    expect(E_MINOR.getNotes()).toEqual(["E", "F#", "G", "A", "B", "C", "D"]);
  });

  it("should be able to get relative key", function() {
    expect(E_MINOR.getRelativeKey()).toEqual('G Major');
  });

});
