// enums
var SCALE = {

    NOTES: ['A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab'],

    CHROMATIC:{
        name:'Chromatic',
        steps:'H,H,H,H,H,H,H,H,H,H,H,H',
        formula:[1,1,1,1,1,1,1,1,1,1,1,1]
    },
    MAJOR: {
        name: 'Major',
        steps: 'R, W, W, H, W, W, W, H',
        formula: [2, 2, 1, 2, 2, 2, 1]
    },
    NATURAL_MINOR: {
        name: "Minor",
        steps: 'R, W, H, W, W, H, W, W',
        formula: [2, 1, 2, 2, 1, 2, 2]
    },
    HARMONIC_MINOR: {
        name: "Harm. Minor",
        steps: 'R, W, H, W, W, H, W+H, H',
        formula: [2, 1, 2, 2, 1, 3, 1]
    },
    MELODIC_MINOR: {
        name: "Mel. Minor",
        steps: 'R, W, H, W, W, W, W, H',
        formula: [2, 1, 2, 2, 2, 2, 1]
    },
    DORIAN_MODE: {
        name: "Dorian",
        steps: 'R, W, H, W, W, W, H, W',
        formula: [2, 1, 2, 2, 2, 1, 2]
    },
    MIXOLYDIAN_MODE: {
        name: "Mixolydian",
        steps: 'R, W, W, H, W, W, H, W',
        formula: [2, 2, 1, 2, 2, 1, 2]
    },
    BLUES: {
        name: "Blues",
        steps: 'R, W+H, W, W, W+H, W',
        formula: [3, 2, 1, 1, 3, 3]
    }

};

var Scale = function(options) {

    // SETTINGS

    var defaults = {
        root: 'C',
        scale: SCALE.MAJOR
    };

    var settings = _.extend({}, defaults, options);

    // GETTERS

    // get key
    var getRoot = function() {
        return settings.root;
    };

    // get scale
    var getScale = function() {
        return settings.scale;
    };

    // get scale notes
    var getNotes = function() {

        // find index of root
        var index = 0;
        for(var note in SCALE.NOTES){ 
            if(_.contains(SCALE.NOTES[note].split('/'),settings.root)){
                index = note;
            }
        }

        // copy chromatic scale
        var chromatic = SCALE.NOTES.slice(0);

        // rearrange so root is first
        chromatic = chromatic.concat(chromatic.splice(0, index));

        // create some containers
        var step  = 0;
        var notes = [];
        var roots = [];

        // loop scale formula and cherry pick notes
        _.each(settings.scale.formula,function(interval){

            notes.push(chromatic[step]);
            step += interval;

        });

        return notes;
    };

    // SETTERS

    var setRoot = function(root) {
        settings.root = root;
        return settings.root;
    };

    var setScale = function(scale) {
        settings.scale = scale;
        return settings.scale;
    };

    // RETURN

    return {
        getRoot:getRoot,
        setRoot:setRoot,
        getScale:getScale,
        setScale:setScale,
        getNotes:getNotes
    }

};