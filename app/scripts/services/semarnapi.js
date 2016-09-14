'use strict';

/**
 * @ngdoc service
 * @name ambientalappApp.semarnapi
 * @description
 * # semarnapi
 * Service in the ambientalappApp.
 */
angular.module('ambientalappApp')
  .service('semarnapi', semarnapi);

function semarnapi($sails) {
  var service = {
    getProyects: getProyects
  };
  return service;

  function getProyects(query) {
    var defaults = { sort: 'fechaIngreso DESC' };
    angular.extend(defaults, query);
    console.log(defaults);
    return $sails.get('/mia', defaults);
  }

}
