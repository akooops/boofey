import { c as create_ssr_component, e as escape, v as validate_component, f as each, i as createEventDispatcher, h as add_attribute } from './ssr-69d45533.js';
import { b as bill } from './utils-5d589345.js';
import './index-64aa7a5e.js';
import { A as AddProductToCart } from './AddProductToCart-bc464675.js';
import './Product-402ba5c0.js';
import './ModalPagination-ba97b167.js';
import './translation-88f21498.js';

const CartProduct = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { orderItem } = $$props;
  createEventDispatcher();
  if ($$props.orderItem === void 0 && $$bindings.orderItem && orderItem !== void 0)
    $$bindings.orderItem(orderItem);
  return `<div class="card orderItem"><div class="card-body"><div class="row gy-3"><div class="col-sm-auto"><div class="avatar-lg bg-light rounded p-1"><img${add_attribute("src", orderItem.product.image.full_path, 0)} alt="" class="img-fluid d-block"></div></div> <div class="col-sm"><h5 class="fs-14 text-truncate"><a href="ecommerce-orderItem-detail.html" class="text-body">${escape(orderItem.product.name)}</a></h5> <ul class="list-inline text-muted"><li class="list-inline-item">Category : <span class="fw-medium">${escape(orderItem.product.category == null ? "no category" : orderItem.product.category.name)}</span></li></ul> <div class="input-step step-primary"><button type="button" class="minus" data-svelte-h="svelte-jzgjqt">-</button> <input type="number" class="orderItem-quantity" min="0" oninput="this.value = Math.abs(this.value)"${add_attribute("value", orderItem.qty, 0)}> <button type="button" class="plus" data-svelte-h="svelte-suctdq">+</button></div></div> <div class="col-sm-auto"><div class="text-lg-end"><p class="text-muted mb-1" data-svelte-h="svelte-2y45sf">Item Price:</p> <h5 class="fs-14">${escape(orderItem.product.currentPrice)} SAR</h5></div></div></div></div>  <div class="card-footer"><div class="row align-items-center gy-3"><div class="col-sm"><div class="d-flex flex-wrap my-n1"><div><a href="#" class="d-block text-body p-1 px-2" data-svelte-h="svelte-1exe4tu"><i class="ri-delete-bin-fill text-muted align-bottom me-1"></i> Remove</a></div></div></div> <div class="col-sm-auto"><div class="d-flex align-items-center gap-2 text-muted"><div data-svelte-h="svelte-lxj2re">Total :</div> <h5 class="fs-14 mb-0">${escape(orderItem.product.currentPrice * orderItem.qty)} SAR</h5></div></div></div></div> </div>`;
});
const OrderSummary = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { productsList = [] } = $$props;
  let { subtotal = 0 } = $$props;
  let { discount = 0 } = $$props;
  let { tax = 0 } = $$props;
  let { id = 0 } = $$props;
  let total = 0;
  let calculatedTax = 0;
  let errors = {};
  if ($$props.productsList === void 0 && $$bindings.productsList && productsList !== void 0)
    $$bindings.productsList(productsList);
  if ($$props.subtotal === void 0 && $$bindings.subtotal && subtotal !== void 0)
    $$bindings.subtotal(subtotal);
  if ($$props.discount === void 0 && $$bindings.discount && discount !== void 0)
    $$bindings.discount(discount);
  if ($$props.tax === void 0 && $$bindings.tax && tax !== void 0)
    $$bindings.tax(tax);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  {
    {
      subtotal = productsList.reduce(
        (total2, product) => {
          return total2 + product.product.currentPrice * product.qty;
        },
        0
      );
    }
  }
  {
    {
      [total, calculatedTax] = bill({
        subtotal,
        tax,
        coupon: { id: 1, discount }
      });
    }
  }
  return `<div class="col-xl-4"><div class="sticky-side-div"><div class="card"><div class="card-header border-bottom-dashed" data-svelte-h="svelte-1y5tcqw"><h5 class="card-title mb-0">Order Summary</h5></div> <div class="card-header border-bottom-dashed"><div class="mb-3"><label for="name" class="form-label" data-svelte-h="svelte-beo7gl">Discount %</label> <input type="text" class="form-control" name="discount" id="firstName" placeholder="Enter Discount Percentage "${add_attribute("value", discount, 0)}> ${errors?.discount ? `<strong class="text-danger ms-1 my-2">${escape(errors.discount[0])}</strong>` : ``}</div> <div><label for="name" class="form-label" data-svelte-h="svelte-2mhqwb">Tax %</label> <input type="text" class="form-control" name="tax" id="firstName" placeholder="Enter Tax Percentage "${add_attribute("value", tax, 0)}> ${errors?.tax ? `<strong class="text-danger ms-1 my-2">${escape(errors.tax[0])}</strong>` : ``}</div></div> <div class="card-body pt-2"><div class="table-responsive"><table class="table table-borderless mb-0"><tbody><tr><td data-svelte-h="svelte-pfaxes">Sub Total :</td> <td class="text-end" id="cart-subtotal">${escape(subtotal)} SAR</td></tr> <tr><td>Discount <span class="text-muted">(${escape(discount)}%)</span> :</td> <td class="text-end" id="cart-discount">${escape(isNaN(parseFloat(discount * (subtotal / 100)).toFixed(3)) ? "unset" : parseFloat(discount * (subtotal / 100)).toFixed(3))} SAR</td></tr> <tr><td>Estimated Tax (${escape(tax)}%) :</td> <td class="text-end" id="cart-tax">${escape(isNaN(calculatedTax) ? "unset" : calculatedTax)} SAR</td></tr> <tr class="table-active"><th data-svelte-h="svelte-w5xebh">Total (SAR) :</th> <td class="text-end"><span class="fw-semibold" id="cart-total">${escape(total)} SAR</span></td></tr></tbody></table></div>  ${errors?.products ? `<div class="alert alert-danger alert-border-left alert-dismissible fade show mt-3" role="alert"><i class="ri-error-warning-line me-3 align-middle"></i> <strong data-svelte-h="svelte-iib4gg">Products</strong> - ${escape(errors.products[0])} <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>` : ``} <div class="row g-3 mt-2 "><div class="hstack gap-2 justify-content-end"><button type="button" class="btn btn-primary waves-effect waves-light" ${""}>Save Order</button></div></div> </div></div></div> </div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let order;
  let productsList = [];
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    order = data.orderResponse.data.order;
    data.orderResponse.data.order.order_items;
    $$rendered = `<div class="row"><div class="col-lg-12"><div class="card"><div class="card-header align-items-center d-flex"><h4 class="card-title mb-0 flex-grow-1"><span class="text-primary">#${escape(order.id)}</span> Order Edit</h4> <div class="flex-shrink-0"><button type="button" data-bs-toggle="modal" data-bs-target="#addProductToCartModal" class="btn btn-primary waves-effect waves-light" data-svelte-h="svelte-1smpc22"><i class="ri-add-line align-bottom me-1"></i>Add Product</button> ${validate_component(AddProductToCart, "AddProductToCart").$$render($$result, {}, {}, {})}</div> </div> </div></div></div> <div class="row mb-3"><div class="col-xl-8">${productsList ? `${each(productsList, (product, i) => {
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
    })}` : ``}</div>  ${validate_component(OrderSummary, "OrderSummary").$$render($$result, Object.assign({}, order, { productsList }), {}, {})}</div>`;
  } while (!$$settled);
  return $$rendered;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-ae4a7c48.js.map
