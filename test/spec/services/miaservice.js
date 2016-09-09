'use strict';

describe('Service: miaService', function () {

  // load the service's module
  beforeEach(module('ambientalappApp'));

  // instantiate service
  var miaService;
  beforeEach(inject(function (_miaService_) {
    miaService = _miaService_;
  }));

  it('should do something', function () {
    expect(!!miaService).toBe(true);
  });

});
