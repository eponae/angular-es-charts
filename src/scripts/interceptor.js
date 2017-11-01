const errorInterceptor = class ErrorInterceptor {
  constructor($q, $injector) {
    this.$q = $q;
    this.$injector = $injector;

    this.requestError = (rejection) => {
      return this.$q.reject(rejection);
    };

    this.responseError = (rejection) => {
      return this.$q.reject(rejection);
    };
  }
};

errorInterceptor.$inject = ['$q', '$injector'];

export default errorInterceptor;
