export default class ErrorService {
  constructor($mdToast) {
    this.$mdToast = $mdToast;
  }

  showSimpleToast(message) {
    this.$mdToast.show(this.$mdToast
      .simple()
      .textContent(message)
      .position('top left')
      .hideDelay(3000));
  }
}

ErrorService.$inject = ['$mdToast'];
