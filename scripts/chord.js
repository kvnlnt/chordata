// Chord "types"
var CHORD = {

	// MAJORS
	MAJOR: 				{ formula:['1','3','5'], 						name:"Major", 	jtabType:"" 	},
	MAJOR_6TH: 			{ formula:['1','3','5','6'], 					name:"6",	 	jtabType:"6" 	},
	MAJOR_6TH_ADD_9: 	{ formula:['1','3','5','6','9'], 				name:"6add9", 	jtabType:"69" 	},
	MAJOR_7TH: 			{ formula:['1','3','5','7'], 					name:"M7", 		jtabType:"M7" 	},
	MAJOR_ADD_9: 		{ formula:['1','3','5','9'], 					name:"add9", 	jtabType:"add9" },
	MAJOR_9TH: 			{ formula:['1','3','5','7','9'], 				name:"maj9",	jtabType:"maj9" },
	MAJOR_13TH: 		{ formula:['1','3','5','7','9','13'], 			name:"13",		jtabType:"13" 	},

	// MINORS
	MINOR: 				{ formula:['1','3b','5'],						name:"Minor", 	jtabType:"m" 	},
	MINOR_6TH: 			{ formula:['1','3b','5','6'],					name:"m6",		jtabType:"m6" 	},
	MINOR_6TH_ADD_9: 	{ formula:['1','3b','5','6','9'],				name:"m6add9",  jtabType:""		},
	MINOR_7TH: 			{ formula:['1','3b','5','7b'],					name:"m7", 		jtabType:"m7" 	},
	MINOR_7TH_FLAT_5: 	{ formula:['1','3b','5b','7b'],					name:"7b5", 	jtabType:"7b5" 	},
	MINOR_ADD_9: 		{ formula:['1','3b','5','9'],					name:"m9",		jtabType:"m9"   },
	MINOR_9TH: 			{ formula:['1','3b','5','7b','9'],				name:"madd9", 	jtabType:""		},
	MINOR_11TH: 		{ formula:['1','3b','5','7b','9','11'], 		name:"m11",		jtabType:"" 	},
	MINOR_13TH: 		{ formula:['1','3b','5','7b','9','11','13'], 	name:"m13", 	jtabType:""	},

	// OTHERS
	AUGMENTED: 			{ formula:['1','3','5#'],						name:"aug", 	jtabType:"aug" 	},
	DIMINISHED: 		{ formula:['1','3b','5b'],						name:"dim",		jtabType:"dim" 	},
	DOMINANT_7TH: 		{ formula:['1','3','5','7b'],					name:"dom7",	jtabType:"7"  	},
	SUSPENDED_4TH: 		{ formula:['1','4','5'],						name:"sus4", 	jtabType:"sus4" },
	SUSPENDED_2ND: 		{ formula:['1','2','5'], 						name:"sus2", 	jtabType:"sus2" }
	
};

var Chord = function(options){

	// SETTINGS

	    var defaults = { root:'C', type:CHORD.MAJOR.formula };
	    var settings = _.extend({}, defaults, options);

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
	    	var formula = settings.type.formula; // get notes based on chord formula
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
			var ignore = ['B#','Cb','E#','Fb'];

			for(var root in SCALE.NOTES){
				var root = SCALE.NOTES[root];
				for(var acc in accs){
					var acc  = accs[acc];

					if(!_.contains(ignore, root+acc)){

						chords[root+acc] = {};
						for(var chordtype in CHORD){
							var chord = new Chord({root:(root+acc), type:CHORD[chordtype]});
							i += 1;
							chords[root+acc][chordtype] = {
								notes:chord.getChordNotes(),
								type:chord.getType()
							};
						}
					}
				}

			};

			return chords;

	    };

	    // get all chords containing a specific note
	    var getChordsContainingNote = function(note){

	    	var allChords   = getAllChords();
	    	var foundChords = [];
	    	var root        = note[0];

	    	for(var key in allChords){
	    		for(var chord in allChords[key]){
	    			var notes = allChords[key][chord].notes;
	    			if(_.contains(notes,note) || _.contains(notes, getEnharmonic(note))){
	    				foundChords.push({key:key, chord:chord, notes:notes, type:allChords[key][chord].type });
	    			}
	    		}
	    	}

	    	var result = _.sortBy(foundChords, function(chord){ return chord.key != root; });

	    	return result;

	    };

	    // get all chords containing all specified notes
	    var getChordsContainingNotes = function(notes){

	    	var allChords   = getAllChords();
	    	var foundChords = [];
	    	var root        = notes[0];

	    	// loop all chords
	    	for(var key in allChords){

	    		// loop chord types
	    		for(var chord in allChords[key]){

	    			// get notes from chord
	    			var _notes = allChords[key][chord].notes;

	    			// assume match to true
	    			var match = 0 == _.difference(_notes, notes).length && 0 == _.difference(notes, _notes) ? true : false;

	    			// assume enharmonic match
	    			var match_enharmonic = 0 == _.difference(_notes, getEnharmonic(notes)).length && 0 == _.difference(getEnharmonic(notes), _notes) ? true : false;

	    			// if still a match, add to found list
	    			if(match || match_enharmonic){
	    				foundChords.push({key:key, chord:chord, notes:_notes, type:allChords[key][chord].type});
	    			}

	    		} // for

	    	} // for

	    	var result = _.sortBy(foundChords, function(chord){ return chord.key != root; });

	    	return result;

	    };

	    // try to name a chord
	    var getChordName = function(notes){

	    	// get notes
	    	var uniques = _.uniq(notes);

	    	// find possible chords
	    	var candidates = getChordsContainingNotes(uniques);

	    	// search for chords with these notes
	    	var candidate = candidates[0];

	    	// chord type
	    	var type = candidate.type;
	    	var root = candidate.key.charAt(0);
	    	var acc  = candidate.key.charAt(1);
	    	var base = candidate.notes[0];
	    	var name = base !== notes[0] ? base + '/' + notes[0] : base;

	    	// result
	    	var chord ={
	    		root:root,
	    		acc:acc,
	    		type:type.name,
	    		formula:type.formula,
	    		jtabType:type.jtabType,
	    		name:name
	    	}

	    	// guess at final name for chord
	    	return chord;
	    };

	    // get enharmonic of note
	    var getEnharmonic = function(notes){

	    	// enharmonics
	    	var enharmonic = {
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
            };

            // make it an array if it's an string
            var notes = typeof notes === "string" ? [notes] : notes;

            // translate al the notes
            notes = _.map(notes, function(note){ 
            	note = enharmonic[note] === void 0 ? note : enharmonic[note];
            	return note; });

            // return the main object
            return notes;

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

    // RETURN
    
	    return {
	    	getRoot:getRoot,
	    	setRoot:setRoot,
	    	getType:getType,
	    	setType:setType,
	    	getChordNotes:getChordNotes,
	    	getAllChords:getAllChords,
	    	getChordsContainingNote:getChordsContainingNote,
	    	getChordsContainingNotes:getChordsContainingNotes,
	    	getChordName:getChordName,
	    	getEnharmonic:getEnharmonic,
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