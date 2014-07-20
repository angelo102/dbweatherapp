'use strict';

angular.module('dbweatherappApp')
  .factory('cacheservice', function ($cacheFactory) {
    // Service logic
    // ...

    
    // Public API here
    return $cacheFactory('cacheservice');
  });
