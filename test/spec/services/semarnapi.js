'use strict';

describe('Service: semarnapi', function () {

  // load the service's module
  beforeEach(module('ambientalappApp'));

  // instantiate service
  var semarnapi;
  beforeEach(inject(function (_semarnapi_) {
    semarnapi = _semarnapi_;
  }));

  it('should do something', function () {
    expect(!!semarnapi).toBe(true);
  });

});
