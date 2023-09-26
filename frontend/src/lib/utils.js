export function formatTimestamp(timestamp) {
    try {
        const date = new Date(timestamp);
        return `${date.toISOString().slice(0, 16).replace("T", " ")}`;
    } catch {
        return "";
    }
}

export function bill({subtotal,tax,coupon}){


    subtotal = subtotal === "" ? 0 : subtotal
    tax = tax === "" ? 0 : tax

    
    let discount = coupon?.id ? parseFloat(coupon.discount) : 0
    discount = discount === "" ? 0 : discount
    let total = parseFloat(subtotal) - (parseFloat(subtotal)*(parseFloat(discount)/100))
    let calculatedTax = parseFloat(total) * (parseFloat(tax)/100)
    total = parseFloat(total) + parseFloat(calculatedTax)
    total = total.toFixed(3)

    total = isNaN(total) ? 0 : total
    calculatedTax = isNaN(calculatedTax) ? 0 : calculatedTax
    return [total,calculatedTax]
}