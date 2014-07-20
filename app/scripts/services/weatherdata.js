'use strict';

angular.module('dbweatherappApp')
    .factory('weatherdata', function ($http) {
    // Service logic
  
    var weatherdata = {};

    weatherdata.getWeather = function () {
      //return $http.jsonp("http://www.myweather2.com/developer/forecast.ashx?uac=2ZCWeZy.Rc&query=75062&temp_unit=f&ws_unit=kph&output=json?callback=JSON_CALLBACK");
      //return $http.jsonp("http://ip.jsontest.com/?callback=JSON_CALLBACK");
      return $http.jsonp("http://api.wunderground.com/api/f4eff8fb1277dee2/conditions/q/autoip.json?callback=JSON_CALLBACK");
      //return $http.jsonp("http://api.openweathermap.org/data/2.5/weather?q=Dallas&?callback=JSON_CALLBACK");
      
    };

    console.log(weatherdata);
    return weatherdata;
  });
