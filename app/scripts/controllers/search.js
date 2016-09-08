'use strict';

/**
 * @ngdoc function
 * @name ambientalappApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the ambientalappApp
 */
angular.module('ambientalappApp')
  .controller('SearchCtrl', searchCtrl);

function searchCtrl($sails, $location) {
  /* jshint validthis: true */
  var vm = this;

  vm.init = init;

  vm.selectedItemChange = selectedItemChange;


  function init() {
    var entities = 'Aguascalientes, Baja California, Baja California Sur, ' +
      'Campeche, Chiapas, Chihuahua, Coahuila de Zaragoza,' +
      'Colima, Ciudad de México, Durango, Guanajuato, Guerrero, ' + 
      'Hidalgo, Jalisco, Michoacán de Ocampo, Morelos, México, Nayarit, ' +
      'Nuevo León, Oaxaca, Puebla, Querétaro, Quintana Roo, San Luis Potosí, ' + 
      'Sinaloa, Sonora, Tabasco, Tamaulipas, Tlaxcala,' +
      'Veracruz de Ignacio de la Llave, Yucatán, Zacatecas';
    vm.entities = entities.split(/, +/g).map(function(entity) {
      return { name: entity };
    });

  }

  function selectedItemChange(item) {
    $location.search({ entidad: item.name });
  }

  vm.init();

}
