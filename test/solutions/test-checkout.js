var checkout = require('../../lib/solutions/checkout');

exports['return the price of one product'] = function (test) {
    test.equal(checkout('A'), 50);
    test.done();
};

exports['return the price of promoted product with single products'] = function (test) {
    test.equal(checkout('AAAA'), 180);
    test.done();
};

[
    { products: 'A A A', result: 130},
    { products: 'A, A, A', result: 130},
    { products: '3A', result: 130},
    { products: 'AAA', result: 130},
    { products: 'AAAA', result: 195},
    { products: 'AAAAA', result: 230},
    { products: 'AAAAAA', result: 260},
    { products: 'BB', result: 45},
    { products: 'BBB', result: 75},
    { products: 'CC', result: 40},
    { products: 'DD', result: 30}
]
    .forEach(function (scenario) {
        exports['return the price of one product when multiple products are bought - ' + scenario] = function (test) {
            test.equal(checkout(scenario.products), scenario.result);
            test.done();
        };
    }, this);

[
    { products: 'A B C D', result: 115},
    { products: 'A A A A B', result: 210},
    { products: 'AAABC', result: 180}]
    .forEach(function (scenario) {
        exports['return the price of multiple product when multiple products are bought - ' + scenario] = function (test) {
            test.equal(checkout(scenario.products), scenario.result);
            test.done();
        };
    }, this);


//ERRORS
[
    { products: 'AAAAa', result: -1},
    { products: '-AA', result: -1},
    { products: 'AxA', result: -1}]
    .forEach(function (scenario) {
        exports['return errors on invalid request - ' + scenario] = function (test) {
            test.equal(checkout(scenario.products), scenario.result);
            test.done();
        };
    }, this);

