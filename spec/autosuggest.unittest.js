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
		});
	});

	describe('selectedRicsCtrl', function(){
		var $rootScope, $scope, controller;

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
			it("should display a different RIC if the page is changed", function(){

			});
		});
	});

	describe('autoSugesstCtrl', function(){
		var $rootScope, $scope, controller;

		beforeEach(function() {
			inject(function($injector){
				$rootScope = $injector.get('$rootScope');
				$scope = $rootScope.$new();
				controller = $injector.get('$controller')('autoSugesstCtrl', {$scope: $scope});
			});
		});

		describe("Initialization", function(){
			it("should be defined", function(){
				expect(controller).toBeDefined();
			});
		});
	});
});

