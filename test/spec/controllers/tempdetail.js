'use strict';

describe('Controller: TempdetailCtrl', function () {

  // load the controller's module
  beforeEach(module('dbweatherappApp'));

  var TempdetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TempdetailCtrl = $controller('TempdetailCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
