'use strict';

/**
 * @ngdoc function
 * @name ambientalappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ambientalappApp
 */

angular.module('ambientalappApp')
  .controller('MainCtrl', mainCtrl);

function mainCtrl($sails,$location) {
  /* jshint validthis: true */
  var vm = this;

  vm.init = init;

  function init() {
  	var search = $location.search();
  	var baseQuery = { sort: 'fechaIngreso DESC' };
  	var query = angular.extend(baseQuery,search);
    $sails.get('/mia',query).then(function(mias) {
      vm.mias = mias.data;
      //console.log(vm.mias);
    });
  }

  vm.init();
}
