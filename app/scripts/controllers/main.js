'use strict';

angular.module('dbweatherappApp')
  .controller('MainCtrl', function ($scope, $http, $location, weatherdata) {
    


    weatherdata.getWeather().success(function (data) {
      $scope.weather = data;
    });
     
  });
