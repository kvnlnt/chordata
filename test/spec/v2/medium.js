describe("Medium", function() {

    var mock;

    beforeEach(function() {
        mock = Medium();
    });

    it("set & get the medium", function() {
    	mock.setMedium('Test');
    	expect(mock.getMedium()).toEqual('Test');
    });

    it("set & get the temp", function() {
        mock.setTemp(100);
        expect(mock.getTemp()).toEqual(100);
    });

    it("set & get the name", function() {
        mock.setName('Nothing');
        expect(mock.getName()).toEqual('Nothing');
    });

    it("set & get the density", function() {
        mock.setDensity(100);
        expect(mock.getDensity()).toEqual(100);
    });

    it("set & get the impedence", function() {
        mock.setImpedence(5);
        expect(mock.getImpedence()).toEqual(5);
    });

    it("set & get the humidity", function() {
        mock.setHumidity(30);
        expect(mock.getHumidity()).toEqual(30);
    });

    it("get the speed", function() {;
        expect(mock.getSpeed()).toEqual(343.42);
    });


});