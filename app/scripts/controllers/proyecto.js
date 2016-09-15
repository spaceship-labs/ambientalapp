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

function proyectoCtrl($sails, $routeParams, geomapService) {
  /* jshint validthis: true */
  var vm = this;
  vm.getHighlights = getHighlights;
  vm.getTextFragment = getTextFragment;
  vm.getBounds = getBounds;
  vm.findBounds = findBounds;
  vm.init = init;
  vm.selected = [];
  vm.paths = [];
  vm.bounds = [];

  function findBounds(key) {
    //console.log(vm.bounds[key]);
    return vm.bounds[key];
  }

  function getBounds(path) {
    var bounds = {
      northeast: {
        latitude: path[0].latitude,
        longitude: path[0].longitude,
      },
      southwest: {
        latitude: path[0].latitude,
        longitude: path[0].longitude,
      }
    };
    path.forEach(function(point) {
      if (point.latitude > bounds.northeast.latitude) {
        bounds.northeast.latitude = point.latitude;
      }
      if (point.longitude > bounds.northeast.longitude) {
        bounds.northeast.longitude = point.longitude;
      }
      if (point.latitude < bounds.southwest.latitude) {
        bounds.southwest.latitude = point.latitude;
      }
      if (point.longitude < bounds.southwest.longitude) {
        bounds.southwest.longitude = point.longitude;
      }
    });
    return bounds;
  }

  function getHighlights(space) {
    var highlights = [];
    space.forEach(function(point) {
      highlights.push(point.x.match);
      highlights.push(point.y.match);
    });
    return highlights;
  }

  function getTextFragment(space) {
    var start = space[0].x.index - 200;
    var end = space[space.length - 1].y.index + 200;
    return vm.text.substr(start, end - start);
  }

  function init() {
    var query = { clave: $routeParams.miaClave, populate: 'gaceta' };

    vm.map = {
      zoom: 19,
      options:{
        mapTypeId: google.maps.MapTypeId.SATELLITE 
      }
    };

    $sails.get('/mia', query).then(function(mias) {
      if (mias.body.length) {
        vm.mia = mias.body[0];
      }
    });

    geomapService
      .getDoc($routeParams.miaClave, 'resumen')
      .then(function(text) {
        vm.text = text;
        return geomapService.findCoordinates(text);
      })
      .then(function(spaces) {
        vm.spaces = spaces;
        //console.log(vm.spaces);
        vm.spaces.forEach(function(space, key) {
          vm.paths.push(geomapService.convertWgs84(vm.spaces[0], 16));
          vm.bounds.push(getBounds(vm.paths[key]));
        });
        //vm.path =  geomapService.convertWgs84(vm.spaces[0], 16);
      });
  }

  vm.init();
}
