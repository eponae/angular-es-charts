class ConservatoryService {
  constructor($http, API_URL) {
    this.$http = $http;
    this.API_URL = API_URL;
  }

  getConservatories(params) {
    return this.$http
      .get(this.API_URL, { params: { page: params.page, pageSize: 5, q: params.filter } })
      .then(response => response.data);
  }

  getAggregateByDepartment() {
    return this.$http.get(`${this.API_URL}/aggregate`).then(response => response.data);
  }

  getAggregateByZipForADepartment(departmentId) {
    return this.$http
      .get(`${this.API_URL}/aggregate/department/${departmentId}`)
      .then(response => response.data);
  }
}

ConservatoryService.$inject = ['$http', 'API_URL'];

export { ConservatoryService };
