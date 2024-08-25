import { c as create_ssr_component, f as each, e as escape } from './ssr-69d45533.js';
import { t as translation } from './translation-88f21498.js';

const css = {
  code: ".receipt.svelte-jtzi2o{padding:20px;max-width:400px}.receipt-header.svelte-jtzi2o{text-align:center;margin-bottom:20px}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let orderResponse;
  let order;
  let { invoice } = $$props;
  let { data } = $$props;
  if ($$props.invoice === void 0 && $$bindings.invoice && invoice !== void 0)
    $$bindings.invoice(invoice);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  orderResponse = data.orderResponse;
  order = orderResponse.data.order;
  return `<div class="d-flex justify-content-center" dir="ltr"><div class="card p-2" id="demo"><div class="row"> <div class="col-lg-12" data-svelte-h="svelte-ciebtb">  </div> <div class="receipt svelte-jtzi2o"><div class="receipt-header svelte-jtzi2o" data-svelte-h="svelte-1w0ynjj"><h1>Boofey</h1> <p><strong>Email :</strong> contact@boofey.app</p> <p><strong>Website :</strong> contact@boofey.app</p> <p><strong>Mobile :</strong> (966) 56 382 3920</p> <p><strong>Date:</strong> January 1, 2023</p></div> <hr> <table class="table table-borderless"><tbody class="list">${each(order.order_items, (item) => {
    return `<tr class=""><td>${escape(item.qty)}x</td> <td>${escape(item.product.name)}</td> <td class="text-end">${escape(item.price * item.qty)} SAR</td> </tr>`;
  })}</tbody></table> <hr> <table class="me-auto table table-borderless"><tbody class="list"><tr class=""><td data-svelte-h="svelte-12lbjyq">Sub Total</td> <td class="text-end">${escape(order.subtotal)} SAR</td></tr> <tr class=""><td>Discount (${escape(order.discount)}%)</td> <td class="text-end">-${escape(order.discountCalculated)} SAR</td></tr> <tr class=""><td>Estimated Tax (${escape(order.tax)}%)</td> <td class="text-end">+${escape(order.taxCalculated)} SAR</td></tr> <tr data-svelte-h="svelte-1t971w4"><td class="p-0"><hr colspan="2"></td> <td class="p-0"><hr colspan="2"></td></tr> <tr class="fw-bold"><td data-svelte-h="svelte-1l6ejn4">Total</td> <td class="text-end">${escape(order.total)} SAR</td></tr></tbody></table> <hr> <p class="text-center mt-2">${escape(order.ref)}</p> <h5 class="text-center" data-svelte-h="svelte-ka4znu">THANK YOU!</h5></div> <div class="col-lg-12"><div class="hstack gap-2 justify-content-end d-print-none mt-4"><a href="javascript:window.print()" class="btn btn-info"><i class="ri-printer-line align-bottom me-1"></i> ${escape(translation.print[localStorage.getItem("language")])}</a></div></div>  </div> </div> </div>`;
});

export { Page as default };
//# sourceMappingURL=_page@.svelte-e46c591a.js.map
