// enums
var SCALE = { 

    ROOTS:['C','D','E','F','G','A','B'],
    ACCIDENTALS:['bb','b','','#','x'],
    CHROMATIC:[1,1,1,1,1,1,1,1,1,1,1,1],
    MAJOR:[2,2,1,2,2,2,1], 
    MINOR:[2,1,2,2,1,2,2],
    HARMONIC_MINOR:[2,1,2,2,1,3,1],
    MELODIC_MINOR:[2,1,2,2,2,2,1],
    DORIAN:[2,1,2,2,2,1,2], 
    MIXOLYDIAN:[2,2,1,2,2,1,2],
    BLUES:[3,2,1,1,3,3]
    
};

var Scale = function(options) {

    // settings
    var defaults = { key:'C', scale:SCALE.MAJOR };
    var settings = $.extend({}, defaults, options);

    // GETTERS

        // get key
        var getKey = function(){
            return settings.key;
        };

        // get scale
        var getScale = function(){
            return settings.scale;
        };

        // get 9ths, 11ths, 13ths
        var getExtension = function(degree){

            var scale = getScaleNotes(); // get scale
            var extendedScale = scale.concat(scale); // dupicate

            return extendedScale[degree-1]; // return degree

        };

        // get notes in scale
        var getScaleNotes = function(){

            // basic params
            var root        = settings.key.charAt(0); // what's the root note
            var root_index  = SCALE.ROOTS.indexOf(root); // where is it in the root notes
            var acc         = settings.key.charAt(1); // is there an accidental?
            var acc_index   = SCALE.ACCIDENTALS.indexOf(acc); // were is that in the accidentals
            var notes       = [];

            // copy original arrays for manipulation
            var accs  = SCALE.ACCIDENTALS.slice(0); 
            var roots = SCALE.ROOTS.slice(0);
            var steps = SCALE.MAJOR.slice(0);

            // shuffle arrays to put key note first
            var roots = roots.concat(roots.splice(0,root_index));  // shuffle scale so key note is first
            var steps = steps.concat(steps.splice(0,root_index));  // rearrange steps match new note order
            var scale = settings.scale; // ref the scale

            // populate primary chords and notes
            for(var i = 0; i < roots.length; i++){

                // get data
                root = roots[i];
                acc  = accs[acc_index];

                // add to arrays
                notes.push(root + acc);

                // update accidental position
                acc_index = acc_index + (scale[i] - steps[i]); // increment accidental position by scale pos minus shuffled major scale
            }

            return notes;

        };

        // get extended scale
        var getScaleNotesExtended = function(){

            var scale = getScaleNotes(); // get scale notes anc copy
            var copy  = scale.slice(0);
            var extendedScale = copy.concat(copy);

            return extendedScale;

        };

    // SETTERS

        var setKey = function(key){
            settings.key = key;
            return settings.key;
        };

        var setScale = function(scale){
            settings.scale = scale;
            return settings.scale;
        };

    // METHODS

         var shiftNote = function(degree, direction){

            // get params
            var key    = settings.key;
            var scale  = settings.scale.slice(0);
            var shift1 = direction == 'flatten' ? -1 : 1; 
            var shift2 = direction == 'flatten' ? 1 : -1;

            // sharpen/flatten interval before note and after note
            scale[degree-2] = scale[degree-2] + shift1;
            scale[degree-1] = scale[degree-1] + shift2;

            // get new altered Scale
            var scale = new Scale({key:key, scale:scale});
            var notes = scale.getScaleNotes();

            return {
                note:notes[degree-1],
                scale:scale,
                notes:notes
            }

        };

    return {
        getKey:getKey,
        setKey:setKey,
        getScale:getScale,
        setScale:setScale,
        getScaleNotes:getScaleNotes,
        getExtension:getExtension,
        getScaleNotesExtended:getScaleNotesExtended,
        shiftNote:shiftNote
    }

};
