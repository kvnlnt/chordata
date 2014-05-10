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
	    var getFretboard = function() {

	        // fretboard object
	        var fretboard = {};

	        // naturalize the layout
	        var strings = getTuning();

	        // loop em
	        _.each(strings, function(string, index) {
	            fretboard[index + 1] = getStringNotes(index + 1);
	        });

	        // return it
	        return fretboard;

	    };

	    // get string notes by octaves
	    var getStringNotes = function(string, frets) {

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
	        getFretboard: getFretboard,
	        getStringNotes: getStringNotes
	    }

};