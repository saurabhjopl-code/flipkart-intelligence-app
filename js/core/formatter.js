// js/core/formatter.js

export function formatCurrency(num) {

    num = Number(num);

    if (num >= 10000000) return `₹${(num/10000000).toFixed(2)}Cr`;
    if (num >= 100000) return `₹${(num/100000).toFixed(2)}L`;
    if (num >= 1000) return `₹${(num/1000).toFixed(1)}K`;

    return `₹${num}`;
}

export function formatNumber(num) {

    num = Number(num);

    if (num >= 1000000) return `${(num/1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num/1000).toFixed(1)}K`;

    return num;
}

export function formatPercent(val) {

    return `${(val * 100).toFixed(2)}%`;
}
