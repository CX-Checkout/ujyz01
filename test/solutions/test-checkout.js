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
    { products: 'AAAA', result: 180},
    { products: 'AAAAA', result: 200},
    { products: 'AAAAAA', result: 250},

    { products: 'BB', result: 45},
    { products: 'BBB', result: 75},

    { products: 'CC', result: 40},

    { products: 'DD', result: 30},

    { products: 'E', result: 40},
    { products: 'EE', result: 80},
    { products: 'EEE', result: 120},
    { products: 'EEEE', result: 160},
    { products: 'EEEEBB', result: 160},
    { products: 'EEEEBBB', result: 190},
    { products: 'EEEEB', result: 160},

    { products: 'FF', result: 20},
    { products: 'FFF', result: 20},
    { products: 'FFFF', result: 30},
    { products: 'FFFFF', result: 40},
    { products: 'FFFFFF', result: 40},

    { products: 'GG', result: 40},

    { products: 'HH', result: 20},
    { products: 'HHHHH', result: 45},
    { products: 'HHHHHH', result: 55},
    { products: 'HHHHHHHHHH', result: 80},
    { products: 'HHHHHHHHHHH', result: 90},

    { products: 'I', result: 35},

    { products: 'J', result: 60},

    { products: 'K', result: 70},
    { products: 'KK', result: 120},

    { products: 'L', result: 90},

    { products: 'M', result: 15},

    { products: 'NNN', result: 120},
    { products: 'NNNN', result: 160},
    { products: 'NNM', result: 95},
    { products: 'NNNM', result: 120},
    { products: 'NNNMM', result: 135},
    { products: 'NNNMMNNN', result: 240},

    { products: 'O', result: 10},

    { products: 'P', result: 50},
    { products: 'PPPPP', result: 200},

    { products: 'Q', result: 30},
    { products: 'QQQ', result: 80},

    { products: 'RRR', result: 150},
    { products: 'RRRQ', result: 150},
    { products: 'RRQ', result: 130},
    { products: 'RRRQQ', result: 180},
    { products: 'RRRQQRRR', result: 300},

    { products: 'S', result: 20},

    { products: 'T', result: 20},

    { products: 'UUU', result: 120},
    { products: 'UUUU', result: 120},
    { products: 'UUUUU', result: 160},

    { products: 'V', result: 50},
    { products: 'VV', result: 90},
    { products: 'VVV', result: 130},
    { products: 'VVVV', result: 180},
    { products: 'VVVVV', result: 220},

    { products: 'W', result: 20},

    { products: 'X', result: 17},

    { products: 'Y', result: 20},

    { products: 'Z', result: 21},

    { products: 'STX', result: 45},
    { products: 'STXYZ', result: 82},
    { products: 'STXYZZ', result: 90},
    { products: 'STXYZZA', result: 140},
    { products: 'STXYZSTXYZZZ', result: 180}

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

