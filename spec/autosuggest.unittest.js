describe('autoSuggestApp unit test', function() {

	beforeEach(function() {
			module('autoSuggestApp');
	});

	describe('autoSuggestFactory', function(){
		var factory;

		beforeEach(function(){
			inject(function($injector){
				factory = $injector.get('autoSuggestFactory');
			});
		});

		describe("Initialization", function(){
			it("should be defined", function(){
				expect(factory).toBeDefined();
			});
			it("should define displayedRic", function(){
				expect(factory.getDisplayedRics().list.length > 0).toBeTruthy();
			});
			it("should define dataSource", function(){
				expect(factory.getDataSource().rics.length > 0).toBeTruthy();
			});
		});

		describe("factory functions", function(){
			it("should be able to add new RIC to displayedRic list", function(){
				var currentRicDisplayed = factory.getDisplayedRics().list.length;
				factory.addRic({"ric": "g", "title":"test"});
				expect(factory.getDisplayedRics().list.length).toEqual(currentRicDisplayed+1);
			});
			it("should be able to remove RIC from displayedRic list", function(){
				var currentRicDisplayed = factory.getDisplayedRics().list.length;
				factory.removeRic(0);
				expect(factory.getDisplayedRics().list.length).toEqual(currentRicDisplayed-1);
			});
			it("should be able to remove all RIC from displayedRic list", function(){
				factory.removeAllRics();
				expect(factory.getDisplayedRics().list.length).toEqual(0);
			});
			it("should be able to detect Ric duplication", function(){
				expect(factory.isRicDup('TRI.TO').result).toBeTruthy();
				expect(factory.isRicDup('TRI.TO').index).toEqual(5);
			});
		});
	});

	describe('selectedRicsCtrl', function(){
		var $rootScope, $scope, controller, factory;

		beforeEach(function() {
			inject(function($injector){
				$rootScope = $injector.get('$rootScope');
				$scope = $rootScope.$new();
				controller = $injector.get('$controller')('selectedRicsCtrl', {$scope: $scope});
			});
		});

		describe("Initialization", function(){
			it("should be defined", function(){
				expect(controller).toBeDefined();
			});
			it("should have RIC to show", function(){
				expect($scope.hasRicToShow()).toBeTruthy();
			});
		});
		
		describe("Paging", function(){
			it("should be configured to display 5 RICs per page", function(){
				expect($scope.pageSize).toEqual(5);
			});
			it("should begin at page 0", function(){
				expect($scope.currentPage()).toEqual(0);
			});
			it("should disable the prev button at the first page", function(){
				expect($scope.isPrevShown()).toEqual('disabled');
			});
			it("should enable the next button if there is a next page", function(){
				expect($scope.isNextShown()).toEqual('enabled');
			});
			it("should be able to go to next page", function(){
				$scope.nextPage();
				expect($scope.currentPage()).toEqual(1);
			});
			it("should disable the next button if it is the last page", function(){
				$scope.setPage(1);
				expect($scope.isNextShown()).toEqual('disabled');
			});
			it("should enable the prev button if there is a previous page", function(){
				$scope.setPage(1);
				expect($scope.isPrevShown()).toEqual('enabled');
			});
		});
	});

	describe('autoSugesstCtrl', function(){
		var $rootScope, $scope, controller;

		beforeEach(function() {
			inject(function($injector){
				$rootScope = $injector.get('$rootScope');
				$scope = $rootScope.$new();
				factory = $injector.get('autoSuggestFactory');
				controller = $injector.get('$controller')('autoSugesstCtrl', {$scope: $scope});
			});
		});

		describe("Initialization", function(){
			it("should be defined", function(){
				expect(controller).toBeDefined();
			});
		});

		describe("autosuggest function", function(){
			it("should return related RIC", function(){
				expect($scope.searchRic('IBM')[0].ric).toEqual('IBM.N')
				
			});
			it("should add RIC to displayedRic list, if it is not duplicated", function(){
				var currentRicDisplayed = factory.getDisplayedRics().list.length;
				$scope.addRic("ric","title");
				expect(factory.getDisplayedRics().list.length).toEqual(currentRicDisplayed+1);
				expect($scope.duplicateRicAlert).toBe(false);
			});
			it("should be able to detect Ric duplication", function(){
				var currentRicDisplayed = factory.getDisplayedRics().list.length;
				$scope.addRic("TRI.TO","Thomson Reuters Corp");
				expect(factory.getDisplayedRics().list.length).toEqual(currentRicDisplayed);
				expect($scope.duplicateRicAlert).toBe(true);
			});
			it("should display suggestion box if user starts typing", function(){
				$scope.searchRic('IBM');
				expect($scope.displaySearchBox).toEqual(true)
			});
			it("should hide suggestion box if user clicks at any suggested ric", function(){
				$scope.addRic("TRI.TO","Thomson Reuters Corp");
				expect($scope.displaySearchBox).toEqual(false)
			});
		});
	});
});

