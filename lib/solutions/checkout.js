'use strict';

let aCount, bCount, cCount, dCount, eCount, fCount, gCount, hCount;
let iCount, jCount, kCount, lCount, mCount, nCount, oCount, pCount;
let qCount, rCount, sCount, tCount, uCount, vCount, wCount, xCount;
let yCount, zCount;

//noinspection JSUnusedLocalSymbols
module.exports = function (skus) {
    if(hasErrors(skus))
        return -1;

    aCount = count('A', skus);
    bCount = count('B', skus);
    cCount = count('C', skus);
    dCount = count('D', skus);
    eCount = count('E', skus);
    fCount = count('F', skus);
    gCount = count('G', skus);
    hCount = count('H', skus);
    iCount = count('I', skus);
    jCount = count('J', skus);
    kCount = count('K', skus);
    lCount = count('L', skus);
    mCount = count('M', skus);
    nCount = count('N', skus);
    oCount = count('O', skus);
    pCount = count('P', skus);
    qCount = count('Q', skus);
    rCount = count('R', skus);
    sCount = count('S', skus);
    tCount = count('T', skus);
    uCount = count('U', skus);
    vCount = count('V', skus);
    wCount = count('W', skus);
    xCount = count('X', skus);
    yCount = count('Y', skus);
    zCount = count('Z', skus);

    return discountBundle()
        + calculate(eCount, 40, [[2, {
            callback: discountB,
            discount: 30
        }]])
        + calculate(nCount, 40, [[3, {
            callback: discountM,
            discount: 30
        }]])
        + calculate(rCount, 50, [[3, {
            callback: discountQ,
            discount: 30
        }]])
        + calculate(aCount, 50, [[3, 20], [5, 50]])
        + calculate(bCount, 30, [[2, 15]])
        + calculate(cCount, 20)
        + calculate(dCount, 15)
        + calculate(fCount, 10, [[3, 10]])
        + calculate(gCount, 20)
        + calculate(hCount, 10, [[5, 5], [10, 20]])
        + calculate(iCount, 35)
        + calculate(jCount, 60)
        + calculate(kCount, 70, [[2, 20]])
        + calculate(lCount, 90)
        + calculate(mCount, 15)
        + calculate(oCount, 10)
        + calculate(pCount, 50, [[5, 50]])
        + calculate(qCount, 30, [[3, 10]])
        + calculate(sCount, 20)
        + calculate(tCount, 20)
        + calculate(uCount, 40, [[4, 40]])
        + calculate(vCount, 50, [[2, 10], [3, 20]])
        + calculate(wCount, 20)
        + calculate(xCount, 17)
        + calculate(yCount, 20)
        + calculate(zCount, 21);
};

function discountBundle() {
    const bundleProductsAmount = sCount + tCount + xCount + yCount + zCount;
    let freeProducts = Math.floor((bundleProductsAmount / 3));
    let productsToDiscount = freeProducts * 3;
    let toRemove = 0;

    if(zCount > 0 && productsToDiscount > 0) {
        toRemove = zCount;
        zCount = zCount - productsToDiscount < 0 ? 0 : zCount - productsToDiscount;
        productsToDiscount = productsToDiscount - toRemove;
    }

    if(productsToDiscount > 0 && sCount > 0 || tCount > 0 || yCount > 0){
        if(sCount > 0 && productsToDiscount > 0) {
            toRemove = sCount;
            sCount = sCount - productsToDiscount < 0 ? 0 : sCount - productsToDiscount;
            productsToDiscount = productsToDiscount - toRemove;
        }

        if(tCount > 0 && productsToDiscount > 0) {
            toRemove = tCount;
            tCount = tCount - productsToDiscount < 0 ? 0 : tCount - productsToDiscount;
            productsToDiscount = productsToDiscount - toRemove;
        }

        if(yCount > 0 && productsToDiscount > 0) {
            toRemove = yCount;
            yCount = yCount - productsToDiscount < 0 ? 0 : yCount - productsToDiscount;
            productsToDiscount = productsToDiscount - toRemove;
        }
    }

    if(productsToDiscount > 0 && xCount > 0) {
        xCount = xCount - productsToDiscount;
    }

    return freeProducts * 45;
}

function discountM(price, ammount) {
    let discountQuantity = ammount;

    if(ammount > mCount) {
        discountQuantity = mCount;
    }
    mCount = mCount - discountQuantity;
    return 0;
    
}

function discountB(price, ammount) {
    let discountQuantity = ammount;

    if(ammount > bCount) {
        discountQuantity = bCount;
    }
    bCount = bCount - discountQuantity;
    return 0;

}

function discountQ(price, ammount) {
    let discountQuantity = ammount;

    if(ammount > qCount) {
        discountQuantity = qCount;
    }
    qCount = qCount - discountQuantity;
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
