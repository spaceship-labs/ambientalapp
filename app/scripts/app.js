'use strict';

/**
 * @ngdoc overview
 * @name ambientalappApp
 * @description
 * # ambientalappApp
 *
 * Main module of the application.
 */
angular
  .module('ambientalappApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngMaterial',
    'ngSails'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
