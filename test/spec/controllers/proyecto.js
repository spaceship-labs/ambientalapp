'use strict';

describe('Controller: ProyectoCtrl', function () {

  // load the controller's module
  beforeEach(module('ambientalappApp'));

  var ProyectoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProyectoCtrl = $controller('ProyectoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProyectoCtrl.awesomeThings.length).toBe(3);
  });
});
