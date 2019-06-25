var Chromatic = function(options) {

    // ENUMS

        var SCALE = {

            RATIO:1.05946,
            TONES:[
                { symbol:'C',     enharmonic:['B#','Dbb'] },
                { symbol:'C#/Db', enharmonic:['Bx'] },
                { symbol:'D',     enharmonic:['Cx','Ebb'] },
                { symbol:'D#/Eb', enharmonic:['Fbb'] },
                { symbol:'E',     enharmonic:['Dx','Fb'] },
                { symbol:'F',     enharmonic:['E#','Gbb'] },
                { symbol:'F#/Gb', enharmonic:['Ex'] },
                { symbol:'G',     enharmonic:['Fx','Abb'] },
                { symbol:'G#/Ab', enharmonic:[] },
                { symbol:'A',     enharmonic:['Gx','Bbb'] },
                { symbol:'A#/Bb', enharmonic:['Cbb'] },
                { symbol:'B',     enharmonic:['Ax','Cb'] },
            ]

        };

    // PARAMS

        // defaults
        var defaults = { degree:0, scale:SCALE, fundamental:Pitch() };

        // settings
        var settings = _.extend({}, defaults, options);

        // internals
        var _degree = settings.degree;
        var _scale = settings.scale;
        var _fundamental = settings.fundamental;

    // GETTERS

        // get the degree by pitch class
        var getDegree = function(){ return _degree; };

        // get the degree by the tonic
        var getDegreeByTonic = function(tonic){

            // make copy of tones
            var scale = _scale.TONES.slice(0);

            // rearrange by current degree
            var tones = scale.concat(scale.splice(0, _degree));

            // default found degree to 0
            var degree = 0;

            _.each(tones,function(tone, i){ 
                var matchesNote = _.contains(tone.symbol.split("/"),tonic);
                var matchesEnharmonic = _.contains(tone.enharmonic,tonic);
                if(matchesNote || matchesEnharmonic){
                    degree = i;
                }
            });

            return degree;
        };

        // get interval
        var getInterval = function(from, to){

            fromDegree = getDegreeByTonic(from);
            toDegree = getDegreeByTonic(to);

            return Math.abs(fromDegree - toDegree);

        };

        // get the scale
        var getScale = function(){ 

            // create container for base scale
            var tones = [];

            // loop base scale
            _.each(_scale.TONES, function(tone, klass){

                // create new pitch
                var p = _fundamental.getRelativePitch(_fundamental, tone, klass, _scale.RATIO);
                tones.push(p);

            });

            // now rearrange based on degree index
            tones = tones.concat(tones.splice(0, _degree));

            return tones;

        };

        // get the scale notes
        var getScaleSymbols = function(){

            return _.map(getScale(), function(pitch){ 
                return pitch.getSymbol(); 
            });

        };

        // get the next symbol
        var getNextSymbol = function(tonic){

            var degree = getDegreeByTonic(tonic);
            var sybmol = degree === 11 ? getScaleSymbols()[0] : getScaleSymbols()[degree+1];
            return sybmol;

        };

        // get the previous symbol
        var getPrevSymbol = function(tonic){

            var degree = getDegreeByTonic(tonic);
            var sybmol = degree === 0 ? getScaleSymbols()[11] : getScaleSymbols()[degree-1];
            return sybmol;
           
        };

        // get the next pitch
        var getNextPitch = function(tonic){

            var degree = getDegreeByTonic(tonic);
            var pitch  = degree === 11 ? getScale()[0] : getScale()[degree+1];
            return pitch;

        };

        // get the previous pitch
        var getPrevPitch = function(tonic){

            var degree = getDegreeByTonic(tonic);
            var pitch  = degree === 0 ? getScale()[11] : getScale()[degree-1];
            return pitch;
           
        };

        // get the fundamental
        var getFundamental = function(){ return _fundamental; };

    // SETTERS

        // set the degree by pitch class index
        var setDegree = function(degree){ _degree = degree; };

        // set teh degree by tonic
        var setDegreeByTonic = function(tonic){
            setDegree(getDegreeByTonic(tonic));
        };

        //  set the scale
        var setScale = function(scale){ _scale = scale; };

        // set the fundamental
        var setFundamental = function(fundamental){ _fundamental = fundamental; };

    // EXPORT

        return {

            class:'Chromatic',

            // setters
            setScale:setScale,
            setDegree:setDegree,
            setDegreeByTonic:setDegreeByTonic,
            setFundamental:setFundamental,

            // getters
            getScale:getScale,
            getScaleSymbols:getScaleSymbols,
            getNextSymbol:getNextSymbol,
            getPrevSymbol:getPrevSymbol,
            getNextPitch:getNextPitch,
            getPrevPitch:getPrevPitch,
            getDegree:getDegree,
            getDegreeByTonic:getDegreeByTonic,
            getInterval:getInterval,
            getFundamental:getFundamental,

            // other
            SCALE:SCALE
            
        }

};

// quick test
c = Chromatic();
// c.getScale();
