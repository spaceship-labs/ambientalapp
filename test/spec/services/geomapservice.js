'use strict';

describe('Service: geomapService', function () {

  // load the service's module
  beforeEach(module('ambientalappApp'));

  // instantiate service
  var geomapService;
  beforeEach(inject(function (_geomapService_) {
    geomapService = _geomapService_;
  }));

  it('should do something', function () {
    expect(!!geomapService).toBe(true);
  });

});
