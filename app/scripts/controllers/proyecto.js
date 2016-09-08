'use strict';

/**
 * @ngdoc function
 * @name ambientalappApp.controller:ProyectoCtrl
 * @description
 * # ProyectoCtrl
 * Controller of the ambientalappApp
 */

angular.module('ambientalappApp')
  .controller('ProyectoCtrl', proyectoCtrl);

function proyectoCtrl($sails, $routeParams) {
  /* jshint validthis: true */
  var vm = this;

  vm.init = init;

  function init() {
    var query = { clave: $routeParams.miaClave, populate: 'gaceta' };
    $sails.get('/mia', query).then(function(mias) {
      if (mias.body.length === 1) {
        vm.mia = mias.body[0];
        console.log(vm.mia);

      }
    });
  }

  vm.init();
}
