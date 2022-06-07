
import { EnumCurrency } from "./enums";

const HST = 0.13;

/**
 * 
 */

const exchangeRate = function (i18n: any) {
    if (i18n === null) return 0;
    const currency = i18n.t("locale.currency");
    return Number(EnumCurrency[currency] ?? 1);
};

/**
 * 
 */

const regularPrice = function (price: number, i18n: any, count: number = 1) {
    if (i18n === null) return 0;
    return price * count * exchangeRate(i18n);
}

/**
 * 
 */

const reducedPrice = function (price: number, discount: number = 0) {
    return price - price * (discount / 100);
}

/**
 * 
 */

const applyTax = function (value: number) {
    return value + value * HST;
}

/**
 * 
 */

const toRound = function (value: number) {
    return (Math.round(value * 100) / 100).toFixed(2);
};

export default {
    HST,
    applyTax,
    toRound,
    exchangeRate,
    regularPrice,
    reducedPrice,
}