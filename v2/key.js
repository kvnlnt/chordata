var Key = function(options) {

    // PARAMS

        // defaults
        var defaults = { tonic:'C', scale:'Major' };

        // settings
        var settings = _.extend({}, defaults, options);

        // internals
        var _tonic = settings.tonic;
        var _scale = settings.scale;

    // SETTERS

        // set key tonic
        var setTonic = function(tonic){ _tonic = tonic; };

        // set key type : 'Major' or 'Minor'
        var setScale = function(scale){ _scale = scale; };

    // GETTERS

        // get key tonic
        var getTonic = function(){ return _tonic; };

        // get key scale
        var getScale = function(){ 

        	var scale = null;

        	switch(_scale){
        		case 'Major':
        			scale = Scale({ scale:Scale().SCALE.MAJOR, tonic:_tonic })
        			break;
        		case 'Minor':
        			scale = { scale:Scale().SCALE.MINOR, tonic:_tonic }
        		default:
        			scale = null;
        	}

        	return scale;

        };


    // EXPORT

        return {

            class:'Key',

            // setters
            setTonic:setTonic,
            setScale:setScale,

            // getters
            getTonic:getTonic,
            getScale:getScale
            
        }

};

// quick test
k = Key();

// var getRelativeKey = function(){};
// var getParallelKey = function(){};
// var getDominantKey = function(){};
// var getSubdominantKey = function(){};

//  The number of sharps and flats of two enharmonically equivalent keys sum to twelve. For example, the key of B major, with 5 sharps, is enharmonically equivalent to the key of C-flat major with 7 flats, and 5 (sharps) + 7 (flats) = 12. Keys past 7 sharps or flats exist only theoretically and not in practice. The enharmonic keys are six pairs, three major and three minor: B major/C-flat major, G-sharp minor/A-flat minor, F-sharp major/G-flat major, D-sharp minor/E-flat minor, C-sharp major/D-flat major and A-sharp minor/B-flat minor. There are no works composed in keys that require double sharping or double flatting in the key signature, except in jest. In practice, musicians learn and practice 15 major and 15 minor keys, three more than 12 due to the enharmonic spellings.