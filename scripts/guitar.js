var GUITAR = {

    STANDARD: ['E', 'A', 'D', 'G', 'B', 'E']

};

var Guitar = function(options) {

    // SETTINGS

	    var defaults = { tuning: GUITAR.STANDARD, frets: 24 };
	    var settings = _.extend({}, defaults, options);

    // GETTERS

	    // get tuning
	    var getTuning = function() {
	        return settings.tuning;
	    };

	    // get frets
	    var getFrets = function() {
	        return settings.frets;
	    };

	    // get the fretboard layout
	    var getStrings = function() {

	        // fretboard object
	        var strings = {};

	        // naturalize the layout
	        var tuning = getTuning();

	        // loop em
	        _.each(tuning, function(string, index) {
	            strings[index + 1] = getString(index + 1);
	        });

	        // return it
	        return strings;

	    };

	    // get string notes by octaves
	    var getString = function(string, frets) {

	        // default frets
	        var frets = typeof frets == 'undefined' ? getFrets() : frets;

	        // how many octaves
	        var octaves = 1 < frets / 11 ? Math.ceil(frets / 11) : 1;

	        // copy tuning
	        var tuning = getTuning().slice(0).reverse();

	        // open string tuning
	        var open = tuning[string - 1];

	        // get this tunings filtetered scale
	        var scale = new Scale({
	            key: open
	        }).getChromaticScale();

	        // concat scale to number of octaves
	        var notes = _.flatten(_.times(octaves, function() {
	            return scale;
	        }));

	        // return up to fret amount
	        return _.first(notes, frets);

	    };

	    // get note by string & fret
	    var getNote = function(string, fret){
	    	return getString(string)[fret];
	    };

    // SETTERS

	    // set tuning
	    var setTuning = function(tuning) {
	        settings.tuning = tuning;
	        return settings.tuning;
	    };

	    // set frets
	    var setFrets = function(frets) {
	        settings.frets = frets;
	        return settings.frets;
	    };

    // RETURN

	    return {
	        getTuning: getTuning,
	        setTuning: setTuning,
	        getFrets: getFrets,
	        setFrets: setFrets,
	        getStrings: getStrings,
	        getString: getString,
	        getNote:getNote
	    }

};