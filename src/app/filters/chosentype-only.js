angular.module('basics').filter('chosentypeOnly', function() {
    return function(inputs, type) {
        return _.pickBy(inputs, function(mappValue, mappKey) {
            return mappValue.type === type;
        });
    };
});
