// enums
var SCALE = {

    ROOTS: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    ACCIDENTALS: ['bb', 'b', '', '#', 'x'],
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

        // get notes in scale
        var getScaleNotes = function() {

            // basic params
            var root = settings.key.charAt(0); // what's the root note
            var root_index = SCALE.ROOTS.indexOf(root); // where is it in the root notes
            var acc = settings.key.charAt(1); // is there an accidental?
            var acc_index = SCALE.ACCIDENTALS.indexOf(acc); // were is that in the accidentals
            var notes = [];

            // copy original arrays for manipulation
            var accs = SCALE.ACCIDENTALS.slice(0);
            var roots = SCALE.ROOTS.slice(0);
            var steps = SCALE.MAJOR.slice(0);

            // shuffle arrays to put key note first
            var roots = roots.concat(roots.splice(0, root_index)); // shuffle scale so key note is first
            var steps = steps.concat(steps.splice(0, root_index)); // rearrange steps match new note order
            var scale = settings.scale; // ref the scale

            // populate primary chords and notes
            for (var i = 0; i < roots.length; i++) {

                // get data
                root = roots[i];
                acc = accs[acc_index];

                // add to arrays
                notes.push(root + acc);

                // update accidental position
                acc_index = acc_index + (scale[i] - steps[i]); // increment accidental position by scale pos minus shuffled major scale
            }

            return notes;

        };

        // get extended scale
        var getScaleNotesExtended = function() {

            var scale = getScaleNotes(); // get scale notes anc copy
            var copy = scale.slice(0);
            var extendedScale = copy.concat(copy);

            return extendedScale;

        };

        // get chromatic scale filtered by key notes
        var getChromaticScale = function() {

            var chromatic = [['C'], ['C#','Db'], ['D'], ['D#','Eb'], ['E'], ['F'], ['F#','Gb'], ['G'], ['G#','Ab'], ['A'], ['A#','Bb'], ['B']];
            var notes     = getScaleNotes(); // should only contain sharps or flats as keys do
            var mode      = 0 <= notes.join().indexOf('b') ? 'flats' : 'sharps'; // 
            var scale     = [];
            var note, enharmonic;

            // loop and filter chromatic scale
            _.each(chromatic, function(interval) {

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

    // UTILITY METHODS

        var shiftNote = function(degree, direction) {

            // get params
            var key = settings.key;
            var scale = settings.scale.slice(0);
            var shift1 = direction == 'flatten' ? -1 : 1;
            var shift2 = direction == 'flatten' ? 1 : -1;

            // sharpen/flatten interval before note and after note
            scale[degree - 2] = scale[degree - 2] + shift1;
            scale[degree - 1] = scale[degree - 1] + shift2;

            // get new altered Scale
            var scale = new Scale({
                key: key,
                scale: scale
            });
            var notes = scale.getScaleNotes();

            return {
                note: notes[degree - 1],
                scale: scale,
                notes: notes
            }

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