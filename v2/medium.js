var Medium = function(options) {

    // ENUMS

        var MEDIUM = { AIR:'Air' };

    // PARAMS

        // defaults
        var defaults = { temp: 20, name:'Air', medium: MEDIUM.AIR, density:0, impedence:0, humidity:0 };

        // settings
        var settings = _.extend({}, defaults, options);

        // internals
        var _medium    = settings.medium;    // medium
        var _temp      = settings.temp;      // degrees celcius
        var _name      = settings.name;      // friendly name
        var _density   = settings.density;   // medium density
        var _impedence = settings.impedence; // impedence
        var _humidity  = settings.humidity;  // humidity percentage

    // SETTERS

        // set medium
        var setMedium = function(medium){ _medium = medium; };

        // set temparature
        var setTemp = function(temp){ _temp = temp; };

        // set name
        var setName = function(name){ _name = name; };

        // set density 
        var setDensity = function(density){ _density = density; };

        // set impedence
        var setImpedence = function(impedence){ _impedence = impedence; };

        // set humidity
        var setHumidity = function(humidity){ _humidity = humidity; };

    // GETTERS

        // get speed
        var getSpeed = function(){

            var c;

            // calculations
            switch(_medium){
                case 'Air':
                    c = 331.3 + 0.606 * _temp;
                    break;
            }

            return c;

        };

        // get medium
        var getMedium = function(){ return _medium; };

        // get pitch freq
        var getTemp = function(){ return _temp; };

        // get name
        var getName = function(){ return _name; };

        // get density
        var getDensity = function(){ return _density; };

        // get impedence
        var getImpedence = function(){ return _impedence; };

        // get humidity
        var getHumidity = function(){ return _humidity; }; 


    // EXPORT

        return {

            class:'Medium',

            // setters
            setMedium:setMedium,
            setTemp:setTemp,
            setName:setName,
            setDensity:setDensity,
            setImpedence:setImpedence,
            setHumidity:setHumidity,

            // getters
            getMedium:getMedium,
            getSpeed:getSpeed,
            getTemp:getTemp,
            getName:getName,
            getDensity:getDensity,
            getImpedence:getImpedence,
            getHumidity:getHumidity,

            // other
            MEDIUM:MEDIUM

        }

};

// quick debug
// m = Medium();
// console.log(m);

// Notes
// - the speed of sound varies with altitude because of temperature
// - 1°C change of temperature is equal to 60 cm/s change of speed of sound.
// - the speed of sound increases with the stiffness of the material.
