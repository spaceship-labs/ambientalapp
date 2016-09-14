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

function mainCtrl(semarnapi, $location) {
  /* jshint validthis: true */
  var vm = this;

  vm.init = init;
  //vm.getVirtualObject = getVirtualObject;
  vm.mias = [];
  vm.toLoad = 0;
  vm.limit = 30;

  function init() {
    vm.query = $location.search();
    //vm.virtualObject = vm.getVirtualObject();
    //semarnapi.getProyects(vm.query).then(appendMias);
  }

  function appendMias(res) {
    vm.mias = vm.mias.concat(res.data);
    console.log(vm.mias);
  }
  vm.infiniteMias = {
    toLoad: 0,
    getItemAtIndex: function(index) {
      //console.log(index);
      if (vm.mias[index]) {
        //console.log(vm.mias[index]);
        return vm.mias[index];
      } else {
         //console.log(vm.toLoad);
        if (vm.toLoad < index || vm.toLoad === 0) {
          var query = angular.extend({}, vm.query, { skip: index , limit: vm.limit});
          semarnapi.getProyects(query).then(appendMias);
          vm.toLoad = vm.toLoad+vm.limit;
        }

        return null;
      }
    },
    getLength: function() {
      return vm.mias.length + 5;
    }
  };

  vm.init();
}
