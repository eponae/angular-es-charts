import dashboardTemplate from './dashboard.html';

class DashboardController {
  constructor($mdDialog, conservatoryService, errorService, $translate) {
    this.$mdDialog = $mdDialog;
    this.conservatoryService = conservatoryService;
    this.errorService = errorService;
    this.$translate = $translate;

    /* Parameters for pagination */
    this.currentPage = 1;
    // this.maxSize = 2;
    // this.numPages = 5;
    // this.itemsPerPage = 5;

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
    this.conservatoryService
      .getConservatories(params)
      .then(data => {
        this.totalItems = data.total;
        this.conservatories = data.results;
      })
      .catch(() => {
        this.$translate('error.main')
          .then(error => this.errorService.showSimpleToast(error))
          .catch(() => this.errorService.showSimpleToast('ERROR'));
      });
  }

  openDetails($event, conservatory) {
    this.$mdDialog
      .show({
        targetEvent: $event,
        template: `<conservatory-details conservatory="conservatory" 
            close-dialog="closeDialog()"></conservatory-details>`,
        clickOutsideToClose: true,
        controller: ['$scope', '$mdDialog', ($scope, $mdDialog) => {
          $scope.conservatory = conservatory;
          $scope.closeDialog = () => {
            $mdDialog.cancel();
          };
        }]
      })
      .then(() => {}, () => {});
  }
}

DashboardController.$inject = ['$mdDialog', 'conservatoryService', 'errorService', '$translate'];

const dashboard = {
  controller: DashboardController,
  template: dashboardTemplate
};

export { dashboard };
