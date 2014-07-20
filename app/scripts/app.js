'use strict';

angular.module('dbweatherappApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngGrid',
  'ui.bootstrap'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/temperature', {
        templateUrl: 'views/temperature.html',
        controller: 'TemperatureCtrl'
      })
      .when('/tempDetail', {
        templateUrl: 'views/tempdetail.html',
        controller: 'TempdetailCtrl'
      })
      .when('/tempPartial', {
        templateUrl: 'views/temppartial.html'
        
      })
      .otherwise({
        redirectTo: '/'
      });
  });
