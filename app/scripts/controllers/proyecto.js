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

function proyectoCtrl($sails, $routeParams, miaService) {
  /* jshint validthis: true */
  var vm = this;
  vm.getHighlights = getHighlights;
  vm.getTextFragment = getTextFragment;
  vm.init = init;
  vm.selected = [];

  function getHighlights(space){
    var highlights = [];
    space.forEach(function(point){
      highlights.push(point.x.match);
      highlights.push(point.y.match);
    });
    return highlights;
  }
  function getTextFragment(space){
    var start = space[0].x.index - 200;
    var end = space[space.length-1].y.index + 200;
    return vm.text.substr(start,end-start);
  }
  function init() {
    var query = { clave: $routeParams.miaClave, populate: 'gaceta' };
    $sails.get('/mia', query).then(function(mias) {
      if (mias.body.length) {
        vm.mia = mias.body[0];
      }

    });

    miaService
      .getDoc($routeParams.miaClave, 'resumen')
      .then(function(text){
        vm.text = text;
        return miaService.findCoordinates(text);
      })
      .then(function(spaces){
        vm.spaces= spaces;
        console.log(vm.spaces);
      });
  }

  vm.init();
}
