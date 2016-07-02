angular.module('basics').filter('filterbddname', function() {
    return function(input) {
        var name = '';
        if (input) {
            var nameWithoutIndex = input.split('_')[0];
            name = nameWithoutIndex.charAt(0).toUpperCase() + nameWithoutIndex.substring(1);
        }
        return name;
    };
});
