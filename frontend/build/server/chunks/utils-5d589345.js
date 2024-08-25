function formatTimestamp(timestamp, onlydate) {
  try {
    const date = new Date(timestamp);
    let formatted = `${date.toISOString().slice(0, 16).replace("T", " ")}`;
    if (onlydate) {
      return formatted.split(" ")[0];
    } else {
      return formatted;
    }
  } catch {
    return "";
  }
}
function bill({ subtotal, tax, coupon }) {
  subtotal = subtotal === "" ? 0 : subtotal;
  tax = tax == null ? 0 : tax;
  let discount = coupon?.id ? parseFloat(coupon.discount) : 0;
  discount = discount === "" ? 0 : discount;
  let total = parseFloat(subtotal) - parseFloat(subtotal) * (parseFloat(discount) / 100);
  let calculatedTax = parseFloat(total) * (parseFloat(tax) / 100);
  total = parseFloat(total) + parseFloat(calculatedTax);
  total = total.toFixed(3);
  total = isNaN(total) ? 0 : total;
  calculatedTax = isNaN(calculatedTax) ? 0 : calculatedTax;
  return [total, calculatedTax];
}

export { bill as b, formatTimestamp as f };
//# sourceMappingURL=utils-5d589345.js.map
