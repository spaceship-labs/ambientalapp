'use strict';

/**
 * @ngdoc service
 * @name ambientalappApp.breadcrumbService
 * @description
 * # breadcrumbService
 * Service in the ambientalappApp.
 */
angular.module('ambientalappApp')
  .service('breadcrumbService', breadcrumbService);

function breadcrumbService($location) {
  var service = {
    getBreadcrumb: getBreadcrumb,
  };

  return service;

  function getBreadcrumb() {
    var path = $location.path();
    var search = $location.search();
    var breadcrumb = [];
    console.log(path, search);
    if (path === '/') {
      if (search.entidad) {
        breadcrumb.push({
          href: '?entidad=' + search.entidad,
          display: search.entidad
        });
      }
    }

    return breadcrumb;
  }
}
