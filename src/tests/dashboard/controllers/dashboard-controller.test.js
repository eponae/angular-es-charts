describe('Test DashboardCtrl', function () {

  /* Mock module */
  beforeEach(module('conservatories'));

  beforeEach(inject(function ($componentController) {
    this.$controller = $componentController;
  }));

  describe('Test sortByColumn', function () {
    var $scope, controller;

    beforeEach(function () {
      $scope = {
        currentPage: 1,
        filter: "CONSERVATOIRE DE PARIS",
        changePage: function (page, value) {

        }
      };
      controller = this.$controller('dashboard', {$scope: $scope});
    });

    it('Expected changePage to be called', function () {
      spyOn($scope, 'changePage');
      $scope.sortByColumn('name');
      expect($scope.changePage).toHaveBeenCalledWith(1, "CONSERVATOIRE DE PARIS");
    });

  });
});