'use strict';

/**
 * @ngdoc service
 * @name ambientalappApp.geomapService
 * @description
 * # geomapService
 * Service in the ambientalappApp.
 */
angular.module('ambientalappApp')
  .service('geomapService', geomapService);

function geomapService($sails) {
  var service = {
    getDoc: getDoc,
    findCoordinates: findCoordinates,
    convertWgs84: convertWgs84
  };
  return service;

  function getDoc(clave, doc) {
    return $sails.get('/mia/getDoc', { clave: clave, doc: doc }).then(function(res) {
      console.log(res.body.text);
      return res.body.text;
    });
  }

  function findCoordinates(text) {
    var pattern = /\d?,?\d{3},?\d{3}\.?\d{0,8}/igm;
    var results = [];
    var spaces = [];
    var index = 0;
    var result;
    /*jshint boss:true */
    while (result = pattern.exec(text)) {
      //console.log(result);
      var distance = result.index - index;
      console.log(result[0], result.index, index, distance);
      if (index === 0 || distance < 300) {
        index = result.index;
      } else {
        results = [];
        index = 0;
      }
      results.push({
        index: result.index,
        match: result[0]
      });
    }

    console.log(results);
    
    if (results.length > 1) {
      var points = [];
      //console.log('saving '+results.length);
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
      if (points.length >= 2) {
        spaces.push(points);
      }
    }
    console.log(spaces);
    return spaces;

  }


  function convertWgs84(points, zone) {
    if (points) {
      var utm = '+proj=utm +zone=' + zone;
      var wgs84 = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs';

      var latlng = points.map(function(point) {
        var x = point.x.match.replace(/,/g, '');
        var y = point.y.match.replace(/,/g, '');
        var result = proj4(utm, wgs84, [x, y]);
        return {
          latitude: result[1],
          longitude: result[0]
        };
      });
      return latlng;
    } else {
      return false;
    }
  }

}
