'use strict';

angular.module('dbweatherappApp')
  .controller('TemperatureCtrl', function ($scope, $http, $location, $modal, cacheservice, weatherdata, dbservice ) {
    
    //Initialize Filters
    $scope.cityFilter = "";
    $scope.stationFilter = "";
    $scope.dateFilter = "";


    dbservice.cities.success(function(result) {
      console.log("CITIES");
      $scope.cities = result;
    });

     //get data of stations
    dbservice.stations.success(function(result) {
      console.log("STATIONS");
      $scope.stations = result;
    });

     //Get Temperture Data
    dbservice.temperatures.success(function(result) {
      console.log("TEMP");
      $scope.gridData = result;   
    });

    $scope.$watch('searchCity',function(searchText){
      if(searchText){
        console.log('searchCity');
        console.log(searchText.CITY_NAME);
        $scope.cityFilter = "CITY_NAME:"+searchText.CITY_NAME;
        $scope.stationFilter = "";
        $scope.gridOptions.filterOptions.filterText = $scope.cityFilter+";"+$scope.stationFilter+";"+$scope.dateFilter;
      }
      else {
        $scope.cityFilter = "";
        $scope.stationFilter = "";
        $scope.searchStation = "";
        $scope.gridOptions.filterOptions.filterText = $scope.cityFilter+";"+$scope.stationFilter+";"+$scope.dateFilter;
      }
      
    });

    $scope.$watch('searchStation', function(searchText) {
      if(searchText){
        $scope.stationFilter = "STATION_NAME:"+searchText.STATION_NAME;
        $scope.gridOptions.filterOptions.filterText = $scope.cityFilter+";"+$scope.stationFilter+";"+$scope.dateFilter;
      }
      else{
        $scope.stationFilter = "";
        $scope.gridOptions.filterOptions.filterText = $scope.cityFilter+";"+$scope.stationFilter+";"+$scope.dateFilter;
      }
    });


     /*

     Grid Operations ********************************************************

     */

    //filtering options of grid
    $scope.filterOptions = {
        filterText: '',
        useExternalFilter: false
    };

    $scope.gridOptions = { 
      data: 'gridData',
      showFilter: true, 
      showFooter: true,
      multiSelect:false, 
      filterOptions: $scope.filterOptions,
      selectedItems: [],

      columnDefs: [ { field: 'CITY_NAME', displayName: 'City', visible:false },
                    { field: 'STATION_NAME', displayName: 'Station', visible:false },
                    { field: 'DATE', displayName: 'Date'/*, cellFilter: 'date:\'MM-dd-yyyy\''*/ },
                    { field: 'MIN_TEMP', displayName: 'Min' },
                    { field: 'MAX_TEMP', displayName: 'Max' },
                    { field: 'STATION_ID', displayName: 'Station Id', visible:false },
                    { field: 'CITY_ID', displayName: 'City Id', visible:false }]

    };

    //Button Click Event
    $scope.viewDate = function(){
        
      if ($scope.gridOptions.selectedItems.length > 0) {  
        
        console.log("Cache Saved");
        cacheservice.put('1', $scope.gridOptions.selectedItems[0]);

        //modal html partial
        var modalInstance = $modal.open({
          templateUrl: 'views/tempdetail.html',
          controller: 'TempdetailCtrl'
        
        });

      }
        else{
          alert("There is no selected date, please choose a date from the table");
        }
    }

    //Date Filtering
    $scope.$watch('dt', function(date) {
      if(date){
        console.log(date.toString());
        var dtString = formattedDate(date);
        $scope.dateFilter = "DATE:"+dtString;
     
        $scope.gridOptions.filterOptions.filterText = $scope.cityFilter+";"+$scope.stationFilter+";"+$scope.dateFilter;
      }
     
    });

    //Clear all filters
    $scope.clear = function () {
      $scope.dt = null;
      $scope.dateFilter = "";
      $scope.searchStation = "";
      $scope.searchCity = "";
      $scope.gridOptions.filterOptions.filterText = "";
    };

    $scope.today = function() {
      $scope.dt = new Date();
    };
  
    function formattedDate(date) {
      var d = new Date(date || Date.now()),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [month, day, year].join('-');
    }

  });