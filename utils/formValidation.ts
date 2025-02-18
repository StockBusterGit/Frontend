/**
 * Validate that the price is a positive number.
 * @param {number} price
 * @returns {boolean}
 */
export function isValidPrice(price: number): boolean {
    return price >= 0;
}

/**
 * Validate that the minimum stock is less than or equal to the maximum stock.
 * @param {number} stockMin
 * @param {number} stockMax
 * @returns {boolean}
 */
export function isValidStockRange(stockMin: number, stockMax: number): boolean {
    return stockMin <= stockMax;
}

/**
 * Validate that a text field (label, description) is not empty.
 * @param {string} text
 * @returns {boolean}
 */
export function isValidText(text: string): boolean {
    return text.trim().length > 0;
}

/**
 * Validate that a selection is made in a `SelectInput`.
 * @param {string} value
 * @returns {boolean}
 */
export function isValidSelection(value: string): boolean {
    return value.trim().length > 0;
}