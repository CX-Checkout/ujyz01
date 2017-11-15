'use strict';

let aCount, bCount, cCount, dCount, eCount;

//noinspection JSUnusedLocalSymbols
module.exports = function (skus) {
    if(hasErrors(skus))
        return -1;

    aCount = count('A', skus);
    bCount = count('B', skus);
    cCount = count('C', skus);
    dCount = count('D', skus);
    eCount = count('E', skus);

    return calculate(aCount, 50, [[3, 20], [5, 50]])
        + calculate(eCount, 40, [[2, {
            callback: discountB,
            relativeProductionCount: bCount,
            discount: 30
        }]])
        + calculate(bCount, 30, [[2, 15]])
        + calculate(cCount, 20)
        + calculate(dCount, 15);
};

function discountB(price, ammount) {
    let discountQuantity = ammount;

    if(ammount > bCount) {
        discountQuantity = bCount;
    }
    bCount = bCount - discountQuantity;
    return 0;
    
}

function calculate (amount, price, promotions) {
    if(amount === 0) {
        return 0;
    } else {
        const fullPrice = amount * price;
        let discountedPrice = 0;

        if(promotions) {
            discountedPrice = calculateDiscount(amount, promotions);
        }
        return fullPrice - discountedPrice;
    }
}

function calculateDiscount(amount, promotions) {
    let discountedPrice = 0;

    if(promotions.length > 1) {
        const bestPromoAmmount = promotions[1][0];
        const bestPromoDiscount = promotions[1][1];
        const worstPromoAmmount = promotions[0][0];
        const worstPromoDiscount = promotions[0][1];

        const ammountOfBestPromotion = Math.floor((amount / bestPromoAmmount));
        const ammountOfProductAfterBestPromotion = amount - (ammountOfBestPromotion * bestPromoAmmount);
        const ammountOfWorstPromotion = Math.floor((ammountOfProductAfterBestPromotion / worstPromoAmmount));

        discountedPrice = (ammountOfBestPromotion * bestPromoDiscount) + (ammountOfWorstPromotion * worstPromoDiscount);

    } else {
        promotions.forEach(function (promotion) {
            const promoAmmount = promotion[0];
            const promoDiscount = promotion[1];
            const discountedProducts = Math.floor((amount / promoAmmount));

            if(typeof promoDiscount === "object"){
                discountedPrice = promoDiscount.callback(
                    promoDiscount.discount,
                    discountedProducts);
            } else {
                discountedPrice = discountedProducts * promoDiscount;
            }
        });
    }

    return discountedPrice;
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
