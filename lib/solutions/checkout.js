'use strict';

//noinspection JSUnusedLocalSymbols
module.exports = function (skus) {
    if(hasErrors(skus))
        return -1;

    const aCount = count('A', skus);
    const bCount = count('B', skus);
    const cCount = count('C', skus);
    const dCount = count('D', skus);

    return calculate(aCount, 50, 3, 20)
        + calculate(bCount, 30, 2, 15)
        + calculate(cCount, 20)
        + calculate(dCount, 15);
};

function calculate (amount, price, quantity, promotion) {
    if(amount === 0) {
        return 0;
    } else {
        const fullPrice = amount * price;
        let discountedPrice = 0;

        if(promotion) {
            discountedPrice = Math.floor((amount / quantity)) * promotion;
        }
        return fullPrice - discountedPrice;
    }
}

function count (product, skus) {

    const regProduct = new RegExp(product, "g");
    const regProducts = new RegExp('[0-9]' + product, "g");

    let aCount = (skus.match(regProduct) || []).length;
    const numberFollowedByLetter = (skus.match(regProducts) || []);

    numberFollowedByLetter.forEach(function (number) {
        const length = number.length();
        const amount = parseInt(number.substring(0,length-1));
        const sku = number.substring(length-1, length);

        // noinspection JSAnnotator
        aCount = aCount + amount -1;
    }, this);

    return aCount;
    
}

function hasErrors (skus) {

    const errors = new RegExp('(a|-|x)', "g");
    return (skus.match(errors) || []).length > 0;

}
