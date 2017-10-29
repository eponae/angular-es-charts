export default class ConservatoryService {
  /* @ngInject; */
  constructor($http, API_URL) {
    this.$http = $http;
    this.API_URL = API_URL;
  }

  getConservatories(params) {
    this.$http.get(this.API_URL + '?page=' + params.page + '&pageSize=10&sort=' + params.sort + '&order=' + params.order + '&q=' + params.filter)
      .then((response) => response);
  }

  getAggregateByDepartment() {
    this.$http.get(this.API_URL + 'aggregate')
      .then((response) => response);
  }

  getAggregateByZipForADepartment(departmentId) {
    this.$http.get(this.API_URL + 'aggregate/department/' + departmentId)
      .then((response) => response);
  }
}
