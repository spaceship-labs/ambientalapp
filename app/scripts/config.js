'use strict';

angular.module('ambientalappApp')

//OPTIONAL! Set socket URL!
.config(['$sailsProvider', function ($sailsProvider) {
    $sailsProvider.url = 'http://semarnapi.herokuapp.com';
    $sailsProvider.url = 'http://localhost:1337';
}]);