var Pitch = function(options) {

    // ENUMS

        var PITCH = {
            CONCERT:{
                SYMBOL:'A',
                FREQ:440,
                KLASS:9,
                ENHARMONIC:['Gx','Cbb']
            }
        };

    // PARAMS

        // defaults
        var defaults = { freq: PITCH.CONCERT.FREQ, symbol: PITCH.CONCERT.SYMBOL, klass:PITCH.CONCERT.KLASS, enharmonic:PITCH.CONCERT.ENHARMONIC };

        // settings
        var settings = _.extend({}, defaults, options);

        // internals
        var _freq        = settings.freq;
        var _symbol      = settings.symbol;
        var _enharmonic  = settings.enharmonic;
        var _klass       = settings.klass;

    // SETTERS

        // set pitch frequency
        var setFreq = function(freq){ _freq = freq; };

        // set pitch name
        var setSymbol = function(symbol){ _symbol = symbol; };

        // set alternative names to this pitch
        // @array enharmonic
        var setEnharmonic = function(enharmonic){ _enharmonic = enharmonic; };

        // set pitch class index, helps to keep track of pitches
        var setKlass = function(klass){ _klass = klass; };

    // GETTERS

        // get pitch freq
        var getFreq = function(){ return _freq; };

        // get name
        var getSymbol = function(){ return _symbol; };

        // get enharmonic
        var getEnharmonic = function(){ return _enharmonic; };

        // get pitch class index of this pitch
        var getKlass = function(){ return _klass; };

        // get relative pitch based on fundamental pitch, interval and interval ratio
        // @Pitch   fundamental - the pitch being compared to
        // @Object  tone        - from culture tones, example: { symbol:'C',enharmonic:['C','B#','Dbb'] }
        // @integer klass       - culture tone index, pass it along, easier than looking it up
        // @float   ratio       - culture tone ratio
        var getRelativePitch = function(fundamental, tone, klass, ratio){

            // if they are the same klass, just return the fundamental
            if(klass === fundamental.getKlass()){

                return fundamental;

            } else {

                // get interval distance from fundamental
                var interval = Math.abs(fundamental.getKlass() - klass);

                // set default frequency to fundamental
                var freq = fundamental.getFreq();

                // loop number of intervals away from fundamental
                _.times(interval, function(){

                    // if lower, divide by ratio, else multiply
                    if(klass < fundamental.getKlass()){
                        freq = freq / ratio;
                    } else {
                        freq = freq * ratio;
                    }
                });

                // now create the pitch
                var p = new Pitch({ freq: freq, symbol:tone.symbol, klass:klass, enharmonic:tone.enharmonic });

                return p;

            }

        };

        // get wavelength
        var getWaveLength = function(){

            var m = Medium();
            var w = m.getSpeed()/_freq;
            return w;

        };


    // EXPORT

        return {

            class:'Pitch',

            // setters
            setFreq:setFreq,
            setSymbol:setSymbol,
            setKlass:setKlass,
            setEnharmonic:setEnharmonic,

            // getters
            getFreq:getFreq,
            getSymbol:getSymbol,
            getKlass:getKlass,
            getEnharmonic:getEnharmonic,
            getRelativePitch:getRelativePitch,
            getWaveLength:getWaveLength,

            // other
            PITCH:PITCH
            
        }

};

// quick test
// p = Pitch();
