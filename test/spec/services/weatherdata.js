'use strict';

describe('Service: weatherdata', function () {

  // load the service's module
  beforeEach(module('dbweatherappApp'));

  // instantiate service
  var weatherdata;
  beforeEach(inject(function (_weatherdata_) {
    weatherdata = _weatherdata_;
  }));

  it('should do something', function () {
    expect(!!weatherdata).toBe(true);
  });

});
