export function priceConversion(price) {
    if (price == null) { // Handles undefined and null cases
        return "N/A";
    }
    return price.toLocaleString('en-US');
}
