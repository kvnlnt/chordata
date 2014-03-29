describe("Scale", function() {
  var C_MAJOR;
  var A_MINOR;

  beforeEach(function() {
    C_MAJOR = new Scale({key:'C', scale:SCALE.MAJOR});
    A_MINOR = new Scale({key:'A', scale:SCALE.MINOR});
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
    expect(A_MINOR.getScaleNotes()).toEqual(['A','B','C','D','E','F','G']);
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

});
