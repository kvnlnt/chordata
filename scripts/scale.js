// enums
var SCALE = {

    NOTES: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    SIGNATURES: ['bb', 'b', '', '#', 'x'],
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
            var root_index = SCALE.NOTES.indexOf(root); // where is it in the root notes
            var acc = settings.key.charAt(1); // is there an accidental?
            var acc_index = SCALE.SIGNATURES.indexOf(acc); // were is that in the accidentals
            var notes = [];

            // copy original arrays for manipulation
            var accs  = SCALE.SIGNATURES.slice(0);
            var roots = SCALE.NOTES.slice(0);
            var steps = SCALE.MAJOR.slice(0);

            // shuffle arrays to put key note first
            var roots   = roots.concat(roots.splice(0, root_index)); // shuffle scale so key note is first
            var steps   = steps.concat(steps.splice(0, root_index)); // rearrange steps match new note order
            var formula = settings.scale; // ref the scale

            // populate primary chords and notes
            for (var i = 0; i < formula.length; i++) {

                // get data
                root = roots[i];
                acc = accs[acc_index];

                // add to arrays
                notes.push(normalizeNote(root + acc));

                // update accidental position
                acc_index = acc_index + (formula[i] - steps[i]); // increment accidental position by scale pos minus shuffled major scale
            }

            return normalizeScale(notes);

        };

        // get extended scale
        var getScaleNotesExtended = function() {

            var scale = getScaleNotes(); // get scale notes anc copy
            var copy = scale.slice(0);
            var extendedScale = copy.concat(copy);

            return extendedScale;

        };

        // get chromatic scale with option to turn off filtering of enharmonics by notes in key
        var getChromaticScale = function(filter) {

            var filter    = "undefined" === typeof filter ? true : filter;
            var chromatic = [['C'], ['C#','Db'], ['D'], ['D#','Eb'], ['E'], ['F'], ['F#','Gb'], ['G'], ['G#','Ab'], ['A'], ['A#','Bb'], ['B']];
            var notes     = getScaleNotes(); // should only contain sharps or flats as keys do
            var mode      = -1 === notes.join().indexOf('#') ? 'flats' : 'sharps'; // 
            var scale     = [];
            var note, enharmonic;

            // loop and filter chromatic scale
            _.each(chromatic, function(interval) {

                // default
                note = interval[0];

                // enharmonic check
                enharmonic = 2 == interval.length;

                // enharmonic note choice
                if('sharps' === mode && enharmonic && filter){ note = interval[0]; }  // if sharp and this interval is an enharmonic, set to flat note
                if('flats'  === mode && enharmonic && filter){ note = interval[1]; }  // if flat and this interval is an enharmonic, set to flat note
                if(enharmonic && !filter){ note = interval[0] + '/' + interval[1]; } // if no filtering and enharmonic, add both

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

        // normalize a double sharp note
        var normalizeDoubleSharpNote = function(note){

            var name = note.charAt(0);
            var name_pos = SCALE.NOTES.indexOf(name);
            var halfsteps = SCALE.MAJOR[name_pos]; // next step

            if( halfsteps == 1){
                note = name_pos == SCALE.NOTES.length - 1 ? SCALE.NOTES[0] + "#" : SCALE.NOTES[name_pos+1] + "#";
            } else {
                note = name_pos == SCALE.NOTES.length - 1 ? SCALE.NOTES[0] : SCALE.NOTES[name_pos+1];
            }

            return note;

        };

        // normalize a double flat note
        var normalizeDoubleFlatNote = function(note){

            var name = note.charAt(0);
            var name_pos =  SCALE.NOTES.indexOf(name);
            var halfsteps = name_pos == 0 ? SCALE.MAJOR[SCALE.NOTES.length-1] : SCALE.MAJOR[name_pos-1]; // prev step

            if ( halfsteps == 1 ) {
                note = name_pos == 0 ? SCALE.NOTES[SCALE.NOTES.length-1] + "b" : SCALE.NOTES[name_pos-1] + "b";
            } else {
                note = name_pos == 0 ? SCALE.NOTES[SCALE.NOTES.length-1] : SCALE.NOTES[name_pos-1];
            }

            return note;

        };

        // "normalize note"...translate it from double sharp or double flat
        var normalizeNote = function(note){

            //var note = charUnicode(note);
            var match = note.match('x|##|bb');

            // double accidental?
            if(!match){

                // basic translations
                note = note.replace("B#", "C").replace("Cb", "B").replace("E#", "F").replace("Fb", "E");

                // return translation
                return note;

            } else {

                // return normalized note
                return match == '##' || match == 'x' ? normalizeDoubleSharpNote(note) : normalizeDoubleFlatNote(note);

            }

        };

        // normalize a scale to use correct enharmonics
        var normalizeScale = function(scale){

            var enharmonics = {
                'Ab':'G#',
                'A#':'Bb',
                'Bb':'A#',
                'B#':'C',
                'Cb':'B',
                'C#':'Db',
                'Db':'C#',
                'D#':'Eb',
                'Eb':'D#',
                'E#':'F',
                'Fb':'E',
                'F#':'Gb',
                'Gb':'F#',
                'G#':'Ab'
            }

            var used  = [];
            var notes = [];
            var note;
            var letter;

            _.each(scale, function(n){

                letter = n.charAt(0);
                note = true == _.contains(used, letter) ? enharmonics[n] : n;
                notes.push(note);
                used.push(letter);

            });

            return notes;

        };

        // sharpen note
        var sharpenNote = function(note){

            note = normalizeNote(note);
            var name = note.charAt(0);
            var name_pos = SCALE.NOTES.indexOf(name);
            var acc = note.charAt(1);
            var halfsteps = SCALE.MAJOR[name_pos]; // next step
            var sharpenedNote;

            // find next half step note by current notes step interval (either 1 or else 2)
            if ( halfsteps == 1 ) {

                if (acc == 'b') sharpenedNote = name; // remove flat
                if (acc == '') sharpenedNote = name_pos + 1 == SCALE.NOTES.length ? SCALE.NOTES[0] : SCALE.NOTES[name_pos + 1]; // get next note
                if (acc == '#') sharpenedNote = name_pos + 1 == SCALE.NOTES.length ? SCALE.NOTES[0] + '#' : SCALE.NOTES[name_pos + 1] + '#'; // add sharp

            } else {

                if (acc == 'b') sharpenedNote = name; // remove flat
                if (acc == '') sharpenedNote = name + '#'; // add sharp
                if (acc == '#') sharpenedNote = name_pos + 1 == SCALE.NOTES.length ? SCALE.NOTES[0] : SCALE.NOTES[name_pos + 1]; // get next note

            }

            return sharpenedNote;

        };

        // sharpen note
        var flattenNote = function(note){

            note = normalizeNote(note);
            var name = note.charAt(0);
            var name_pos = SCALE.NOTES.indexOf(name);
            var acc = note.charAt(1);
            var halfsteps = name_pos == 0 ? SCALE.MAJOR[SCALE.NOTES.length-1] : SCALE.MAJOR[name_pos-1]; // prev step
            var flattenedNote;

            // find next half step note by current notes step interval (either 1 or else 2)
            if ( halfsteps == 1 ) {

                if (acc == '#') flattenedNote = name; // remove flat
                if (acc == '') flattenedNote = name_pos == 0 ? SCALE.NOTES[SCALE.NOTES.length-1] : SCALE.NOTES[name_pos - 1]; // get next note
                if (acc == 'b') flattenedNote = name_pos == 0 ? SCALE.NOTES[SCALE.NOTES.length-1] + 'b' : SCALE.NOTES[name_pos - 1] + 'b'; // add sharp

            } else {

                if (acc == '#') flattenedNote = name; // remove flat
                if (acc == '') flattenedNote = name + 'b'; // add flat
                if (acc == 'b') flattenedNote = name_pos == 0 ? SCALE.NOTES[SCALE.NOTES.length-1] : SCALE.NOTES[name_pos - 1]; // get prev note

            }

            return flattenedNote;

        };

    // RETURN

        return {
            getKey:getKey,
            setKey:setKey,
            getScale:getScale,
            setScale:setScale,
            getScaleNotes:getScaleNotes,
            getExtension:getExtension,
            getScaleNotesExtended:getScaleNotesExtended,
            shiftNote:shiftNote,
            getChromaticScale:getChromaticScale,
            normalizeNote:normalizeNote,
            sharpenNote:sharpenNote,
            flattenNote:flattenNote
        }

};