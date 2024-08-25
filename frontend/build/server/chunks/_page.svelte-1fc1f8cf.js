import { c as create_ssr_component, e as escape, f as each, v as validate_component, i as createEventDispatcher, h as add_attribute } from './ssr-69d45533.js';
import 'esc-pos-encoder';
import 'star-prnt-encoder';
import './index-64aa7a5e.js';

const CartProduct = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { orderItem } = $$props;
  createEventDispatcher();
  if ($$props.orderItem === void 0 && $$bindings.orderItem && orderItem !== void 0)
    $$bindings.orderItem(orderItem);
  return `<div class="card product"><div class="card-body"><div class="row gy-3"><div class="col-sm-auto"><div class="avatar-lg bg-light rounded p-1"><img${add_attribute("src", orderItem.product.image.full_path, 0)} alt="" class="img-fluid d-block"></div></div> <div class="col-sm"><h5 class="fs-14 text-truncate"><a href="ecommerce-orderItem.product-detail.html" class="text-body">${escape(orderItem.product.name)}</a></h5> <ul class="list-inline text-muted"><li class="list-inline-item">Category : <span class="fw-medium">${escape(orderItem.product.category == null ? "no category" : orderItem.product.category.name)}</span></li></ul> <ul class="list-inline text-muted"><li class="list-inline-item">Quantity : <span class="fw-medium">x${escape(orderItem.qty)}</span></li></ul></div> <div class="col-sm-auto"><div class="text-lg-end"><p class="text-muted mb-1" data-svelte-h="svelte-2y45sf">Item Price:</p> <h5 class="fs-14">${escape(orderItem.product.currentPrice)} SAR</h5></div></div></div></div>  <div class="card-footer"><div class="row align-items-center gy-3"><div class="col-sm" data-svelte-h="svelte-yefo47"></div> <div class="col-sm-auto"><div class="d-flex align-items-center gap-2 text-muted"><div data-svelte-h="svelte-lxj2re">Total :</div> <h5 class="fs-14 mb-0">${escape(orderItem.product.currentPrice * orderItem.qty)} SAR</h5></div></div></div></div> </div>`;
});
const OrderSummary = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { order } = $$props;
  if ($$props.order === void 0 && $$bindings.order && order !== void 0)
    $$bindings.order(order);
  return `<div class="col-xl-4"><div class="sticky-side-div"><div class="card"><div class="card-header border-bottom-dashed" data-svelte-h="svelte-1y5tcqw"><h5 class="card-title mb-0">Order Summary</h5></div> <div class="card-body pt-2"><div class="table-responsive"><table class="table table-borderless mb-0"><tbody><tr><td data-svelte-h="svelte-pfaxes">Sub Total :</td> <td class="text-end" id="cart-subtotal">${escape(order.subtotal)} SAR</td></tr> <tr><td>Discount <span class="text-muted">(${escape(order.discount)}%)</span> :</td> <td class="text-end" id="cart-discount">${escape(order.discountCalculated)} SAR</td></tr> <tr><td>Estimated Tax (${escape(order.tax)}%) :</td> <td class="text-end" id="cart-tax">${escape(order.taxCalculated)} SAR</td></tr> <tr class="table-active"><th data-svelte-h="svelte-w5xebh">Total (SAR) :</th> <td class="text-end"><span class="fw-semibold" id="cart-total">${escape(order.total)} SAR</span></td></tr></tbody></table></div> <div class="row g-3 mt-2 "><div class="hstack gap-2 justify-content-end"><a role="button" href="${"/admin/orders/" + escape(order.id, true) + "/print"}" target="_blank" class="btn btn-primary waves-effect waves-light"><i class="ri-printer-line align-bottom me-1"></i> Print Order</a></div></div></div></div></div> </div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let order;
  let productsList;
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    order = data.orderResponse.data.order;
    productsList = data.orderResponse.data.order.order_items;
    $$rendered = `<div class="row"><div class="col-lg-12"><div class="card"><div class="card-header align-items-center d-flex"><h4 class="card-title mb-0 flex-grow-1"><span class="text-primary">#${escape(order.id)}</span> Order View</h4> </div> </div></div></div> <div class="row mb-3"><div class="col-xl-8">${productsList ? `${each(productsList, (product, i) => {
      return `${validate_component(CartProduct, "CartProduct").$$render(
        $$result,
        { orderItem: product },
        {
          orderItem: ($$value) => {
            product = $$value;
            $$settled = false;
          }
        },
        {}
      )}`;
    })}` : ``}</div>  ${validate_component(OrderSummary, "OrderSummary").$$render($$result, { order }, {}, {})}</div>`;
  } while (!$$settled);
  return $$rendered;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-1fc1f8cf.js.map
