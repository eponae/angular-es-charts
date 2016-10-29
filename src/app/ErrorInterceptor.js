angular.module('basics').service('ErrorInterceptor', function () {
	var service = this;
	service.requestError = function (config) {
		//add alert
		console.log("error in request");
	};
	service.responseError = function (response) {
		//add alert
		console.log("error in response");
	};
});
