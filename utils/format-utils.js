export const formatNumber = (value, decimalPlaces = null) => {
    if (typeof value === 'number')
        value = value.toString()

    const [whole, decimal] = value.trim().split('.')

    if (decimalPlaces === null)
        decimalPlaces = decimal.length

    const formattedWhole = whole
        .split('')
        .reverse()
        .reduce((output = '', char) => {
            const outputToEndOrNextComma = output.includes(',')
                ? output.substring(0, output.indexOf(','))
                : output

            return `${outputToEndOrNextComma.length === 3 ? `${char},` : char}${output}`
        }, '')

    const formattedDecimal = !decimal || !decimal.length
        ? '0'.repeat(decimalPlaces)
        : decimal.length === decimalPlaces
            ? decimal
            : decimal.length < decimalPlaces
                ? `${decimal}${'0'.repeat(decimalPlaces - decimal.length)}`
                : decimal.substring(0, decimalPlaces);

    return `${formattedWhole}${!decimalPlaces ? '' : `.${formattedDecimal}`}`
}

export const formatUsd = (usd) => `$${formatNumber(usd, 2)}`
