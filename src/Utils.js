import exchangerates from './data/exchange_rates.json';

// Define our currency symbols for display purposes
export const currencySymbols = {
    'USD': 36,
    'AUD': 36,
    'CNY': 165
}

// Format numbers for presentation
export function numberFormat(number, decimals, dec_point, thousands_sep) {
    // Strip all characters but numerical ones.
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

// Handle our currency conversions
export function displayPrice(desiredCurrency, productBaseCurrency, productPrice) {
    var price = String.fromCharCode(currencySymbols[desiredCurrency]);
    if (productBaseCurrency === desiredCurrency) {
        price += numberFormat(productPrice, 2);
    }
    if (productBaseCurrency !== desiredCurrency) {
        for (var j = 0; j < exchangerates.length; j++) {
            if (exchangerates[j].base === productBaseCurrency) {
                price += numberFormat(productPrice * exchangerates[j].rates[desiredCurrency], 2);
            }
        }
    }
    return price;
}

export function inArray(needle, haystack) {
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
        if (haystack[i] === needle) {
            return true;
        }
    }
    return false;
}