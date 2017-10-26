'use strict';

/**
 * @ngdoc directive
 * @name luZhouApp.directive:tmGoodStudents
 * @description
 * # tmGoodStudents
 */
angular.module('luZhouApp')
  .directive('tmGoodStudents', function () {
    return {
      templateUrl: 'components/tmGoodStudents.html',
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
    
      }
    };
  });
