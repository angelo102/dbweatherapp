'use strict';

angular.module('dbweatherappApp')
  .controller('TempdetailCtrl', function ($scope, $http, $rootScope, cacheservice, dbservice, $modalInstance) {
   
    //Extreme Alerts
    $scope.extremeAlerts = [];

    //Precipitation Alerts
	$scope.precAlerts = [];

	//$scope.tempData = '';

  	//close alerts
  	$scope.closeAlert = function(index) {
    	$scope.extremeAlerts.splice(index, 1);
  	};

  	//close modal window
  	$scope.cancel = function () {
    	$modalInstance.dismiss('cancel');
  	};



	$scope.init = function(){

		$scope.tempData = cacheservice.get('1');
	    console.log($scope.tempData);
	    
	   	if($scope.tempData){
			var date = $scope.tempData.DATE.split("-");
		    var dtString = date[2]+"-"+date[0]+"-"+date[1];
		    var station = $scope.tempData.STATION_ID;
		    //var city = $scope.tempData.CITY_ID;

		    console.log(station);

		    dbservice.precipitation(dtString,station).success(function(result) {
		    	console.log("Precip");
		        $scope.precData = result;
		        console.log($scope.precData);
			});
			
		    var city = $scope.tempData.CITY_ID;

			dbservice.averageTemp(dtString,city).success(function(result) {
		    	console.log("cityAvg");
		        $scope.cityAvgData = result[0];
		        console.log($scope.cityAvgData);
			});

			var beforeDate = new Date(date[2],date[0],date[1],0,0,0,0);
			beforeDate.setDate(beforeDate.getDate()-1);
			var bDtSrring = [beforeDate.getFullYear(), beforeDate.getMonth(), beforeDate.getDate()].join('-');
			console.log("Day before date Sting Date");
			console.log(bDtSrring);

			dbservice.dayTemp(bDtSrring,station).success(function(result) {
		    	console.log("Day Before Temp");
		        $scope.dayBeforeTemp = result[0];
		        console.log($scope.dayBeforeTemp);
			});
		};
	};

	$scope.init();


	$scope.checkExtremes = function(){
		
		if($scope.cityAvgData){

			//clear alert Arrays
			$scope.extremeAlerts =[];

			//check extreme event based on average
			var minT = $scope.tempData.MIN_TEMP;
			var maxT = $scope.tempData.MAX_TEMP;

			var minBefT = $scope.dayBeforeTemp.MIN_TEMP;
			var maxBefT = $scope.dayBeforeTemp.MAX_TEMP;

			console.log("CITYAVG UNDEF");
			console.log($scope.cityAvgData);
			
			var avgMinT = $scope.cityAvgData.min_temp;
			var avgMaxT = $scope.cityAvgData.max_temp;

			var isNonExtreme = true;

			console.log("minT");
			console.log(minT);
			
			console.log("maxT");
			console.log(maxT);

			console.log("min before");
			console.log(minBefT);
			
			console.log("max before");
			console.log(maxBefT);

			console.log("avgMinT");
			console.log(avgMinT);
			
			console.log("avgMaxT");
			console.log(avgMaxT);

			//Check versus average temps
			if(Math.abs(minT-avgMinT) > 12){
				$scope.extremeAlerts.push({type: 'danger', msg: "Extreme Event Detected! Min Temperature is below or above 12 F versus the average."});
				isNonExtreme = false;
			}
			if(Math.abs(maxT-avgMaxT) > 12){
				$scope.extremeAlerts.push({type: 'danger', msg: "Extreme Event Detected! Max Temperature is below or above 12 F versus the average."});
				isNonExtreme = false;
			}

			//check precipitation extreme events
			if ($scope.precData) {
				for (var i = 0; i < $scope.precData.length; i++) {
					var prec = $scope.precData[i].PREC_VALUE;
					var precName = $scope.precData[i].PREC_NAME;
					if (prec > 4) {
						$scope.extremeAlerts.push({type: 'danger', msg: "Extreme Event Detected! Precipitation is above 4 inches for occurance: "+precName});
						isNonExtreme = false;
					};
				};
			};

			//check drops of 20 F or more temp
			if (Math.abs(maxBefT-maxT) > 20) {
				$scope.extremeAlerts.push({type: 'danger', msg: "Extreme Event Detected! Max Temperature dropped more than 20 F since day before."});
				isNonExtreme = false;
			}
			if (Math.abs(minBefT-minT) > 20) {
				$scope.extremeAlerts.push({type: 'danger', msg: "Extreme Event Detected! Min Temperature dropped more than 20 F since day before."});
				isNonExtreme = false;
			}

			//if no extremes events
			if (isNonExtreme) {
				$scope.extremeAlerts.push({type: 'success', msg: "No Extreme Events Detected! It was a great Day!"});
			}
		};
	};
   

	$scope.precip = function(){
	
			//clear alert Arrays
			$scope.precAlerts = [];

			//check precipitation extreme events
			if ($scope.precData.length > 0) {
				for (var i = 0; i < $scope.precData.length; i++) {
					var prec = $scope.precData[i].PREC_VALUE;
					var precName = $scope.precData[i].PREC_NAME;
					
					//Generate alerts for precepitation
					$scope.precAlerts.push({type: 'info', msg: "Precipitation Type: "+precName+" with a value of "+ prec +" inches"});
				}
			}
			else{
				console.log("prec no");
				$scope.precAlerts.push({type: 'info', msg: "No Precipitation for the given Date."});
			}
				
	}
 });
