var Scale = function(options) {

    // ENUMS

        var SCALE = {

            // Scale Types
            CHROMATIC     : { NAME:'Chromatic',      INTERVALS:[1,1,1,1,1,1,1,1,1,1,1,1] },
            MAJOR         : { NAME:'Major',          INTERVALS:[2, 2, 1, 2, 2, 2, 1] },
            MINOR         : { NAME:'Minor',          INTERVALS:[2, 1, 2, 2, 1, 2, 2] },
            MINOR_HARM    : { NAME:'Harmonic Minor', INTERVALS:[2, 1, 2, 2, 1, 3, 1] },
            MINOR_MELO    : { NAME:'Melodic Minor',  INTERVALS:[2, 1, 2, 2, 2, 2, 1] },
            DORIAN        : { NAME:'Dorian',         INTERVALS:[2, 1, 2, 2, 2, 1, 2] },
            MIXOLYDIAN    : { NAME:'Mixolyidian',    INTERVALS:[2, 2, 1, 2, 2, 1, 2] },
            BLUES         : { NAME:'Blues',          INTERVALS:[3, 2, 1, 1, 3, 3] }

        };

    // PARAMS

        // defaults
        var defaults = { scale:SCALE.MAJOR, tonic:'C', base:Chromatic() };

        // settings
        var settings = _.extend({}, defaults, options);

        // internals
        var _tonic = settings.tonic;
        var _scale = settings.scale;
        var _base = settings.base;

    // INIT

        var init = function(){

           setTonic(_tonic);
        
        };

    // GETTERS

        // get the tonic
        var getTonic = function(){
            return _tonic;
        };

        // get the scale
        var getScale = function(){ 

            var integer = 0;
            var pitches = [];
            var base = _base.getScale();

            _.each(_scale.INTERVALS, function(interval){ 
                pitches.push(base[integer]); 
                integer += interval; 
            });

            return pitches; 

        };

        // get scale notes
        var getScaleSymbols = function(){

            return _.map(getScale(), function(pitch){ 
                return pitch.getSymbol(); 
            });

        };

        // get scale intervals
        var getScaleIntervals = function(){

            return _scale.INTERVALS;

        };

        // get scale notes with no enharmonic
        var getScaleSymbolsNoEnharmonics = function(){

            var used = [];
            var collection = [];
            var bias = getTonic().indexOf('b') === -1 ? '#' : 'b';

            _.each(getScaleSymbols(),function(symbol, i){

                var note = symbol.split('/');
                var isEnharmonic = note.length > 1;
                var collect = '';

                if(isEnharmonic){
                    collect = bias === '#' ? note[0] : note[1];
                } else {
                    collect = symbol;
                }

                used.push(collect.charAt(0));
                collection.push(collect);

            });

            return collection;

        };

        // get scale pitches
        var getScalePitches = function(){

            return _.map(getScale(), function(pitch){ return pitch.getFreq(); });

        };

        // get the next symbol
        var getNextSymbol = function(tonic, noEnharmonic){

            var degree = getScaleSymbolsNoEnharmonics().indexOf(tonic);
            var scale  = noEnharmonic === void 0 ? getScaleSymbolsNoEnharmonics() : getScaleSymbols();
            var sybmol = degree === getScale().length-1 ? scale[0] : scale[degree+1];
            return sybmol;

        };

        // get the previous symbol
        var getPrevSymbol = function(tonic, noEnharmonic){

            var degree = getScaleSymbolsNoEnharmonics().indexOf(tonic);
            var scale  = noEnharmonic === void 0 ? getScaleSymbolsNoEnharmonics() : getScaleSymbols();
            var sybmol = degree === 0 ? scale[getScale().length-1] : scale[degree-1];
            return sybmol;
           
        };

        // get the next pitch
        var getNextPitch = function(tonic){

            var degree = getScaleSymbolsNoEnharmonics().indexOf(tonic);
            var pitch  = degree === getScale().length-1 ? getScale()[0] : getScale()[degree+1];
            return pitch;

        };

        // get the previous pitch
        var getPrevPitch = function(tonic){

            var degree = getScaleSymbolsNoEnharmonics().indexOf(tonic);
            var pitch  = degree === 0 ? getScale()[getScale().length-1] : getScale()[degree-1];
            return pitch;
           
        };

        // get the fundamental
        var getBase = function(){ return _base; };

    // SETTERS

        // set the tonic
        var setTonic = function(tonic){ 
            _tonic = tonic; 
            _base.setDegreeByTonic(tonic); 
        };

        //  set the scale
        var setScale = function(scale){ _scale = scale; };

        // set the fundamental
        var setBase = function(base){ _base = base; };

    // KICKOFF

        init();

    // EXPORT

        return {

            class:'Scale',

            // setters
            setScale:setScale,
            setBase:setBase,
            setTonic:setTonic,

            // getters
            getScale:getScale,
            getScaleIntervals:getScaleIntervals,
            getNextSymbol:getNextSymbol,
            getPrevSymbol:getPrevSymbol,
            getNextPitch:getNextPitch,
            getPrevPitch:getPrevPitch,
            getBase:getBase,
            getTonic:getTonic,
            getScaleSymbols:getScaleSymbols,
            getScaleSymbolsNoEnharmonics:getScaleSymbolsNoEnharmonics,
            getScalePitches:getScalePitches,

            // other
            SCALE:SCALE
            
        }

};

// quick test
s = Scale({tonic:'E', scale:Scale().SCALE.BLUES });