describe('Test DashboardCtrl', function() {

    /* Mock module */
    beforeEach(module('basics'));

    var $controller;

    beforeEach(inject(function(_$controller_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    describe('Test sortByColumn', function() {
        var $scope, controller;

        beforeEach(function() {
            $scope = {
                currentPage: 1,
                searchedConserv: "CONSERVATOIRE DE PARIS",
                changePage: function(page, value) {

                }
            };
            controller = $controller('DashboardCtrl', { $scope: $scope });
        });

        it('Expected changePage to be called', function() {
            spyOn($scope, 'changePage');
            $scope.sortByColumn('cp');
            expect($scope.changePage).toHaveBeenCalledWith(1, "CONSERVATOIRE DE PARIS");
        });

    });
});