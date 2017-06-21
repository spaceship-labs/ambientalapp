"use strict";function mainCtrl(a,b){function c(){e.query=b.search()}function d(a){e.mias=e.mias.concat(a.data)}var e=this;e.init=c,e.mias=[],e.toLoad=0,e.limit=30,e.infiniteMias={toLoad:0,getItemAtIndex:function(b){if(e.mias[b])return e.mias[b];if(e.toLoad<b||0===e.toLoad){var c=angular.extend({},e.query,{skip:b,limit:e.limit});a.getProyects(c).then(d),e.toLoad=e.toLoad+e.limit}return null},getLength:function(){return e.mias.length+5}},e.init()}function searchCtrl(a,b){function c(){var a="Aguascalientes, Baja California, Baja California Sur, Campeche, Chiapas, Chihuahua, Coahuila de Zaragoza,Colima, Ciudad de México, Durango, Guanajuato, Guerrero, Hidalgo, Jalisco, Michoacán de Ocampo, Morelos, México, Nayarit, Nuevo León, Oaxaca, Puebla, Querétaro, Quintana Roo, San Luis Potosí, Sinaloa, Sonora, Tabasco, Tamaulipas, Tlaxcala, Veracruz de Ignacio de la Llave, Yucatán, Zacatecas";e.entities=a.split(/, +/g).map(function(a){return{name:a}})}function d(a){b.path("/"),b.search({entidad:a.name})}var e=this;e.init=c,e.selectedItemChange=d,e.init()}function breadcrumbService(a){function b(){var b=a.path(),c=a.search(),d=[];return"/"===b&&c.entidad&&d.push({href:"?entidad="+c.entidad,display:c.entidad}),d}var c={getBreadcrumb:b};return c}function toolbarCtrl(a,b){function c(){d.breadcrumb=b.getBreadcrumb()}var d=this;d.init=c,d.init()}function proyectoCtrl(a,b,c){function d(a){return i.bounds[a]}function e(a){var b={northeast:{latitude:a[0].latitude,longitude:a[0].longitude},southwest:{latitude:a[0].latitude,longitude:a[0].longitude}};return a.forEach(function(a){a.latitude>b.northeast.latitude&&(b.northeast.latitude=a.latitude),a.longitude>b.northeast.longitude&&(b.northeast.longitude=a.longitude),a.latitude<b.southwest.latitude&&(b.southwest.latitude=a.latitude),a.longitude<b.southwest.longitude&&(b.southwest.longitude=a.longitude)}),b}function f(a){var b=[];return a.forEach(function(a){b.push(a.x.match),b.push(a.y.match)}),b}function g(a){var b=a[0].x.index-200,c=a[a.length-1].y.index+200;return i.text.substr(b,c-b)}function h(){var d={clave:b.miaClave,populate:"gaceta"};i.map={zoom:19,options:{mapTypeId:google.maps.MapTypeId.SATELLITE}},a.get("/mia",d).then(function(a){a.body.length&&(i.mia=a.body[0])}),c.getDoc(b.miaClave,"resumen").then(function(a){return i.text=a,c.findCoordinates(a)}).then(function(a){i.spaces=a,i.spaces.forEach(function(a,b){i.paths.push(c.convertWgs84(i.spaces[0],16)),i.bounds.push(e(i.paths[b]))})})}var i=this;i.getHighlights=f,i.getTextFragment=g,i.getBounds=e,i.findBounds=d,i.init=h,i.selected=[],i.paths=[],i.bounds=[],i.init()}function geomapService(a){function b(b,c){return a.get("/mia/getDoc",{clave:b,doc:c}).then(function(a){return console.log(a.body.text),a.body.text})}function c(a){for(var b,c=/\d?,?\d{3},?\d{3}\.?\d{0,8}/gim,d=[],e=[],f=0;b=c.exec(a);){var g=b.index-f;if(console.log(b[0],b.index,f,g),0===f||300>g)f=b.index;else{if(d.length>1){var h=[];d.forEach(function(a,b){b%2===0&&d.length>=b+2&&h.push({x:a,y:d[b+1]})}),h.length>=2&&e.push(h)}d=[],f=0}d.push({index:b.index,match:b[0]})}return e}function d(a,b){if(a){var c="+proj=utm +zone="+b,d="+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs",e=a.map(function(a){var b=a.x.match.replace(/,/g,""),e=a.y.match.replace(/,/g,""),f=proj4(c,d,[b,e]);return{latitude:f[1],longitude:f[0]}});return e}return!1}var e={getDoc:b,findCoordinates:c,convertWgs84:d};return e}function highlightWords(){return function(a,b){if(b.length>0){for(var c=0;c<b.length;c++){var d=new RegExp(b[c],"g");a=a.replace(d,'<span class="highlighted">'+b[c]+"</span>")}return a}return a}}function semarnapi(a){function b(b){var c={sort:"fechaIngreso DESC"};return angular.extend(c,b),a.get("/mia",c)}var c={getProyects:b};return c}angular.module("ambientalappApp",["ngAnimate","ngAria","ngCookies","ngResource","ngRoute","ngSanitize","ngMaterial","ngSails","md.data.table","uiGmapgoogle-maps"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"vm"}).when("/proyecto/:miaClave",{templateUrl:"views/proyecto.html",controller:"ProyectoCtrl",controllerAs:"vm"}).otherwise({redirectTo:"/"})}]).config(["$mdThemingProvider",function(a){a.theme("dark-grey").backgroundPalette("grey").dark(),a.theme("dark-orange").backgroundPalette("orange").dark(),a.theme("dark-purple").backgroundPalette("deep-purple").dark(),a.theme("dark-blue").backgroundPalette("blue").dark()}]),angular.module("ambientalappApp").config(["$sailsProvider",function(a){a.url="http://semarnapi.herokuapp.com"}]),angular.module("ambientalappApp").controller("MainCtrl",mainCtrl),mainCtrl.$inject=["semarnapi","$location"],angular.module("ambientalappApp").controller("SearchCtrl",searchCtrl),searchCtrl.$inject=["$sails","$location"],angular.module("ambientalappApp").service("breadcrumbService",breadcrumbService),breadcrumbService.$inject=["$location"],angular.module("ambientalappApp").controller("ToolbarCtrl",toolbarCtrl),toolbarCtrl.$inject=["$location","breadcrumbService"],angular.module("ambientalappApp").controller("ProyectoCtrl",proyectoCtrl),proyectoCtrl.$inject=["$sails","$routeParams","geomapService"],angular.module("ambientalappApp").service("geomapService",geomapService),geomapService.$inject=["$sails"],angular.module("ambientalappApp").filter("highlightWords",highlightWords),angular.module("ambientalappApp").service("semarnapi",semarnapi),semarnapi.$inject=["$sails"],angular.module("ambientalappApp").run(["$templateCache",function(a){a.put("views/geomap.html",'<md-card layout-padding ng-repeat="(key,space) in vm.spaces" layout="row"> <ui-gmap-google-map flex zoom="vm.map.zoom" center="vm.map.center" bounds="vm.findBounds(key)" options="vm.map.options"> <ui-gmap-polygon path="vm.paths[key]" stroke="{color:&quot;#6699ee&quot;,opacity:1}" fill="{color:&quot;#6699ee&quot;,opacity:.2}" fit="true"></ui-gmap-polygon> </ui-gmap-google-map> <md-table-container flex="40"> <table md-table md-row-select multiple ng-model="vm.selected"> <thead md-head> <tr md-row> <th md-column md-numeric>Punto</th> <th md-column md-numeric>x</th> <th md-column md-numeric>y</th> </tr> </thead> <tbody md-body> <tr md-row md-select="dessert" md-select-id="name" md-auto-select ng-repeat="(key,point) in space"> <td md-cell>{{key+1}}</td> <td md-cell>{{point.x.match}}</td> <td md-cell>{{point.y.match}}</td> </tr> </tbody> </table> </md-table-container> <pre layout-padding ng-bind-html="vm.getTextFragment(space) | highlightWords : vm.getHighlights(space) "></pre> </md-card>'),a.put("views/main.html",'<div layout="column" layout-align="center" id="mainContainer" flex> <md-toolbar ng-include="\'views/toolbar.html\'"></md-toolbar> <md-content flex layout="column"> <md-virtual-repeat-container style="height:100%"> <md-list layout-padding> <md-list-item class="md-3-line" md-virtual-repeat="mia in vm.infiniteMias" md-on-demand> <div class="md-list-item-text" layout="column" md-padding> <h3><a ng-href="#/proyecto/{{mia.clave}}">{{ mia.proyecto }} - {{ mia.clave }}</a></h3> <h4>{{ mia.entidad }} - {{mia.fechaIngreso | date : shortDate}}</h4> <p>{{ mia.tramite }}</p> </div> <md-divider></md-divider> </md-list-item> </md-list> </md-virtual-repeat-container> </md-content> </div>'),a.put("views/proyecto.html",'<div layout="column" layout-align="center" id="mainContainer" flex> <md-toolbar ng-include="\'views/toolbar.html\'"></md-toolbar> <md-content flex layout-padding layout="column"> <md-card layout-padding> <md-card-title> <md-card-title-text> <span class="md-headline">{{vm.mia.proyecto}} - {{vm.mia.clave}}</span> </md-card-title-text> </md-card-title> <md-list layout-padding> <md-list-item> <p><strong>Entidad:</strong> <a ng-href="#/?entidad={{vm.mia.entidad}}">{{vm.mia.entidad}}</a></p> </md-list-item> <md-list-item> <p><strong>Clave:</strong> {{ vm.mia.clave }}</p> </md-list-item> <md-list-item> <p><strong>Fecha de ingreso: </strong>{{vm.mia.fechaIngreso | date : shortDate}}</p> </md-list-item> <md-list-item> <p><strong>Situación actual:</strong> {{ vm.mia.situacionActual }}</p> </md-list-item> <md-list-item> <p><strong>Tramite: </strong>{{ vm.mia.tramite }}</p> </md-list-item> <md-list-item> <p><strong>Estado:</strong> {{ vm.mia.estado }}</p> </md-list-item> <md-list-item> <p><strong>Gaceta de referencia:</strong><a ng-href="{{vm.mia.gaceta.pdf}}" target="_blank"> {{ vm.mia.gaceta.pdf }}</a></p> </md-list-item> </md-list> <h3>Documentos</h3> <div layout="row"> <md-button ng-disabled="!vm.mia.resumen" ng-href="{{vm.mia.resumen}}" target="_blank" class="md-raised md-primary">Resumen</md-button> <md-button ng-disabled="!vm.mia.estudio" ng-href="{{vm.mia.estudio}}" target="_blank" class="md-raised md-primary">Estudio</md-button> <md-button ng-disabled="!vm.mia.resolutivo" ng-href="{{vm.mia.resolutivo}}" target="_blank" class="md-raised md-primary">Resolutivo</md-button> </div> </md-card> <md-card layout-padding ng-repeat="(key,space) in vm.spaces" layout="row"> <ui-gmap-google-map flex zoom="vm.map.zoom" center="vm.map.center" bounds="vm.findBounds(key)" options="vm.map.options"> <ui-gmap-polygon path="vm.paths[key]" stroke="{color:&quot;#6699ee&quot;,opacity:1}" fill="{color:&quot;#6699ee&quot;,opacity:.2}" fit="true"></ui-gmap-polygon> </ui-gmap-google-map> <md-table-container flex="40"> <table md-table md-row-select multiple ng-model="vm.selected"> <thead md-head> <tr md-row> <th md-column md-numeric>Punto</th> <th md-column md-numeric>x</th> <th md-column md-numeric>y</th> </tr> </thead> <tbody md-body> <tr md-row md-select="dessert" md-select-id="name" md-auto-select ng-repeat="(key,point) in space"> <td md-cell>{{key+1}}</td> <td md-cell>{{point.x.match}}</td> <td md-cell>{{point.y.match}}</td> </tr> </tbody> </table> </md-table-container> <pre layout-padding ng-bind-html="vm.getTextFragment(space) | highlightWords : vm.getHighlights(space) "></pre> </md-card> </md-content> </div>'),a.put("views/search.html",'<div ng-controller="SearchCtrl as vm" id="search"> <md-autocomplete md-selected-item="vm.selectedItem" md-search-text="vm.searchText" md-selected-item-change="vm.selectedItemChange(entity)" md-items="entity in vm.entities | filter : vm.searchText" md-item-text="entity.name" md-min-length="0" placeholder="Escoge un estado de la república"> <md-item-template> <span md-highlight-text="vm.searchText" md-highlight-flags="^i">{{entity.name}}</span> </md-item-template> <md-not-found> No hay resultados para "{{vm.searchText}}" </md-not-found> </md-autocomplete> </div>'),a.put("views/toolbar.html",'<div class="md-toolbar-tools" ng-controller="ToolbarCtrl as vm" layout="column" layout-gt-sm="row"> <h3> <a href="#/">ImpactoAmbiental.mx</a> <span ng-if="vm.breadcrumb.length"> / </span> <span ng-repeat="crumb in vm.breadcrumb" md-padding><a ng-href="#/{{crumb.href}}"> {{crumb.display}}</a> / </span> </h3> <div flex></div> <div ng-include="\'views/search.html\'"></div> </div>')}]);