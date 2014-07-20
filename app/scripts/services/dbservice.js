'use strict';

angular.module('dbweatherappApp')
  .factory('dbservice', function ($http) {
    
    var dbservice = {};

    dbservice.cities = $http.get("http://localhost:3000/cities");

    dbservice.stations = $http.get("http://localhost:3000/stations");

    dbservice.temperatures = $http.get("http://localhost:3000/temps");

    dbservice.precipitation = function (date, station){
      return $http.get("http://localhost:3000/precipitation", {params:{date:date, station:station}});
    };

    dbservice.averageTemp = function (date, city){
      return $http.get("http://localhost:3000/tempAverage", {params:{date:date, city:city}});
    };

    dbservice.dayTemp = function (date, station){
      return $http.get("http://localhost:3000/tempD", {params:{date:date, station:station}});
    };

  
    console.log(dbservice);
    return dbservice;
  });
