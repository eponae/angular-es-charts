import dashboardTemplate from './dashboard.html';

class DashboardController {
  constructor($mdDialog, conservatoryService, errorService, $translate) {
    this.$mdDialog = $mdDialog;
    this.conservatoryService = conservatoryService;
    this.errorService = errorService;
    this.$translate = $translate;

    this.criterias = ['city', 'name', 'zip'];
  }

  $onInit() {
    this.clearResults();
  }

  clearResults() {
    this.currentPage = 1;
    this.pageCount = 1;
    this.totalItems = 0;
    this.conservatories = [];
    this.filter = '';
    this.criteria = {
      key: 'name',
      order: 'asc'
    };
    this.getDataInCurrentPage();
  }

  changeOrder() {
    this.criteria.order = this.criteria.order === 'asc' ? 'desc' : 'asc';
    this.getDataInCurrentPage();
  }

  previousPage() {
    this.currentPage = this.currentPage - 1;
    this.getDataInCurrentPage();
  }

  nextPage() {
    this.currentPage = this.currentPage + 1;
    this.getDataInCurrentPage();
  }

  searchConservatory() {
    this.currentPage = 1;
    this.getDataInCurrentPage();
  }

  getDataInCurrentPage() {
    this.changePage({
      page: this.currentPage,
      filter: this.filter,
      sort: this.criteria.key,
      order: this.criteria.order
    });
  }

  changePage(params) {
    this.conservatoryService
      .getConservatories(params)
      .then(data => {
        this.totalItems = data.total;
        this.pageCount = data.pageCount;
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
        controller: [
          '$scope',
          '$mdDialog',
          ($scope, $mdDialog) => {
            $scope.conservatory = conservatory;
            $scope.closeDialog = () => {
              $mdDialog.cancel();
            };
          }
        ]
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
