'use strict';

/**
 * @ngdoc service
 * @name ambientalappApp.miaService
 * @description
 * # miaService
 * Service in the ambientalappApp.
 */
angular.module('ambientalappApp')
  .service('miaService', miaService);

function miaService($sails) {
  var service = {
    getDoc: getDoc,
    findCoordinates: findCoordinates,
    convertWgs84 : convertWgs84
  };
  return service;

  function getDoc(clave, doc) {
    return $sails.get('/mia/getDoc', { clave: clave, doc: doc }).then(function(res) {
      return res.body.text;
    });
  }

  function findCoordinates(text) {
    var pattern = /\d{6,7}\.?\d{0,8}/igm;
    var results = [];
    var spaces = [];
    var index = 0;
    var result;
    /*jshint boss:true */
    while (result = pattern.exec(text)) {
      var distance = result.index - index;
      if (index === 0 || distance < 300) {
        results.push({
          index: result.index,
          match: result[0]
        });
      } else {
        if (results.length > 1) {
          var points = [];
          results.forEach(function(result, key) {
            if (key % 2 === 0) {
              if (results.length >= key + 2) {
                points.push({
                  x: result,
                  y: results[key + 1]
                });
              }
            }
          });
          spaces.push(points);
        }
        results = [];
        index = 0;
      }
      index = result.index;
    }
    return spaces;

  }

  function convertWgs84(points, zone) {
    var utm = '+proj=utm +zone=' + zone;
    var wgs84 = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs';
    var latlng = points.map(function(point) {
      var result = proj4(utm, wgs84, [point.x.match, point.y.match]);
      return{
        latitude : result[1],
        longitude : result[0]
      };
    });
    console.log(latlng);
    return latlng;
  }

}
