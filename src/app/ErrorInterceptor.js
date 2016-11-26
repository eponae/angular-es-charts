angular.module('basics').service('ErrorInterceptor', ['$rootScope', function ($rootScope) {
	var addAlert = function (alert) {
		$rootScope.alerts.push(alert);
	};

	var service = this;
	service.requestError = function (config) {
		addAlert({type: 'danger', msg: 'An error occurred'});
	};
	service.responseError = function (respone) {
		addAlert({type: 'danger', msg: 'An error occurred'});
	};
}]);
