'use strict';

/**
 * @ngdoc function
 * @name ambientalappApp.controller:ToolbarCtrl
 * @description
 * # ToolbarCtrl
 * Controller of the ambientalappApp
 */
angular.module('ambientalappApp')
  .controller('ToolbarCtrl', toolbarCtrl);

function toolbarCtrl($location,breadcrumbService) {
  /* jshint validthis: true */
  var vm = this;

  vm.init = init;


  function init() {
   	vm.breadcrumb = breadcrumbService.getBreadcrumb();
   	console.log(vm.breadcrumb);

  }

  vm.init();

}
