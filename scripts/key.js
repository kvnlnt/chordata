// enums
var KEY = {

    ROOTS: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    ACCIDENTALS: ['bb', 'b', '', '#', 'x'],
    MAJOR: { NAME:'Major', FORMULA:[2, 2, 1, 2, 2, 2, 1] },
    MINOR: { NAME:'Minor', FORMULA:[2, 1, 2, 2, 1, 2, 2] }

};

var Key = function(options) {

    // SETTINGS

        var defaults = { root:'C', key: KEY.MAJOR };
        var settings = _.extend({}, defaults, options);

    // GETTERS

        // get root
        var getRoot = function() {
            return settings.root;
        };

        // get scale
        var getKey = function() {
            return settings.key;
        };

        // get notes in scale
        var getNotes = function() {

            // basic params
            var root = settings.root.charAt(0); // what's the root note
            var root_index = KEY.ROOTS.indexOf(root); // where is it in the root notes
            var acc = settings.root.charAt(1); // is there an accidental?
            var acc_index = KEY.ACCIDENTALS.indexOf(acc); // were is that in the accidentals
            var notes = [];

            // copy original arrays for manipulation
            var accs  = KEY.ACCIDENTALS.slice(0);
            var roots = KEY.ROOTS.slice(0);
            var steps = KEY.MAJOR.FORMULA.slice(0);

            // shuffle arrays to put key note first
            var roots = roots.concat(roots.splice(0, root_index)); // shuffle scale so key note is first
            var steps = steps.concat(steps.splice(0, root_index)); // rearrange steps match new note order
            var key   = settings.key.FORMULA; // ref the scale

            // populate primary chords and notes
            for (var i = 0; i < roots.length; i++) {

                // get data
                root = roots[i];
                acc = accs[acc_index];

                // add to arrays
                notes.push(root + acc);

                // update accidental position
                acc_index = acc_index + (key[i] - steps[i]); // increment accidental position by scale pos minus shuffled major scale
            }

            return notes;

        };

        // get relative key
        var getRelativeKey = function(){

            var key = 'Major' == settings.key.NAME ? new Key({root:getNotes()[5], key:KEY.MINOR}) : new Key({root:getNotes()[2], key:KEY.MAJOR});
            return key;

        };

    // SETTERS

        var setRoot = function(root) {
            settings.root = root;
            return settings.root;
        };

        var setKey = function(key) {
            settings.key = key;
            return settings.key;
        };


    // RETURN

        return {
            getRoot:getRoot,
            setRoot:setRoot,
            getKey:getKey,
            setKey:setKey,
            getRelativeKey:getRelativeKey,
            getNotes:sgetNotes
        }

};