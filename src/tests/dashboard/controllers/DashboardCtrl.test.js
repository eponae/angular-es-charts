describe('Test DashboardCtrl', function() {

    /* Mock module */
    beforeEach(module('conservatories'));

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
                filter: "CONSERVATOIRE DE PARIS",
                changePage: function(page, value) {

                }
            };
            controller = $controller('DashboardCtrl', { $scope: $scope });
        });

        it('Expected changePage to be called', function() {
            spyOn($scope, 'changePage');
            $scope.sortByColumn('name');
            expect($scope.changePage).toHaveBeenCalledWith(1, "CONSERVATOIRE DE PARIS");
        });

    });
});