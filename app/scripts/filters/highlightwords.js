'use strict';

/**
 * @ngdoc filter
 * @name ambientalappApp.filter:highlightWords
 * @function
 * @description
 * # highlightWords
 * Filter in the ambientalappApp.
 */
angular.module('ambientalappApp')
  .filter('highlightWords', highlightWords);

function highlightWords() {
  return function(text, selectedWords) {
    if (selectedWords.length > 0) {
      for (var i = 0; i < selectedWords.length; i++) {
        var pattern = new RegExp(selectedWords[i], 'g');
        text = text.replace(pattern, '<span class="highlighted">' + selectedWords[i] + '</span>');
      }
      return text;
    } else {
      return text;
    }
  };
}
