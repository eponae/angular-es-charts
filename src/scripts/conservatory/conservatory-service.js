export default class ConservatoryService {
  constructor($http, API_URL) {
    this.$http = $http;
    this.API_URL = API_URL;
  }

  getConservatories(params) {
    return this.$http.get(this.API_URL + '?page=' + params.page + '&pageSize=5&sort=' +
      params.sort + '&' + params.order + '&q=' + params.filter)
      .then((response) => response);
  }

  getAggregateByDepartment() {
    return this.$http.get(this.API_URL + 'aggregate')
      .then((response) => response);
  }

  getAggregateByZipForADepartment(departmentId) {
    return this.$http.get(this.API_URL + 'aggregate/department/' + departmentId)
      .then((response) => response);
  }
}
ConservatoryService.$inject = ['$http', 'API_URL'];
