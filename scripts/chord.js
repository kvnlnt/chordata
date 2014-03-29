var CHORD = {

	// MAJORS
	MAJOR:['1','3','5'],
	MAJOR_6TH:['1','3','5','6'],
	MAJOR_6TH_ADD_9:['1','3','5','6','9'],
	MAJOR_7TH:['1','3','5','7'],
	MAJOR_ADD_9:['1','3','5','9'],
	MAJOR_9TH:['1','3','5','7','9'],
	MAJOR_13TH:['1','3','5','7','9','13'],

	// MINORS
	MINOR:['1','3b','5'],
	MINOR_6TH:['1','3b','5','6'],
	MINOR_6TH_ADD_9:['1','3b','5','6','9'],
	MINOR_7TH:['1','3b','5','7b'],
	MINOR_ADD_9:['1','3b','5','9'],
	MINOR_9TH:['1','3b','5','7b','9'],
	MINOR_11TH:['1','3b','5','7b','9','11'],
	MINOR_13TH:['1','3b','5','7b','9','11','13'],

	// OTHERS
	AUGMENTED:['1','3','5#'],
	DIMINISHED:['1','3b','5b'],
	DOMINANT_7TH:['1','3','5','7b'],
	SUSPENDED_4TH:['1','4','5'],
	SUSPENDED_2ND:['1','2','5']
};

var Chord = function(options){

	// settings
    var defaults = { root:'C', type:CHORD.MAJOR };
    var settings = $.extend({}, defaults, options);

    // GETTERS

        // get key
        var getRoot = function(){
            return settings.root;
        };

        // get scale
        var getType = function(){
            return settings.type;
        };

        // get chord
	    var getChordNotes = function(){
	    	
	    	var scale   = new Scale({key:settings.root, scale:SCALE.MAJOR}); // prepare major scale for operation 
	    	var formula = settings.type; // get notes based on chord formula
	    	var notes   = []; // notes container

	    	// loop formula and modify scale accordingly
	    	for(var degree in formula){

	    		var degree      = formula[degree];
	    		var degreeRoot  = parseInt(degree.replace(/[#b]/g,''));
	    		var degreeAcc   = degree.substr(-1);

	    		// if a flat, flatten that part of the scale
	    		if(degreeAcc == 'b'){
	    			scale = scale.shiftNote(degreeRoot,'flatten').scale;
	    		}

	    		// if a sharp
	    		if(degreeAcc == '#'){
	    			scale = scale.shiftNote(degreeRoot, 'sharpen').scale;
	    		}

	    		// get note
	    		var note = scale.getScaleNotesExtended()[degreeRoot-1];

	    		// collect notes
	    		notes.push(note);

	    	}

	    	return notes;

	    };

	    // get all chords in all keys
	    var getAllChords = function(){

	    	var accs = ['b','','#'];
			var i = 0;
			var chords = {};

			for(var root in SCALE.ROOTS){
				var root = SCALE.ROOTS[root];
				for(var acc in accs){
					var acc  = accs[acc];

					chords[root+acc] = {};

					for(var chordtype in CHORD){
						var chord = new Chord({root:(root+acc), type:CHORD[chordtype]});
						i += 1;
						chords[root+acc][chordtype] = chord.getChordNotes();
					}
				}

			};

			return chords;

	    };

	    // get all chords that have the past note
	    var getAllChordsContaining = function(note){

	    	var allChords   = getAllChords();
	    	var foundChords = [];

	    	for(var key in allChords){
	    		for(var chord in allChords[key]){
	    			var notes = allChords[key][chord];
	    			if($.inArray(note, notes) != -1){
	    				foundChords.push({key:key, chord:chord, notes:notes});
	    			}
	    		}
	    	}

	    	return foundChords;

	    };

    // SETTERS

    	var setRoot = function(root){
            settings.root = root;
            return settings.root;
        };

        var setType = function(type){
        	settings.type = type;
        	return settings.type;
        };

    // exports
    return {
    	getRoot:getRoot,
    	setRoot:setRoot,
    	getType:getType,
    	setType:setType,
    	getChordNotes:getChordNotes,
    	getAllChords:getAllChords,
    	getAllChordsContaining:getAllChordsContaining
    }

};

// NOTES

// Anatomy of a Chord
// ------------------------------------------------------
// Example: Gm7(b5)(#9)(13)
// Root = G
// 3rd quality = minor
// 7th quality = minor (same as 3rd unless specified)
// Alterations = flat 5; sharp 9
// Extension = 13