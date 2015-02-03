(function(){
	var selectedResult = {
		"list": [
			{
				"ric": "005930.KS",
				"title": "Samsung Electronics Co Ltd"
			},
			{
				"ric": "601857.SS",
				"title": "PetroChina Co Ltd"
			},
			{
				"ric": "7203.T",
				"title": "Toyota Motor Corp"
			},
			{
				"ric": "BHP.AX",
				"title": "BHP Billiton Ltd"
			},
			{
				"ric": "SIEGn.DE",
				"title": "Siemens AG"
			},
			{
				"ric": "TRI.TO",
				"title": "Thomson Reuters Corp"
			}
		]
	};

	var dataSource = {
		"rics": [
			{
				"ric": "IBM.N",
				"subtitle": "Ordinary Share - New York Stock Exchange - IBM",
				"title": "International Business Machines Corp",
				"type": "EQ"
			},
			{
				"ric": "A",
				"subtitle": "Ordinary Share - NYSE Consolidated - A",
				"title": "Agilent Technologies Inc",
				"type": "EQ"
			},
			{
				"ric": "GOOGL.O",
				"subtitle": "Ordinary Share - NASDAQ Global Select Consolidated - GOOGL",
				"title": "Google Inc",
				"type": "EQ"
			},
			{
				"ric": "AAPL.O",
				"subtitle": "Ordinary Share - NASDAQ Global Select Consolidated - AAPL",
				"title": "Apple Inc",
				"type": "EQ"
			},
			{
				"ric": "0#CL:",
				"subtitle": "Crude Oil - Commodity Future - New York Mercantile Exchange (NYMEX)",
				"title": "NYMEX Light Sweet Crude Oil (WTI) Composite Energy Future Chain Contracts",
				"type": "COM"
			},
			{
				"ric": "0#WTI:",
				"subtitle": "Commodity Future - ROSARIO FUTURES EXCHANGE",
				"title": "ROFEX WTI Light Sweet Crude Oil Energy Future Chain Contract",
				"type": "COM"
			},
			{
				"ric": "THB=",
				"subtitle": "THOMSON REUTERS",
				"title": "US Dollar/Thai Baht FX Spot Rate",
				"type": "FX"
			},
			{
				"ric": "AUD=",
				"subtitle": "THOMSON REUTERS",
				"title": "Australian Dollar/US Dollar FX Spot Rate",
				"type": "FX"
			},
			{
				"ric": ".SPX",
				"subtitle": "US - Equity Index - MXP",
				"title": "S&P 500 Index",
				"type": "INDX"
			},
			{
				"ric": "0#USBMK=",
				"subtitle": "US BMK YC - THOMSON REUTERS",
				"title": "United States Government Benchmark Yield Curve",
				"type": "BMK"
			}
		]
	};

	var app = angular.module("autoSuggestApp",[]);

	app.controller('autoSugesstCtrl', function(){

	});

	app.controller('selectedRicsCtrl', ['$scope', function($scope){
		$scope.displayedRics = selectedResult;

		$scope.currentPage = 0;
		$scope.pageSize = 5;
		
		$scope.numberOfPage = function(){
			return Math.ceil($scope.displayedRics.list.length/$scope.pageSize);
		};

		$scope.range = function(start,end){
			var ret = [];
			if (!end){
				end = start;
				start = 0;
			}
			for (var i=start;i<end;i++){
				ret.push(i);
			}
			return ret;
		};

		$scope.setPage = function(){
			$scope.currentPage = this.n;
		}

		$scope.nextPage = function(){
			if ($scope.currentPage < $scope.numberOfPage())
				$scope.currentPage++;
		}

		$scope.prevPage = function(){
			if ($scope.currentPage > 0)
				$scope.currentPage--;
		}

		$scope.removeRic = function(ricnumber){
			for (var i=0,l=$scope.displayedRics.list.length; i<l;i++){
				if ($scope.displayedRics.list[i].ric === ricnumber)
					break;
			}
			$scope.displayedRics.list.splice(i, 1);
			if ($scope.currentPage >= $scope.numberOfPage())
				$scope.prevPage();
		};

		$scope.removeAllRics = function(ricnumber){
			$scope.displayedRics.list = [];
		};
	}]);


	app.filter('startFrom', function() {
		return function(input, start) {
			start = +start; //parse to int
			return input.slice(start);
		}
	});

})();