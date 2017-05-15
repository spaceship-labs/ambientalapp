'use strict';

angular.module('ambientalappApp')
  .config(['$sailsProvider', function($sailsProvider) {
    $sailsProvider.url = 'http://semarnapi.herokuapp.com';
    //$sailsProvider.url = 'http://localhost:1337';
  }]);
/*  .config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      //    key: 'your api key',
      v: '3.20', //defaults to latest 3.X anyhow
      libraries: 'geometry'
    });
  });*/
