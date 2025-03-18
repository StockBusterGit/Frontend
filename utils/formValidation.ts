/**
 * Validate that the price is a valid positive number.
 * @param {number} price - The price value to validate
 * @returns {boolean} - Whether the price is valid
 */
export function isValidPrice(price: number | null | undefined): boolean {
    if (price === null || price === undefined) {
        return false;
    }
    return !isNaN(Number(price)) && Number(price) >= 0;
}

/**
 * Validate that the minimum stock is less than or equal to the maximum stock.
 * @param {number} stockMin - The minimum stock value
 * @param {number} stockMax - The maximum stock value
 * @returns {boolean} - Whether the stock range is valid
 */
export function isValidStockRange(stockMin: number, stockMax: number): boolean {
    if (stockMin === null || stockMin === undefined || stockMax === null || stockMax === undefined) {
        return false;
    }

    const min = Number(stockMin);
    const max = Number(stockMax);

    return !isNaN(min) && !isNaN(max) && min <= max;
}

/**
 * Validate that a text field (label, description) is not empty.
 * @param {string} text - The text to validate
 * @returns {boolean} - Whether the text is valid
 */
export function isValidText(text: string | null | undefined): boolean {
    if (text === null || text === undefined) {
        return false;
    }
    return String(text).trim().length > 0;
}

/**
 * Validate that a selection is made in a `SelectInput`.
 * @param {number | string} value - The selected value
 * @returns {boolean} - Whether the selection is valid
 */
export function isValidSelection(value: number | string): boolean {
    if (value === null || value === undefined) {
        return false;
    }

    if (typeof value === "number") {
        // Accepte 0 comme valeur valide
        return !isNaN(value) && value >= 0;
    }

    if (typeof value === "string") {
        return value.trim().length > 0;
    }

    return false;
}