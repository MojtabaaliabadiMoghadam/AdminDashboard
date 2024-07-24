export function formatNumber(num, currencySymbol = '$', symbolPosition = 'before') {
    // Convert the number to a string
    let numStr = num.toString();

    // Use a regular expression to insert commas every three digits from the end
    let formattedStr = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Add the currency symbol in the specified position
    if (currencySymbol) {
        if (symbolPosition === 'before') {
            formattedStr = currencySymbol + formattedStr;
        } else if (symbolPosition === 'after') {
            formattedStr = formattedStr + currencySymbol;
        }
    }

    return formattedStr;
}