'use strict';

describe('Filter: highlightWords', function () {

  // load the filter's module
  beforeEach(module('ambientalappApp'));

  // initialize a new instance of the filter before each test
  var highlightWords;
  beforeEach(inject(function ($filter) {
    highlightWords = $filter('highlightWords');
  }));

  it('should return the input prefixed with "highlightWords filter:"', function () {
    var text = 'angularjs';
    expect(highlightWords(text)).toBe('highlightWords filter: ' + text);
  });

});
