// enums
var SCALE = {

    NOTES:[['C'], ['C#','Db'], ['D'], ['D#','Eb'], ['E'], ['F'], ['F#','Gb'], ['G'], ['G#','Ab'], ['A'], ['A#','Bb'], ['B']],
    CHROMATIC:[1,1,1,1,1,1,1,1,1,1,1,1],
    MAJOR: [2, 2, 1, 2, 2, 2, 1],
    MINOR: [2, 1, 2, 2, 1, 2, 2],
    HARMONIC_MINOR: [2, 1, 2, 2, 1, 3, 1],
    MELODIC_MINOR: [2, 1, 2, 2, 2, 2, 1],
    DORIAN: [2, 1, 2, 2, 2, 1, 2],
    MIXOLYDIAN: [2, 2, 1, 2, 2, 1, 2],
    BLUES: [3, 2, 1, 1, 3, 3]

};

var Scale = function(options) {

    // SETTINGS

        var defaults = { key: 'C', scale: SCALE.MAJOR };
        var settings = _.extend({}, defaults, options);

    // GETTERS

        // get key
        var getKey = function() {
            return settings.key;
        };

        // get scale
        var getScale = function() {
            return settings.scale;
        };

        // get 9ths, 11ths, 13ths
        var getExtension = function(degree) {

            var scale = getScaleNotes(); // get scale
            var extendedScale = scale.concat(scale); // dupicate

            return extendedScale[degree - 1]; // return degree

        };

        var getScaleNotes = function(){

            var notes = [];
            var chromatic = getChromaticScale();
            var pos = 0;
            var scale = getScale();

            _.each(scale, function(interval){

                notes.push(chromatic[pos]);
                pos = pos + interval;

            });

            return notes;

        };

        // get extended scale
        var getScaleNotesExtended = function() {

            var scale = getScaleNotes(); // get scale notes anc copy
            var copy = scale.slice(0);
            var extendedScale = copy.concat(copy);

            return extendedScale;

        };

        // get chromatic scale filtered by key signature
        var getChromaticScale = function() {

            var mode   = 0 <= settings.key.indexOf('b') ? 'flats' : 'sharps'; // 
            var scale  = [];
            var note, enharmonic;

            // loop and filter chromatic scale
            _.each(SCALE.CHROMATIC, function(interval) {

                // default
                note = interval[0];

                // enharmonic check
                enharmonic = 2 == interval.length;

                // enharmonic note choice
                if('sharps' == mode && enharmonic){ note = interval[0]; }  // if sharp and this interval is an enharmonic, set to flat note
                if('flats'  == mode && enharmonic){ note = interval[1]; } // if flat and this interval is an enharmonic, set to flat note

                // push scrubbed note to scale
                scale.push(note);

            });

            // now rearrange so key note is first in list, helpful for instrument layouts
            var index = scale.indexOf(getKey());
            var scale = scale.concat(scale.splice(0, index));

            // return filtered scale based on key
            return scale;

        };

    // SETTERS

        var setKey = function(key) {
            settings.key = key;
            return settings.key;
        };

        var setScale = function(scale) {
            settings.scale = scale;
            return settings.scale;
        };

    // RETURN

        return {
            getKey: getKey,
            setKey: setKey,
            getScale: getScale,
            setScale: setScale,
            getScaleNotes: getScaleNotes,
            getExtension: getExtension,
            getScaleNotesExtended: getScaleNotesExtended,
            shiftNote: shiftNote,
            getChromaticScale: getChromaticScale
        }

};