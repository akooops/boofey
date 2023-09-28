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
export function imageDataURLToFile(dataURI) {
    if(dataURI == null) return;
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    let blob =  new Blob([ab], { type: mimeString });

    return new File([blob], `${Date.now()}.jpeg`, { type: 'image/jpeg' });
  }