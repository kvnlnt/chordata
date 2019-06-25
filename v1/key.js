// enums
var KEY = {

    NOTES:      ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    SIGNATURES: ['bb', 'b', '', '#', 'x'],
    MAJOR:      { name: 'Major', formula: [2, 2, 1, 2, 2, 2, 1] },
    MINOR:      { name: 'Minor', formula: [2, 1, 2, 2, 1, 2, 2] },
    BLUES:      { name: 'Blues', formula: [3, 2, 1, 1, 3, 3] }

};

var Key = function(options) {

    // SETTINGS

        var defaults = { root: 'C', key: KEY.MAJOR };
        var settings = _.extend({}, defaults, options);

    // GETTERS

        // get root
        var getRoot = function() { return settings.root; };

        // get scale
        var getKey = function() { return settings.key; };

        // get all keys
        var getRoots = function() {

            // container
            var roots = [];

            // object
            _.each(KEY.MAJOR.formula, function(interval, index) {

                // add note
                roots.push(KEY.NOTES[index]);

                // if has two steps, add sharp and flat
                if (2 === interval) {
                    roots.push(KEY.NOTES[index] + '#' + '/' + KEY.NOTES[index + 1] + 'b');
                }

            });

            return roots;

        };

        // get notes in scale
        var getNotes = function() {

            // basic params
            var root = settings.root.charAt(0); // what's the root note
            var root_index = KEY.NOTES.indexOf(root); // where is it in the root notes
            var acc = settings.root.charAt(1); // is there an accidental?
            var acc_index = KEY.SIGNATURES.indexOf(acc); // were is that in the accidentals
            var notes = [];

            // copy original arrays for manipulation
            var accs = KEY.SIGNATURES.slice(0);
            var roots = KEY.NOTES.slice(0);
            var steps = KEY.MAJOR.formula.slice(0);

            // shuffle arrays to put key note first
            var roots = roots.concat(roots.splice(0, root_index)); // shuffle scale so key note is first
            var steps = steps.concat(steps.splice(0, root_index)); // rearrange steps match new note order
            var formula = settings.key.formula; // ref the scale

            // populate primary chords and notes
            for (var i = 0; i < formula.length; i++) {

                // get data
                root = roots[i];
                acc = accs[acc_index];

                // add to arrays
                notes.push(root + acc);

                // update accidental position
                acc_index = acc_index + (formula[i] - steps[i]); // increment accidental position by scale pos minus shuffled major scale
            }

            return notes;

        };

        // get relative key
        var getRelativeKey = function() {

            // find relative key
            var key = 'Major' == settings.key.name ? getNotes()[5] + ' Minor' : getNotes()[2] + ' Major';

            // return it
            return key

        };

    // SETTERS

        var setRoot = function(root) { settings.root = root; return settings.root; };
        var setKey = function(key) { settings.key = key; return settings.key; };

    // RETURN

    return {
        getRoot: getRoot,
        getRoots: getRoots,
        getKey: getKey,
        getNotes: getNotes,
        getRelativeKey: getRelativeKey,
        setRoot: setRoot,
        setKey: setKey,
    }

};