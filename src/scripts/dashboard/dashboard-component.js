import dashboardTemplate from './dashboard.html';

class DashboardController {
  constructor($uibModal, conservatoryService) {
    this.$uibModal = $uibModal;
    this.conservatoryService = conservatoryService;

    /* Parameters for pagination */
    this.currentPage = 1;
    this.maxSize = 2;
    this.numPages = 5;
    this.itemsPerPage = 5;

    this.filter = '';

    this.orders = {
      city: 'asc',
      name: 'asc',
      zip: 'asc'
    };

    this.currentCriteria = 'name';
  }

  $onInit() {
    this.clearResults();
    this.changePage({
      page: this.currentPage,
      sort: this.currentCriteria,
      order: this.orders[this.currentCriteria],
      filter: this.filter
    });
  }


  clearResults() {
    this.totalItems = 0;
    this.conservatories = [];
  }

  sortByColumn(criteria) {
    this.currentCriteria = criteria;
    if (this.orders[this.currentCriteria] === 'asc') {
      this.orders[this.currentCriteria] = 'desc';
    } else {
      this.orders[this.currentCriteria] = 'asc';
    }

    this.changePage({
      page: this.currentPage,
      sort: this.currentCriteria,
      order: this.orders[this.currentCriteria],
      filter: this.filter
    });
  }

  changePage(params) {
    this.conservatoryService.getConservatories(params).then((response) => {
      this.totalItems = response.data.total;
      this.conservatories = response.data.results;
    });
  }

  openDetails(conservatory) {
    const modalInstanceResult = this.$uibModal.open({
      component: 'conservatoryDetails',
      resolve: {
        conservatory: function conservatoryObject() {
          return conservatory;
        }
      }
    }).result;

    modalInstanceResult.then(
      function () {
      },
      function () {
      }
    );
  }
}

DashboardController.$inject = ['$uibModal', 'conservatoryService'];

let dashboard = {
  controllerAs: '$ctrl',
  controller: DashboardController,
  template: dashboardTemplate
};

export default dashboard;
